import { useState, useEffect } from 'react';

const INITIAL_SLOTS = [
  {
    id: 'tattoo-01',
    name: 'Right Forearm Tattoo',
    locationTag: 'Arm Ink',
    scanUrl: `${window.location.origin}/#/scan/tattoo-01`,
    redirectMode: 'portal',
    targetRedirectUrl: 'https://instagram.com',
    currentContent: {
      id: 'c-101',
      type: 'image',
      title: 'Cyberpunk Cyber-Liquid Art',
      mediaUrl: '/cyberpunk_canvas.jpg',
      description: 'Current vibe on my forearm! Scan anytime to see what artwork or message I am broadcasting today.',
      caption: '⚡ Cyberpunk mood activated',
      themeColor: '#00f2fe',
      viewsCount: 284,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 47,
      flames: 32,
      errorCorrectionLevel: 'H',
      stencilStyle: 'cyber',
    },
    history: [
      {
        id: 'c-100',
        type: 'link',
        title: 'Instagram Profile Redirect',
        targetRedirectUrl: 'https://instagram.com/user',
        updatedAt: '2 days ago',
        viewsCount: 198
      },
      {
        id: 'c-099',
        type: 'image',
        title: 'Cosmic Nebula Stardust',
        mediaUrl: '/cosmic_canvas.jpg',
        updatedAt: '4 days ago',
        viewsCount: 152
      }
    ]
  },
  {
    id: 'wrist-02',
    name: 'Left Wrist Micro-Ink',
    locationTag: 'Wrist Tattoo',
    scanUrl: `${window.location.origin}/#/scan/wrist-02`,
    redirectMode: 'instant',
    targetRedirectUrl: 'https://spotify.com',
    currentContent: {
      id: 'c-201',
      type: 'link',
      title: 'Spotify Track Redirect',
      description: 'Instant auto-redirect to active track.',
      themeColor: '#00f5a0',
      viewsCount: 124,
      updatedAt: '1 hour ago',
      likes: 19,
      flames: 12,
      errorCorrectionLevel: 'H',
      stencilStyle: 'standard',
    },
    history: []
  }
];

export function useCanvasStore() {
  const [slots, setSlots] = useState(() => {
    const saved = localStorage.getItem('living_canvas_slots');
    return saved ? JSON.parse(saved) : INITIAL_SLOTS;
  });

  const [activeSlotId, setActiveSlotId] = useState('tattoo-01');
  const [viewMode, setViewMode] = useState('admin'); // 'admin' | 'scanner'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('living_canvas_slots', JSON.stringify(slots));
  }, [slots]);

  const activeSlot = slots.find(s => s.id === activeSlotId) || slots[0];

  // Action: Attempt opening admin view (prompts login if not authenticated)
  const handleOpenAdminView = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setViewMode('admin');
    }
  };

  // Action: Update Redirect settings & target URL
  const updateRedirectTarget = (targetUrl, mode = 'instant') => {
    setSlots(prevSlots => prevSlots.map(slot => {
      if (slot.id === activeSlotId) {
        return {
          ...slot,
          redirectMode: mode,
          targetRedirectUrl: targetUrl,
          currentContent: {
            ...slot.currentContent,
            title: `Redirect: ${new URL(targetUrl).hostname || targetUrl}`,
            linkUrl: targetUrl,
            updatedAt: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')'
          }
        };
      }
      return slot;
    }));
  };

  // Action: Update content of the active slot
  const updateSlotContent = (newContentData) => {
    setSlots(prevSlots => prevSlots.map(slot => {
      if (slot.id === activeSlotId) {
        const archivedItem = { ...slot.currentContent };
        const updatedContent = {
          ...slot.currentContent,
          ...newContentData,
          id: 'c-' + Date.now(),
          updatedAt: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
        };

        const newHistory = [archivedItem, ...slot.history.filter(h => h.id !== archivedItem.id)].slice(0, 10);

        return {
          ...slot,
          currentContent: updatedContent,
          history: newHistory
        };
      }
      return slot;
    }));
  };

  // Action: Toggle redirect mode
  const toggleRedirectMode = (mode) => {
    setSlots(prevSlots => prevSlots.map(slot => {
      if (slot.id === activeSlotId) {
        return { ...slot, redirectMode: mode };
      }
      return slot;
    }));
  };

  // Action: Restore past history item
  const restoreHistoryItem = (historyItem) => {
    if (historyItem.targetRedirectUrl) {
      updateRedirectTarget(historyItem.targetRedirectUrl, 'instant');
    } else {
      updateSlotContent({
        type: historyItem.type,
        title: historyItem.title,
        mediaUrl: historyItem.mediaUrl || '',
        description: historyItem.description || '',
        linkUrl: historyItem.linkUrl || '',
        audioUrl: historyItem.audioUrl || ''
      });
    }
  };

  // Action: Increment reaction counts
  const addReaction = (reactionType) => {
    setSlots(prevSlots => prevSlots.map(slot => {
      if (slot.id === activeSlotId) {
        return {
          ...slot,
          currentContent: {
            ...slot.currentContent,
            [reactionType]: (slot.currentContent[reactionType] || 0) + 1,
            viewsCount: slot.currentContent.viewsCount + 1
          }
        };
      }
      return slot;
    }));
  };

  // Action: Create a new QR Slot
  const addNewSlot = (name, locationTag) => {
    const newId = 'slot-' + Math.random().toString(36).substring(2, 7);
    const newSlot = {
      id: newId,
      name,
      locationTag,
      scanUrl: `${window.location.origin}/#/scan/${newId}`,
      redirectMode: 'portal',
      targetRedirectUrl: 'https://instagram.com',
      currentContent: {
        id: 'c-' + Date.now(),
        type: 'text',
        title: 'New Dynamic Tattoo QR Slot',
        description: 'Welcome! Set your live redirect URL or upload media from your manager portal.',
        themeColor: '#00f2fe',
        viewsCount: 1,
        updatedAt: 'Just created',
        likes: 0,
        flames: 0,
        errorCorrectionLevel: 'H',
        stencilStyle: 'standard'
      },
      history: []
    };
    setSlots(prev => [...prev, newSlot]);
    setActiveSlotId(newId);
  };

  return {
    slots,
    activeSlot,
    activeSlotId,
    setActiveSlotId,
    viewMode,
    setViewMode,
    isAuthenticated,
    setIsAuthenticated,
    isLoginModalOpen,
    setIsLoginModalOpen,
    handleOpenAdminView,
    isSimulatorOpen,
    setIsSimulatorOpen,
    isHelpOpen,
    setIsHelpOpen,
    updateRedirectTarget,
    updateSlotContent,
    toggleRedirectMode,
    restoreHistoryItem,
    addReaction,
    addNewSlot
  };
}
