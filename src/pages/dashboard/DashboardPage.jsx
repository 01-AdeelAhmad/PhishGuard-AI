import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  ShieldAlert, Target, Zap, Users, ArrowDownRight, ArrowUpRight,
  Brain, ChevronRight, BarChart3, Building2, AlertTriangle
} from 'lucide-react';

const METRIC_DEFS = [
  { key: 'risk', label: 'Company Risk Score', icon: ShieldAlert, color: 'secure' },
  { key: 'campaigns', label: 'Active AI Campaigns', icon: Target, color: 'accent' },
  { key: 'teachable', label: 'Teachable Moments', icon: Zap, color: 'warn' },
  { key: 'employees', label: 'Employees Protected', icon: Users, color: 'accent' },
];

function riskColor(s) { return s >= 70 ? 'bg-risk-500' : s >= 40 ? 'bg-warn-500' : 'bg-secure-500'; }
function riskBadge(s) {
  if (s >= 70) return { text: 'High Risk', cls: 'text-risk-500 bg-risk-500/10 border-risk-500/20' };
  if (s >= 40) return { text: 'Medium', cls: 'text-warn-500 bg-warn-500/10 border-warn-500/20' };
  return { text: 'Low Risk', cls: 'text-secure-500 bg-secure-500/10 border-secure-500/20' };
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { selectedOrg, organizations, employees, campaigns } = useApp();
  const staff = employees[selectedOrg.id] || [];

  const colorMap = {
    secure: { bg: 'bg-secure-500/8', ring: 'ring-secure-500/15', text: 'text-secure-500', badge: 'text-secure-500' },
    accent: { bg: 'bg-accent-500/8', ring: 'ring-accent-500/15', text: 'text-accent-500', badge: 'text-accent-500' },
    warn: { bg: 'bg-warn-500/8', ring: 'ring-warn-500/15', text: 'text-warn-500', badge: 'text-warn-500' },
  };

  return (
    <section className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-accent-500" />
            Security Operations Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time overview of phishing resilience.
            <span className="text-accent-500 font-medium"> PhishGuard AI</span> autonomously generates and adjusts simulations per employee.
          </p>
        </div>
      </div>

      {/* Company Banner */}
      <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3 border border-accent-500/10">
        <span className="text-2xl">{selectedOrg.logo}</span>
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Viewing data for <span className="text-accent-500">{selectedOrg.name}</span>
          </p>
          <p className="text-xs text-slate-400">Industry: {selectedOrg.industry} · Client ID: {selectedOrg.id.toUpperCase()}-2026</p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2">
          <Building2 className="w-4 h-4 text-accent-400" />
          <span className="text-xs text-slate-500 font-medium">{organizations.length} active clients</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div key={selectedOrg.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_DEFS.map((m, i) => {
          const Icon = m.icon;
          const data = selectedOrg.metrics[m.key];
          const c = colorMap[m.color];
          return (
            <div key={m.key} className={`glass rounded-2xl p-5 hover:shadow-md hover:border-black/10 transition-all duration-300 group animate-fade-in-up stagger-${i + 1}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                {data.change && (
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${data.trend === 'down' ? 'text-secure-500' : data.trend === 'up' && m.key === 'risk' ? 'text-risk-500' : c.badge}`}>
                    {data.trend === 'down' ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    {data.change}
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">{m.label}</p>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {data.value}
                {data.unit && <span className="text-base font-medium text-slate-400 ml-1">{data.unit}</span>}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 leading-snug">{data.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Action Items — computed from org data */}
      {(() => {
        const highRisk = staff.filter(e => e.risk >= 70);
        const declining = staff.filter(e => e.trend === 'declining');
        const orgCampaigns = (campaigns[selectedOrg.id] || []);
        const pending = orgCampaigns.filter(c => c.status === 'draft' || c.status === 'scheduled');
        const depts = [...new Set(staff.map(e => e.dept))];
        const riskyDepts = depts.filter(d => {
          const dStaff = staff.filter(e => e.dept === d);
          const avg = dStaff.reduce((s, e) => s + e.risk, 0) / (dStaff.length || 1);
          return avg >= 50;
        });

        const items = [];
        if (highRisk.length > 0) items.push({ text: `${highRisk.length} employee${highRisk.length > 1 ? 's' : ''} at high risk (score ≥ 70)`, urgent: true });
        if (declining.length > 0) items.push({ text: `${declining.length} employee${declining.length > 1 ? 's' : ''} with declining security trend`, urgent: true });
        if (riskyDepts.length > 0) items.push({ text: `${riskyDepts.join(', ')} dept${riskyDepts.length > 1 ? 's' : ''} avg risk above 50`, urgent: true });
        if (pending.length > 0) items.push({ text: `${pending.length} campaign${pending.length > 1 ? 's' : ''} pending approval or scheduled`, urgent: false });
        if (items.length === 0) items.push({ text: 'All clear — no action items at this time', urgent: false });

        return (
          <div className="glass rounded-2xl p-5 border border-warn-500/10 animate-fade-in-up stagger-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-warn-500" /> Action Items
            </h3>
            <div className={`grid grid-cols-1 ${items.length >= 3 ? 'sm:grid-cols-2 lg:grid-cols-4' : items.length === 2 ? 'sm:grid-cols-2' : ''} gap-3`}>
              {items.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${a.urgent ? 'bg-risk-500' : 'bg-warn-500'}`} />
                  <p className="text-xs text-slate-600">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Employee Risk Table */}
      <div className="glass rounded-2xl overflow-hidden animate-fade-in-up stagger-3">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent-500" />
              Adversarial Learning Loop Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              AI observes click behaviour and <span className="text-accent-500 font-medium">auto-adjusts simulation difficulty per employee</span>.
            </p>
          </div>
          <span className="hidden sm:flex text-[10px] uppercase tracking-wider text-accent-500 bg-accent-500/8 px-2.5 py-1 rounded-full border border-accent-500/15 font-semibold items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
            Live Auto-Tuning
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400 border-b border-black/5 bg-slate-50/50">
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Department</th>
                <th className="px-6 py-3 font-medium">Risk Score</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Trend</th>
                <th className="px-6 py-3 font-medium">AI Next Simulation</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {staff.map((emp, i) => {
                const badge = riskBadge(emp.risk);
                return (
                  <tr key={emp.id} onClick={() => navigate(`/employees/${emp.id}`)} className="border-b border-black/[.04] hover:bg-accent-500/[.03] transition-colors animate-fade-in-up cursor-pointer" style={{ animationDelay: `${0.06 * i}s` }}>
                    <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">{emp.name}</td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{emp.dept}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${riskColor(emp.risk)} transition-all duration-700`} style={{ width: `${emp.risk}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-7 text-right">{emp.risk}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        {emp.trend === 'improving' ? <ArrowDownRight className="w-3.5 h-3.5 text-secure-500" /> : emp.trend === 'declining' ? <ArrowUpRight className="w-3.5 h-3.5 text-risk-500" /> : <span className="w-3.5 h-3.5 text-slate-400">—</span>}
                        <span className="text-slate-500 capitalize">{emp.trend}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-accent-500 bg-accent-500/8 px-2.5 py-1 rounded-lg border border-accent-500/15 font-mono">{emp.level}</span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-black/5 text-[11px] text-slate-400 flex items-center gap-2 bg-slate-50/30">
          <Brain className="w-3.5 h-3.5 text-accent-500/50" />
          <span>
            <span className="text-slate-600 font-medium">Why this matters:</span> PhishGuard's adversarial loop ensures employees who clicked are challenged with <em>harder</em> simulations, driving measurable risk reduction.
          </span>
        </div>
      </div>
    </section>
  );
}
