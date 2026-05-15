import { EMPLOYEES, RISK_TREND_DATA, DEPT_RISK_DATA, OUTCOME_DATA, CAMPAIGNS } from './mock-data';

/**
 * Generates a styled HTML report and opens it in a new print window.
 * Uses pure HTML/CSS — no dependencies needed.
 */
export function generatePDFReport(selectedOrg) {
  const staff = EMPLOYEES[selectedOrg.id] || [];
  const campaigns = CAMPAIGNS[selectedOrg.id] || [];
  const highRisk = staff.filter(e => e.risk >= 70);
  const medRisk = staff.filter(e => e.risk >= 40 && e.risk < 70);
  const lowRisk = staff.filter(e => e.risk < 40);
  const avgRisk = staff.length ? Math.round(staff.reduce((a, e) => a + e.risk, 0) / staff.length) : 0;
  const lastTrend = RISK_TREND_DATA[RISK_TREND_DATA.length - 1];
  const firstTrend = RISK_TREND_DATA[0];
  const riskChange = lastTrend.Overall - firstTrend.Overall;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = `<!DOCTYPE html>
<html>
<head>
<title>PhishGuard AI — Security Report — ${selectedOrg.name}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', -apple-system, sans-serif; color: #1e293b; background: #fff; padding: 40px; line-height: 1.5; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #4f46e5; padding-bottom: 16px; margin-bottom: 32px; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #4f46e5, #059669); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; font-weight: bold; }
  .logo-text { font-size: 18px; font-weight: 700; }
  .logo-text span { color: #4f46e5; }
  .meta { text-align: right; font-size: 12px; color: #64748b; }
  .section { margin-bottom: 28px; }
  .section h2 { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
  .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
  .kpi { padding: 16px; border: 1px solid #e2e8f0; border-radius: 10px; text-align: center; }
  .kpi .value { font-size: 28px; font-weight: 800; }
  .kpi .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-top: 4px; }
  .kpi.green .value { color: #059669; }
  .kpi.red .value { color: #dc2626; }
  .kpi.blue .value { color: #4f46e5; }
  .kpi.amber .value { color: #d97706; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; padding: 8px 12px; background: #f8fafc; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0; }
  td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 10px; font-weight: 600; }
  .badge-red { background: #fef2f2; color: #dc2626; }
  .badge-amber { background: #fffbeb; color: #d97706; }
  .badge-green { background: #ecfdf5; color: #059669; }
  .trend-table td:last-child { text-align: center; font-weight: 600; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
  .footer .confidential { color: #dc2626; font-weight: 600; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .compliance-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; }
  @media print { body { padding: 20px; } .section { break-inside: avoid; } }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-icon">🛡</div>
      <div class="logo-text">PhishGuard <span>AI</span></div>
    </div>
    <div class="meta">
      <div><strong>${selectedOrg.name}</strong></div>
      <div>${selectedOrg.industry} · ${dateStr}</div>
      <div>Quarterly Security Awareness Report</div>
    </div>
  </div>

  <div class="section">
    <h2>Executive Summary</h2>
    <div class="kpi-grid">
      <div class="kpi ${avgRisk >= 50 ? 'red' : 'green'}">
        <div class="value">${avgRisk}/100</div>
        <div class="label">Org Risk Score</div>
      </div>
      <div class="kpi blue">
        <div class="value">${staff.length}</div>
        <div class="label">Employees Tracked</div>
      </div>
      <div class="kpi ${riskChange > 0 ? 'red' : 'green'}">
        <div class="value">${riskChange > 0 ? '+' : ''}${riskChange}</div>
        <div class="label">Risk Score Change (12wk)</div>
      </div>
      <div class="kpi amber">
        <div class="value">${campaigns.length}</div>
        <div class="label">Campaigns Run</div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Risk Distribution</h2>
    <div class="two-col">
      <div>
        <table>
          <tr><th>Risk Level</th><th>Count</th><th>%</th></tr>
          <tr><td><span class="badge badge-red">High (70+)</span></td><td>${highRisk.length}</td><td>${staff.length ? Math.round(highRisk.length / staff.length * 100) : 0}%</td></tr>
          <tr><td><span class="badge badge-amber">Medium (40-69)</span></td><td>${medRisk.length}</td><td>${staff.length ? Math.round(medRisk.length / staff.length * 100) : 0}%</td></tr>
          <tr><td><span class="badge badge-green">Low (&lt;40)</span></td><td>${lowRisk.length}</td><td>${staff.length ? Math.round(lowRisk.length / staff.length * 100) : 0}%</td></tr>
        </table>
      </div>
      <div>
        <table>
          <tr><th>Department</th><th>Risk Score</th></tr>
          ${DEPT_RISK_DATA.map(d => `<tr><td>${d.dept}</td><td style="color:${d.risk >= 60 ? '#dc2626' : d.risk >= 40 ? '#d97706' : '#059669'}; font-weight:600">${d.risk}</td></tr>`).join('')}
        </table>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Employee Risk Detail — Top 10</h2>
    <table>
      <tr><th>#</th><th>Employee</th><th>Department</th><th>Risk Score</th><th>Status</th><th>Trend</th></tr>
      ${staff.sort((a, b) => b.risk - a.risk).slice(0, 10).map((e, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${e.name}</td>
          <td>${e.dept}</td>
          <td style="font-weight:700; color:${e.risk >= 70 ? '#dc2626' : e.risk >= 40 ? '#d97706' : '#059669'}">${e.risk}</td>
          <td><span class="badge ${e.risk >= 70 ? 'badge-red' : e.risk >= 40 ? 'badge-amber' : 'badge-green'}">${e.risk >= 70 ? 'High Risk' : e.risk >= 40 ? 'Medium' : 'Low Risk'}</span></td>
          <td style="text-align:center">${e.trend === 'Improving' ? '↓ Improving' : e.trend === 'Declining' ? '↑ Declining' : '→ Stable'}</td>
        </tr>
      `).join('')}
    </table>
  </div>

  <div class="section">
    <h2>Campaign Performance</h2>
    <table>
      <tr><th>Campaign</th><th>Type</th><th>Status</th><th>Sent</th><th>Click Rate</th><th>Report Rate</th></tr>
      ${campaigns.map(c => `
        <tr>
          <td>${c.name}</td>
          <td>${c.type}</td>
          <td><span class="badge ${c.status === 'Completed' ? 'badge-green' : c.status === 'Active' ? 'badge-amber' : 'badge-red'}">${c.status}</span></td>
          <td>${c.sent || '—'}</td>
          <td style="color:${(c.clicked || 0) > 25 ? '#dc2626' : '#059669'}; font-weight:600">${c.clicked || '—'}%</td>
          <td style="color:#059669; font-weight:600">${c.reported || '—'}%</td>
        </tr>
      `).join('')}
    </table>
  </div>

  <div class="section">
    <h2>Compliance Status</h2>
    ${[
      { fw: 'SOC 2 Type II', ctrl: 'CC6.1 — Security Awareness Training', status: 'Compliant' },
      { fw: 'NIST CSF', ctrl: 'PR.AT-1 — Awareness & Training', status: 'Compliant' },
      { fw: 'ISO 27001', ctrl: 'A.7.2.2 — Info Security Awareness', status: 'In Progress' },
      { fw: 'GDPR', ctrl: 'Art. 39 — DPO Awareness Duties', status: 'Compliant' },
    ].map(c => `
      <div class="compliance-row">
        <div><strong>${c.fw}</strong> — ${c.ctrl}</div>
        <span class="badge ${c.status === 'Compliant' ? 'badge-green' : 'badge-amber'}">${c.status}</span>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ol style="padding-left:20px; font-size:13px; color:#334155; line-height:1.8">
      ${highRisk.length > 0 ? `<li>Schedule targeted spear-phishing simulations for <strong>${highRisk.length} high-risk employees</strong> within 7 days.</li>` : ''}
      <li>Increase simulation frequency for Finance department (currently highest click rate).</li>
      <li>Deploy "Invoice & Payment Fraud" training module to all employees handling financial transactions.</li>
      <li>Review and update the organization's incident response plan for BEC attacks.</li>
      <li>Consider enabling "Manager access to direct reports" for departmental accountability.</li>
    </ol>
  </div>

  <div class="footer">
    <div class="confidential">CONFIDENTIAL — Internal Use Only</div>
    <div>Generated by PhishGuard AI · ${dateStr} · Report ID: PG-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 600);
}
