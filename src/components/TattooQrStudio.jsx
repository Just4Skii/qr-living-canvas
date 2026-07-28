import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Download, QrCode as QrIcon, ShieldCheck, Paintbrush, 
  Copy, Check, Info, Sparkles, Sliders
} from 'lucide-react';

export default function TattooQrStudio({ activeSlot }) {
  const canvasRef = useRef(null);
  const [errorLevel, setErrorLevel] = useState('H');
  const [stencilStyle, setStencilStyle] = useState('standard'); // 'standard' | 'cyber' | 'invert'
  const [centerLogo, setCenterLogo] = useState('none'); // 'none' | 'heart' | 'lightning' | 'star'
  const [copied, setCopied] = useState(false);
  const [dataUrl, setDataUrl] = useState('');

  // Target permanent scan URL
  const targetUrl = activeSlot.scanUrl || `${window.location.origin}/#/scan/${activeSlot.id}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    let colorDark = '#000000';
    let colorLight = '#ffffff';

    if (stencilStyle === 'cyber') {
      colorDark = '#00f2fe';
      colorLight = '#090d16';
    } else if (stencilStyle === 'invert') {
      colorDark = '#ffffff';
      colorLight = '#000000';
    }

    QRCode.toCanvas(
      canvasRef.current,
      targetUrl,
      {
        width: 320,
        margin: 2,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: colorDark,
          light: colorLight
        }
      },
      (err) => {
        if (err) console.error('QR Render Error:', err);
        else if (canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL('image/png'));
        }
      }
    );
  }, [targetUrl, errorLevel, stencilStyle]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPNG = () => {
    const link = document.createElement('a');
    link.download = `Tattoo_QR_Stencil_${activeSlot.id}_Level${errorLevel}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      
      {/* Studio Header */}
      <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <QrIcon color="var(--accent-cyan)" size={22} />
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Tattoo & Stencil QR Studio</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>
            Generate high-contrast, permanent vector QR stencils for tattoo artists or physical prints.
          </p>
        </div>

        <span className="badge badge-neon">
          <ShieldCheck size={12} /> LEVEL {errorLevel} (30% DAMAGE TOLERANT)
        </span>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        
        {/* Left Column: Interactive Controls */}
        <div>
          
          {/* Error Correction Level Selector */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Error Correction Level</span>
              <span style={{ color: 'var(--accent-neon)', fontSize: '0.75rem' }}>
                {errorLevel === 'H' ? 'Level H (30% Skin Recovery)' : `Level ${errorLevel}`}
              </span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {[
                { level: 'H', desc: '30% (Best for Tattoos)' },
                { level: 'Q', desc: '25% High' },
                { level: 'M', desc: '15% Medium' },
                { level: 'L', desc: '7% Low' }
              ].map(item => (
                <button
                  key={item.level}
                  onClick={() => setErrorLevel(item.level)}
                  className={`btn btn-sm ${errorLevel === item.level ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexDirection: 'column', padding: '0.5rem 0.2rem' }}
                >
                  <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.level}</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{item.desc.split(' ')[0]}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
              💡 <strong>Tattoo Tip:</strong> Level H keeps the QR scannable even if skin stretches or hair grows over it.
            </p>
          </div>

          {/* Stencil Style Theme Selector */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">Tattoo Stencil Theme</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { id: 'standard', name: 'Classic Black Stencil' },
                { id: 'cyber', name: 'Cyber Neon' },
                { id: 'invert', name: 'Inverted Dark' }
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setStencilStyle(theme.id)}
                  className={`btn btn-sm ${stencilStyle === theme.id ? 'btn-accent' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem' }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Permanent Link Info */}
          <div style={{
            background: 'rgba(10, 12, 22, 0.8)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem',
            marginTop: '1.25rem'
          }}>
            <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                PERMANENT TATTOO LINK (NEVER CHANGES)
              </span>
              <button 
                onClick={handleCopyLink}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
              >
                {copied ? <Check size={12} color="#00f5a0" /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              wordBreak: 'break-all'
            }}>
              {targetUrl}
            </code>
          </div>

        </div>

        {/* Right Column: Live QR Preview & Download */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          
          {/* QR Canvas Display */}
          <div className={`qr-container theme-${stencilStyle}`}>
            <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
          </div>

          {/* Download Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <button
              onClick={downloadPNG}
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Download size={16} />
              <span>Download High-Res Stencil (PNG)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
