import React from 'react';
import { QrCode, Eye, Sliders, Camera, HelpCircle, Sparkles, Layers, Plus, Lock, Unlock } from 'lucide-react';

export default function Navbar({
  slots,
  activeSlot,
  activeSlotId,
  setActiveSlotId,
  viewMode,
  setViewMode,
  isAuthenticated,
  handleOpenAdminView,
  setIsSimulatorOpen,
  setIsHelpOpen,
  onAddNewSlot
}) {
  return (
    <header className="glass-panel" style={{ margin: '1rem', padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-cyan)'
          }}>
            <QrCode size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>LIVING CANVAS</h2>
              <span className="badge badge-neon">STATIC QR • DYNAMIC MEDIA</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Dynamic Tattoo & Physical QR Code Content Platform
            </p>
          </div>
        </div>

        {/* Slot Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Layers size={16} color="var(--accent-cyan)" />
          <select 
            value={activeSlotId} 
            onChange={(e) => setActiveSlotId(e.target.value)}
            className="form-select"
            style={{ fontWeight: 600, minWidth: '180px' }}
          >
            {slots.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.locationTag})
              </option>
            ))}
          </select>
          <button 
            onClick={onAddNewSlot}
            className="btn btn-secondary btn-sm"
            title="Create new tattoo slot"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Mode Switcher Buttons */}
          <div style={{
            background: 'rgba(10, 12, 22, 0.7)',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            gap: '4px'
          }}>
            <button
              className={`btn btn-sm ${viewMode === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={handleOpenAdminView}
              style={{ border: 'none' }}
            >
              {isAuthenticated ? <Unlock size={14} color="#00f5a0" /> : <Lock size={14} />}
              <span>Owner Dashboard</span>
            </button>

            <button
              className={`btn btn-sm ${viewMode === 'scanner' ? 'btn-accent' : 'btn-secondary'}`}
              onClick={() => setViewMode('scanner')}
              style={{ border: 'none' }}
            >
              <Eye size={15} />
              <span>Scanner View</span>
            </button>
          </div>

          {/* Test Scan Simulator Button */}
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: 'var(--accent-purple)' }}
          >
            <Camera size={15} color="var(--accent-purple)" />
            <span>Simulate Scan</span>
          </button>

          {/* How It Works Guide */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem' }}
            title="How Tattoo QR Codes Work"
          >
            <HelpCircle size={18} color="var(--text-muted)" />
          </button>
        </div>

      </div>
    </header>
  );
}
