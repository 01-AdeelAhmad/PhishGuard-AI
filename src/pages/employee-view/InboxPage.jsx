import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { getMockEmail, MOCK_AI_EMAIL } from '../../services/mock-data';
import { useToast } from '../../contexts/ToastContext';
import {
  Inbox, Star, StarOff, Paperclip, Clock, AlertTriangle, ShieldCheck, BookOpen,
  ArrowLeft, ChevronRight, Circle, CheckCircle2, ExternalLink, Lightbulb, Target,
  Brain, GraduationCap, RefreshCw, Eye, Flag, FileText, ArrowRight
} from 'lucide-react';

const colorMap = {
  risk: { border: 'border-risk-500/15', iconBg: 'bg-risk-500/10', iconText: 'text-risk-500', tag: 'text-risk-500 bg-risk-500/8' },
  warn: { border: 'border-warn-500/15', iconBg: 'bg-warn-500/10', iconText: 'text-warn-500', tag: 'text-warn-500 bg-warn-500/8' },
  accent: { border: 'border-accent-500/15', iconBg: 'bg-accent-500/10', iconText: 'text-accent-500', tag: 'text-accent-500 bg-accent-500/8' },
};

const FLAG_ICONS = { 'False Urgency': Clock, 'Authority Impersonation': Target, 'Contextual Pretexting': Brain, 'Procedural Mimicry': Eye, 'Invoice Fraud': FileText, 'Credential Harvesting': Flag, 'CEO Fraud / Whaling': Target, 'Fear & Urgency': AlertTriangle, 'QR Code Phishing': ExternalLink, 'Spear Targeting': Target, 'Isolation Tactic': ShieldCheck, 'Brand Impersonation': Eye, 'Confidentiality Trap': ShieldCheck };

// Map tactic to training module IDs for "Practice This Scenario"
const TACTIC_TO_TRAINING = {
  bec: { id: 't1', label: 'Recognizing BEC Attacks' },
  clone: { id: 't3', label: 'Safe Browsing Habits' },
  spear: { id: 't2', label: 'Understanding Social Engineering' },
  invoice: { id: 't6', label: 'Invoice & Payment Fraud' },
  credential: { id: 't3', label: 'Safe Browsing Habits' },
  quishing: { id: 't3', label: 'Safe Browsing Habits' },
  ceo: { id: 't1', label: 'Recognizing BEC Attacks' },
};

// Generate inbox per company — mix of phishing + legitimate
function buildInbox(companyName) {
  const domain = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const phishBEC = getMockEmail('BEC', companyName);
  const phishInvoice = getMockEmail('Invoice', companyName);
  const phishCred = getMockEmail('Credential', companyName);

  return [
    { id: 'phish_bec', from: phishBEC.sender_name, fromEmail: phishBEC.sender_email, subject: phishBEC.subject, snippet: phishBEC.body.substring(0, 80) + '...', time: '10:23 AM', unread: true, starred: false, hasAttachment: true, isPhishing: true, tacticKey: 'bec', emailData: phishBEC },
    { id: 'legit1', from: 'Jira Notifications', fromEmail: `noreply@${domain}-jira.atlassian.net`, subject: 'ENGR-4421: Sprint 14 planning — your review requested', snippet: 'You have been assigned as a reviewer on ENGR-4421...', time: '9:47 AM', unread: true, starred: false, hasAttachment: false, isPhishing: false },
    { id: 'phish_cred', from: phishCred.sender_name, fromEmail: phishCred.sender_email, subject: phishCred.subject, snippet: phishCred.body.substring(0, 80) + '...', time: '8:15 AM', unread: true, starred: false, hasAttachment: false, isPhishing: true, tacticKey: 'credential', emailData: phishCred },
    { id: 'legit2', from: 'HR Benefits Team', fromEmail: `benefits@${domain}.com`, subject: 'Reminder: Open Enrollment ends March 31', snippet: 'This is a friendly reminder that the open enrollment window...', time: 'Yesterday', unread: false, starred: true, hasAttachment: false, isPhishing: false },
    { id: 'phish_inv', from: phishInvoice.sender_name, fromEmail: phishInvoice.sender_email, subject: phishInvoice.subject, snippet: phishInvoice.body.substring(0, 80) + '...', time: 'Yesterday', unread: false, starred: false, hasAttachment: true, isPhishing: true, tacticKey: 'invoice', emailData: phishInvoice },
    { id: 'legit3', from: 'Slack', fromEmail: 'notification@slack.com', subject: `New messages in #product-launch`, snippet: 'Priya Sharma mentioned you in #product-launch...', time: '2 days ago', unread: false, starred: false, hasAttachment: false, isPhishing: false },
  ];
}

export default function InboxPage() {
  const { selectedOrg } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState('inbox');
  const [selectedMail, setSelectedMail] = useState(null);
  const [reported, setReported] = useState(false);
  const { addToast } = useToast();

  const mails = buildInbox(selectedOrg.name);

  function openMail(mail) { setSelectedMail(mail); setView('email'); setReported(false); }
  function handleLinkClick(e) { e.preventDefault(); setView('teachable'); }

  function goToTraining(tacticKey) {
    const mapping = TACTIC_TO_TRAINING[tacticKey] || TACTIC_TO_TRAINING.bec;
    navigate('/training', { state: { startQuiz: mapping.id } });
  }

  /* TEACHABLE MOMENT */
  if (view === 'teachable' && selectedMail?.emailData) {
    const techniques = selectedMail.emailData.techniques_used || [];
    const tacticKey = selectedMail.tacticKey || 'bec';
    const trainingModule = TACTIC_TO_TRAINING[tacticKey] || TACTIC_TO_TRAINING.bec;

    return (
      <section className="space-y-6 animate-scale-in">
        <div className="glass rounded-2xl p-6 border border-secure-500/20 bg-gradient-to-r from-secure-500/5 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secure-500/10 flex items-center justify-center ring-1 ring-secure-500/20 shrink-0">
              <GraduationCap className="w-7 h-7 text-secure-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warn-500" /> Teachable Moment — You're Getting Smarter!
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                You just interacted with a <span className="text-accent-500 font-medium">PhishGuard AI simulation</span>. This is <span className="text-secure-500 font-medium">not a punishment</span> — it's a learning opportunity.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warn-500" /> Red Flags Identified — Why This Email Was Suspicious
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {techniques.map((flag, i) => {
              const Icon = FLAG_ICONS[flag.tag] || AlertTriangle;
              const colors = ['risk', 'warn', 'accent', 'risk'];
              const c = colorMap[colors[i % 4]];
              return (
                <div key={flag.tag} className={`glass rounded-2xl p-5 border ${c.border} hover:shadow-md transition-all animate-fade-in-up`} style={{ animationDelay: `${0.1 * i}s` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0`}><Icon className={`w-5 h-5 ${c.iconText}`} /></div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-slate-800">Red Flag {i + 1}: {flag.tag}</h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{flag.description}</p>
                      <div className="bg-slate-50 rounded-lg px-3 py-2 border border-black/5 mt-2">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400">Exact quote:</span>
                        <p className="text-xs text-warn-500 font-mono mt-0.5">"{flag.email_excerpt}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-secure-500/15">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-secure-500" />What Should You Do Next Time?</h3>
          <ul className="space-y-2 text-sm text-slate-500">
            {['Verify urgent requests through a separate channel (phone, in-person)', "Hover over links to check the real URL before clicking", 'Be suspicious of urgency — legitimate processes rarely require immediate action', 'When in doubt, use the Report Phishing button or forward to IT security'].map((t, i) => (
              <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-secure-500 mt-0.5 shrink-0" /><span>{t}</span></li>
            ))}
          </ul>
        </div>

        {/* Practice This Scenario */}
        <div className="glass rounded-2xl p-5 border border-accent-500/15 bg-accent-500/[.02]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Practice This Scenario</h3>
                <p className="text-xs text-slate-400">Take the <span className="text-accent-500 font-medium">{trainingModule.label}</span> quiz to strengthen your skills.</p>
              </div>
            </div>
            <button onClick={() => goToTraining(tacticKey)}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-400 px-5 py-2.5 rounded-xl shadow-lg shadow-accent-500/25 cursor-pointer hover:from-accent-400 hover:to-accent-300 transition-all">
              Go to Training <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button onClick={() => { setView('inbox'); setSelectedMail(null); }} className="flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400 transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </button>
      </section>
    );
  }

  /* EMAIL VIEW */
  if (view === 'email' && selectedMail) {
    const emailContent = selectedMail.isPhishing ? selectedMail.emailData : null;

    return (
      <section className="space-y-6 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2"><Inbox className="w-6 h-6 text-accent-500" /> Employee Inbox</h1>
          <p className="text-sm text-slate-500 mt-1">Simulated inbox where PhishGuard simulations blend seamlessly with real emails.</p>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-3 border-b border-black/5 flex items-center justify-between">
            <button onClick={() => { setView('inbox'); setSelectedMail(null); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={() => {
              setReported(true);
              if (selectedMail?.isPhishing) {
                addToast('🛡️ Great job! You correctly identified a phishing simulation. Your risk score has improved.', 'success', 5000);
              } else {
                addToast('This email appears to be legitimate. Our team will review your report.', 'info', 4000);
              }
            }} disabled={reported}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                reported
                  ? 'bg-secure-500/10 text-secure-500 border-secure-500/20'
                  : 'bg-risk-500/10 text-risk-500 border-risk-500/20 hover:bg-risk-500/20'
              }`}>
              {reported ? <><CheckCircle2 className="w-3.5 h-3.5" /> Reported</> : <><Flag className="w-3.5 h-3.5" /> Report Phishing</>}
            </button>
          </div>
          <div className="px-6 py-5 border-b border-black/5 space-y-3">
            <h2 className="text-lg font-semibold text-slate-800">{selectedMail.subject}</h2>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ring-1 ${selectedMail.isPhishing ? 'bg-risk-500/10 text-risk-500 ring-risk-500/15' : 'bg-accent-500/8 text-accent-500 ring-accent-500/15'}`}>
                {selectedMail.from.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-slate-800 font-medium">{selectedMail.from}</p>
                <p className="text-xs text-slate-400">&lt;{selectedMail.fromEmail}&gt;</p>
              </div>
              <span className="ml-auto text-xs text-slate-400">{selectedMail.time}</span>
            </div>
          </div>
          <div className="px-6 py-6">
            {selectedMail.isPhishing && emailContent ? (
              <div className="space-y-6">
                <pre className="text-sm text-slate-600 font-sans whitespace-pre-wrap leading-relaxed">{emailContent.body}</pre>
                {/* Fake attachments / links that trigger teachable moment */}
                <div className="bg-slate-50 rounded-xl p-4 border border-black/5">
                  <div className="flex items-center gap-2 mb-2"><Paperclip className="w-4 h-4 text-slate-400" /><span className="text-xs text-slate-500">Attachments / Links</span></div>
                  <div className="flex gap-3 flex-wrap">
                    {selectedMail.tacticKey === 'bec' && ['W-9_AlphaBridge_2026.pdf', 'Banking_Verification_Letter.pdf'].map(f => (
                      <a key={f} href="#" onClick={handleLinkClick} className="flex items-center gap-2 bg-white hover:bg-accent-500/5 px-4 py-2.5 rounded-lg border border-black/8 hover:border-accent-500/20 transition-all text-sm text-accent-500 cursor-pointer shadow-sm">
                        <ExternalLink className="w-4 h-4 text-slate-400" />{f}
                      </a>
                    ))}
                    {selectedMail.tacticKey === 'credential' && (
                      <a href="#" onClick={handleLinkClick} className="flex items-center gap-2 bg-white hover:bg-risk-500/5 px-4 py-2.5 rounded-lg border border-black/8 hover:border-risk-500/20 transition-all text-sm text-risk-500 cursor-pointer shadow-sm">
                        <ExternalLink className="w-4 h-4" /> Update Password Now →
                      </a>
                    )}
                    {selectedMail.tacticKey === 'invoice' && (
                      <a href="#" onClick={handleLinkClick} className="flex items-center gap-2 bg-white hover:bg-warn-500/5 px-4 py-2.5 rounded-lg border border-black/8 hover:border-warn-500/20 transition-all text-sm text-warn-500 cursor-pointer shadow-sm">
                        <ExternalLink className="w-4 h-4" /> Pay Invoice Online →
                      </a>
                    )}
                    {!['bec', 'credential', 'invoice'].includes(selectedMail.tacticKey) && (
                      <a href="#" onClick={handleLinkClick} className="flex items-center gap-2 bg-white hover:bg-accent-500/5 px-4 py-2.5 rounded-lg border border-black/8 hover:border-accent-500/20 transition-all text-sm text-accent-500 cursor-pointer shadow-sm">
                        <ExternalLink className="w-4 h-4 text-slate-400" /> Open Link →
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-warn-500" /> Click an attachment or link to see what happens in a safe environment</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 italic">This is a legitimate email. No simulation content.</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* INBOX VIEW */
  return (
    <section className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2"><Inbox className="w-6 h-6 text-accent-500" /> Employee Inbox</h1>
        <p className="text-sm text-slate-500 mt-1">
          PhishGuard simulations arrive alongside real emails — indistinguishable from normal communication.
          <span className="text-warn-500 font-medium"> Click any email to open it. Can you spot the phishing attempts?</span>
        </p>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-black/5 flex items-center justify-between">
          <span className="text-xs text-slate-400">{mails.length} messages · {mails.filter(m => m.isPhishing).length} simulations hidden</span>
          <span className="text-[10px] text-accent-500 font-medium bg-accent-500/8 px-2 py-0.5 rounded-full">{selectedOrg.name}</span>
        </div>
        <div className="divide-y divide-black/[.04]">
          {mails.map((mail, i) => (
            <div key={mail.id} onClick={() => openMail(mail)}
              className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-all duration-200 group animate-fade-in-up ${mail.unread ? 'bg-accent-500/[.03]' : ''} hover:bg-accent-500/5`}
              style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="w-2 shrink-0">{mail.unread && <Circle className="w-2 h-2 fill-accent-500 text-accent-500" />}</div>
              <button className="shrink-0 text-slate-300 hover:text-warn-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                {mail.starred ? <Star className="w-4 h-4 fill-warn-500 text-warn-500" /> : <StarOff className="w-4 h-4" />}
              </button>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ring-1 shrink-0 ${mail.isPhishing ? 'bg-risk-500/10 text-risk-500 ring-risk-500/15' : 'bg-accent-500/8 text-accent-500 ring-accent-500/15'}`}>
                {mail.from.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm truncate ${mail.unread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>{mail.from}</span>
                  {mail.hasAttachment && <Paperclip className="w-3 h-3 text-slate-300 shrink-0" />}
                </div>
                <p className={`text-sm truncate ${mail.unread ? 'text-slate-600' : 'text-slate-400'}`}>{mail.subject}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{mail.snippet}</p>
              </div>
              <span className={`text-xs shrink-0 ${mail.unread ? 'text-accent-500 font-medium' : 'text-slate-400'}`}>{mail.time}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
