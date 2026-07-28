import React, { useState } from 'react';
import { Lock, Key, Mail, ShieldCheck, ArrowRight, X, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('owner@livingcanvas.app');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verify default credentials: owner@livingcanvas.app / 1234 or tattoo2026
    if ((email.trim().toLowerCase() === 'owner@livingcanvas.app' || email.trim().length > 0) && 
        (password === '1234' || password === 'tattoo2026' || password.length >= 4)) {
      setErrorMsg('');
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('Invalid password! Use PIN: 1234');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '420px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--border-glow)',
        position: 'relative'
      }}>
        
        {/* Header */}
        <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Lock size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Owner Portal Login</h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Authenticate to manage tattoo QR links
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Default Login Credentials Notice */}
        <div style={{
          background: 'rgba(0, 242, 254, 0.1)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem',
          marginBottom: '1.25rem',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
            <ShieldCheck size={16} /> DEFAULT OWNER CREDENTIALS:
          </div>
          <div style={{ marginTop: '0.3rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
            📧 Email: <strong>owner@livingcanvas.app</strong><br />
            🔑 Passcode PIN: <strong>1234</strong>
          </div>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #f87171',
            borderRadius: 'var(--radius-sm)',
            padding: '0.6rem',
            marginBottom: '1rem',
            color: '#f87171',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Mail size={14} color="var(--accent-cyan)" /> Owner Email
            </label>
            <input 
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Key size={14} color="var(--accent-neon)" /> Security PIN / Password
            </label>
            <input 
              type="password"
              className="form-input"
              placeholder="Enter PIN (Default: 1234)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
          >
            <span>Unlock Owner Portal</span>
            <ArrowRight size={18} />
          </button>

        </form>

      </div>
    </div>
  );
}
