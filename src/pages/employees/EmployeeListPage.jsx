import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Users, Search, ArrowDownRight, ArrowUpRight, UserPlus, Download, X, Check } from 'lucide-react';
import { useState } from 'react';

function riskColor(s) { return s >= 70 ? 'bg-risk-500' : s >= 40 ? 'bg-warn-500' : 'bg-secure-500'; }
function riskBadge(s) {
  if (s >= 70) return { text: 'High Risk', cls: 'text-risk-500 bg-risk-500/10 border-risk-500/20' };
  if (s >= 40) return { text: 'Medium', cls: 'text-warn-500 bg-warn-500/10 border-warn-500/20' };
  return { text: 'Low Risk', cls: 'text-secure-500 bg-secure-500/10 border-secure-500/20' };
}

export default function EmployeeListPage() {
  const navigate = useNavigate();
  const { selectedOrg, employees, getDepartments, addEmployee } = useApp();
  const staff = employees[selectedOrg.id] || [];
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', dept: '', email: '' });

  const settingsDepts = getDepartments(selectedOrg.id);
  const staffDepts = [...new Set(staff.map(e => e.dept))];
  const allDepts = [...new Set([...settingsDepts, ...staffDepts])];
  const depts = ['All', ...allDepts];
  const filtered = staff.filter(e =>
    (deptFilter === 'All' || e.dept === deptFilter) &&
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd() {
    if (!newEmp.name.trim() || !newEmp.dept.trim()) return;
    addEmployee(selectedOrg.id, newEmp);
    setNewEmp({ name: '', dept: '', email: '' });
    setShowAdd(false);
  }
  function exportCSV() {
    const rows = ['Name,Department,Risk Score,Status,Trend,Simulations,Clicks,Reports'];
    filtered.forEach(e => rows.push(`${e.name},${e.dept},${e.risk},${riskBadge(e.risk).text},${e.trend},${e.sims},${e.clicks},${e.reports}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${selectedOrg.id}_employees.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-6 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-accent-500" />Employee Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage employees and monitor individual risk scores for <span className="text-accent-500 font-medium">{selectedOrg.name}</span>.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 text-xs font-medium text-accent-500 bg-accent-500/8 px-3 py-2 rounded-lg border border-accent-500/15 hover:bg-accent-500/15 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-xs font-medium text-white bg-gradient-to-r from-accent-500 to-accent-400 px-3 py-2 rounded-lg shadow-sm shadow-accent-500/20 hover:shadow-accent-500/30 transition-all cursor-pointer">
            <UserPlus className="w-3.5 h-3.5" /> Add Employee
          </button>
        </div>
      </div>

      {/* Add Employee Form */}
      {showAdd && (
        <div className="glass rounded-2xl p-4 border border-accent-500/15 animate-slide-down">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Add New Employee to {selectedOrg.name}</h3>
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Full Name</label>
              <input type="text" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} placeholder="e.g. John Smith" className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Department</label>
              <select value={newEmp.dept} onChange={e => setNewEmp({...newEmp, dept: e.target.value})} className="w-full appearance-none bg-white border border-black/10 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent-500/30 cursor-pointer">
                <option value="">Select department</option>
                {allDepts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Email (optional)</label>
              <input type="email" value={newEmp.email} onChange={e => setNewEmp({...newEmp, email: e.target.value})} placeholder="john@company.com" className="w-full bg-white border border-black/10 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
            </div>
            <button onClick={handleAdd} className="w-9 h-9 shrink-0 rounded-lg bg-secure-500 text-white flex items-center justify-center cursor-pointer hover:bg-secure-600 transition-colors">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => setShowAdd(false)} className="w-9 h-9 shrink-0 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-black/8 flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-slate-600 outline-none w-full" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {depts.map((d) => (
            <button key={d} onClick={() => setDeptFilter(d)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${deptFilter === d ? 'bg-accent-500/10 text-accent-500 border-accent-500/20' : 'text-slate-400 border-black/5 hover:text-slate-600'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400 border-b border-black/5 bg-slate-50/50">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Department</th>
                <th className="px-6 py-3 font-medium">Risk Score</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Trend</th>
                <th className="px-6 py-3 font-medium">Simulations</th>
                <th className="px-6 py-3 font-medium">Clicks</th>
                <th className="px-6 py-3 font-medium">Reports</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => {
                const badge = riskBadge(emp.risk);
                return (
                  <tr key={emp.id} onClick={() => navigate(`/employees/${emp.id}`)} className="border-b border-black/[.04] hover:bg-accent-500/[.03] transition-colors animate-fade-in-up cursor-pointer" style={{ animationDelay: `${0.04 * i}s` }}>
                    <td className="px-6 py-3.5 font-medium text-slate-800">{emp.name}</td>
                    <td className="px-6 py-3.5 text-slate-500">{emp.dept}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${riskColor(emp.risk)} transition-all duration-700`} style={{ width: `${emp.risk}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-7 text-right">{emp.risk}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-1 text-xs">
                        {emp.trend === 'improving' ? <ArrowDownRight className="w-3.5 h-3.5 text-secure-500" /> : emp.trend === 'declining' ? <ArrowUpRight className="w-3.5 h-3.5 text-risk-500" /> : <span className="text-slate-400">—</span>}
                        <span className="text-slate-500 capitalize">{emp.trend}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 text-center">{emp.sims}</td>
                    <td className="px-6 py-3.5 text-risk-500 text-center font-medium">{emp.clicks}</td>
                    <td className="px-6 py-3.5 text-secure-500 text-center font-medium">{emp.reports}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-8 text-center text-sm text-slate-400">No employees found matching your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-black/5 text-[11px] text-slate-400 bg-slate-50/30 flex items-center justify-between">
          <span>Showing {filtered.length} of {staff.length} employees</span>
          <span className="text-accent-500 font-medium">{selectedOrg.name}</span>
        </div>
      </div>
    </section>
  );
}
