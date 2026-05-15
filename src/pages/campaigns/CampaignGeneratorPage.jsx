import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../contexts/ToastContext';
import { generatePhishingEmail, hasApiKey } from '../../services/ai';
import { Users, User } from 'lucide-react';
import { DEPARTMENTS, INDUSTRIES, TACTICS, getMockEmail } from '../../services/mock-data';
import {
  Cpu, Sparkles, Loader2, CheckCircle2, AlertTriangle, ShieldCheck, Send, Eye,
  FileText, ChevronDown, Lock, UserCheck, Scale, RefreshCw, Wand2, Sliders
} from 'lucide-react';

function Select({ label, options, value, onChange, icon: Icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-accent-500/60" />}{label}
      </label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500/40 transition-all cursor-pointer">
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

const HITL_ITEMS = [
  { label: 'No actual credentials are collected', icon: Lock },
  { label: 'Simulation links redirect to safe training page', icon: ShieldCheck },
  { label: 'Content reviewed by IT administrator', icon: UserCheck },
  { label: 'Compliant with company acceptable-use policy', icon: Scale },
];

export default function CampaignGeneratorPage() {
  const { selectedOrg, employees, campaigns, setCampaigns } = useApp();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [tactic, setTactic] = useState(TACTICS[0]);
  const [difficulty, setDifficulty] = useState(3);
  const [customCtx, setCustomCtx] = useState('');
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');
  const [approved, setApproved] = useState(false);
  const [hitl, setHitl] = useState([false, false, false, false]);
  const [deploying, setDeploying] = useState(false);
  const [targetMode, setTargetMode] = useState('level'); // 'level' | 'all' | 'custom'
  const [selectedEmps, setSelectedEmps] = useState(new Set());

  const staff = employees[selectedOrg.id] || [];
  // Filter employees matching the campaign difficulty level
  const levelMatched = staff.filter(e => (e.trainingLevel || 1) <= difficulty);
  const targetList = targetMode === 'all' ? staff : targetMode === 'level' ? levelMatched : staff.filter(e => selectedEmps.has(e.id));
  const targetCount = targetList.length;

  function toggleEmp(id) {
    setSelectedEmps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function selectAllLevel() { setSelectedEmps(new Set(levelMatched.map(e => e.id))); setTargetMode('custom'); }
  function clearSelection() { setSelectedEmps(new Set()); }

  async function handleGenerate() {
    setStatus('loading');
    setApproved(false);
    setHitl([false, false, false, false]);
    setError('');
    setEmail(null);
    setDeploying(false);

    if (!hasApiKey()) {
      // Use tactic-specific mock email with simulated delay
      await new Promise(r => setTimeout(r, 2200));
      setEmail(getMockEmail(tactic, selectedOrg.name));
      setStatus('done');
      return;
    }

    const result = await generatePhishingEmail({
      department: dept, industry, tactic, difficulty,
      companyName: selectedOrg.name, customContext: customCtx,
    });

    if (result.success) {
      setEmail(result.data);
      setStatus('done');
    } else {
      setError(result.message);
      setEmail(getMockEmail(tactic, selectedOrg.name));
      setStatus('done');
    }
  }

  function toggleHitl(idx) {
    setHitl(prev => { const c = [...prev]; c[idx] = !c[idx]; return c; });
  }
  const allChecked = hitl.every(Boolean);

  function handleDeploy() {
    if (targetCount === 0) { addToast('⚠️ No employees selected. Select at least one target.', 'error', 3000); return; }
    setDeploying(true);
    const campaignId = 'camp_' + Date.now();
    const tacticShort = tactic.split('(')[0].trim().split(' — ')[0].trim();
    const campaignName = email?.subject || `${tacticShort} — ${dept}`;
    const names = targetList.map(e => e.name);

    const newCampaign = {
      id: campaignId,
      name: campaignName.length > 50 ? campaignName.substring(0, 47) + '...' : campaignName,
      status: 'active', dept, tactic: tacticShort, difficulty,
      sent: targetCount, clicked: 0, reported: 0,
      date: new Date().toISOString().split('T')[0],
      emailData: email, targetEmployees: names,
    };

    setCampaigns(prev => ({ ...prev, [selectedOrg.id]: [...(prev[selectedOrg.id] || []), newCampaign] }));
    setApproved(true);

    setTimeout(() => {
      setCampaigns(prev => ({ ...prev, [selectedOrg.id]: (prev[selectedOrg.id] || []).map(c =>
        c.id === campaignId ? { ...c, clicked: Math.round(targetCount * 0.15), reported: Math.round(targetCount * 0.45) } : c
      )}));
    }, 3000);

    addToast(`✅ Campaign deployed to ${targetCount} employees (Level ≤${difficulty}). Tracking started.`, 'success', 5000);
    setTimeout(() => navigate('/campaigns'), 2000);
  }

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-6 h-6 text-accent-500" />AI Campaign Generator
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Configure targets and threat tactics — <span className="text-accent-500 font-medium">Generative AI</span> crafts a hyper-personalised phishing email.
          Every campaign must pass <span className="text-warn-500 font-medium">HITL safety checks</span> before deployment.
        </p>
        {!hasApiKey() && (
          <div className="mt-2 text-xs text-warn-500 bg-warn-500/8 px-3 py-1.5 rounded-lg border border-warn-500/15 inline-flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            No API key configured — using mock AI responses. Go to Settings → API & Integrations to add your OpenRouter API key for live AI generation.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Config */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-500" />Simulation Parameters
            </h2>
            <Select label="Target Department" options={DEPARTMENTS} value={dept} onChange={setDept} icon={FileText} />
            <Select label="Industry Vertical" options={INDUSTRIES} value={industry} onChange={setIndustry} icon={FileText} />
            <Select label="Threat Tactic" options={TACTICS} value={tactic} onChange={setTactic} icon={AlertTriangle} />

            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-accent-500/60" />Difficulty Level: {difficulty}/5
              </label>
              <input type="range" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(+e.target.value)}
                className="w-full accent-accent-500 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Easy (Obvious)</span><span>Hard (Subtle)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-accent-500/60" />Custom Context (Optional)
              </label>
              <textarea value={customCtx} onChange={(e) => setCustomCtx(e.target.value)}
                placeholder='e.g. "We use SAP for invoicing" or "CEO is John Miller"'
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent-500/30 transition-all resize-none h-20" />
            </div>

            {/* Target Mode + Employee Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-accent-500/60" />Target Employees
              </label>
              <div className="flex gap-1.5">
                {[{k:'level',l:`Level ≤${difficulty}`},{k:'all',l:'All'},{k:'custom',l:'Custom'}].map(m=>
                  <button key={m.k} onClick={()=>setTargetMode(m.k)} className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${targetMode===m.k?'bg-accent-500/10 text-accent-500 border-accent-500/20':'text-slate-400 border-black/5 hover:text-slate-600'}`}>{m.l}</button>
                )}
              </div>
              <div className="bg-accent-500/5 rounded-xl p-3 border border-accent-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Company</span>
                  <span className="text-xs font-semibold text-accent-500">{selectedOrg.name}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500">Targeting</span>
                  <span className="text-xs font-semibold text-slate-700">{targetCount} of {staff.length} employees</span>
                </div>
              </div>
              {/* Employee list */}
              <div className="max-h-40 overflow-y-auto rounded-xl border border-black/5 divide-y divide-black/[.04]">
                {staff.map(e=>{
                  const inTarget = targetMode==='all' || (targetMode==='level' && (e.trainingLevel||1)<=difficulty) || (targetMode==='custom' && selectedEmps.has(e.id));
                  return (
                    <label key={e.id} className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent-500/[.03] transition-colors ${inTarget?'':'opacity-40'}`}>
                      <input type="checkbox" checked={inTarget}
                        onChange={()=>{ if(targetMode!=='custom'){setTargetMode('custom');setSelectedEmps(new Set(targetList.map(x=>x.id)));} toggleEmp(e.id); }}
                        className="accent-accent-500 cursor-pointer" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-700 truncate">{e.name}</p>
                        <p className="text-[10px] text-slate-400">{e.dept} · Lvl {e.trainingLevel||1}</p>
                      </div>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${(e.trainingLevel||1)<=difficulty?'bg-secure-500/10 text-secure-500':'bg-slate-100 text-slate-400'}`}>
                        {(e.trainingLevel||1)<=difficulty?'Match':'Above'}
                      </span>
                    </label>
                  );
                })}
              </div>
              {targetMode==='custom' && <div className="flex gap-2">
                <button onClick={selectAllLevel} className="text-[10px] text-accent-500 hover:underline cursor-pointer">Select Level ≤{difficulty}</button>
                <button onClick={clearSelection} className="text-[10px] text-slate-400 hover:underline cursor-pointer">Clear</button>
              </div>}
            </div>

            <button onClick={handleGenerate} disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-400 hover:to-accent-300 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-accent-500/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer animate-pulse-glow">
              {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" />Generating with AI…</> : <><Sparkles className="w-4 h-4" />Generate AI Campaign</>}
            </button>
          </div>

          {/* HITL */}
          {status === 'done' && (
            <div className="glass rounded-2xl p-5 space-y-4 animate-slide-down border border-warn-500/20">
              <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-warn-500" />Human-In-The-Loop Safety
              </h2>
              <p className="text-[11px] text-slate-400 -mt-2">
                <span className="text-warn-500 font-medium">Safety First:</span> No AI simulation is ever sent without explicit human approval.
              </p>
              <div className="space-y-2">
                {HITL_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <label key={idx} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${hitl[idx] ? 'bg-secure-500/8 border border-secure-500/20' : 'bg-slate-50 border border-black/5 hover:border-black/10'}`}>
                      <input type="checkbox" checked={hitl[idx]} onChange={() => toggleHitl(idx)} className="sr-only" />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${hitl[idx] ? 'bg-secure-500 border-secure-500' : 'border-slate-300'}`}>
                        {hitl[idx] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <Icon className={`w-4 h-4 shrink-0 ${hitl[idx] ? 'text-secure-500' : 'text-slate-400'}`} />
                      <span className={`text-sm ${hitl[idx] ? 'text-slate-700' : 'text-slate-500'}`}>{item.label}</span>
                    </label>
                  );
                })}
              </div>
              <button disabled={!allChecked || approved || deploying} onClick={handleDeploy}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${approved ? 'bg-secure-500/10 text-secure-500 border border-secure-500/20' : deploying ? 'bg-accent-500/10 text-accent-500' : allChecked ? 'bg-gradient-to-r from-secure-500 to-secure-400 text-white shadow-lg shadow-secure-500/25' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                {approved ? <><CheckCircle2 className="w-4 h-4" />Deployed — Redirecting to Campaigns…</> : deploying ? <><Loader2 className="w-4 h-4 animate-spin" />Deploying…</> : <><Send className="w-4 h-4" />Approve & Deploy Campaign</>}
              </button>
            </div>
          )}
        </div>

        {/* Right: Email Preview */}
        <div className="lg:col-span-3">
          {status === 'idle' && (
            <div className="glass rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center space-y-4 min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-accent-500/8 flex items-center justify-center ring-1 ring-accent-500/15">
                <Sparkles className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">No Campaign Generated Yet</h3>
              <p className="text-sm text-slate-400 max-w-sm">Select parameters and click <span className="text-accent-500 font-medium">"Generate AI Campaign"</span> to see the AI craft a realistic phishing simulation.</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="glass rounded-2xl h-full flex flex-col items-center justify-center p-12 text-center space-y-5 min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-accent-500/8 flex items-center justify-center animate-pulse-glow">
                <Loader2 className="w-8 h-8 text-accent-500 animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800">Generating AI Phishing Simulation…</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Analysing <span className="text-accent-500">{dept}</span> patterns in <span className="text-accent-500">{industry}</span> with <span className="text-accent-500">{tactic}</span> intelligence.
                </p>
              </div>
              <div className="flex gap-3 mt-4 flex-wrap justify-center">
                {['Analysing context…', 'Crafting pretext…', 'Applying triggers…'].map((t, i) => (
                  <span key={i} className="shimmer text-[10px] text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full border border-black/5">{t}</span>
                ))}
              </div>
            </div>
          )}

          {status === 'done' && email && (
            <div className="space-y-4 animate-scale-in">
              {error && (
                <div className="text-xs text-warn-500 bg-warn-500/8 px-3 py-2 rounded-lg border border-warn-500/15 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />{error} — Showing mock email instead.
                </div>
              )}
              {/* Email Preview */}
              <div className="glass rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-black/5 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-accent-500" />
                    <h3 className="text-sm font-semibold text-slate-800">AI-Generated Email Preview</h3>
                  </div>
                  <button onClick={handleGenerate}
                    className="flex items-center gap-1.5 text-xs text-accent-500 hover:text-accent-400 cursor-pointer transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" />Regenerate
                  </button>
                </div>
                <div className="p-5 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 w-14 shrink-0">From</span>
                      <span className="text-sm text-slate-600">{email.sender_name} &lt;{email.sender_email}&gt;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 w-14 shrink-0">Subject</span>
                      <span className="text-sm text-slate-800 font-semibold">{email.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 w-14 shrink-0">To</span>
                      <span className="text-sm text-slate-500">{targetCount} employees (Level ≤{difficulty}) · {selectedOrg.name}</span>
                    </div>
                  </div>
                  <hr className="border-black/5" />
                  <pre className="text-sm text-slate-600 font-sans whitespace-pre-wrap leading-relaxed">{email.body}</pre>
                </div>
              </div>

              {/* Technique Annotations */}
              {email.techniques_used && (
                <div className="glass rounded-2xl p-5 border border-accent-500/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-500 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />AI Technique Annotations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {email.techniques_used.map((t) => (
                      <div key={t.tag} className="bg-slate-50 rounded-xl p-3 border border-black/5">
                        <span className="text-xs font-semibold text-risk-500">{t.tag}</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">{t.description}</p>
                        {t.email_excerpt && <p className="text-[10px] text-warn-500 font-mono mt-1 bg-warn-500/5 px-2 py-1 rounded">"{t.email_excerpt}"</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
