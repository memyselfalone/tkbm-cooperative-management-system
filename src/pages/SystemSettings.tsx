import React, { useState } from 'react';
import { 
  Settings,
  Shield,
  Database,
  Mail,
  Bell,
  Globe,
  Users,
  Key,
  Server,
  Monitor,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  Edit,
  X
} from 'lucide-react';

interface SystemConfig {
  general: {
    systemName: string;
    systemVersion: string;
    maintenanceMode: boolean;
    debugMode: boolean;
    timezone: string;
    language: string;
    dateFormat: string;
    currency: string;
  };
  security: {
    sessionTimeout: number;
    passwordMinLength: number;
    passwordRequireSpecialChars: boolean;
    maxLoginAttempts: number;
    twoFactorAuth: boolean;
    ipWhitelist: string[];
    apiRateLimit: number;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    smtpEncryption: 'none' | 'tls' | 'ssl';
    fromEmail: string;
    fromName: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    systemAlerts: boolean;
    jobAlerts: boolean;
    billingAlerts: boolean;
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    backupRetention: number;
    backupLocation: string;
    lastBackup: string;
  };
  api: {
    apiEnabled: boolean;
    apiVersion: string;
    rateLimitPerHour: number;
    allowedOrigins: string[];
    webhookUrl: string;
  };
}

const mockSystemConfig: SystemConfig = {
  general: {
    systemName: 'TKBM Management System',
    systemVersion: '2.1.0',
    maintenanceMode: false,
    debugMode: false,
    timezone: 'Asia/Jakarta',
    language: 'id',
    dateFormat: 'DD/MM/YYYY',
    currency: 'IDR'
  },
  security: {
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    apiRateLimit: 1000
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'system@tkbm.co.id',
    smtpPassword: '••••••••••••',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@tkbm.co.id',
    fromName: 'TKBM System'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    systemAlerts: true,
    jobAlerts: true,
    billingAlerts: true
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: '/backups/tkbm',
    lastBackup: '2024-03-20T02:00:00Z'
  },
  api: {
    apiEnabled: true,
    apiVersion: 'v1',
    rateLimitPerHour: 10000,
    allowedOrigins: ['https://app.tkbm.co.id', 'https://mobile.tkbm.co.id'],
    webhookUrl: 'https://api.tkbm.co.id/webhooks'
  }
};

const SystemSettings: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>(mockSystemConfig);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'email' | 'notifications' | 'backup' | 'api' | 'logs'>('general');
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newIpAddress, setNewIpAddress] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const tabs = [
    { id: 'general', label: 'Umum', icon: Settings },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'api', label: 'API', icon: Globe },
    { id: 'logs', label: 'Logs', icon: FileText }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    // Show success message
  };

  const handleBackup = async () => {
    // Simulate backup process
    setShowBackupModal(false);
  };

  const handleRestore = async () => {
    // Simulate restore process
    setShowRestoreModal(false);
  };

  const addIpAddress = () => {
    if (newIpAddress && !config.security.ipWhitelist.includes(newIpAddress)) {
      setConfig(prev => ({
        ...prev,
        security: {
          ...prev.security,
          ipWhitelist: [...prev.security.ipWhitelist, newIpAddress]
        }
      }));
      setNewIpAddress('');
    }
  };

  const removeIpAddress = (ip: string) => {
    setConfig(prev => ({
      ...prev,
      security: {
        ...prev.security,
        ipWhitelist: prev.security.ipWhitelist.filter(item => item !== ip)
      }
    }));
  };

  const addOrigin = () => {
    if (newOrigin && !config.api.allowedOrigins.includes(newOrigin)) {
      setConfig(prev => ({
        ...prev,
        api: {
          ...prev.api,
          allowedOrigins: [...prev.api.allowedOrigins, newOrigin]
        }
      }));
      setNewOrigin('');
    }
  };

  const removeOrigin = (origin: string) => {
    setConfig(prev => ({
      ...prev,
      api: {
        ...prev.api,
        allowedOrigins: prev.api.allowedOrigins.filter(item => item !== origin)
      }
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Sistem</label>
          <input
            type="text"
            value={config.general.systemName}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, systemName: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Versi Sistem</label>
          <input
            type="text"
            value={config.general.systemVersion}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zona Waktu</label>
          <select
            value={config.general.timezone}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, timezone: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
            <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
            <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bahasa</label>
          <select
            value={config.general.language}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, language: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Format Tanggal</label>
          <select
            value={config.general.dateFormat}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, dateFormat: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mata Uang</label>
          <select
            value={config.general.currency}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              general: { ...prev.general, currency: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="IDR">Indonesian Rupiah (IDR)</option>
            <option value="USD">US Dollar (USD)</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Mode Sistem</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-900">Mode Maintenance</p>
                <p className="text-sm text-yellow-700">Sistem akan tidak dapat diakses oleh pengguna</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.general.maintenanceMode}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  general: { ...prev.general, maintenanceMode: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Mode Debug</p>
                <p className="text-sm text-blue-700">Menampilkan informasi debug untuk pengembangan</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.general.debugMode}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  general: { ...prev.general, debugMode: e.target.checked }
                }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (menit)</label>
          <input
            type="number"
            value={config.security.sessionTimeout}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Panjang Minimum Password</label>
          <input
            type="number"
            value={config.security.passwordMinLength}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Maksimal Percobaan Login</label>
          <input
            type="number"
            value={config.security.maxLoginAttempts}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (per jam)</label>
          <input
            type="number"
            value={config.security.apiRateLimit}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              security: { ...prev.security, apiRateLimit: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Password Karakter Khusus</p>
              <p className="text-sm text-green-700">Wajibkan karakter khusus dalam password</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.security.passwordRequireSpecialChars}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                security: { ...prev.security, passwordRequireSpecialChars: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Two-Factor Authentication</p>
              <p className="text-sm text-purple-700">Aktifkan 2FA untuk semua pengguna admin</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.security.twoFactorAuth}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                security: { ...prev.security, twoFactorAuth: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">IP Whitelist</h3>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newIpAddress}
              onChange={(e) => setNewIpAddress(e.target.value)}
              placeholder="192.168.1.0/24"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addIpAddress}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {config.security.ipWhitelist.map((ip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm">{ip}</span>
                <button
                  onClick={() => removeIpAddress(ip)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={config.email.smtpHost}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, smtpHost: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="number"
            value={config.email.smtpPort}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, smtpPort: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={config.email.smtpUsername}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, smtpUsername: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              value={config.email.smtpPassword}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                email: { ...prev.email, smtpPassword: e.target.value }
              }))}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enkripsi</label>
          <select
            value={config.email.smtpEncryption}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, smtpEncryption: e.target.value as 'none' | 'tls' | 'ssl' }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="none">None</option>
            <option value="tls">TLS</option>
            <option value="ssl">SSL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={config.email.fromEmail}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, fromEmail: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={config.email.fromName}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              email: { ...prev.email, fromName: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Mail className="w-4 h-4" />
          <span>Test Email Configuration</span>
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Email Notifications</p>
              <p className="text-sm text-blue-700">Kirim notifikasi melalui email</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.notifications.emailNotifications}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, emailNotifications: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Push Notifications</p>
              <p className="text-sm text-green-700">Notifikasi push untuk aplikasi mobile</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.notifications.pushNotifications}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, pushNotifications: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">System Alerts</p>
              <p className="text-sm text-red-700">Alert untuk masalah sistem kritis</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.notifications.systemAlerts}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, systemAlerts: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900">Job Alerts</p>
              <p className="text-sm text-purple-700">Notifikasi untuk update pekerjaan</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.notifications.jobAlerts}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, jobAlerts: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Billing Alerts</p>
              <p className="text-sm text-yellow-700">Notifikasi untuk tagihan dan pembayaran</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.notifications.billingAlerts}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                notifications: { ...prev.notifications, billingAlerts: e.target.checked }
              }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frekuensi Backup</label>
          <select
            value={config.backup.backupFrequency}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              backup: { ...prev.backup, backupFrequency: e.target.value as 'daily' | 'weekly' | 'monthly' }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retensi Backup (hari)</label>
          <input
            type="number"
            value={config.backup.backupRetention}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              backup: { ...prev.backup, backupRetention: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Backup</label>
          <input
            type="text"
            value={config.backup.backupLocation}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              backup: { ...prev.backup, backupLocation: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-900">Auto Backup</p>
            <p className="text-sm text-green-700">Backup otomatis sesuai jadwal</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.backup.autoBackup}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              backup: { ...prev.backup, autoBackup: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status Backup</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Backup Terakhir:</span>
            <span className="font-medium">{formatDate(config.backup.lastBackup)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">Berhasil</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setShowBackupModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Backup Sekarang</span>
        </button>
        <button
          onClick={() => setShowRestoreModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Restore Backup</span>
        </button>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
          <input
            type="text"
            value={config.api.apiVersion}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (per jam)</label>
          <input
            type="number"
            value={config.api.rateLimitPerHour}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              api: { ...prev.api, rateLimitPerHour: parseInt(e.target.value) }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
          <input
            type="url"
            value={config.api.webhookUrl}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              api: { ...prev.api, webhookUrl: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">API Enabled</p>
            <p className="text-sm text-blue-700">Aktifkan akses API eksternal</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.api.apiEnabled}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              api: { ...prev.api, apiEnabled: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Allowed Origins</h3>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="url"
              value={newOrigin}
              onChange={(e) => setNewOrigin(e.target.value)}
              placeholder="https://app.example.com"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addOrigin}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {config.api.allowedOrigins.map((origin, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm">{origin}</span>
                <button
                  onClick={() => removeOrigin(origin)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Logs</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <p className="font-medium">Application Logs</p>
              <p className="text-sm text-gray-600">Log aktivitas aplikasi</p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <p className="font-medium">Error Logs</p>
              <p className="text-sm text-gray-600">Log error sistem</p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <p className="font-medium">Access Logs</p>
              <p className="text-sm text-gray-600">Log akses pengguna</p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Log Retention</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Log sistem akan disimpan selama 90 hari. Log yang lebih lama akan dihapus otomatis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'email':
        return renderEmailSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'backup':
        return renderBackupSettings();
      case 'api':
        return renderApiSettings();
      case 'logs':
        return renderLogsSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
          <p className="text-gray-600 mt-1">Kelola konfigurasi dan pengaturan sistem TKBM</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Database</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin membuat backup database sekarang? Proses ini mungkin memakan waktu beberapa menit.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBackupModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleBackup}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Ya, Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Restore Database</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih File Backup
                  </label>
                  <input
                    type="file"
                    accept=".sql,.zip"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <p className="text-sm text-red-700">
                      <strong>Peringatan:</strong> Restore akan mengganti semua data yang ada. Pastikan Anda telah membuat backup terlebih dahulu.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleRestore}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;