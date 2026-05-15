import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TRAINING_MODULES } from '../../services/mock-data';
import { useApp } from '../../contexts/AppContext';
import { BookOpen, Clock, CheckCircle2, Play, Award, ArrowRight, X, Sparkles, Lock, Star, TrendingUp, AlertTriangle } from 'lucide-react';

const QUIZ_DATA = {
  t1: {
    title: 'Recognizing BEC Attacks',
    level: 1,
    questions: [
      { q: 'A CFO emails you urgently requesting a wire transfer to a new vendor. What should you do first?', options: ['Process the transfer immediately — the CFO is your boss', 'Forward to IT security and verify via a separate channel (phone/in-person)', 'Reply asking for more details via email', 'Ignore the email entirely'], answer: 1, explanation: 'Always verify urgent financial requests through a separate communication channel. Attackers often impersonate executives to bypass normal approval workflows.' },
      { q: 'Which of these is a common red flag in BEC attacks?', options: ['Email comes from a known colleague', 'Slight misspelling in the sender\'s domain (e.g., @greenfeild.com)', 'Email was sent during business hours', 'The email has a professional signature'], answer: 1, explanation: 'Attackers often register domains with subtle misspellings (typosquatting) to impersonate legitimate senders.' },
      { q: 'An email asks you to update banking details for a regular vendor. The email looks legitimate. What\'s the safest response?', options: ['Update the details since the email looks real', 'Call the vendor using the phone number on their official website to confirm', 'Ask a colleague if they received the same email', 'Check if the email has any typos'], answer: 1, explanation: 'The safest approach is to verify directly with the vendor using contact information you already have on file, not contact info from the email itself.' },
    ],
  },
  t2: {
    title: 'Understanding Social Engineering',
    level: 2,
    questions: [
      { q: 'What psychological principle does an attacker use when they say "Only 2 spots left — act now!"?', options: ['Authority bias', 'Reciprocity', 'Scarcity & urgency', 'Social proof'], answer: 2, explanation: 'Scarcity and urgency pressure victims into making quick decisions without thinking critically.' },
      { q: 'A stranger holds the door open and follows you into a secure building. This is an example of:', options: ['Phishing', 'Tailgating / Piggybacking', 'Vishing', 'Pretexting'], answer: 1, explanation: 'Tailgating is when an unauthorized person follows an authorized person through a secure entrance.' },
      { q: 'Which technique involves creating a fabricated scenario to steal information?', options: ['Baiting', 'Pretexting', 'Watering hole', 'Pharming'], answer: 1, explanation: 'Pretexting involves inventing a false scenario (pretext) to engage a victim and extract information or gain access.' },
    ],
  },
  t3: {
    title: 'Safe Browsing Habits',
    level: 3,
    questions: [
      { q: 'You receive a link: http://google.com.security-update.xyz. Is this legitimate?', options: ['Yes — it contains google.com', 'No — the actual domain is security-update.xyz', 'Need more context to tell', 'Yes — it mentions security update'], answer: 1, explanation: 'The actual domain is always the last part before the TLD. Here, the real domain is security-update.xyz, not google.com.' },
      { q: 'What does the padlock icon in your browser\'s address bar mean?', options: ['The website is 100% safe and trustworthy', 'The connection is encrypted (HTTPS)', 'The website has been verified by the government', 'Your antivirus is protecting you'], answer: 1, explanation: 'The padlock only means the connection is encrypted. Malicious websites can also have HTTPS certificates.' },
      { q: 'Which is the safest way to visit your bank\'s website?', options: ['Click a link from a promotional email', 'Search on Google and click the first result', 'Type the URL directly into the address bar', 'Use a bookmark from an email someone sent you'], answer: 2, explanation: 'Typing the URL directly ensures you\'re visiting the correct site. Search results can be manipulated, and email links can be spoofed.' },
    ],
  },
  t4: {
    title: 'Reporting Suspicious Emails',
    level: 4,
    questions: [
      { q: 'You suspect an email is a phishing attempt. What\'s the FIRST thing you should do?', options: ['Delete it immediately', 'Forward it to IT security / use the report button', 'Reply to the sender asking if it\'s real', 'Click the link to check if it\'s fake'], answer: 1, explanation: 'Always report suspicious emails to your IT security team. This helps protect other employees and improves the organization\'s threat intelligence.' },
      { q: 'Why is it important to report phishing even if you didn\'t click anything?', options: ['It\'s not important if you didn\'t click', 'It helps security teams block the attack for everyone', 'To get a reward', 'To test the IT team'], answer: 1, explanation: 'Reporting helps security teams identify attacks, block malicious senders, and protect other employees who might receive the same email.' },
      { q: 'After reporting a suspicious email, what should you NOT do?', options: ['Wait for IT to investigate', 'Delete the email from your inbox after reporting', 'Forward the email to all your colleagues as a warning', 'Check if similar emails are in your spam folder'], answer: 2, explanation: 'Never forward suspicious emails to colleagues — this spreads the threat. Let IT security handle communication about known threats.' },
    ],
  },
  t5: {
    title: 'Protecting Sensitive Data',
    level: 5,
    questions: [
      { q: 'Which of the following is considered PII (Personally Identifiable Information)?', options: ['Company stock price', 'Social Security Number', 'Product roadmap', 'Office address'], answer: 1, explanation: 'PII includes data that can identify an individual: SSN, date of birth, financial account numbers, biometrics, etc.' },
      { q: 'A colleague asks you to email them a spreadsheet of customer Social Security numbers. What should you do?', options: ['Send it — they\'re a trusted colleague', 'Use encrypted file sharing and verify the request', 'Post it in the team Slack channel', 'Print it and hand it to them'], answer: 1, explanation: 'Sensitive data should always be shared through encrypted, approved channels with proper authorization verified.' },
      { q: 'You\'re working at a coffee shop. Which action puts data at risk?', options: ['Using a VPN', 'Locking your screen when stepping away', 'Accessing company files on public WiFi without VPN', 'Using noise-canceling headphones'], answer: 2, explanation: 'Public WiFi can be monitored by attackers. Always use a VPN when accessing company resources on public networks.' },
    ],
  },
  t6: {
    title: 'Invoice & Payment Fraud',
    level: 6,
    questions: [
      { q: 'A vendor emails saying their bank details have changed. The invoice looks normal. What\'s the risk?', options: ['No risk — vendors change banks all the time', 'It could be an invoice fraud attack redirecting payments', 'The vendor is just testing you', 'Banks don\'t change, so it\'s clearly fake'], answer: 1, explanation: 'Invoice fraud is one of the most costly BEC attacks. Attackers intercept vendor relationships and redirect payments to their accounts.' },
      { q: 'What\'s the best way to verify a vendor\'s changed banking information?', options: ['Reply to the email asking for confirmation', 'Call the vendor using the phone number from your existing records', 'Ask your manager to approve it', 'Check if the email has a valid signature'], answer: 1, explanation: 'Always verify through an independent channel — use contact information you already have, never the contact info provided in the suspicious email.' },
      { q: 'An invoice arrives for $47,500 from a vendor you recognize, but the amount seems higher than usual. You should:', options: ['Pay it — the vendor name matches', 'Flag it for review and verify with procurement', 'Pay half now and investigate later', 'Forward it to a colleague to handle'], answer: 1, explanation: 'Unusual amounts, even from known vendors, should be flagged and verified through your procurement/finance team\'s standard approval process.' },
    ],
  },
};

const LEVEL_NAMES = ['', 'Beginner', 'Foundation', 'Intermediate', 'Advanced', 'Expert', 'Master'];
const LEVEL_COLORS = ['', 'secure', 'secure', 'warn', 'warn', 'risk', 'risk'];
const LEVEL_STARS = [0, 1, 2, 3, 4, 5, 6];

function LevelBadge({ level }) {
  const colorMap = {
    secure: 'text-secure-500 bg-secure-500/10 border-secure-500/20',
    warn: 'text-warn-500 bg-warn-500/10 border-warn-500/20',
    risk: 'text-risk-500 bg-risk-500/10 border-risk-500/20',
  };
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorMap[LEVEL_COLORS[level]]}`}>
        Level {level} — {LEVEL_NAMES[level]}
      </span>
      <div className="flex gap-0.5">
        {Array.from({ length: 6 }, (_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < level ? 'text-accent-500 fill-accent-500' : 'text-slate-200'}`} />
        ))}
      </div>
    </div>
  );
}

export default function TrainingPage() {
  const { selectedOrg, employees, setEmployees } = useApp();
  const location = useLocation();
  // Get the first employee of this org as the "logged-in" employee
  const staff = employees[selectedOrg.id] || [];
  const currentEmployee = staff[0] || { trainingLevel: 1, name: 'Employee' };
  const empTrainingLevel = currentEmployee.trainingLevel || 1;

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`pg-training-${selectedOrg.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem(`pg-scores-${selectedOrg.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  // Reset state when org changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`pg-training-${selectedOrg.id}`);
      setCompletedIds(saved ? JSON.parse(saved) : []);
      const sc = localStorage.getItem(`pg-scores-${selectedOrg.id}`);
      setScores(sc ? JSON.parse(sc) : {});
    } catch { setCompletedIds([]); setScores({}); }
    setActiveQuiz(null);
  }, [selectedOrg.id]);

  useEffect(() => {
    localStorage.setItem(`pg-training-${selectedOrg.id}`, JSON.stringify(completedIds));
  }, [completedIds, selectedOrg.id]);
  useEffect(() => {
    localStorage.setItem(`pg-scores-${selectedOrg.id}`, JSON.stringify(scores));
  }, [scores, selectedOrg.id]);

  const modules = TRAINING_MODULES.map(m => ({
    ...m,
    completed: completedIds.includes(m.id),
    bestScore: scores[m.id] || null,
    level: QUIZ_DATA[m.id]?.level || 1,
  }));

  const completed = modules.filter(m => m.completed).length;
  const totalXP = Object.values(scores).reduce((sum, s) => sum + (s?.correct || 0), 0);

  // STRICT: quiz is only accessible if quiz level <= employee's training level
  function isUnlocked(mod) {
    const modLevel = QUIZ_DATA[mod.id]?.level || 1;
    return modLevel <= empTrainingLevel;
  }

  function startQuiz(modId) {
    setActiveQuiz(modId);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizDone(false);
  }

  // Auto-start quiz if navigated from Inbox with startQuiz state
  useEffect(() => {
    const quizId = location.state?.startQuiz;
    if (quizId && QUIZ_DATA[quizId]) {
      const quizLevel = QUIZ_DATA[quizId]?.level || 1;
      if (quizLevel <= empTrainingLevel) {
        startQuiz(quizId);
      }
      // Clear the state so it doesn't re-trigger
      window.history.replaceState({}, '');
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  function submitAnswer() {
    const quiz = QUIZ_DATA[activeQuiz];
    if (!quiz) return;
    const isCorrect = selected === quiz.questions[currentQ].answer;
    if (isCorrect) setScore(s => s + 1);
    setShowResult(true);
  }

  function nextQuestion() {
    const quiz = QUIZ_DATA[activeQuiz];
    if (currentQ + 1 >= quiz.questions.length) {
      setQuizDone(true);
      const total = quiz.questions.length;
      const finalScore = score + (selected === quiz.questions[currentQ].answer ? 0 : 0); // already counted
      const pct = Math.round((score / total) * 100);
      if (pct >= 67) {
        setCompletedIds(prev => prev.includes(activeQuiz) ? prev : [...prev, activeQuiz]);
        // Level up employee if they passed a quiz at their current max level
        if (quiz.level >= empTrainingLevel && quiz.level < 6) {
          setEmployees(prev => ({
            ...prev,
            [selectedOrg.id]: (prev[selectedOrg.id] || []).map((e, i) =>
              i === 0 ? { ...e, trainingLevel: Math.max(e.trainingLevel || 1, quiz.level + 1), level: `Level ${quiz.level + 1} — ${LEVEL_NAMES[quiz.level + 1]}` } : e
            ),
          }));
        }
      }
      setScores(prev => {
        const existing = prev[activeQuiz];
        if (!existing || score > existing.correct) {
          return { ...prev, [activeQuiz]: { correct: score, total, pct } };
        }
        return prev;
      });
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  }

  function closeQuiz() {
    setActiveQuiz(null);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizDone(false);
  }

  // Quiz View
  if (activeQuiz && QUIZ_DATA[activeQuiz]) {
    const quiz = QUIZ_DATA[activeQuiz];
    const q = quiz.questions[currentQ];
    const total = quiz.questions.length;

    if (quizDone) {
      const pct = Math.round((score / total) * 100);
      const passed = pct >= 67;
      // Check if next level unlocked
      const nextMod = modules.find(m => (QUIZ_DATA[m.id]?.level || 1) === quiz.level + 1);
      return (
        <section className="max-w-2xl mx-auto space-y-6 animate-scale-in">
          <div className={`glass rounded-2xl p-8 text-center border ${passed ? 'border-secure-500/20' : 'border-warn-500/20'}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? 'bg-secure-500/10' : 'bg-warn-500/10'}`}>
              <span className="text-4xl">{passed ? '🎉' : '📚'}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{passed ? 'Level Complete!' : 'Keep Learning!'}</h2>
            <p className="text-sm text-slate-500 mt-2">{quiz.title} — Level {quiz.level}</p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="text-center">
                <p className={`text-3xl font-extrabold ${passed ? 'text-secure-500' : 'text-warn-500'}`}>{score}/{total}</p>
                <p className="text-xs text-slate-400 mt-1">Correct Answers</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-extrabold ${passed ? 'text-secure-500' : 'text-warn-500'}`}>{pct}%</p>
                <p className="text-xs text-slate-400 mt-1">Score</p>
              </div>
              {passed && (
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-accent-500">+{score * 10}</p>
                  <p className="text-xs text-slate-400 mt-1">XP Earned</p>
                </div>
              )}
            </div>
            {passed && nextMod && (
              <div className="mt-4 p-3 bg-accent-500/5 rounded-xl border border-accent-500/10">
                <p className="text-sm text-accent-500 font-medium flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Next level unlocked: {nextMod.title}
                </p>
              </div>
            )}
            <p className="text-sm text-slate-500 mt-4">{passed ? 'Module marked as complete! Your score has been saved.' : 'You need 67% or higher to pass. Review the material and try again.'}</p>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={closeQuiz} className="flex items-center gap-2 text-sm font-medium text-slate-500 px-5 py-2.5 rounded-xl border border-black/10 hover:bg-black/5 transition-all cursor-pointer">
                Back to Training
              </button>
              {!passed && (
                <button onClick={() => startQuiz(activeQuiz)} className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-400 px-5 py-2.5 rounded-xl shadow-lg shadow-accent-500/25 cursor-pointer">
                  Retry Quiz
                </button>
              )}
              {passed && nextMod && (
                <button onClick={() => startQuiz(nextMod.id)} className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-400 px-5 py-2.5 rounded-xl shadow-lg shadow-accent-500/25 cursor-pointer">
                  Start Next Level <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-500" /> {quiz.title}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-sm text-slate-500">Question {currentQ + 1} of {total}</p>
              <LevelBadge level={quiz.level} />
            </div>
          </div>
          <button onClick={closeQuiz} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-secure-500 transition-all duration-500" style={{ width: `${((currentQ + (showResult ? 1 : 0)) / total) * 100}%` }} />
        </div>

        {/* Question Card */}
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-800 leading-relaxed">{q.q}</h2>
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              let cls = 'bg-white border-black/8 hover:border-accent-500/30 hover:bg-accent-500/5';
              if (selected === i && !showResult) cls = 'bg-accent-500/10 border-accent-500/30 ring-2 ring-accent-500/20';
              if (showResult && i === q.answer) cls = 'bg-secure-500/10 border-secure-500/30';
              if (showResult && selected === i && i !== q.answer) cls = 'bg-risk-500/10 border-risk-500/30';
              return (
                <button key={i} onClick={() => !showResult && setSelected(i)} disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${cls}`}>
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${selected === i ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-500'} ${showResult && i === q.answer ? 'bg-secure-500 text-white' : ''} ${showResult && selected === i && i !== q.answer ? 'bg-risk-500 text-white' : ''}`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-slate-700">{opt}</span>
                  {showResult && i === q.answer && <CheckCircle2 className="w-5 h-5 text-secure-500 ml-auto shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`p-4 rounded-xl border animate-slide-down ${selected === q.answer ? 'bg-secure-500/5 border-secure-500/15' : 'bg-warn-500/5 border-warn-500/15'}`}>
              <p className={`text-sm font-semibold ${selected === q.answer ? 'text-secure-500' : 'text-warn-500'}`}>
                {selected === q.answer ? '✓ Correct! +10 XP' : '✗ Not quite right'}
              </p>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{q.explanation}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {!showResult ? (
            <button onClick={submitAnswer} disabled={selected === null}
              className={`flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer ${selected !== null ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-white shadow-lg shadow-accent-500/25' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
              Submit Answer
            </button>
          ) : (
            <button onClick={nextQuestion}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-accent-500 to-accent-400 px-6 py-2.5 rounded-xl shadow-lg shadow-accent-500/25 cursor-pointer">
              {currentQ + 1 >= total ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>
    );
  }

  // Module List View
  return (
    <section className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-accent-500" /> Training Portal
        </h1>
        <p className="text-sm text-slate-500 mt-1">Complete training levels sequentially to unlock advanced modules. Score 67% or higher to pass each level.</p>
      </div>

      {/* Progress + XP Card */}
      <div className="glass rounded-2xl p-5 border border-accent-500/10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent-500" />
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-800">{currentEmployee.name}</span>
              <p className="text-xs text-slate-400">Training Level {empTrainingLevel} · {totalXP * 10} XP earned · {selectedOrg.name}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-accent-500">{completed}/{modules.length} completed</span>
        </div>
        <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg px-3 py-2 mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-warn-500" />
          You can only attempt quizzes up to <span className="text-accent-500 font-semibold">Level {empTrainingLevel}</span>. Pass a quiz to level up and unlock the next.
        </div>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-secure-500 transition-all duration-500" style={{ width: `${(empTrainingLevel / 6) * 100}%` }} />
        </div>
        {/* Level markers */}
        <div className="flex justify-between mt-2">
          {modules.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${m.completed ? 'bg-secure-500 text-white' : isUnlocked(m) ? 'bg-accent-500/20 text-accent-500 border border-accent-500/30' : 'bg-slate-100 text-slate-300'}`}>
                {m.completed ? '✓' : i + 1}
              </div>
              <span className="text-[8px] text-slate-400 mt-0.5 hidden sm:block">{LEVEL_NAMES[i + 1]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod, i) => {
          const unlocked = isUnlocked(mod);
          const modScoreData = scores[mod.id];
          return (
            <div key={mod.id} className={`glass rounded-2xl p-5 transition-all duration-300 animate-fade-in-up ${mod.completed ? 'border border-secure-500/15' : unlocked ? 'hover:shadow-md' : 'opacity-60'}`} style={{ animationDelay: `${0.06 * i}s` }}>
              <div className="flex items-start justify-between mb-3">
                <LevelBadge level={mod.level} />
                {mod.completed && <CheckCircle2 className="w-5 h-5 text-secure-500" />}
                {!unlocked && <Lock className="w-4 h-4 text-slate-300" />}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 mb-1">{mod.title}</h3>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">{mod.desc}</p>

              {/* Best score */}
              {modScoreData && (
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="text-slate-400">Best:</span>
                  <span className={`font-semibold ${modScoreData.pct >= 67 ? 'text-secure-500' : 'text-warn-500'}`}>{modScoreData.correct}/{modScoreData.total} ({modScoreData.pct}%)</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" /> {mod.duration} min
                </div>
                {unlocked ? (
                  <button onClick={() => startQuiz(mod.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${mod.completed ? 'text-secure-500 bg-secure-500/10 hover:bg-secure-500/20' : 'text-accent-500 bg-accent-500/10 hover:bg-accent-500/20'}`}>
                    {mod.completed ? <><CheckCircle2 className="w-3.5 h-3.5" /> Retake</> : <><Play className="w-3.5 h-3.5" /> Start</>}
                  </button>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 px-3 py-1.5">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
