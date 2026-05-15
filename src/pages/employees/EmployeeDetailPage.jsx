import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  ArrowLeft, UserCircle, ShieldCheck, Target, TrendingDown, ArrowDownRight,
  ArrowUpRight, MousePointerClick, BarChart3, BookOpen, Award
} from 'lucide-react';

function riskColor(s) { return s >= 70 ? 'bg-risk-500' : s >= 40 ? 'bg-warn-500' : 'bg-secure-500'; }
function riskTextColor(s) { return s >= 70 ? 'text-risk-500' : s >= 40 ? 'text-warn-500' : 'text-secure-500'; }

const SIM_HISTORY = [
  { date: 'Apr 25', tactic: 'BEC — Invoice Fraud', difficulty: 4, result: 'Reported ✓', good: true },
  { date: 'Apr 18', tactic: 'Clone Phishing', difficulty: 3, result: 'No Click ✓', good: true },
  { date: 'Apr 12', tactic: 'Spear Phishing', difficulty: 5, result: 'Clicked ✗', good: false },
  { date: 'Apr 5', tactic: 'Credential Harvesting', difficulty: 3, result: 'Reported ✓', good: true },
  { date: 'Mar 28', tactic: 'CEO Fraud', difficulty: 4, result: 'Clicked ✗', good: false },
  { date: 'Mar 20', tactic: 'QR Code Phishing', difficulty: 2, result: 'No Click ✓', good: true },
];

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const { selectedOrg, employees } = useApp();
  const staff = employees[selectedOrg.id] || [];
  const emp = staff.find(e => e.id === id) || staff[0];
  if (!emp) return null;

  const reportRate = emp.sims > 0 ? Math.round((emp.reports / emp.sims) * 100) : 0;
  const clickRate = emp.sims > 0 ? Math.round((emp.clicks / emp.sims) * 100) : 0;

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <Link to="/employees" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-500" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Profile</h1>
      </div>

      {/* Profile Hero */}
      <div className="glass rounded-2xl p-6 border border-accent-500/10 bg-gradient-to-r from-accent-500/5 to-transparent">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500/20 to-accent-400/10 flex items-center justify-center ring-4 ring-accent-500/10">
            <span className="text-2xl font-bold text-accent-500">{emp.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">{emp.name}</h2>
            <p className="text-sm text-slate-500">{emp.dept} · {selectedOrg.name}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${riskColor(emp.risk)}`} />
                <span className={`text-sm font-bold ${riskTextColor(emp.risk)}`}>{emp.risk}/100 Risk</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                {emp.trend === 'improving' ? <ArrowDownRight className="w-3.5 h-3.5 text-secure-500" /> : emp.trend === 'declining' ? <ArrowUpRight className="w-3.5 h-3.5 text-risk-500" /> : <span className="text-slate-400">—</span>}
                <span className="text-slate-500 capitalize">{emp.trend}</span>
                <span className="text-slate-300 ml-1">(prev: {emp.prev})</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-accent-500 bg-accent-500/8 px-2.5 py-1 rounded-lg border border-accent-500/15 font-mono">{emp.level}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Simulations', value: emp.sims, icon: Target, color: 'accent' },
          { label: 'Click Rate', value: `${clickRate}%`, icon: MousePointerClick, color: 'risk' },
          { label: 'Report Rate', value: `${reportRate}%`, icon: ShieldCheck, color: 'secure' },
          { label: 'Training', value: '2/6', icon: BookOpen, color: 'warn' },
        ].map((s, i) => {
          const Icon = s.icon;
          const cmap = { accent: 'bg-accent-500/8 text-accent-500', risk: 'bg-risk-500/8 text-risk-500', secure: 'bg-secure-500/8 text-secure-500', warn: 'bg-warn-500/8 text-warn-500' };
          return (
            <div key={i} className={`glass rounded-2xl p-4 animate-fade-in-up stagger-${i + 1}`}>
              <div className={`w-9 h-9 rounded-xl ${cmap[s.color]} flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Risk Score Bar */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-accent-500" /> Risk Score History
        </h3>
        <div className="flex items-end gap-1 h-24">
          {[85, 80, 78, 75, 72, 68, 72, 75, 70, 65, emp.prev, emp.risk].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full rounded-t ${val >= 70 ? 'bg-risk-400' : val >= 40 ? 'bg-warn-400' : 'bg-secure-400'} transition-all duration-500`} style={{ height: `${val}%`, opacity: 0.6 + (i / 12) * 0.4 }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-slate-400 mt-1">
          <span>12 weeks ago</span><span>Now</span>
        </div>
      </div>

      {/* Simulation History */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-black/5">
          <h3 className="text-sm font-semibold text-slate-800">Simulation History</h3>
        </div>
        <div className="divide-y divide-black/[.04]">
          {SIM_HISTORY.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-accent-500/[.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${h.good ? 'bg-secure-500/10' : 'bg-risk-500/10'}`}>
                  {h.good ? <ShieldCheck className="w-4 h-4 text-secure-500" /> : <MousePointerClick className="w-4 h-4 text-risk-500" />}
                </div>
                <div>
                  <p className="text-sm text-slate-700">{h.tactic}</p>
                  <p className="text-[10px] text-slate-400">{h.date} · Difficulty {h.difficulty}/5</p>
                </div>
              </div>
              <span className={`text-xs font-semibold ${h.good ? 'text-secure-500' : 'text-risk-500'}`}>{h.result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
