import { useParams } from 'react-router-dom';
import { RED_FLAGS, MOCK_AI_EMAIL } from '../../services/mock-data';
import {
  GraduationCap, Lightbulb, AlertTriangle, BookOpen, CheckCircle2,
  ShieldCheck, RefreshCw, Clock, Target, Brain, Eye, ArrowDownRight
} from 'lucide-react';

const FLAG_ICONS = { 'False Urgency': Clock, 'Authority Impersonation': Target, 'Contextual Pretexting': Brain, 'Procedural Mimicry': Eye };
const colorMap = {
  risk: { border: 'border-risk-500/15', iconBg: 'bg-risk-500/10', iconText: 'text-risk-500', tag: 'text-risk-500 bg-risk-500/8' },
  warn: { border: 'border-warn-500/15', iconBg: 'bg-warn-500/10', iconText: 'text-warn-500', tag: 'text-warn-500 bg-warn-500/8' },
  accent: { border: 'border-accent-500/15', iconBg: 'bg-accent-500/10', iconText: 'text-accent-500', tag: 'text-accent-500 bg-accent-500/8' },
};

export default function TeachableMomentPublicPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Minimal Header */}
      <header className="glass-strong border-b border-black/5 px-6 py-4 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-500 to-secure-500 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-sm text-slate-900">PhishGuard</span>
        <span className="font-bold text-sm gradient-text">AI</span>
        <span className="text-xs text-slate-400 ml-2">Security Training</span>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Success Banner */}
        <div className="glass rounded-2xl p-8 border border-secure-500/20 bg-gradient-to-r from-secure-500/5 to-transparent animate-scale-in">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-secure-500/10 flex items-center justify-center ring-2 ring-secure-500/20 shrink-0 animate-float">
              <GraduationCap className="w-8 h-8 text-secure-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-warn-500" /> Teachable Moment
              </h1>
              <p className="text-base text-slate-500 mt-2 leading-relaxed">
                You just interacted with a <span className="text-accent-500 font-semibold">PhishGuard AI security simulation</span>. 
                Don't worry — this is <span className="text-secure-500 font-semibold">not a punishment</span>. 
                It's a learning opportunity designed to help you recognize real threats.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-sm text-secure-500 bg-secure-500/10 px-3 py-1.5 rounded-lg">
                  <ArrowDownRight className="w-4 h-4" /> Your training level will adapt
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <RefreshCw className="w-3 h-3" /> Simulation ID: {id || 'DEMO-001'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The email you received */}
        <div className="glass rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
          <div className="px-6 py-4 border-b border-black/5 bg-risk-500/5">
            <h2 className="text-sm font-semibold text-risk-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> The Email You Received (Simulation)
            </h2>
          </div>
          <div className="px-6 py-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 w-14">From</span>
              <span className="text-sm text-slate-600">{MOCK_AI_EMAIL.sender_name} &lt;{MOCK_AI_EMAIL.sender_email}&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 w-14">Subject</span>
              <span className="text-sm text-slate-800 font-semibold">{MOCK_AI_EMAIL.subject}</span>
            </div>
          </div>
        </div>

        {/* Red Flags */}
        <div className="animate-fade-in-up stagger-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warn-500" /> Red Flags We Identified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RED_FLAGS.map((flag, i) => {
              const Icon = FLAG_ICONS[flag.title] || AlertTriangle;
              const c = colorMap[flag.color];
              return (
                <div key={flag.title} className={`glass rounded-2xl p-5 border ${c.border} hover:shadow-md transition-all animate-fade-in-up`} style={{ animationDelay: `${0.15 * i}s` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${c.iconText}`} />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-semibold text-slate-800">{flag.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.tag}`}>{flag.tactic}</span>
                      <p className="text-sm text-slate-500 leading-relaxed">{flag.description}</p>
                      <div className="bg-slate-50 rounded-lg px-3 py-2 border border-black/5 mt-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400">From the email:</span>
                        <p className="text-xs text-warn-500 font-mono mt-0.5">{flag.highlight}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What to do */}
        <div className="glass rounded-2xl p-6 border border-secure-500/15 animate-fade-in-up stagger-3">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-secure-500" /> What Should You Do Next Time?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Verify wire change requests through a separate channel',
              "Check the sender's email domain carefully",
              'Be suspicious of urgency — pause and think',
              'When in doubt, forward to IT security',
              'Never download unexpected attachments',
              'Look for mismatched URLs in links',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 bg-secure-500/5 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-secure-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 pb-4">
          Protected by PhishGuard AI · This simulation was approved by your IT security team
        </p>
      </main>
    </div>
  );
}
