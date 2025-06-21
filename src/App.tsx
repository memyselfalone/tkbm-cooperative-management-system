import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import Dashboard from './pages/Dashboard';
import JobManagement from './pages/JobManagement';
import Members from './pages/Members';
import TenantManagement from './pages/TenantManagement';
import HeavyEquipment from './pages/HeavyEquipment';
import PBMManagement from './pages/PBMManagement';
import BillingManagement from './pages/BillingManagement';
import NationalReports from './pages/NationalReports';
import SystemSettings from './pages/SystemSettings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        
        {/* Superadmin routes */}
        {userRole === 'superadmin' && (
          <>
            <Route path="jobs" element={<JobManagement />} />
            <Route path="tenants" element={<TenantManagement />} />
            <Route path="pbm" element={<PBMManagement />} />
            <Route path="members" element={<Members />} />
            <Route path="equipment" element={<HeavyEquipment />} />
            <Route path="billing" element={<BillingManagement />} />
            <Route path="reports" element={<NationalReports />} />
            <Route path="settings" element={<SystemSettings />} />
          </>
        )}
        
        {/* Common routes for admin and superadmin */}
        {(userRole === 'superadmin' || userRole === 'admin') && (
          <>
            <Route path="attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Attendance - Coming Soon</h1></div>} />
            <Route path="tracking" element={<div className="p-6"><h1 className="text-2xl font-bold">Job Tracking - Coming Soon</h1></div>} />
            <Route path="payroll" element={<div className="p-6"><h1 className="text-2xl font-bold">Payroll - Coming Soon</h1></div>} />
          </>
        )}

        {/* Admin-only routes */}
        {userRole === 'admin' && (
          <>
            <Route path="jobs" element={<JobManagement />} />
            <Route path="members" element={<Members />} />
            <Route path="equipment" element={<HeavyEquipment />} />
            <Route path="pbm" element={<div className="p-6"><h1 className="text-2xl font-bold">PBM Partners - Coming Soon</h1></div>} />
            <Route path="billing" element={<div className="p-6"><h1 className="text-2xl font-bold">Billing - Coming Soon</h1></div>} />
            <Route path="reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports - Coming Soon</h1></div>} />
          </>
        )}

        {/* PBM routes */}
        {userRole === 'pbm' && (
          <>
            <Route path="jobs" element={<JobManagement />} />
            <Route path="billing" element={<div className="p-6"><h1 className="text-2xl font-bold">Invoices - Coming Soon</h1></div>} />
            <Route path="tracking" element={<div className="p-6"><h1 className="text-2xl font-bold">Job Progress - Coming Soon</h1></div>} />
          </>
        )}

        {/* Team Leader routes */}
        {userRole === 'teamleader' && (
          <>
            <Route path="jobs" element={<JobManagement />} />
            <Route path="attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Team Attendance - Coming Soon</h1></div>} />
            <Route path="tracking" element={<div className="p-6"><h1 className="text-2xl font-bold">Job Tracking - Coming Soon</h1></div>} />
            <Route path="payroll" element={<div className="p-6"><h1 className="text-2xl font-bold">My Payroll - Coming Soon</h1></div>} />
          </>
        )}

        {/* Worker routes */}
        {userRole === 'worker' && (
          <>
            <Route path="jobs" element={<JobManagement />} />
            <Route path="attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">My Attendance - Coming Soon</h1></div>} />
            <Route path="payroll" element={<div className="p-6"><h1 className="text-2xl font-bold">My Payroll - Coming Soon</h1></div>} />
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute>
          <AppRoutes />
        </ProtectedRoute>
      </Router>
    </AuthProvider>
  );
}

export default App;