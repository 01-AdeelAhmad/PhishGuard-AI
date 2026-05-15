import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import {
  ArrowLeft, Target, Users, MousePointerClick, ShieldCheck, Eye, Clock,
  CheckCircle2, AlertTriangle, Mail, TrendingDown, BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const statusCfg = {
  completed: { label: 'Completed', cls: 'text-secure-500 bg-secure-500/10 border-secure-500/20' },
  active: { label: 'Active', cls: 'text-accent-500 bg-accent-500/10 border-accent-500/20' },
  scheduled: { label: 'Scheduled', cls: 'text-warn-500 bg-warn-500/10 border-warn-500/20' },
  draft: { label: 'Draft', cls: 'text-slate-400 bg-slate-50 border-slate-200' },
};



export default function CampaignDetailPage() {
  const { id } = useParams();
  const { selectedOrg, employees, campaigns } = useApp();
  const orgCampaigns = campaigns[selectedOrg.id] || [];
  const campaign = orgCampaigns.find(c => c.id === id) || orgCampaigns[0] || { name: 'Campaign', status: 'draft', dept: '', tactic: '', difficulty: 1, sent: 0, clicked: 0, reported: 0, date: '' };
  const staff = employees[selectedOrg.id] || [];
  const MOCK_RESULTS = staff.map(e => ({
    name: e.name, dept: e.dept,
    sent: true,
    opened: Math.random() > 0.2,
    clicked: e.risk > 50 ? Math.random() > 0.4 : Math.random() > 0.7,
    reported: e.reports > 2 ? Math.random() > 0.3 : Math.random() > 0.6,
    riskBefore: e.prev, riskAfter: e.risk,
  }));
  const st = statusCfg[campaign.status];
  const clickRate = campaign.sent > 0 ? Math.round((campaign.clicked / campaign.sent) * 100) : 0;
  const reportRate = campaign.sent > 0 ? Math.round((campaign.reported / campaign.sent) * 100) : 0;
  const openRate = campaign.sent > 0 ? 78 : 0;

  const pieData = [
    { name: 'Reported', value: campaign.reported || 4, color: '#059669' },
    { name: 'No Action', value: Math.max(0, (campaign.sent || 8) - (campaign.clicked || 3) - (campaign.reported || 4)), color: '#94a3b8' },
    { name: 'Clicked', value: campaign.clicked || 3, color: '#dc2626' },
  ];

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <Link to="/campaigns" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-500" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{campaign.name}</h1>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${st.cls}`}>{st.label}</span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">{campaign.dept} · {campaign.tactic} · Difficulty {campaign.difficulty}/5</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Emails Sent', value: campaign.sent, icon: Mail, color: 'accent' },
          { label: 'Open Rate', value: `${openRate}%`, icon: Eye, color: 'accent' },
          { label: 'Click Rate', value: `${clickRate}%`, icon: MousePointerClick, color: 'risk' },
          { label: 'Report Rate', value: `${reportRate}%`, icon: ShieldCheck, color: 'secure' },
        ].map((m, i) => {
          const Icon = m.icon;
          const cmap = { accent: 'bg-accent-500/8 text-accent-500', risk: 'bg-risk-500/8 text-risk-500', secure: 'bg-secure-500/8 text-secure-500' };
          return (
            <div key={i} className={`glass rounded-2xl p-4 animate-fade-in-up stagger-${i + 1}`}>
              <div className={`w-9 h-9 rounded-xl ${cmap[m.color]} flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs uppercase tracking-wider text-slate-400">{m.label}</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{m.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Outcome Chart */}
        <div className="glass rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">Response Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} style={{ fontSize: 11 }}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline */}
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">Campaign Timeline</h2>
          <div className="space-y-3">
            {[
              { time: campaign.date, event: 'Campaign created & approved', icon: CheckCircle2, color: 'text-accent-500' },
              { time: campaign.date, event: `${campaign.sent} emails sent to ${campaign.dept}`, icon: Mail, color: 'text-accent-500' },
              { time: '2 hours later', event: `${openRate}% open rate detected`, icon: Eye, color: 'text-warn-500' },
              { time: '4 hours later', event: `${campaign.clicked} employees clicked phishing link`, icon: MousePointerClick, color: 'text-risk-500' },
              { time: '6 hours later', event: `${campaign.reported} employees reported as phishing`, icon: ShieldCheck, color: 'text-secure-500' },
              { time: '24 hours', event: 'Teachable moments delivered to all who clicked', icon: AlertTriangle, color: 'text-warn-500' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                  <step.icon className={`w-4 h-4 ${step.color}`} />
                </div>
                <div>
                  <p className="text-sm text-slate-700">{step.event}</p>
                  <p className="text-[10px] text-slate-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-Employee Results */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-accent-500" /> Per-Employee Results
          </h2>
          <span className="text-xs text-slate-400">{MOCK_RESULTS.length} recipients</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400 border-b border-black/5 bg-slate-50/50">
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Department</th>
                <th className="px-6 py-3 font-medium text-center">Opened</th>
                <th className="px-6 py-3 font-medium text-center">Clicked</th>
                <th className="px-6 py-3 font-medium text-center">Reported</th>
                <th className="px-6 py-3 font-medium">Risk Change</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RESULTS.map((r, i) => (
                <tr key={i} className="border-b border-black/[.04] hover:bg-accent-500/[.03] transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-800">{r.name}</td>
                  <td className="px-6 py-3 text-slate-500">{r.dept}</td>
                  <td className="px-6 py-3 text-center">
                    {r.opened ? <Eye className="w-4 h-4 text-warn-500 mx-auto" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {r.clicked ? <MousePointerClick className="w-4 h-4 text-risk-500 mx-auto" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {r.reported ? <ShieldCheck className="w-4 h-4 text-secure-500 mx-auto" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400">{r.riskBefore}</span>
                      <span className="text-slate-300">→</span>
                      <span className={`text-xs font-semibold ${r.riskAfter > r.riskBefore ? 'text-risk-500' : 'text-secure-500'}`}>{r.riskAfter}</span>
                      <TrendingDown className={`w-3 h-3 ${r.riskAfter > r.riskBefore ? 'text-risk-500 rotate-180' : 'text-secure-500'}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
