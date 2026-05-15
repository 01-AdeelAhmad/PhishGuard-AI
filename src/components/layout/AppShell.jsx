import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <footer className="border-t border-black/5 py-3 text-center text-[11px] text-slate-400">
          © 2026 PhishGuard AI — Autonomous Security Awareness Training Platform
        </footer>
      </div>
    </div>
  );
}
