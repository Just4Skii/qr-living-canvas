import React from 'react';
import { X, Sparkles, RefreshCw, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--border-glow)'
      }}>
        
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={22} color="var(--accent-cyan)" />
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>How Living Tattoo QR Codes Work</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          A standard QR code tattoo cannot be re-inked every time you want a new picture. Here is how <strong>Living Canvas</strong> makes your physical body ink 100% dynamic forever:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0
            }}>1</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Tattoo the Permanent Permalink</h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Your tattoo encodes a single, fixed URL (e.g. <code>.../scan/tattoo-01</code>). Once tattooed on skin, this code never changes!
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(0, 245, 160, 0.15)', color: 'var(--accent-neon)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0
            }}>2</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Change Content Anytime on the App</h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Whenever you upload a new photo, video, quote, or audio clip in your dashboard, your slot is instantly updated on the web server.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(157, 80, 187, 0.15)', color: '#d8b4fe',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0
            }}>3</div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Instant Scanned Reveal</h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                When anyone scans your arm with their phone camera, they land on your permalink and immediately see whatever media you published today!
              </p>
            </div>
          </div>

        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <ShieldCheck size={24} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
            <strong>Tattoo Artist Tip:</strong> Use Error Correction Level H (30% damage tolerance) in our QR Stencil Studio to make sure your tattoo scans flawlessly even if skin moves or ages.
          </div>
        </div>

        <button 
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
        >
          Got It! Let's Create
        </button>

      </div>
    </div>
  );
}
