import React, { useState, useEffect } from 'react';
import { 
  Heart, Flame, Star, Share2, ExternalLink, CheckCircle2, 
  Sparkles, Eye, Clock, ShieldCheck, Volume2, Play, Pause, 
  Maximize2, ArrowRight, Download, RefreshCw, Zap
} from 'lucide-react';

export default function PublicScannerView({ activeSlot, addReaction, setViewMode }) {
  const content = activeSlot.currentContent;
  const isInstantRedirect = activeSlot.redirectMode === 'instant';
  const targetUrl = activeSlot.targetRedirectUrl || content.linkUrl || 'https://instagram.com';

  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-redirect timer when in instant redirect mode
  useEffect(() => {
    if (!isInstantRedirect || !targetUrl) return;

    const interval = setInterval(() => {
      setRedirectCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          window.open(targetUrl, '_blank');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isInstantRedirect, targetUrl]);

  const handleShare = () => {
    navigator.clipboard.writeText(activeSlot.scanUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 1rem 3rem 1rem' }}>
      
      {/* Phone Frame Header */}
      <div className="glass-panel" style={{
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        background: 'linear-gradient(180deg, rgba(28, 34, 56, 0.95), rgba(18, 22, 38, 0.85))',
        borderBottom: '1px solid rgba(0, 242, 254, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isInstantRedirect ? '#00f5a0' : '#00f2fe',
            boxShadow: `0 0 10px ${isInstantRedirect ? '#00f5a0' : '#00f2fe'}`
          }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            SCANNED FROM {activeSlot.locationTag.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
            <ShieldCheck size={12} /> LEVEL H VERIFIED
          </span>
          <button 
            onClick={() => setViewMode('admin')} 
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}
          >
            <RefreshCw size={12} /> Manager Portal
          </button>
        </div>
      </div>

      {/* Main Scanner Canvas Card */}
      <div className="glass-panel" style={{
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        borderTop: 'none',
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* INSTANT REDIRECT BANNER MODE */}
        {isInstantRedirect ? (
          <div style={{
            padding: '2.5rem 1.75rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 245, 160, 0.1), rgba(0, 242, 254, 0.15))'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(0, 245, 160, 0.2)',
              margin: '0 auto 1.25rem auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid var(--accent-neon)'
            }}>
              <Zap size={32} color="var(--accent-neon)" />
            </div>

            <span className="badge badge-neon" style={{ marginBottom: '0.75rem' }}>
              INSTANT QR LINK REDIRECT
            </span>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Redirecting to Destination...
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Target: <code style={{ color: 'var(--accent-cyan)' }}>{targetUrl}</code>
            </p>

            <a
              href={targetUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent btn-lg"
              style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
            >
              <span>Opening in {redirectCountdown}s (Click if not redirected)</span>
              <ArrowRight size={18} />
            </a>
          </div>
        ) : (

          /* INTERACTIVE MEDIA CANVAS MODE */
          <>
            <div style={{ padding: '1.25rem 1.5rem 0.5rem 1.5rem' }}>
              <div className="flex-between">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {activeSlot.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Eye size={14} color="var(--accent-cyan)" /> {content.viewsCount} Scans
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} /> {content.updatedAt}
                  </span>
                </div>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem', marginBottom: '0.75rem' }}>
                {content.title}
              </h2>
            </div>

            <div style={{ padding: '0 1.5rem 1.25rem 1.5rem' }}>
              
              {content.type === 'image' && (
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
                  <img 
                    src={content.mediaUrl || '/cyberpunk_canvas.jpg'} 
                    alt={content.title}
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                  />
                  <button 
                    onClick={() => setIsLightboxOpen(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)' }}
                  >
                    <Maximize2 size={14} /> Fullscreen
                  </button>
                </div>
              )}

              {content.type === 'text' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1), rgba(157, 80, 187, 0.15))',
                  border: '1px solid var(--border-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.5rem 1.75rem',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '1.35rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {content.description || 'Welcome to my dynamic tattoo QR space!'}
                  </p>
                </div>
              )}

              {content.description && content.type !== 'text' && (
                <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {content.description}
                </p>
              )}

              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button onClick={() => addReaction('likes')} className="btn btn-secondary btn-sm">
                    <Heart size={16} color="#f87171" fill="#f87171" />
                    <span>{content.likes || 0}</span>
                  </button>
                  <button onClick={() => addReaction('flames')} className="btn btn-secondary btn-sm">
                    <Flame size={16} color="#ff9f43" fill="#ff9f43" />
                    <span>{content.flames || 0}</span>
                  </button>
                </div>

                <button onClick={handleShare} className="btn btn-secondary btn-sm">
                  <Share2 size={15} />
                  <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
                </button>
              </div>

            </div>
          </>
        )}

        <div style={{
          background: 'rgba(10, 12, 22, 0.9)',
          padding: '0.75rem 1.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>Living Canvas Dynamic QR Portal • Slot ID: {activeSlot.id}</span>
          <span style={{ color: 'var(--accent-cyan)' }}>Scan Link Never Changes</span>
        </div>

      </div>

    </div>
  );
}
