import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { COMPANIES as DEFAULT_COMPANIES, EMPLOYEES as DEFAULT_EMPLOYEES, CAMPAIGNS as DEFAULT_CAMPAIGNS } from '../services/mock-data';

const AppContext = createContext(null);

function loadJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

export function AppProvider({ children }) {
  const [role, setRole] = useState('admin');
  const [companies, setCompanies] = useState(() => loadJSON('pg-companies', DEFAULT_COMPANIES));
  const [employees, setEmployees] = useState(() => loadJSON('pg-employees', DEFAULT_EMPLOYEES));
  const [campaigns, setCampaigns] = useState(() => loadJSON('pg-campaigns', DEFAULT_CAMPAIGNS));
  const [selectedOrgId, setSelectedOrgId] = useState(() => loadJSON('pg-selected-org', DEFAULT_COMPANIES[0].id));
  const [apiSettings, setApiSettings] = useState(() => loadJSON('pg-api-settings', {
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    model: import.meta.env.VITE_OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free',
  }));
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('pg-theme') || 'light';
    return 'light';
  });

  const selectedOrg = companies.find(c => c.id === selectedOrgId) || companies[0];

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('pg-companies', JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem('pg-employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('pg-campaigns', JSON.stringify(campaigns)); }, [campaigns]);
  useEffect(() => { localStorage.setItem('pg-selected-org', JSON.stringify(selectedOrgId)); }, [selectedOrgId]);
  useEffect(() => { localStorage.setItem('pg-api-settings', JSON.stringify(apiSettings)); }, [apiSettings]);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('pg-theme', theme); }, [theme]);

  function toggleTheme() { setTheme(prev => prev === 'light' ? 'dark' : 'light'); }

  // Company management
  const addCompany = useCallback((company) => {
    const id = company.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now();
    const newCo = { id, ...company, metrics: {
      risk: { value: '50', unit: '/ 100', change: '0%', trend: 'neutral', sub: 'Baseline — new client' },
      campaigns: { value: '0', change: '', trend: 'neutral', sub: 'No campaigns yet' },
      teachable: { value: '0', change: '', trend: 'neutral', sub: 'Training not started' },
      employees: { value: '0', change: '', trend: 'neutral', sub: 'Add employees to begin' },
    }};
    setCompanies(prev => [...prev, newCo]);
    setEmployees(prev => ({ ...prev, [id]: [] }));
    setCampaigns(prev => ({ ...prev, [id]: [] }));
    return id;
  }, []);

  const removeCompany = useCallback((id) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    setEmployees(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
    if (selectedOrgId === id) setSelectedOrgId(prev => companies.find(c => c.id !== id)?.id || companies[0]?.id);
  }, [selectedOrgId, companies]);

  const updateCompany = useCallback((id, updates) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  // Department management — stored per company
  const getDepartments = useCallback((orgId) => {
    const key = `pg-depts-${orgId}`;
    const saved = loadJSON(key, null);
    if (saved) return saved;
    // Derive from employee list
    const staff = employees[orgId] || [];
    const fromStaff = [...new Set(staff.map(e => e.dept))];
    return fromStaff.length > 0 ? fromStaff : ['Finance', 'Engineering', 'HR', 'Sales', 'Legal', 'Marketing', 'Operations'];
  }, [employees]);

  const setDepartments = useCallback((orgId, depts) => {
    localStorage.setItem(`pg-depts-${orgId}`, JSON.stringify(depts));
  }, []);

  // Employee management
  const addEmployee = useCallback((orgId, employee) => {
    const id = 'emp_' + Date.now();
    const newEmp = { id, risk: 50, prev: 50, level: 'Level 1 — Basic Awareness', trend: 'stable', sims: 0, clicks: 0, reports: 0, ...employee };
    setEmployees(prev => ({ ...prev, [orgId]: [...(prev[orgId] || []), newEmp] }));
    // Update company employee count
    setCompanies(prev => prev.map(c => c.id === orgId ? { ...c, metrics: { ...c.metrics, employees: { ...c.metrics.employees, value: String((prev.find(x => x.id === orgId) ? (employees[orgId]?.length || 0) + 1 : 1).toLocaleString()) } } } : c));
    return id;
  }, [employees]);

  const removeEmployee = useCallback((orgId, empId) => {
    setEmployees(prev => ({ ...prev, [orgId]: (prev[orgId] || []).filter(e => e.id !== empId) }));
  }, []);

  return (
    <AppContext.Provider value={{
      role, setRole,
      selectedOrg, selectedOrgId, setSelectedOrgId,
      organizations: companies,
      companies, setCompanies, addCompany, removeCompany, updateCompany,
      employees, setEmployees, addEmployee, removeEmployee,
      getDepartments, setDepartments,
      campaigns, setCampaigns,
      apiSettings, setApiSettings,
      theme, toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
