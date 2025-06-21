import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Lock, User, Monitor, Smartphone } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({
    account: '',
    password: '',
    device: 'web' as 'web' | 'mobile'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const demoAccounts = [
    { account: 'superadmin', password: 'password', role: 'Super Administrator' },
    { account: 'admin', password: 'password', role: 'Admin Koperasi TKBM' },
    { account: 'pbm', password: 'password', role: 'PBM Manager' },
    { account: 'teamleader', password: 'password', role: 'Team Leader' },
    { account: 'worker', password: 'password', role: 'Worker' }
  ];

  const handleDemoLogin = (account: string, password: string) => {
    setCredentials({ account, password, device: 'web' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TKBM Cooperative</h1>
            <p className="text-gray-600 mt-2">Management System Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={credentials.account}
                  onChange={(e) => setCredentials({ ...credentials, account: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter email or username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCredentials({ ...credentials, device: 'web' })}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    credentials.device === 'web' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm font-medium">Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCredentials({ ...credentials, device: 'mobile' })}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                    credentials.device === 'mobile' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-sm font-medium">Mobile</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
            <div className="space-y-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.account}
                  onClick={() => handleDemoLogin(demo.account, demo.password)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{demo.role}</span>
                    <span className="text-sm text-gray-500">{demo.account}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;