import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Truck,
  ClipboardCheck,
  FileText,
  DollarSign,
  BarChart3,
  Building2,
  UserCheck,
  Camera,
  Receipt,
  Wallet,
  Settings,
  Globe
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();

  const getMenuItems = () => {
    const commonItems = [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' }
    ];

    if (userRole === 'superadmin') {
      return [
        ...commonItems,
        { path: '/jobs', icon: Briefcase, label: 'Job Management' },
        { path: '/tenants', icon: Building2, label: 'Tenant Management' },
        { path: '/pbm', icon: Building2, label: 'PBM Management' },
        { path: '/members', icon: Users, label: 'Member Management' },
        { path: '/equipment', icon: Truck, label: 'Equipment Management' },
        { path: '/billing', icon: Receipt, label: 'Billing Management' },
        { path: '/reports', icon: BarChart3, label: 'National Reports' },
        { path: '/settings', icon: Settings, label: 'System Settings' }
      ];
    }

    if (userRole === 'admin') {
      return [
        ...commonItems,
        { path: '/jobs', icon: Briefcase, label: 'Job Management' },
        { path: '/members', icon: Users, label: 'Members' },
        { path: '/equipment', icon: Truck, label: 'Heavy Equipment' },
        { path: '/pbm', icon: Building2, label: 'PBM Partners' },
        { path: '/attendance', icon: UserCheck, label: 'Attendance' },
        { path: '/tracking', icon: Camera, label: 'Job Tracking' },
        { path: '/billing', icon: Receipt, label: 'Billing' },
        { path: '/payroll', icon: Wallet, label: 'Payroll' },
        { path: '/reports', icon: BarChart3, label: 'Reports' }
      ];
    }

    if (userRole === 'pbm') {
      return [
        ...commonItems,
        { path: '/jobs', icon: Briefcase, label: 'My Job Requests' },
        { path: '/billing', icon: Receipt, label: 'Invoices' },
        { path: '/tracking', icon: Camera, label: 'Job Progress' }
      ];
    }

    if (userRole === 'teamleader') {
      return [
        ...commonItems,
        { path: '/jobs', icon: Briefcase, label: 'Assigned Jobs' },
        { path: '/attendance', icon: UserCheck, label: 'Team Attendance' },
        { path: '/tracking', icon: Camera, label: 'Job Tracking' },
        { path: '/payroll', icon: Wallet, label: 'My Payroll' }
      ];
    }

    if (userRole === 'worker') {
      return [
        ...commonItems,
        { path: '/jobs', icon: Briefcase, label: 'My Jobs' },
        { path: '/attendance', icon: UserCheck, label: 'My Attendance' },
        { path: '/payroll', icon: Wallet, label: 'My Payroll' }
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="bg-white shadow-lg border-r border-gray-200 w-64 min-h-screen">
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;