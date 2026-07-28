import React, { useState } from 'react';
import { 
  Upload, Image as ImageIcon, Video, Type, Link as LinkIcon, 
  Volume2, Send, History, Sparkles, CheckCircle2, RotateCcw, 
  Layers, ArrowUpRight, Plus, Eye, Zap, ExternalLink, Globe,
  ToggleLeft, ToggleRight, Check
} from 'lucide-react';
import TattooQrStudio from './TattooQrStudio';

export default function OwnerDashboard({ 
  activeSlot, 
  updateSlotContent, 
  updateRedirectTarget, 
  toggleRedirectMode, 
  restoreHistoryItem, 
  setViewMode 
}) {
  const current = activeSlot.currentContent;
  const [activeTab, setActiveTab] = useState('redirect'); // 'redirect' | 'image' | 'video' | 'text' | 'link' | 'audio' | 'stencil'

  // Quick Redirect Form State
  const [redirectInputUrl, setRedirectInputUrl] = useState(activeSlot.targetRedirectUrl || 'https://instagram.com');
  
  // Media Form State
  const [title, setTitle] = useState(current.title || '');
  const [description, setDescription] = useState(current.description || '');
  const [mediaUrl, setMediaUrl] = useState(current.mediaUrl || '');
  const [linkUrl, setLinkUrl] = useState(current.linkUrl || '');
  const [caption, setCaption] = useState(current.caption || '');
  const [isSuccessNotification, setIsSuccessNotification] = useState(false);

  // File Upload Handler (Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetRedirect = (e) => {
    e.preventDefault();
    if (!redirectInputUrl) return;
    updateRedirectTarget(redirectInputUrl, 'instant');
    setIsSuccessNotification(true);
    setTimeout(() => setIsSuccessNotification(false), 3000);
  };

  const handlePublishMedia = (e) => {
    e.preventDefault();
    updateSlotContent({
      type: activeTab === 'stencil' ? current.type : activeTab,
      title: title || 'Updated Living Canvas Content',
      description,
      mediaUrl,
      linkUrl,
      caption
    });
    toggleRedirectMode('portal');

    setIsSuccessNotification(true);
    setTimeout(() => setIsSuccessNotification(false), 3000);
  };

  // Preset platforms for 1-tap redirect change
  const platformPresets = [
    { name: 'Instagram', url: 'https://instagram.com', color: '#e1306c' },
    { name: 'TikTok', url: 'https://tiktok.com', color: '#00f2fe' },
    { name: 'YouTube', url: 'https://youtube.com', color: '#ff0000' },
    { name: 'Spotify', url: 'https://spotify.com', color: '#1db954' },
    { name: 'WhatsApp', url: 'https://wa.me/', color: '#25d366' },
    { name: 'Google Drive', url: 'https://drive.google.com', color: '#ffba00' }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1rem 3rem 1rem' }}>
      
      {/* Top Banner: Active Live Content Preview */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        borderLeft: '4px solid var(--accent-cyan)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px', height: '54px', borderRadius: '12px',
            background: activeSlot.redirectMode === 'instant' ? 'rgba(0, 245, 160, 0.15)' : 'rgba(0, 242, 254, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${activeSlot.redirectMode === 'instant' ? 'var(--accent-neon)' : 'var(--accent-cyan)'}`
          }}>
            {activeSlot.redirectMode === 'instant' ? <Zap color="var(--accent-neon)" size={26} /> : <Sparkles color="var(--accent-cyan)" size={26} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`badge ${activeSlot.redirectMode === 'instant' ? 'badge-neon' : 'badge-cyan'}`}>
                {activeSlot.redirectMode === 'instant' ? '⚡ INSTANT URL REDIRECT MODE' : '🖼️ INTERACTIVE CANVAS VIEW'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated {current.updatedAt}</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
              {activeSlot.redirectMode === 'instant' 
                ? `Redirect Target: ${activeSlot.targetRedirectUrl}` 
                : current.title}
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button 
            onClick={() => toggleRedirectMode(activeSlot.redirectMode === 'instant' ? 'portal' : 'instant')}
            className="btn btn-secondary btn-sm"
          >
            {activeSlot.redirectMode === 'instant' ? <ToggleRight color="#00f5a0" /> : <ToggleLeft />}
            <span>Switch Mode</span>
          </button>
          <button 
            onClick={() => setViewMode('scanner')}
            className="btn btn-accent btn-sm"
          >
            <Eye size={15} />
            <span>Test Scan</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {isSuccessNotification && (
        <div className="glass-panel" style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          background: 'rgba(0, 245, 160, 0.15)',
          borderColor: 'rgba(0, 245, 160, 0.4)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <CheckCircle2 size={22} color="#00f5a0" />
          <div>
            <strong>UPDATED RE-DIRECT LINK LIVE!</strong> Anyone scanning your static tattoo right now will instantly go to your new target destination.
          </div>
        </div>
      )}

      {/* Main Studio Tabs Header */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'redirect', name: '⚡ Direct Link Switcher', icon: ExternalLink },
          { id: 'image', name: 'Photo / Art', icon: ImageIcon },
          { id: 'video', name: 'Video Showcase', icon: Video },
          { id: 'text', name: 'Quote / Message', icon: Type },
          { id: 'audio', name: 'Voice Note', icon: Volume2 },
          { id: 'stencil', name: 'Tattoo QR Studio', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Icon size={16} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: STENCIL STUDIO */}
      {activeTab === 'stencil' ? (
        <TattooQrStudio activeSlot={activeSlot} />
      ) : activeTab === 'redirect' ? (
        
        /* TAB CONTENT: DIRECT LINK SWITCHER PORTAL */
        <div className="grid-2">
          
          {/* Column 1: Fast URL Redirect Switcher */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={20} color="var(--accent-neon)" />
              Target Redirect Manager
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Change the live destination URL for static QR code <strong>"{activeSlot.name}"</strong>. When someone scans your tattoo, their phone will automatically open this link!
            </p>

            <form onSubmit={handleSetRedirect}>
              <div className="form-group">
                <label className="form-label">Set New Destination URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="url"
                    className="form-input"
                    placeholder="https://instagram.com/yourhandle"
                    value={redirectInputUrl}
                    onChange={(e) => setRedirectInputUrl(e.target.value)}
                    style={{ flex: 1 }}
                    required
                  />
                  <button type="submit" className="btn btn-accent">
                    <Zap size={16} /> Set Live
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Tap Platform Selector */}
            <div style={{ marginTop: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.6rem' }}>1-Tap Platform Presets</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {platformPresets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRedirectInputUrl(p.url);
                      updateRedirectTarget(p.url, 'instant');
                      setIsSuccessNotification(true);
                      setTimeout(() => setIsSuccessNotification(false), 2500);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ justifyContent: 'flex-start', fontSize: '0.8rem', gap: '0.4rem' }}
                  >
                    <Globe size={14} color={p.color} />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Scan Analytics & History */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Realtime Scan Stats */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="var(--accent-cyan)" />
                Scan Analytics & Status
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(10,12,22,0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL TATTOO SCANS</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                    {activeSlot.currentContent.viewsCount}
                  </div>
                </div>

                <div style={{ background: 'rgba(10,12,22,0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACTIVE REDIRECT MODE</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00f5a0', marginTop: '0.2rem' }}>
                    {activeSlot.redirectMode.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Past Redirect Links History */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <History size={16} color="var(--accent-purple)" />
                Recent Redirect History
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeSlot.history.map((item, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.updatedAt}</div>
                    </div>
                    <button 
                      onClick={() => restoreHistoryItem(item)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      <RotateCcw size={12} /> Re-activate
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      ) : (

        /* MEDIA FORM FOR OTHER TABS */
        <div className="grid-2">
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} color="var(--accent-cyan)" />
              Update Custom Media Page
            </h3>

            <form onSubmit={handlePublishMedia}>
              <div className="form-group">
                <label className="form-label">Media Header Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. Cyberpunk Artwork"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {activeTab === 'image' && (
                <div className="form-group">
                  <label className="form-label">Upload Custom Image or Paste Image URL</label>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="form-input" style={{ padding: '0.4rem' }} />
                  <input type="url" className="form-input" placeholder="https://..." value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} style={{ marginTop: '0.5rem' }} />
                </div>
              )}

              {activeTab === 'video' && (
                <div className="form-group">
                  <label className="form-label">Video Link (MP4 / YouTube / Vimeo)</label>
                  <input type="url" className="form-input" placeholder="https://..." value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Message / Description</label>
                <textarea className="form-textarea" rows={3} placeholder="Enter message text..." value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                <Send size={18} />
                <span>Publish Custom Page to Tattoo QR</span>
              </button>
            </form>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem' }}>Instructions</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Publishing a Custom Page will switch your QR code from Instant Redirect Mode into Interactive Media Canvas Mode. Scanners will see your uploaded artwork, video, or message poster.
            </p>
          </div>
        </div>

      )}

    </div>
  );
}
