import { useMemo } from 'react';
import { TrendingUp, Download, FileText } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { generatePDFReport } from '../../services/report';
import { CLICK_RATE_DATA } from '../../services/mock-data';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';

const COLORS_DEPT = ['#dc2626','#d97706','#f59e0b','#059669','#0ea5e9','#4f46e5','#8b5cf6','#ec4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-md border border-black/8 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-700">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const { selectedOrg, employees } = useApp();
  const staff = employees[selectedOrg.id] || [];

  // Compute department risk data from employees
  const deptRiskData = useMemo(() => {
    const deptMap = {};
    staff.forEach(e => {
      if (!deptMap[e.dept]) deptMap[e.dept] = { total: 0, count: 0 };
      deptMap[e.dept].total += e.risk;
      deptMap[e.dept].count += 1;
    });
    return Object.entries(deptMap)
      .map(([dept, d]) => ({ dept, risk: Math.round(d.total / d.count) }))
      .sort((a, b) => b.risk - a.risk)
      .map((d, i) => ({ ...d, color: d.risk >= 60 ? '#dc2626' : d.risk >= 40 ? '#d97706' : '#059669' }));
  }, [staff]);

  // Compute outcome data from employees
  const outcomeData = useMemo(() => {
    const totalSims = staff.reduce((s, e) => s + e.sims, 0) || 1;
    const totalClicks = staff.reduce((s, e) => s + e.clicks, 0);
    const totalReports = staff.reduce((s, e) => s + e.reports, 0);
    const ignored = Math.max(0, totalSims - totalClicks - totalReports - Math.round(totalSims * 0.2));
    const openedOnly = totalSims - totalClicks - totalReports - ignored;
    return [
      { name: 'Reported', value: totalReports, color: '#059669' },
      { name: 'Ignored', value: Math.max(ignored, 0), color: '#94a3b8' },
      { name: 'Opened Only', value: Math.max(openedOnly, Math.round(totalSims * 0.2)), color: '#d97706' },
      { name: 'Clicked', value: totalClicks, color: '#dc2626' },
    ];
  }, [staff]);

  // Generate risk trend from employee data (simulated 12 weeks)
  const riskTrendData = useMemo(() => {
    const depts = [...new Set(staff.map(e => e.dept))].slice(0, 4);
    return Array.from({ length: 12 }, (_, i) => {
      const week = `W${i + 1}`;
      const row = { week };
      const progress = (i + 1) / 12;
      depts.forEach(dept => {
        const deptStaff = staff.filter(e => e.dept === dept);
        const avgPrev = deptStaff.reduce((s, e) => s + (e.prev || e.risk), 0) / (deptStaff.length || 1);
        const avgCurr = deptStaff.reduce((s, e) => s + e.risk, 0) / (deptStaff.length || 1);
        row[dept] = Math.round(avgPrev + (avgCurr - avgPrev) * progress);
      });
      const allAvg = staff.reduce((s, e) => s + e.risk, 0) / (staff.length || 1);
      const allPrev = staff.reduce((s, e) => s + (e.prev || e.risk), 0) / (staff.length || 1);
      row['Overall'] = Math.round(allPrev + (allAvg - allPrev) * progress);
      return row;
    });
  }, [staff]);

  const deptKeys = useMemo(() => [...new Set(staff.map(e => e.dept))].slice(0, 4), [staff]);
  const deptColors = ['#d97706', '#dc2626', '#059669', '#0ea5e9'];

  // Top improved (biggest risk drop)
  const topImproved = useMemo(() =>
    [...staff].filter(e => e.prev > e.risk).sort((a, b) => (a.risk - a.prev) - (b.risk - b.prev)).slice(0, 5),
  [staff]);

  // Highest risk
  const highestRisk = useMemo(() =>
    [...staff].sort((a, b) => b.risk - a.risk).slice(0, 5),
  [staff]);

  function downloadCSV() {
    const rows = ['Week,' + deptKeys.join(',') + ',Overall'];
    riskTrendData.forEach(d => rows.push(`${d.week},${deptKeys.map(k => d[k]).join(',')},${d.Overall}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `phishguard_${selectedOrg.id}_risk_trend.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent-500" />
            Analytics & Reporting
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprehensive data visualizations for <span className="text-accent-500 font-medium">{selectedOrg.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={downloadCSV}
            className="flex items-center gap-1.5 text-xs font-medium text-accent-500 bg-accent-500/8 px-3 py-2 rounded-lg border border-accent-500/15 hover:bg-accent-500/15 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button onClick={() => generatePDFReport(selectedOrg)}
            className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-accent-500 to-accent-400 px-3 py-2 rounded-lg shadow-sm shadow-accent-500/20 hover:shadow-accent-500/30 transition-all cursor-pointer">
            <FileText className="w-3.5 h-3.5" /> PDF Report
          </button>
        </div>
      </div>

      <div key={selectedOrg.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend */}
        <div className="glass rounded-2xl p-5 lg:col-span-2 animate-fade-in-up stagger-1">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Risk Score Trend</h2>
          <p className="text-[11px] text-slate-400 mb-4">Organization-wide risk score over the past 12 weeks by department</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Overall" stroke="#4f46e5" strokeWidth={3} dot={{ r: 3 }} />
              {deptKeys.map((dk, i) => (
                <Line key={dk} type="monotone" dataKey={dk} stroke={deptColors[i % deptColors.length]} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Click Rate */}
        <div className="glass rounded-2xl p-5 animate-fade-in-up stagger-2">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Click Rate Over Time</h2>
          <p className="text-[11px] text-slate-400 mb-4">Percentage of employees clicking phishing links per campaign</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={CLICK_RATE_DATA}>
              <defs>
                <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="campaign" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[0, 50]} tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={5} stroke="#059669" strokeDasharray="6 3" label={{ value: '5% Target', fontSize: 10, fill: '#059669' }} />
              <Area type="monotone" dataKey="rate" stroke="#4f46e5" strokeWidth={2} fill="url(#clickGrad)" name="Click Rate %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Risk */}
        <div className="glass rounded-2xl p-5 animate-fade-in-up stagger-3">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Department Risk Comparison</h2>
          <p className="text-[11px] text-slate-400 mb-4">Risk score by department — identify weak spots</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptRiskData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="risk" radius={[0, 6, 6, 0]} barSize={20} name="Risk Score">
                {deptRiskData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Outcome Distribution */}
        <div className="glass rounded-2xl p-5 animate-fade-in-up stagger-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Simulation Outcome Distribution</h2>
          <p className="text-[11px] text-slate-400 mb-4">How employees respond to phishing simulations</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={outcomeData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} style={{ fontSize: 11 }}>
                {outcomeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Improved */}
        <div className="glass rounded-2xl p-5 animate-fade-in-up stagger-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">🏆 Top 5 Most Improved</h2>
          <div className="space-y-2">
            {topImproved.length === 0 && <p className="text-xs text-slate-400">No improvement data available yet.</p>}
            {topImproved.map((e, i) => (
              <div key={e.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{e.name}</p>
                    <p className="text-[10px] text-slate-400">{e.dept}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-secure-500">{e.risk - e.prev} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highest Risk */}
        <div className="glass rounded-2xl p-5 animate-fade-in-up stagger-6">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">⚠️ Top 5 Highest Risk</h2>
          <div className="space-y-2">
            {highestRisk.length === 0 && <p className="text-xs text-slate-400">No employee data available.</p>}
            {highestRisk.map((e, i) => (
              <div key={e.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{e.name}</p>
                    <p className="text-[10px] text-slate-400">{e.dept}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-risk-500">{e.risk}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
