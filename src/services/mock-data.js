export const COMPANIES=[{id:'greenfield',name:'Greenfield Industries',industry:'Manufacturing',logo:'🏭',metrics:{risk:{value:'32',unit:'/ 100',change:'-8.4%',trend:'down',sub:'Lower is better — down from 40.4 last quarter'},campaigns:{value:'12',change:'+3',trend:'up',sub:'Across 4 departments this week'},teachable:{value:'847',change:'+22%',trend:'up',sub:'Employees educated via reinforcement loops'},employees:{value:'2,340',change:'',trend:'neutral',sub:'Enterprise-wide coverage'}}},{id:'medivault',name:'MediVault Health',industry:'Healthcare',logo:'🏥',metrics:{risk:{value:'51',unit:'/ 100',change:'+4.2%',trend:'up',sub:'Risk increased — new staff onboarding'},campaigns:{value:'8',change:'+2',trend:'up',sub:'Active across 3 departments'},teachable:{value:'412',change:'+16%',trend:'up',sub:'Highest engagement in clinical depts'},employees:{value:'1,580',change:'',trend:'neutral',sub:'All hospital units covered'}}},{id:'quantumleap',name:'QuantumLeap SaaS',industry:'Technology',logo:'🚀',metrics:{risk:{value:'19',unit:'/ 100',change:'-12%',trend:'down',sub:'Leading performer — strong security culture'},campaigns:{value:'15',change:'+5',trend:'up',sub:'Simulations across 6 teams'},teachable:{value:'1,203',change:'+38%',trend:'up',sub:'Engineering teams improving rapidly'},employees:{value:'3,210',change:'',trend:'neutral',sub:'Full coverage including contractors'}}},{id:'northstar',name:'NorthStar Financial',industry:'Financial Services',logo:'🏦',metrics:{risk:{value:'44',unit:'/ 100',change:'-3.1%',trend:'down',sub:'Compliance team driving change'},campaigns:{value:'10',change:'+1',trend:'up',sub:'Executive-level threat simulations'},teachable:{value:'623',change:'+11%',trend:'up',sub:'Trading and advisory divisions'},employees:{value:'890',change:'',trend:'neutral',sub:'All regulated employees covered'}}}];

export const EMPLOYEES={
greenfield:[
{id:'e1',name:'Sarah Chen',dept:'Finance',risk:72,prev:85,level:'Level 5 — Whale Phishing',trainingLevel:5,trend:'improving',sims:14,clicks:8,reports:3},
{id:'e2',name:'Marcus Rivera',dept:'Engineering',risk:45,prev:52,level:'Level 3 — Clone Phishing',trainingLevel:3,trend:'improving',sims:10,clicks:4,reports:5},
{id:'e3',name:'Aisha Patel',dept:'HR',risk:88,prev:79,level:'Level 5 — Spear Phishing + Pretext',trainingLevel:5,trend:'declining',sims:12,clicks:10,reports:1},
{id:'e4',name:"James O'Sullivan",dept:'Sales',risk:23,prev:35,level:'Level 2 — Generic Phishing',trainingLevel:2,trend:'improving',sims:8,clicks:2,reports:6},
{id:'e5',name:'Priya Sharma',dept:'Legal',risk:61,prev:68,level:'Level 4 — Spear Phishing',trainingLevel:4,trend:'improving',sims:11,clicks:6,reports:4},
{id:'e6',name:'Tom Nakamura',dept:'Marketing',risk:54,prev:54,level:'Level 3 — BEC Simulation',trainingLevel:3,trend:'stable',sims:9,clicks:5,reports:3},
{id:'e7',name:'Elena Vasquez',dept:'Operations',risk:38,prev:45,level:'Level 3 — Invoice Fraud',trainingLevel:3,trend:'improving',sims:7,clicks:3,reports:4},
{id:'e8',name:'David Kim',dept:'Finance',risk:29,prev:40,level:'Level 2 — Clone Phishing',trainingLevel:2,trend:'improving',sims:6,clicks:2,reports:4}],
medivault:[
{id:'m1',name:'Dr. Emily Tran',dept:'Radiology',risk:81,prev:90,level:'Level 5 — Spear Phishing',trainingLevel:5,trend:'improving',sims:15,clicks:11,reports:2},
{id:'m2',name:'Carlos Mendez',dept:'IT',risk:18,prev:22,level:'Level 2 — Generic Phishing',trainingLevel:2,trend:'improving',sims:12,clicks:2,reports:9},
{id:'m3',name:'Nurse Fiona Blake',dept:'ER',risk:67,prev:61,level:'Level 4 — Clone Phishing',trainingLevel:4,trend:'declining',sims:10,clicks:7,reports:2},
{id:'m4',name:'Ahmad Farouk',dept:'Billing',risk:55,prev:60,level:'Level 3 — Invoice Fraud',trainingLevel:3,trend:'improving',sims:8,clicks:5,reports:3},
{id:'m5',name:'Lisa Johansson',dept:'Admin',risk:39,prev:45,level:'Level 3 — BEC Simulation',trainingLevel:3,trend:'improving',sims:9,clicks:3,reports:5}],
quantumleap:[
{id:'q1',name:'Wei Zhang',dept:'Engineering',risk:12,prev:20,level:'Level 2 — Generic Phishing',trainingLevel:2,trend:'improving',sims:10,clicks:1,reports:8},
{id:'q2',name:'Jordan Ellis',dept:'DevOps',risk:8,prev:15,level:'Level 1 — Basic Awareness',trainingLevel:1,trend:'improving',sims:8,clicks:0,reports:7},
{id:'q3',name:'Natasha Ivanova',dept:'Product',risk:34,prev:38,level:'Level 3 — Clone Phishing',trainingLevel:3,trend:'improving',sims:9,clicks:3,reports:5},
{id:'q4',name:'Ryan Okafor',dept:'Sales',risk:52,prev:48,level:'Level 4 — Spear Phishing',trainingLevel:4,trend:'declining',sims:11,clicks:6,reports:3},
{id:'q5',name:'Mia Gutierrez',dept:'Customer Success',risk:28,prev:35,level:'Level 2 — BEC Simulation',trainingLevel:2,trend:'improving',sims:7,clicks:2,reports:5},
{id:'q6',name:'Sam Patel',dept:'Finance',risk:41,prev:50,level:'Level 3 — Invoice Fraud',trainingLevel:3,trend:'improving',sims:8,clicks:4,reports:4},
{id:'q7',name:'Alex Novak',dept:'Security',risk:5,prev:8,level:'Level 1 — Basic Awareness',trainingLevel:1,trend:'improving',sims:15,clicks:0,reports:14}],
northstar:[
{id:'n1',name:'Diana Kruger',dept:'Trading',risk:63,prev:70,level:'Level 4 — Spear Phishing',trainingLevel:4,trend:'improving',sims:12,clicks:7,reports:4},
{id:'n2',name:'Raj Malhotra',dept:'Advisory',risk:48,prev:55,level:'Level 3 — Clone Phishing',trainingLevel:3,trend:'improving',sims:10,clicks:5,reports:4},
{id:'n3',name:'Sophie Laurent',dept:'Compliance',risk:15,prev:18,level:'Level 2 — Generic Phishing',trainingLevel:2,trend:'improving',sims:9,clicks:1,reports:7},
{id:'n4',name:'Michael Adeyemi',dept:'IT',risk:22,prev:30,level:'Level 2 — BEC Simulation',trainingLevel:2,trend:'improving',sims:8,clicks:2,reports:6},
{id:'n5',name:'Elena Vasquez',dept:'C-Suite',risk:78,prev:72,level:'Level 5 — Whale Phishing',trainingLevel:5,trend:'declining',sims:13,clicks:9,reports:2}]};

export const RISK_TREND_DATA=[
{week:'W1',Finance:65,Engineering:35,HR:70,Sales:50,Overall:52},
{week:'W2',Finance:62,Engineering:33,HR:68,Sales:48,Overall:50},
{week:'W3',Finance:58,Engineering:30,HR:72,Sales:45,Overall:48},
{week:'W4',Finance:55,Engineering:28,HR:65,Sales:42,Overall:45},
{week:'W5',Finance:50,Engineering:25,HR:60,Sales:40,Overall:42},
{week:'W6',Finance:48,Engineering:22,HR:58,Sales:38,Overall:40},
{week:'W7',Finance:45,Engineering:20,HR:62,Sales:35,Overall:38},
{week:'W8',Finance:42,Engineering:18,HR:55,Sales:33,Overall:36},
{week:'W9',Finance:40,Engineering:16,HR:50,Sales:30,Overall:34},
{week:'W10',Finance:38,Engineering:15,HR:48,Sales:28,Overall:32},
{week:'W11',Finance:35,Engineering:14,HR:52,Sales:26,Overall:31},
{week:'W12',Finance:33,Engineering:12,HR:45,Sales:25,Overall:29}];

export const CLICK_RATE_DATA=[
{campaign:'C1',rate:42,target:5},{campaign:'C2',rate:38,target:5},{campaign:'C3',rate:35,target:5},
{campaign:'C4',rate:28,target:5},{campaign:'C5',rate:22,target:5},{campaign:'C6',rate:18,target:5},
{campaign:'C7',rate:15,target:5},{campaign:'C8',rate:12,target:5},{campaign:'C9',rate:10,target:5},
{campaign:'C10',rate:8,target:5},{campaign:'C11',rate:7,target:5},{campaign:'C12',rate:6,target:5}];

export const DEPT_RISK_DATA=[
{dept:'HR',risk:62,color:'#dc2626'},{dept:'Finance',risk:48,color:'#d97706'},
{dept:'Sales',risk:40,color:'#d97706'},{dept:'Marketing',risk:35,color:'#d97706'},
{dept:'Legal',risk:28,color:'#059669'},{dept:'Engineering',risk:18,color:'#059669'},
{dept:'IT',risk:12,color:'#059669'}];

export const OUTCOME_DATA=[
{name:'Reported',value:35,color:'#059669'},{name:'Ignored',value:28,color:'#94a3b8'},
{name:'Opened Only',value:22,color:'#d97706'},{name:'Clicked',value:15,color:'#dc2626'}];

export const CAMPAIGNS={
greenfield:[
{id:'c1',name:'Q2 Vendor Payment Update',status:'completed',dept:'Finance & Accounting',tactic:'BEC',difficulty:4,sent:48,clicked:12,reported:28,date:'2026-04-15'},
{id:'c2',name:'Benefits Open Enrollment',status:'completed',dept:'Human Resources',tactic:'Clone Phishing',difficulty:3,sent:85,clicked:22,reported:45,date:'2026-04-10'},
{id:'c3',name:'CEO Town Hall Invite',status:'active',dept:'C-Suite Executives',tactic:'Spear Phishing',difficulty:5,sent:12,clicked:3,reported:5,date:'2026-04-25'},
{id:'c4',name:'Invoice #INV-2026-8832',status:'active',dept:'Finance & Accounting',tactic:'Invoice Fraud',difficulty:4,sent:35,clicked:8,reported:15,date:'2026-04-24'},
{id:'c5',name:'IT Security Update Required',status:'scheduled',dept:'Engineering',tactic:'Credential Harvesting',difficulty:3,sent:0,clicked:0,reported:0,date:'2026-05-01'},
{id:'c6',name:'Office WiFi QR Code',status:'draft',dept:'Operations',tactic:'Quishing',difficulty:2,sent:0,clicked:0,reported:0,date:null}],
medivault:[
{id:'mc1',name:'Patient Portal Password Reset',status:'completed',dept:'Radiology',tactic:'Credential Harvesting',difficulty:4,sent:62,clicked:18,reported:30,date:'2026-04-12'},
{id:'mc2',name:'HIPAA Compliance Certification',status:'active',dept:'Admin',tactic:'Clone Phishing',difficulty:3,sent:40,clicked:9,reported:20,date:'2026-04-22'},
{id:'mc3',name:'Lab Results Notification',status:'active',dept:'ER',tactic:'Spear Phishing',difficulty:5,sent:25,clicked:7,reported:12,date:'2026-04-26'},
{id:'mc4',name:'Medical Supply Invoice',status:'scheduled',dept:'Billing',tactic:'Invoice Fraud',difficulty:4,sent:0,clicked:0,reported:0,date:'2026-05-05'},
{id:'mc5',name:'Staff Scheduling Update',status:'draft',dept:'IT',tactic:'BEC',difficulty:2,sent:0,clicked:0,reported:0,date:null}],
quantumleap:[
{id:'qc1',name:'GitHub Access Token Expiry',status:'completed',dept:'Engineering',tactic:'Credential Harvesting',difficulty:4,sent:110,clicked:8,reported:82,date:'2026-04-08'},
{id:'qc2',name:'AWS Billing Alert',status:'completed',dept:'DevOps',tactic:'Clone Phishing',difficulty:5,sent:45,clicked:3,reported:35,date:'2026-04-14'},
{id:'qc3',name:'Board Meeting Agenda',status:'active',dept:'Product',tactic:'Spear Phishing',difficulty:4,sent:30,clicked:5,reported:18,date:'2026-04-23'},
{id:'qc4',name:'Slack Integration Auth',status:'active',dept:'Engineering',tactic:'Credential Harvesting',difficulty:3,sent:55,clicked:4,reported:40,date:'2026-04-27'},
{id:'qc5',name:'Quarterly OKR Review',status:'scheduled',dept:'Sales',tactic:'BEC',difficulty:3,sent:0,clicked:0,reported:0,date:'2026-05-03'},
{id:'qc6',name:'Contractor Onboarding Form',status:'scheduled',dept:'Customer Success',tactic:'Invoice Fraud',difficulty:2,sent:0,clicked:0,reported:0,date:'2026-05-10'},
{id:'qc7',name:'Prod Deployment Notification',status:'draft',dept:'Security',tactic:'Spear Phishing',difficulty:5,sent:0,clicked:0,reported:0,date:null}],
northstar:[
{id:'nc1',name:'Wire Transfer Verification',status:'completed',dept:'Trading',tactic:'BEC',difficulty:5,sent:38,clicked:14,reported:18,date:'2026-04-11'},
{id:'nc2',name:'Regulatory Filing Deadline',status:'completed',dept:'Compliance',tactic:'Spear Phishing',difficulty:4,sent:28,clicked:3,reported:22,date:'2026-04-16'},
{id:'nc3',name:'Client Portfolio Access',status:'active',dept:'Advisory',tactic:'Credential Harvesting',difficulty:5,sent:20,clicked:6,reported:10,date:'2026-04-28'},
{id:'nc4',name:'Annual Bonus Notification',status:'scheduled',dept:'C-Suite',tactic:'Whale Phishing',difficulty:5,sent:0,clicked:0,reported:0,date:'2026-05-08'},
{id:'nc5',name:'IT Helpdesk Ticket',status:'draft',dept:'IT',tactic:'Clone Phishing',difficulty:2,sent:0,clicked:0,reported:0,date:null}]};

// Legacy export for backward compatibility
export const CAMPAIGNS_LIST=CAMPAIGNS.greenfield;

export const TRAINING_MODULES=[
{id:'t1',title:'Recognizing BEC Attacks',desc:'Learn to identify Business Email Compromise attempts.',tactic:'BEC',difficulty:3,duration:10,completed:false},
{id:'t2',title:'Understanding Social Engineering',desc:'Deep dive into psychological manipulation techniques.',tactic:'Social Engineering',difficulty:2,duration:15,completed:true},
{id:'t3',title:'Safe Browsing Habits',desc:'Best practices for browsing and verifying links.',tactic:'General',difficulty:1,duration:8,completed:false},
{id:'t4',title:'Reporting Suspicious Emails',desc:'Step-by-step guide to properly report phishing.',tactic:'Reporting',difficulty:1,duration:5,completed:true},
{id:'t5',title:'Protecting Sensitive Data',desc:'Safe handling of PII and financial records.',tactic:'Data Protection',difficulty:2,duration:12,completed:false},
{id:'t6',title:'Invoice & Payment Fraud',desc:'How attackers exploit billing processes.',tactic:'Invoice Fraud',difficulty:3,duration:10,completed:false}];

export const MOCK_EMAILS={
bec:{
subject:'ACTION REQUIRED: Updated Wire Instructions — Q2 Vendor Payment',
sender_name:'David Chen — CFO Office',
sender_email:'d.chen@alphabridge-partners.com',
body:`Hi Sarah,\n\nI hope this message finds you well. Following our conversation last Thursday regarding the Q2 vendor reconciliation, I wanted to flag an urgent update from AlphaBridge Partners.\n\nTheir banking institution has completed a migration to new payment infrastructure, and as a result, the wire transfer details for our outstanding invoice (#ABP-2026-4491) have been updated. To avoid any disruption to the payment schedule, please update the beneficiary information before Friday's batch run:\n\n    New Beneficiary: AlphaBridge Partners LLC\n    Bank: First National Commercial Bank\n    Routing: 021000089\n    Account: 4831-7702-9156\n\nI've attached the updated W-9 and banking verification letter for your records. Could you please confirm once the update is in place?\n\nLet me know if you need me to loop in Treasury.\n\nBest regards,\nDavid Chen\nChief Financial Officer\n{{COMPANY}}\n☎ (415) 555-0173`,
techniques_used:[
{tag:'Authority Impersonation',description:'Email impersonates CFO to leverage authority bias',email_excerpt:'David Chen — Chief Financial Officer'},
{tag:'False Urgency',description:'"Before Friday\'s batch run" creates time pressure',email_excerpt:'before Friday\'s batch run'},
{tag:'Contextual Pretexting',description:'References a prior conversation to build trust',email_excerpt:'Following our conversation last Thursday'},
{tag:'Procedural Mimicry',description:'W-9 and wire format mimic real finance workflows',email_excerpt:'updated W-9 and banking verification letter'}]},

clone:{
subject:'[Security Alert] Unusual sign-in activity on your account',
sender_name:'IT Security Team',
sender_email:'security-alerts@{{DOMAIN}}-sso.com',
body:`Dear Team Member,\n\nWe detected unusual sign-in activity on your corporate account from an unrecognized device:\n\n    Location: Karachi, Pakistan\n    Device: Chrome on Windows 11\n    Time: Today at 3:47 AM PKT\n    IP Address: 185.220.101.42\n\nIf this was you, no action is needed. If you don't recognize this activity, please secure your account immediately by clicking the link below:\n\n    → Review Account Activity\n    https://{{DOMAIN}}-sso.com/verify?token=a8f3e2d1\n\nThis link expires in 24 hours. If you don't take action, your account may be temporarily suspended as a precaution.\n\nThank you,\n{{COMPANY}} IT Security\nIncident Ref: SEC-2026-8847`,
techniques_used:[
{tag:'Brand Impersonation',description:'Mimics real IT security alert formatting the user is accustomed to',email_excerpt:'{{COMPANY}} IT Security'},
{tag:'Fear & Urgency',description:'Threat of account suspension creates panic-driven response',email_excerpt:'your account may be temporarily suspended'},
{tag:'Familiar UI Patterns',description:'Uses SSO-style login link that clones legitimate security workflows',email_excerpt:'Review Account Activity'},
{tag:'Geolocation Trigger',description:'Foreign location creates alarm and bypasses rational analysis',email_excerpt:'Karachi, Pakistan'}]},

spear:{
subject:'Re: Confidential — Restructuring Plan Q3',
sender_name:'Michael Torres — VP Strategy',
sender_email:'m.torres@{{DOMAIN}}-corp.com',
body:`Hi,\n\nFollowing up on our call yesterday — I've finalized the Q3 restructuring proposal. The board wants to review it before Thursday's emergency session.\n\nI've uploaded the confidential draft to our secure portal. Please review the headcount projections for your department and confirm the numbers are accurate:\n\n    → Access Document: Q3 Restructuring Draft\n    https://secure-docs.{{DOMAIN}}-corp.com/review/q3-plan\n\n⚠️ CONFIDENTIAL: This document contains sensitive personnel decisions. Do not forward or discuss outside the leadership team.\n\nNeed your sign-off by EOD Wednesday. If you have concerns about any of the proposed changes, let's schedule a private 1:1.\n\nRegards,\nMichael Torres\nVP of Corporate Strategy\n{{COMPANY}}`,
techniques_used:[
{tag:'Spear Targeting',description:'References specific role and implies prior relationship',email_excerpt:'confirm the headcount projections for your department'},
{tag:'Confidentiality Trap',description:'Labeling as "confidential" prevents the target from verifying with others',email_excerpt:'Do not forward or discuss outside the leadership team'},
{tag:'Authority + Urgency',description:'VP title combined with board deadline creates dual pressure',email_excerpt:'board wants to review it before Thursday\'s emergency session'},
{tag:'Curiosity Exploitation',description:'Restructuring/layoff details are irresistible to click on',email_excerpt:'headcount projections'}]},

invoice:{
subject:'Invoice #INV-2026-4782 — Payment Past Due (2nd Notice)',
sender_name:'Accounts Receivable — NexGen Solutions',
sender_email:'billing@nexgen-solutions.net',
body:`Dear Accounts Payable,\n\nThis is a second notice regarding overdue Invoice #INV-2026-4782 for professional services rendered in March 2026.\n\n    Invoice Number: INV-2026-4782\n    Amount Due: $47,500.00\n    Original Due Date: April 15, 2026\n    Days Past Due: 28\n\nPlease note that per our Master Services Agreement (Section 8.3), a 1.5% monthly late fee will be applied to balances past 30 days.\n\nTo avoid additional charges, please process payment using our updated banking details:\n\n    Bank: First National Commercial Bank\n    Account Name: NexGen Solutions LLC\n    Routing: 021000089\n    Account: 7742-8891-3356\n\nAlternatively, you may pay via our secure portal:\n    → https://billing.nexgen-solutions.net/pay/INV-2026-4782\n\nIf you believe this invoice was already paid, please reply with the transaction confirmation.\n\nBest regards,\nSarah Mitchell\nAccounts Receivable Manager\nNexGen Solutions`,
techniques_used:[
{tag:'Invoice Fraud',description:'Fake overdue invoice with changed bank details redirects payment',email_excerpt:'updated banking details'},
{tag:'Late Fee Pressure',description:'Threat of penalty fees creates urgency to pay without verifying',email_excerpt:'1.5% monthly late fee will be applied'},
{tag:'Procedural Mimicry',description:'Invoice number, MSA reference, and AR formatting mimic real vendor comms',email_excerpt:'Master Services Agreement (Section 8.3)'},
{tag:'Second Notice Urgency',description:'Framing as "2nd notice" implies prior communication and increases pressure',email_excerpt:'second notice regarding overdue Invoice'}]},

credential:{
subject:'Your password expires in 24 hours — action required',
sender_name:'IT Helpdesk',
sender_email:'helpdesk@{{DOMAIN}}-identity.com',
body:`Hello,\n\nYour corporate password is set to expire in 24 hours as part of our quarterly security rotation policy.\n\nTo avoid losing access to email, VPN, and internal systems, please update your password now:\n\n    → Update Password Now\n    https://{{DOMAIN}}-identity.com/password-reset?uid=user_38291\n\nPassword Requirements:\n    • Minimum 12 characters\n    • At least one uppercase letter, one number, and one special character\n    • Cannot reuse your last 5 passwords\n\nIf you do not update your password before the deadline, your account will be locked and you will need to contact IT support to regain access.\n\nThis is an automated message from {{COMPANY}} Identity Management.\nTicket: PWD-2026-1847`,
techniques_used:[
{tag:'Credential Harvesting',description:'Fake password reset page captures real credentials',email_excerpt:'Update Password Now'},
{tag:'Service Disruption Threat',description:'Losing access to email/VPN creates immediate fear',email_excerpt:'your account will be locked'},
{tag:'Policy Spoofing',description:'Fake "quarterly security rotation" sounds like real IT policy',email_excerpt:'quarterly security rotation policy'},
{tag:'Legitimate Formatting',description:'Password requirements and ticket numbers mimic real IT systems',email_excerpt:'PWD-2026-1847'}]},

quishing:{
subject:'New Office WiFi Network — Scan QR Code to Connect',
sender_name:'Facilities Management',
sender_email:'facilities@{{DOMAIN}}.com',
body:`Hi Team,\n\nAs part of our office network upgrade, we've deployed a new WiFi network across all floors. The old network ({{COMPANY}}-Guest) will be decommissioned on Friday.\n\nTo connect to the new secure network, please scan the QR code in the attached PDF or visit the setup page:\n\n    → WiFi Setup Guide (PDF with QR Code)\n    → Or visit: https://wifi-setup.{{DOMAIN}}.com/connect\n\nYou will need to authenticate with your corporate credentials to complete the setup.\n\nPlease complete this by end of day Friday to ensure uninterrupted connectivity.\n\nThank you,\nFacilities Management\n{{COMPANY}}`,
techniques_used:[
{tag:'QR Code Phishing',description:'QR code redirects to credential harvesting page, bypassing URL preview',email_excerpt:'scan the QR code in the attached PDF'},
{tag:'Infrastructure Pretext',description:'WiFi upgrade is believable and affects everyone',email_excerpt:'office network upgrade'},
{tag:'Deadline Pressure',description:'Friday cutoff creates urgency to act without verification',email_excerpt:'decommissioned on Friday'},
{tag:'Credential Harvesting via QR',description:'Corporate credential prompt after QR scan captures login info',email_excerpt:'authenticate with your corporate credentials'}]},

ceo:{
subject:'Quick favor — need this handled privately',
sender_name:'CEO Office',
sender_email:'ceo.office@{{DOMAIN}}-exec.com',
body:`Hi,\n\nI'm in a board meeting right now and can't talk. I need a favor handled quietly before end of day.\n\nWe're closing a confidential acquisition and I need you to process a wire transfer to the escrow account. I'll explain everything when I'm out of the meeting.\n\n    Amount: $125,000.00\n    Beneficiary: Sterling Acquisitions LLC\n    Bank: Pacific West Federal\n    Routing: 026009593\n    Account: 8847-2291-5563\n    Reference: ACQ-2026-CONFIDENTIAL\n\nPlease don't loop anyone else in yet — this is extremely sensitive and the board hasn't announced it. I'm trusting you with this.\n\nI'll call you as soon as I'm free.\n\nThanks,\nSent from my iPhone`,
techniques_used:[
{tag:'CEO Fraud / Whaling',description:'Impersonates CEO to exploit maximum authority and trust',email_excerpt:'CEO Office'},
{tag:'Isolation Tactic',description:'"Don\'t loop anyone else in" prevents victim from seeking verification',email_excerpt:'don\'t loop anyone else in yet'},
{tag:'Unavailability Excuse',description:'"In a board meeting" explains why they can\'t be reached for verification',email_excerpt:'I\'m in a board meeting right now and can\'t talk'},
{tag:'Mobile Signature',description:'"Sent from my iPhone" explains brevity and any formatting oddities',email_excerpt:'Sent from my iPhone'}]}
};

// Helper to get a mock email for a given tactic, with company name injected
export function getMockEmail(tactic, companyName) {
  const key = tactic.toLowerCase().includes('bec') ? 'bec'
    : tactic.toLowerCase().includes('clone') ? 'clone'
    : tactic.toLowerCase().includes('spear') ? 'spear'
    : tactic.toLowerCase().includes('invoice') ? 'invoice'
    : tactic.toLowerCase().includes('credential') ? 'credential'
    : tactic.toLowerCase().includes('qr') || tactic.toLowerCase().includes('quish') ? 'quishing'
    : tactic.toLowerCase().includes('ceo') || tactic.toLowerCase().includes('whale') ? 'ceo'
    : 'bec';
  const template = MOCK_EMAILS[key];
  const domain = companyName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return {
    subject: template.subject.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
    sender_name: template.sender_name.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
    sender_email: template.sender_email.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
    body: template.body.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
    techniques_used: template.techniques_used.map(t => ({
      ...t,
      description: t.description.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
      email_excerpt: t.email_excerpt.replace(/\{\{COMPANY\}\}/g, companyName).replace(/\{\{DOMAIN\}\}/g, domain),
    })),
  };
}

// Legacy single export for backward compat
export const MOCK_AI_EMAIL = getMockEmail('BEC', 'Greenfield Industries');

export const DEPARTMENTS=['Finance & Accounting','Human Resources','Engineering','Sales & Marketing','C-Suite Executives','Legal & Compliance','Operations','Customer Support'];
export const INDUSTRIES=['Healthcare','Financial Services','SaaS / Technology','Manufacturing','Retail & E-Commerce','Government','Education','Energy & Utilities'];
export const TACTICS=['BEC (Business Email Compromise)','Clone Phishing','Spear Phishing + Pretexting','Invoice Fraud','Credential Harvesting','QR Code Phishing (Quishing)','CEO Fraud'];

export const INBOX_MAILS=[
{id:'phish',from:'David Chen — CFO Office',fromEmail:'d.chen@alphabridge-partners.com',subject:'ACTION REQUIRED: Updated Wire Instructions — Q2 Vendor Payment',snippet:'Hi Sarah, Following our conversation last Thursday...',time:'10:23 AM',unread:true,starred:false,hasAttachment:true,isPhishing:true},
{id:'legit1',from:'Jira Notifications',fromEmail:'noreply@greenfield-jira.atlassian.net',subject:'ENGR-4421: Sprint 14 planning — your review requested',snippet:'You have been assigned as a reviewer on ENGR-4421...',time:'9:47 AM',unread:true,starred:false,hasAttachment:false,isPhishing:false},
{id:'legit2',from:'HR Benefits Team',fromEmail:'benefits@greenfield.com',subject:'Reminder: Open Enrollment ends March 31',snippet:'This is a friendly reminder that the open enrollment window...',time:'Yesterday',unread:false,starred:true,hasAttachment:false,isPhishing:false},
{id:'legit3',from:'Slack',fromEmail:'notification@slack.com',subject:'New messages in #product-launch',snippet:'Priya Sharma mentioned you in #product-launch...',time:'Yesterday',unread:false,starred:false,hasAttachment:false,isPhishing:false}];

export const RED_FLAGS=[
{title:'False Urgency',tactic:'Scarcity & Time Pressure',description:'The phrase "before Friday\'s batch run" creates artificial urgency designed to bypass your analytical thinking.',highlight:'"before Friday\'s batch run"',color:'risk'},
{title:'Authority Impersonation',tactic:'Social Influence — Authority Bias',description:'The email impersonates a CFO — a high-authority figure. Humans are wired to comply with requests from leadership.',highlight:'"David Chen — Chief Financial Officer"',color:'warn'},
{title:'Contextual Pretexting',tactic:'Trust Engineering',description:'References to "our conversation last Thursday" and a specific invoice number create false context.',highlight:'"Following our conversation last Thursday"',color:'accent'},
{title:'Procedural Mimicry',tactic:'Process Exploitation',description:'The email mirrors real finance procedures — W-9 forms, wire details — making it nearly indistinguishable from legitimate workflows.',highlight:'"W-9 and banking verification letter"',color:'risk'}];

export const NOTIFICATIONS={
greenfield:[
{id:'n1',type:'campaign_complete',title:'Campaign Completed',message:'Q2 Vendor Payment Update — 25% click rate',read:false,time:'2 hours ago'},
{id:'n2',type:'risk_alert',title:'High Risk Alert',message:'Aisha Patel risk score increased to 88',read:false,time:'4 hours ago'},
{id:'n3',type:'action',title:'Simulation Overdue',message:'3 employees overdue for phishing simulation',read:false,time:'5 hours ago',urgent:true},
{id:'n4',type:'action',title:'Click Rate Warning',message:'Finance dept click rate above 20% — schedule targeted training',read:false,time:'6 hours ago',urgent:true},
{id:'n5',type:'training_due',title:'Training Overdue',message:'12 employees have incomplete training modules',read:true,time:'1 day ago'},
{id:'n6',type:'action',title:'Board Report Due',message:'Q2 board security report due in 5 days',read:true,time:'1 day ago',urgent:false},
{id:'n7',type:'action',title:'Pending Approval',message:'2 campaigns awaiting admin approval before deployment',read:true,time:'2 days ago',urgent:false},
{id:'n8',type:'report_ready',title:'Monthly Report Ready',message:'April security posture report available for download',read:true,time:'2 days ago'}],
medivault:[
{id:'mn1',type:'risk_alert',title:'High Risk Alert',message:'Dr. Emily Tran risk score at 81 — Radiology dept vulnerable',read:false,time:'1 hour ago'},
{id:'mn2',type:'campaign_complete',title:'Campaign Completed',message:'Patient Portal Password Reset — 29% click rate',read:false,time:'3 hours ago'},
{id:'mn3',type:'action',title:'HIPAA Compliance Gap',message:'ER department click rate exceeds HIPAA training threshold',read:false,time:'4 hours ago',urgent:true},
{id:'mn4',type:'action',title:'New Staff Onboarding',message:'5 new hires pending first phishing simulation',read:false,time:'6 hours ago',urgent:true},
{id:'mn5',type:'training_due',title:'Training Overdue',message:'8 clinical staff have incomplete security modules',read:true,time:'1 day ago'},
{id:'mn6',type:'action',title:'Billing Alert',message:'Billing dept flagged for invoice fraud susceptibility',read:true,time:'2 days ago',urgent:false}],
quantumleap:[
{id:'qn1',type:'campaign_complete',title:'Campaign Completed',message:'GitHub Access Token Expiry — 7% click rate (excellent)',read:false,time:'2 hours ago'},
{id:'qn2',type:'campaign_complete',title:'Campaign Completed',message:'AWS Billing Alert — 7% click rate',read:false,time:'5 hours ago'},
{id:'qn3',type:'action',title:'Sales Dept Warning',message:'Ryan Okafor risk score rising — 52 and trending up',read:false,time:'6 hours ago',urgent:true},
{id:'qn4',type:'action',title:'Scheduled Campaigns',message:'2 campaigns scheduled for next week — review and approve',read:true,time:'1 day ago',urgent:false},
{id:'qn5',type:'report_ready',title:'Security Champion',message:'Alex Novak achieved 0 clicks across 15 simulations',read:true,time:'2 days ago'}],
northstar:[
{id:'nn1',type:'risk_alert',title:'Critical Risk Alert',message:'Elena Vasquez (C-Suite) risk score at 78 — whale phishing target',read:false,time:'1 hour ago'},
{id:'nn2',type:'campaign_complete',title:'Campaign Completed',message:'Wire Transfer Verification — 37% click rate (high)',read:false,time:'3 hours ago'},
{id:'nn3',type:'action',title:'Trading Floor Alert',message:'Trading dept average risk 63 — above compliance threshold',read:false,time:'4 hours ago',urgent:true},
{id:'nn4',type:'action',title:'Regulatory Deadline',message:'SBP quarterly security report due in 3 days',read:false,time:'5 hours ago',urgent:true},
{id:'nn5',type:'training_due',title:'Training Overdue',message:'C-Suite executives have incomplete BEC training',read:true,time:'1 day ago'},
{id:'nn6',type:'action',title:'Pending Approval',message:'Annual Bonus Notification campaign awaiting approval',read:true,time:'2 days ago',urgent:false}]};

