import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Target, Plus, Eye, Calendar, CheckCircle2, Clock, Pause, FileEdit } from 'lucide-react';

const statusConfig = {
  completed: { label: 'Completed', cls: 'text-secure-500 bg-secure-500/10 border-secure-500/20', icon: CheckCircle2 },
  active: { label: 'Active', cls: 'text-accent-500 bg-accent-500/10 border-accent-500/20', icon: Eye },
  scheduled: { label: 'Scheduled', cls: 'text-warn-500 bg-warn-500/10 border-warn-500/20', icon: Calendar },
  paused: { label: 'Paused', cls: 'text-slate-500 bg-slate-100 border-slate-200', icon: Pause },
  draft: { label: 'Draft', cls: 'text-slate-400 bg-slate-50 border-slate-200', icon: FileEdit },
};

function difficultyStars(level) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-accent-500' : 'bg-slate-200'}`} />
  ));
}

export default function CampaignListPage() {
  const { selectedOrg, campaigns } = useApp();
  const [filter, setFilter] = useState('all');

  const orgCampaigns = campaigns[selectedOrg.id] || [];

  const filtered = filter === 'all'
    ? orgCampaigns
    : orgCampaigns.filter(c => c.status === filter);

  const counts = { all: orgCampaigns.length };
  orgCampaigns.forEach(c => { counts[c.status] = (counts[c.status] || 0) + 1; });

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-accent-500" />
            Campaigns
          </h1>
          <p className="text-sm text-slate-500 mt-1">AI-generated phishing simulations for <span className="text-accent-500 font-medium">{selectedOrg.name}</span>.</p>
        </div>
        <Link to="/campaigns/new"
          className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-300 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-accent-500/25">
          <Plus className="w-4 h-4" /> New Campaign
        </Link>
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'draft', label: 'Draft' },
          { key: 'completed', label: 'Completed' },
        ].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${filter === f.key ? 'bg-accent-500/10 text-accent-500 border-accent-500/20' : 'text-slate-400 border-black/5 hover:border-black/10 hover:text-slate-600'}`}>
            {f.label} {counts[f.key] != null && <span className="ml-1 text-[10px] opacity-60">({counts[f.key] || 0})</span>}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-sm text-slate-400">No campaigns match this filter.</p>
          </div>
        )}
        {filtered.map((c, i) => {
          const st = statusConfig[c.status];
          const StIcon = st.icon;
          const clickRate = c.sent > 0 ? Math.round((c.clicked / c.sent) * 100) : 0;
          const reportRate = c.sent > 0 ? Math.round((c.reported / c.sent) * 100) : 0;
          return (
            <Link key={c.id} to={`/campaigns/${c.id}`} className="block glass rounded-2xl p-5 hover:shadow-md hover:border-black/10 transition-all duration-300 animate-fade-in-up cursor-pointer" style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-800">{c.name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${st.cls}`}>
                      <StIcon className="w-3 h-3" /> {st.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>{c.dept}</span>
                    <span>·</span>
                    <span>{c.tactic}</span>
                    <span>·</span>
                    <div className="flex items-center gap-0.5">{difficultyStars(c.difficulty)}</div>
                    {c.date && <><span>·</span><span>{c.date}</span></>}
                  </div>
                </div>

                {c.sent > 0 && (
                  <div className="flex items-center gap-6 text-center">
                    <div>
                      <p className="text-lg font-bold text-slate-800">{c.sent}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Sent</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-risk-500">{clickRate}%</p>
                      <p className="text-[10px] text-slate-400 uppercase">Clicked</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-secure-500">{reportRate}%</p>
                      <p className="text-[10px] text-slate-400 uppercase">Reported</p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
