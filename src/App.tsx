import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DomainsPage from './pages/domains';
import MailboxesPage from './pages/mailboxes';
import SettingsPage from './pages/settings';
import SubscriptionPage from './pages/subscription';
import HelpPage from './pages/help';
import ProfilePage from './pages/profile';

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50 backdrop-blur-sm">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/mailboxes" element={<MailboxesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;