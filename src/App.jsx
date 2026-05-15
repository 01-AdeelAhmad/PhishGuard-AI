import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import AppShell from './components/layout/AppShell';

// Admin pages
import DashboardPage from './pages/dashboard/DashboardPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import CampaignListPage from './pages/campaigns/CampaignListPage';
import CampaignGeneratorPage from './pages/campaigns/CampaignGeneratorPage';
import CampaignDetailPage from './pages/campaigns/CampaignDetailPage';
import EmployeeListPage from './pages/employees/EmployeeListPage';
import EmployeeDetailPage from './pages/employees/EmployeeDetailPage';
import SettingsPage from './pages/settings/SettingsPage';

// Employee pages
import InboxPage from './pages/employee-view/InboxPage';
import TrainingPage from './pages/employee-view/TrainingPage';
import PersonalDashboardPage from './pages/employee-view/PersonalDashboardPage';

// Public pages
import LandingPage from './pages/public/LandingPage';
import TeachableMomentPublicPage from './pages/public/TeachableMomentPublicPage';
import NotFoundPage from './pages/public/NotFoundPage';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Public routes (no sidebar/header) */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/learn/:id" element={<TeachableMomentPublicPage />} />

        {/* App routes (with sidebar/header) */}
        <Route element={<AppShell />}>
          {/* Admin routes */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/campaigns" element={<CampaignListPage />} />
          <Route path="/campaigns/new" element={<CampaignGeneratorPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Employee routes */}
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/my-dashboard" element={<PersonalDashboardPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}
