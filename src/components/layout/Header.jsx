import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Bell, ChevronDown, Check, X } from 'lucide-react';
import { NOTIFICATIONS } from '../../services/mock-data';

export default function Header() {
  const { selectedOrg, selectedOrgId, setSelectedOrgId, organizations, role } = useApp();
  const [orgOpen, setOrgOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const orgNotifs = NOTIFICATIONS[selectedOrg.id] || NOTIFICATIONS.greenfield || [];
  const unread = orgNotifs.filter(n => !n.read).length;

  return (
    <header className="glass-strong sticky top-0 z-30 border-b border-black/5">
      <div className="flex items-center justify-between h-14 px-6">
        {/* Left spacer */}
        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {/* Company Selector (admin only) */}
          {role === 'admin' && (
            <div className="relative">
              <button onClick={() => setOrgOpen(!orgOpen)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-black/8 shadow-sm hover:shadow-md transition-all cursor-pointer min-w-[200px]">
                <span className="text-lg">{selectedOrg.logo}</span>
                <div className="text-left flex-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">{selectedOrg.name}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider">{selectedOrg.industry}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${orgOpen ? 'rotate-180' : ''}`} />
              </button>
              {orgOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-full bg-white border border-black/8 rounded-xl shadow-xl z-50 overflow-hidden animate-slide-down">
                  {organizations.map((org) => (
                    <button key={org.id} onClick={() => { setSelectedOrgId(org.id); setOrgOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors cursor-pointer ${org.id === selectedOrgId ? 'bg-accent-500/8' : 'hover:bg-slate-50'}`}>
                      <span className="text-lg">{org.logo}</span>
                      <div className="flex-1">
                        <p className={`text-xs font-medium ${org.id === selectedOrgId ? 'text-accent-500' : 'text-slate-700'}`}>{org.name}</p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider">{org.industry}</p>
                      </div>
                      {org.id === selectedOrgId && <Check className="w-3.5 h-3.5 text-accent-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer">
              <Bell className="w-[18px] h-[18px] text-slate-500" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-risk-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unread}</span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-96 bg-white border border-black/8 rounded-xl shadow-xl z-50 animate-slide-down overflow-hidden">
                <div className="px-4 py-3 border-b border-black/5 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">Notifications & Action Items</h3>
                  <button onClick={() => setNotifOpen(false)} className="cursor-pointer"><X className="w-4 h-4 text-slate-400" /></button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {orgNotifs.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-black/[.04] flex gap-3 ${!n.read ? 'bg-accent-500/[.03]' : ''} ${n.type === 'action' ? 'border-l-2' : ''} ${n.type === 'action' && n.urgent ? 'border-l-risk-500' : n.type === 'action' ? 'border-l-warn-500' : ''}`}>
                      <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center mt-0.5 ${n.type === 'action' && n.urgent ? 'bg-risk-500/10' : n.type === 'action' ? 'bg-warn-500/10' : n.type === 'risk_alert' ? 'bg-risk-500/10' : 'bg-accent-500/8'}`}>
                        {n.type === 'action' ? (
                          <span className={`text-[10px] font-bold ${n.urgent ? 'text-risk-500' : 'text-warn-500'}`}>!</span>
                        ) : n.type === 'risk_alert' ? (
                          <span className="text-[10px] font-bold text-risk-500">⚠</span>
                        ) : (
                          <Bell className="w-3.5 h-3.5 text-accent-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-700">{n.title}</p>
                          {n.type === 'action' && (
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${n.urgent ? 'text-risk-500 bg-risk-500/10' : 'text-warn-500 bg-warn-500/10'}`}>
                              {n.urgent ? 'Urgent' : 'Action'}
                            </span>
                          )}
                          {!n.read && n.type !== 'action' && <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-slate-300 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            {role === 'admin' ? 'AD' : 'EM'}
          </div>
        </div>
      </div>
    </header>
  );
}
