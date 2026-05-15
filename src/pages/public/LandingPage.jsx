import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Zap, Brain, Target, Users, BarChart3, CheckCircle2,
  ArrowRight, Sparkles, Lock, ChevronRight, Globe, Award, TrendingDown,
  DollarSign, Building2, ArrowDown, Play, Shield, MousePointerClick
} from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI-Generated Simulations', desc: 'Unique phishing emails crafted by generative AI — never the same template twice. No more recognizable templates.', color: 'accent' },
  { icon: Target, title: 'Adversarial Learning Loop', desc: 'Auto-adjusts difficulty per employee based on click/report behavior. Smarter training, not harder training.', color: 'risk' },
  { icon: ShieldCheck, title: 'Human-In-The-Loop Safety', desc: 'Every campaign requires admin approval through a 4-point safety checklist. Full control, zero risk.', color: 'secure' },
  { icon: Zap, title: 'Teachable Moments', desc: 'Immediate, positive-reinforcement education when employees click. No shaming — just learning.', color: 'warn' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Track risk scores, click rates, and department comparisons. Export PDF reports for board presentations.', color: 'accent' },
  { icon: Users, title: 'Multi-Tenant Management', desc: 'MSSPs and consultancies manage multiple clients from one dashboard with full tenant isolation.', color: 'secure' },
];

const pricing = [
  { tier: 'Starter', price: '$0', period: '/month', desc: 'For small teams getting started', features: ['Up to 25 employees', '3 AI campaigns/month', 'Basic analytics', 'Community support', 'Teachable moment pages'], cta: 'Start Free', featured: false },
  { tier: 'Professional', price: '$499', period: '/month', desc: 'For growing security teams', features: ['Up to 500 employees', 'Unlimited AI campaigns', 'Advanced analytics & PDF reports', 'Priority support', 'Custom branding', 'Audit log & compliance'], cta: 'Start 14-Day Trial', featured: true },
  { tier: 'Enterprise', price: 'Custom', period: '', desc: 'For large organizations', features: ['Unlimited employees', 'Unlimited everything', 'SSO & directory sync', 'Dedicated CSM', 'SLA & compliance pack', 'On-premise deployment', 'Custom AI model tuning'], cta: 'Book a Demo', featured: false },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Configure', desc: 'IT admin selects target department, threat tactic, and difficulty level.', icon: Target },
  { step: '02', title: 'AI Generates', desc: 'Generative AI creates a unique, context-aware phishing email from scratch.', icon: Brain },
  { step: '03', title: 'Admin Approves', desc: 'HITL safety checklist ensures compliance before any email is sent.', icon: ShieldCheck },
  { step: '04', title: 'Employees Learn', desc: 'Clicked? They get a teachable moment. Reported? Their risk score drops.', icon: Zap },
  { step: '05', title: 'AI Adapts', desc: 'The system adjusts difficulty for each employee — a true adversarial loop.', icon: TrendingDown },
];

const STATS = [
  { value: 67, suffix: '%', label: 'Average click-rate reduction', prefix: '' },
  { value: 4.2, suffix: 'x', label: 'Faster risk reduction vs. templates', prefix: '' },
  { value: 340, suffix: '%', label: 'ROI within 12 months', prefix: '' },
  { value: 98, suffix: '%', label: 'Employee satisfaction with training', prefix: '' },
];

const TESTIMONIALS = [
  { quote: 'PhishGuard AI reduced our phishing click rate from 32% to 8% in just 3 months. The AI-generated emails are indistinguishable from real threats.', name: 'Sarah Mitchell', role: 'CISO, Meridian Health Systems', avatar: 'SM' },
  { quote: "Unlike KnowBe4, employees can't just memorize templates. Every simulation is unique. That's the game changer.", name: 'James Park', role: 'VP Security, NovaTech Financial', avatar: 'JP' },
  { quote: 'The ROI was immediate. We prevented a $2.4M BEC attack within the first quarter because our finance team was trained to spot it.', name: 'Dr. Amara Obi', role: 'CTO, GreenBridge Manufacturing', avatar: 'AO' },
];

const colorMap = {
  accent: { bg: 'bg-accent-500/10', text: 'text-accent-500' },
  risk: { bg: 'bg-risk-500/10', text: 'text-risk-500' },
  secure: { bg: 'bg-secure-500/10', text: 'text-secure-500' },
  warn: { bg: 'bg-warn-500/10', text: 'text-warn-500' },
};

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Number.isInteger(target) ? Math.round(eased * target) : +(eased * target).toFixed(1));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-950">
      {/* Nav */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-secure-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900">PhishGuard</span>
              <span className="font-bold text-sm gradient-text ml-0.5">AI</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">How It Works</a>
            <a href="#features" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">Features</a>
            <a href="#roi" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">ROI</a>
            <a href="#pricing" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">Pricing</a>
            <Link to="/" className="flex items-center gap-1.5 bg-gradient-to-r from-accent-500 to-accent-400 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all">
              Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-accent-500 bg-accent-500/8 px-3 py-1.5 rounded-full border border-accent-500/15 font-medium mb-6 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" /> Powered by Generative AI · No Templates
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight animate-fade-in-up stagger-1">
          Your Employees Are<br />
          <span className="gradient-text">Your Biggest Vulnerability.</span>
        </h1>
        <p className="text-lg text-slate-500 mt-6 max-w-2xl mx-auto animate-fade-in-up stagger-2">
          <span className="text-slate-700 font-medium">91% of cyberattacks start with phishing.</span> PhishGuard AI replaces predictable training 
          with <span className="text-accent-500 font-medium">autonomous, AI-generated threat simulations</span> that adapt to every employee in real time.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in-up stagger-3">
          <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all text-sm">
            Start Free — No Card Required <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#how-it-works" className="flex items-center gap-2 text-sm font-semibold text-slate-600 px-6 py-3.5 rounded-xl border border-black/10 hover:border-black/20 transition-all">
            Watch Demo <Play className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Row */}
        <div className="flex items-center justify-center gap-8 mt-14 flex-wrap animate-fade-in-up stagger-4">
          {[
            { icon: Lock, text: 'SOC 2 Type II' },
            { icon: Globe, text: 'GDPR Compliant' },
            { icon: Shield, text: 'ISO 27001' },
            { icon: Award, text: 'Enterprise Ready' },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/60 px-3 py-1.5 rounded-lg border border-black/5">
              <b.icon className="w-3.5 h-3.5" /> {b.text}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <p className="text-3xl lg:text-4xl font-extrabold gradient-text">
                {s.prefix}<AnimatedCounter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-slate-500 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How PhishGuard AI Works</h2>
          <p className="text-sm text-slate-500 mt-2">A closed-loop system that gets smarter with every simulation.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex-1 glass rounded-2xl p-5 relative animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <span className="text-5xl font-extrabold text-accent-500/8 absolute top-3 right-4">{step.step}</span>
                <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-accent-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-accent-500/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Built for Security Teams</h2>
          <p className="text-sm text-slate-500 mt-2">Every feature designed for what CISOs actually need — not what vendors want to sell.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const c = colorMap[f.color];
            return (
              <div key={i} className="glass rounded-2xl p-6 hover:shadow-md hover:border-black/10 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${0.08 * i}s` }}>
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${c.text}`} />
                </div>
                <h3 className="text-base font-semibold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROI / CISO Section */}
      <section id="roi" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="glass rounded-2xl p-8 md:p-12 border border-accent-500/10 bg-gradient-to-r from-accent-500/5 to-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs text-accent-500 bg-accent-500/8 px-2.5 py-1 rounded-full border border-accent-500/15 font-semibold">FOR CISOs & SECURITY LEADERS</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-4 mb-3">Prove ROI to Your Board</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                PhishGuard AI doesn't just train — it generates board-ready metrics. Show measurable risk reduction, 
                cost avoidance, and compliance improvements with data your CFO will understand.
              </p>
              <div className="space-y-3">
                {[
                  { icon: DollarSign, text: 'Average $2.1M saved per prevented BEC incident', color: 'text-secure-500' },
                  { icon: TrendingDown, text: '67% average reduction in phishing click rates', color: 'text-accent-500' },
                  { icon: MousePointerClick, text: 'Click-to-report ratio improves by 4x in 90 days', color: 'text-warn-500' },
                  { icon: Shield, text: 'Satisfies SOC 2, NIST CSF, ISO 27001 training requirements', color: 'text-accent-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Cost of a Successful Phishing Attack</p>
                <p className="text-3xl font-extrabold text-risk-500">$4.76M</p>
                <p className="text-xs text-slate-400 mt-1">Average cost per data breach (IBM, 2025)</p>
              </div>
              <div className="glass rounded-xl p-5">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">PhishGuard AI Annual Investment</p>
                <p className="text-3xl font-extrabold text-secure-500">$5,988</p>
                <p className="text-xs text-slate-400 mt-1">Pro plan for 500 employees</p>
              </div>
              <div className="glass rounded-xl p-5 border border-accent-500/15">
                <p className="text-xs uppercase tracking-wider text-accent-500 mb-2">Return on Investment</p>
                <p className="text-3xl font-extrabold gradient-text">340% ROI</p>
                <p className="text-xs text-slate-400 mt-1">Based on average incident prevention rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trusted by Security Leaders</h2>
          <p className="text-sm text-slate-500 mt-2">Hear from CISOs who switched from template-based tools to PhishGuard AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => <span key={j} className="text-warn-400 text-sm">★</span>)}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500/20 to-secure-500/20 flex items-center justify-center text-xs font-bold text-accent-500">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive Edge */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">PhishGuard AI vs. Legacy Tools</h2>
          <p className="text-sm text-slate-500 mt-2">Why CISOs are replacing KnowBe4 and Proofpoint with PhishGuard AI.</p>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-slate-50/50">
                <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-slate-400 font-medium">Capability</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-slate-400 font-medium">Legacy Tools</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-accent-500 font-semibold">PhishGuard AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Email Generation', 'Pre-built templates (recognizable)', 'AI-generated unique emails'],
                ['Difficulty Adaptation', 'Static — same for everyone', 'Per-employee auto-tuning'],
                ['Training Approach', 'Punitive — "gotcha" style', 'Positive-reinforcement learning'],
                ['Reporting Integration', 'Manual CSV exports', 'Real-time dashboard + API'],
                ['Setup Time', '2-4 weeks', 'Under 1 hour'],
                ['Compliance', 'Basic audit trail', 'SOC 2, GDPR, ISO 27001 built-in'],
              ].map(([cap, legacy, pg], i) => (
                <tr key={i} className="border-b border-black/[.04]">
                  <td className="px-6 py-3.5 font-medium text-slate-700">{cap}</td>
                  <td className="px-6 py-3.5 text-slate-400 text-center">{legacy}</td>
                  <td className="px-6 py-3.5 text-accent-500 font-medium text-center">{pg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-sm text-slate-500 mt-2">Start free. Scale as your security program grows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricing.map((p, i) => (
            <div key={i} className={`rounded-2xl p-6 transition-all duration-300 animate-fade-in-up ${p.featured ? 'bg-gradient-to-b from-accent-500 to-accent-400 text-white shadow-xl shadow-accent-500/25 scale-105' : 'glass hover:shadow-md'}`} style={{ animationDelay: `${0.1 * i}s` }}>
              {p.featured && <span className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Most Popular</span>}
              <p className={`text-sm font-semibold ${p.featured ? 'text-white/90' : 'text-slate-500'} ${p.featured ? '' : 'mt-0'}`}>{p.tier}</p>
              <div className="flex items-end gap-1 mt-2 mb-1">
                <span className={`text-4xl font-extrabold ${p.featured ? 'text-white' : 'text-slate-900'}`}>{p.price}</span>
                {p.period && <span className={`text-sm mb-1 ${p.featured ? 'text-white/60' : 'text-slate-400'}`}>{p.period}</span>}
              </div>
              <p className={`text-xs mb-5 ${p.featured ? 'text-white/70' : 'text-slate-400'}`}>{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${p.featured ? 'text-white/90' : 'text-slate-600'}`}>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.featured ? 'text-white/70' : 'text-secure-500'}`} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/" className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${p.featured ? 'bg-white text-accent-500 hover:bg-white/90' : 'bg-accent-500/10 text-accent-500 hover:bg-accent-500/20'}`}>
                {p.cta} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl p-12 bg-gradient-to-r from-accent-500 to-accent-400 text-center text-white shadow-xl shadow-accent-500/20">
          <h2 className="text-3xl font-bold mb-3">Ready to Transform Your Security Training?</h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto mb-8">Join 200+ security teams using PhishGuard AI to measurably reduce human vulnerability. Start free — no credit card required.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/" className="flex items-center gap-2 bg-white text-accent-500 font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all hover:bg-white/90 text-sm">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="flex items-center gap-2 text-sm font-semibold text-white/90 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/50 transition-all">
              View Pricing <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-500 to-secure-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-500">PhishGuard AI</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
            <span>Contact</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 PhishGuard AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
