import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: AlertTriangle,
};

const COLORS = {
  success: 'bg-secure-500/10 border-secure-500/20 text-secure-500',
  warning: 'bg-warn-500/10 border-warn-500/20 text-warn-500',
  info: 'bg-accent-500/10 border-accent-500/20 text-accent-500',
  error: 'bg-risk-500/10 border-risk-500/20 text-risk-500',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] space-y-2 max-w-sm">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <div key={toast.id}
              className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md animate-slide-in-right ${COLORS[toast.type]} bg-white/90`}>
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="shrink-0 cursor-pointer">
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
