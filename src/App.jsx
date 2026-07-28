import React, { useEffect } from 'react';
import { useCanvasStore } from './useCanvasStore';
import Navbar from './components/Navbar';
import PublicScannerView from './components/PublicScannerView';
import OwnerDashboard from './components/OwnerDashboard';
import ScannerSimulatorModal from './components/ScannerSimulatorModal';
import HowItWorksModal from './components/HowItWorksModal';
import LoginModal from './components/LoginModal';

export default function App() {
  const {
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
  } = useCanvasStore();

  // Listen to Hash Routing (e.g. #/scan/tattoo-01)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/scan/')) {
        const targetSlotId = hash.replace('#/scan/', '');
        const found = slots.find(s => s.id === targetSlotId);
        if (found) {
          setActiveSlotId(targetSlotId);
          setViewMode('scanner');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [slots, setActiveSlotId, setViewMode]);

  const handleAddNewSlot = () => {
    const name = prompt('Enter a name for your new tattoo slot (e.g. Bicep QR Ink):');
    if (name) {
      const tag = prompt('Enter location tag (e.g. Arm Ink):') || 'Body Art';
      addNewSlot(name, tag);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Application Bar */}
      <Navbar 
        slots={slots}
        activeSlot={activeSlot}
        activeSlotId={activeSlotId}
        setActiveSlotId={setActiveSlotId}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isAuthenticated={isAuthenticated}
        handleOpenAdminView={handleOpenAdminView}
        setIsSimulatorOpen={setIsSimulatorOpen}
        setIsHelpOpen={setIsHelpOpen}
        onAddNewSlot={handleAddNewSlot}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '1rem 0' }}>
        {viewMode === 'scanner' ? (
          <PublicScannerView 
            activeSlot={activeSlot}
            addReaction={addReaction}
            setViewMode={setViewMode}
          />
        ) : (
          <OwnerDashboard 
            activeSlot={activeSlot}
            updateSlotContent={updateSlotContent}
            updateRedirectTarget={updateRedirectTarget}
            toggleRedirectMode={toggleRedirectMode}
            restoreHistoryItem={restoreHistoryItem}
            setViewMode={setViewMode}
          />
        )}
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setViewMode('admin');
        }}
      />

      <ScannerSimulatorModal 
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        activeSlot={activeSlot}
        onCompleteScan={() => setViewMode('scanner')}
      />

      <HowItWorksModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        padding: '1.5rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-glass)',
        marginTop: 'auto'
      }}>
        <p style={{ margin: 0 }}>
          <strong>LIVING CANVAS</strong> • Dynamic Media Portal for Permanent Tattoo QR Codes
        </p>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', opacity: 0.7 }}>
          Static QR Link: <code style={{ color: 'var(--accent-cyan)' }}>{activeSlot.scanUrl}</code>
        </p>
      </footer>

    </div>
  );
}
