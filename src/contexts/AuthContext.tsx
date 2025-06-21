import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Tenant } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface LoginCredentials {
  account: string;
  password: string;
  device: 'web' | 'mobile';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('tkbm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on credentials
      let mockUser: User;
      
      if (credentials.account === 'superadmin') {
        mockUser = {
          id: '1',
          username: 'superadmin',
          email: 'superadmin@tkbm.co.id',
          fullname: 'Super Administrator',
          roles: [{
            id: '1',
            name: 'Super Administrator',
            alias: 'SUPERADMIN'
          }],
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token'
        };
      } else if (credentials.account === 'admin') {
        mockUser = {
          id: '2',
          username: 'admin',
          email: 'admin@tkbmjakut.co.id',
          fullname: 'Admin Jakarta Utara',
          roles: [{
            id: '2',
            name: 'Admin Koperasi TKBM',
            alias: 'ADMIN'
          }],
          tenant: {
            id: '1',
            name: 'Koperasi TKBM Jakarta Utara',
            code: 'TKBM-JKT-UT',
            address: 'Jl. Pelabuhan Tanjung Priok No. 123',
            city: 'Jakarta Utara',
            province: 'DKI Jakarta',
            phone: '+62-21-4370-1234',
            email: 'info@tkbmjakut.co.id',
            picName: 'Budi Hartono',
            picPhone: '+62-812-3456-7890',
            registrationNumber: 'REG-001/TKBM/2020',
            establishedDate: '2020-01-15',
            status: 'ACTIVE',
            totalMembers: 245,
            totalEquipment: 18,
            createdAt: '2020-01-15T08:00:00Z',
            updatedAt: '2024-03-15T10:30:00Z'
          },
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token'
        };
      } else {
        // Other roles with tenant assignment
        const tenantMap: { [key: string]: Tenant } = {
          'pbm': {
            id: '1',
            name: 'Koperasi TKBM Jakarta Utara',
            code: 'TKBM-JKT-UT',
            address: 'Jl. Pelabuhan Tanjung Priok No. 123',
            city: 'Jakarta Utara',
            province: 'DKI Jakarta',
            phone: '+62-21-4370-1234',
            email: 'info@tkbmjakut.co.id',
            picName: 'Budi Hartono',
            picPhone: '+62-812-3456-7890',
            registrationNumber: 'REG-001/TKBM/2020',
            establishedDate: '2020-01-15',
            status: 'ACTIVE',
            totalMembers: 245,
            totalEquipment: 18,
            createdAt: '2020-01-15T08:00:00Z',
            updatedAt: '2024-03-15T10:30:00Z'
          }
        };

        mockUser = {
          id: '3',
          username: credentials.account,
          email: `${credentials.account}@tkbm.com`,
          fullname: credentials.account === 'pbm' ? 'PBM Manager' :
                   credentials.account === 'teamleader' ? 'Team Leader' : 'Worker',
          roles: [{
            id: '3',
            name: credentials.account === 'pbm' ? 'PBM Manager' :
                  credentials.account === 'teamleader' ? 'Team Leader' : 'Worker',
            alias: credentials.account.toUpperCase()
          }],
          tenant: tenantMap[credentials.account],
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token'
        };
      }

      localStorage.setItem('tkbm_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('tkbm_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};