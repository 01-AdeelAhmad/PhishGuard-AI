import { NavLink } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  BarChart3, TrendingUp, Target, Users, Settings, Inbox, BookOpen, UserCircle,
  ChevronLeft, ChevronRight, Sun, Moon
} from 'lucide-react';
import { useState } from 'react';
import logoImg from '../../assets/logo.png';

const ADMIN_NAV = [
  { to: '/', icon: BarChart3, label: 'Dashboard', end: true },
  { to: '/analytics', icon: TrendingUp, label: 'Analytics' },
  { to: '/campaigns', icon: Target, label: 'Campaigns' },
  { to: '/employees', icon: Users, label: 'Employees' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const EMPLOYEE_NAV = [
  { to: '/inbox', icon: Inbox, label: 'My Inbox' },
  { to: '/training', icon: BookOpen, label: 'Training' },
  { to: '/my-dashboard', icon: UserCircle, label: 'My Dashboard' },
];

export default function Sidebar() {
  const { role, setRole, theme, toggleTheme } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <aside className={`${collapsed ? 'w-[72px]' : 'w-[240px]'} shrink-0 h-screen sticky top-0 glass-strong flex flex-col transition-all duration-300 z-40`}>
      {/* Logo */}
      <div className="px-4 py-5 border-b border-black/5 flex items-center gap-2.5">
        <img src={logoImg} alt="PhishGuard AI" className="w-9 h-9 rounded-xl shrink-0 object-cover" />
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <span className="font-bold text-sm tracking-tight text-slate-900">PhishGuard</span>
            <span className="font-bold text-sm tracking-tight gradient-text ml-0.5">AI</span>
            <p className="text-[9px] text-slate-400 tracking-wide uppercase truncate">Autonomous Phishing Simulation</p>
          </div>
        )}
      </div>

      {/* Role Toggle */}
      <div className={`px-3 py-3 border-b border-black/5 ${collapsed ? 'flex flex-col items-center gap-1' : ''}`}>
        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 px-1">View Mode</p>}
        <div className={`flex ${collapsed ? 'flex-col' : ''} gap-1 ${collapsed ? '' : 'bg-slate-100 p-1 rounded-lg'}`}>
          {['admin', 'employee'].map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={`${collapsed ? 'w-10 h-10 rounded-lg' : 'flex-1 py-1.5 rounded-md text-xs font-medium'} flex items-center justify-center gap-1.5 transition-all cursor-pointer capitalize
                ${role === r ? 'bg-white text-accent-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              {collapsed ? (r === 'admin' ? <BarChart3 className="w-4 h-4" /> : <UserCircle className="w-4 h-4" />) : r}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto sidebar-scroll">
        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 px-1">{role === 'admin' ? 'Administration' : 'Employee Portal'}</p>}
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 ${collapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${isActive ? 'bg-accent-500/10 text-accent-500 shadow-sm shadow-accent-500/5' : 'text-slate-500 hover:text-slate-800 hover:bg-black/5'}`}>
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Theme Toggle + Collapse */}
      <div className="px-3 py-3 border-t border-black/5 space-y-1">
        <button onClick={toggleTheme}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-3'} py-2 rounded-lg text-xs text-slate-400 hover:text-slate-600 hover:bg-black/5 transition-all cursor-pointer`}>
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {!collapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
        </button>
        <button onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-600 hover:bg-black/5 transition-all cursor-pointer">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
