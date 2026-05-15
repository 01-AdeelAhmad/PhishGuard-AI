import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-scale-in">
        <div className="w-20 h-20 rounded-2xl bg-accent-500/10 flex items-center justify-center ring-1 ring-accent-500/15 mx-auto mb-6 animate-float">
          <ShieldAlert className="w-10 h-10 text-accent-500" />
        </div>
        <h1 className="text-6xl font-extrabold gradient-text mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          This page doesn't exist or has been moved. If you clicked a phishing link to get here — 
          <span className="text-accent-500 font-medium"> nice try, but PhishGuard caught it.</span>
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-lg shadow-accent-500/25 transition-all hover:shadow-accent-500/40">
            <Home className="w-4 h-4" /> Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm font-medium text-slate-500 px-5 py-2.5 rounded-xl border border-black/10 hover:bg-black/5 transition-all cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
