import { UserCircle, ShieldCheck, Target, TrendingDown, Award, Flame, Zap, ArrowDownRight } from 'lucide-react';

const badges = [
  { icon: '🛡️', label: 'Phishing Defender', desc: 'Reported 5+ simulations correctly', earned: true },
  { icon: '🔥', label: '5 Streak — No Clicks', desc: 'No clicks on 5 consecutive simulations', earned: true },
  { icon: '⚡', label: 'Rapid Reporter', desc: 'Reported within 2 minutes', earned: false },
  { icon: '🏆', label: 'Security Champion', desc: 'Top performer in your department', earned: false },
];

export default function PersonalDashboardPage() {
  return (
    <section className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-accent-500" /> My Security Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">Your personal phishing resilience metrics and achievements.</p>
      </div>

      {/* Risk Score Hero */}
      <div className="glass rounded-2xl p-6 border border-accent-500/10 bg-gradient-to-r from-accent-500/5 to-transparent">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secure-500/20 to-secure-400/10 flex items-center justify-center ring-4 ring-secure-500/15">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-secure-500">32</p>
              <p className="text-[9px] uppercase text-secure-600 font-medium">/ 100</p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-800">Your Risk Score</h2>
            <p className="text-sm text-slate-500 mt-1">You're doing great! Your score has improved by <span className="text-secure-500 font-medium">18 points</span> over the last 30 days.</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-secure-500 font-medium">
              <ArrowDownRight className="w-3.5 h-3.5" /> Improving — down from 50
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Simulations Received', value: '12', icon: Target, color: 'accent' },
          { label: 'Passed (No Click)', value: '9', icon: ShieldCheck, color: 'secure' },
          { label: 'Correctly Reported', value: '7', icon: Zap, color: 'warn' },
          { label: 'Training Completed', value: '3/6', icon: Award, color: 'accent' },
        ].map((s, i) => {
          const Icon = s.icon;
          const cmap = { accent: 'bg-accent-500/8 text-accent-500', secure: 'bg-secure-500/8 text-secure-500', warn: 'bg-warn-500/8 text-warn-500' };
          return (
            <div key={i} className="glass rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
              <div className={`w-9 h-9 rounded-xl ${cmap[s.color]} flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <div className="glass rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-accent-500" /> Achievements & Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {badges.map((b, i) => (
            <div key={i} className={`rounded-xl p-4 text-center transition-all ${b.earned ? 'bg-accent-500/5 border border-accent-500/15' : 'bg-slate-50 border border-black/5 opacity-50'}`}>
              <span className="text-3xl">{b.icon}</span>
              <p className="text-sm font-semibold text-slate-800 mt-2">{b.label}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{b.desc}</p>
              {b.earned && <span className="text-[10px] text-secure-500 font-medium mt-1 inline-block">✓ Earned</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Simulation History */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-black/5">
          <h2 className="text-sm font-semibold text-slate-800">Recent Simulation History</h2>
        </div>
        <div className="divide-y divide-black/[.04]">
          {[
            { date: 'Apr 25', tactic: 'BEC — Invoice Fraud', result: 'Reported ✓', cls: 'text-secure-500' },
            { date: 'Apr 18', tactic: 'Clone Phishing', result: 'No Click ✓', cls: 'text-secure-500' },
            { date: 'Apr 12', tactic: 'Spear Phishing', result: 'Clicked ✗', cls: 'text-risk-500' },
            { date: 'Apr 5', tactic: 'Credential Harvesting', result: 'Reported ✓', cls: 'text-secure-500' },
            { date: 'Mar 28', tactic: 'CEO Fraud', result: 'No Click ✓', cls: 'text-secure-500' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm text-slate-700">{h.tactic}</p>
                <p className="text-[10px] text-slate-400">{h.date}</p>
              </div>
              <span className={`text-xs font-semibold ${h.cls}`}>{h.result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
