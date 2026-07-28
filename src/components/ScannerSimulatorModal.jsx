import React, { useState, useEffect } from 'react';
import { Camera, X, CheckCircle2, Scan, Sparkles } from 'lucide-react';

export default function ScannerSimulatorModal({ isOpen, onClose, activeSlot, onCompleteScan }) {
  const [scanningState, setScanningState] = useState('aiming'); // 'aiming' | 'locking' | 'success'

  useEffect(() => {
    if (!isOpen) {
      setScanningState('aiming');
      return;
    }

    const timer1 = setTimeout(() => setScanningState('locking'), 1200);
    const timer2 = setTimeout(() => {
      setScanningState('success');
      setTimeout(() => {
        onCompleteScan();
        onClose();
      }, 1000);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(12px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid var(--border-glow)'
      }}>
        
        {/* Modal Header */}
        <div className="flex-between" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Camera size={18} color="var(--accent-cyan)" />
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Camera Scan Simulator</h4>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Camera Viewfinder Box */}
        <div style={{
          height: '380px',
          background: '#05070d',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          
          {/* Background Arm/Tattoo Visual Mock */}
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(157, 80, 187, 0.25) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }} />

          {/* Tattoo QR Graphic being targeted */}
          <div style={{
            width: '160px',
            height: '160px',
            background: '#ffffff',
            padding: '12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            boxShadow: scanningState === 'success' ? '0 0 40px #00f5a0' : '0 0 20px rgba(0,242,254,0.4)',
            transition: 'all 0.3s ease'
          }}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(activeSlot.scanUrl)}`} 
              alt="QR Tattoo"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Animated Scanner Laser Sweep */}
          {scanningState !== 'success' && (
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              right: '10%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
              boxShadow: '0 0 15px var(--accent-cyan)',
              animation: 'scanline 1.8s infinite ease-in-out'
            }} />
          )}

          {/* Target HUD Reticle */}
          <div style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            border: `2px dashed ${scanningState === 'success' ? '#00f5a0' : scanningState === 'locking' ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.4)'}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }} />

          {/* Status Message Footer in Viewfinder */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            padding: '0.5rem 1.25rem',
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: scanningState === 'success' ? '#00f5a0' : 'var(--accent-cyan)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            {scanningState === 'aiming' && <>Searching for tattoo QR code...</>}
            {scanningState === 'locking' && <><Scan size={14} className="animate-spin" /> Locked on permalink URL!</>}
            {scanningState === 'success' && <><CheckCircle2 size={14} /> Scanned! Redirecting to canvas...</>}
          </div>

        </div>

      </div>
    </div>
  );
}
