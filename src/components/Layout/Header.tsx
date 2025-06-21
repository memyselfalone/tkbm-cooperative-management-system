import React, { useState } from 'react';
import { Bell, User, LogOut, Settings, Building2, X, Check, Clock, AlertCircle, Mail, Phone, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Pekerjaan Selesai',
    message: 'Job PJ-JKT-001 telah diselesaikan oleh Tim Leader Ahmad Wijaya',
    timestamp: '2024-03-20T10:30:00Z',
    read: false,
    actionUrl: '/jobs'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Perawatan Alat Berat',
    message: 'Forklift FL-001 memerlukan perawatan rutin dalam 3 hari',
    timestamp: '2024-03-20T09:15:00Z',
    read: false,
    actionUrl: '/equipment'
  },
  {
    id: '3',
    type: 'info',
    title: 'Anggota Baru',
    message: 'Siti Nurhaliza telah bergabung sebagai anggota baru',
    timestamp: '2024-03-20T08:45:00Z',
    read: true,
    actionUrl: '/members'
  },
  {
    id: '4',
    type: 'error',
    title: 'Pembayaran Terlambat',
    message: 'Invoice INV-JKT-2024-002 telah melewati batas waktu pembayaran',
    timestamp: '2024-03-19T16:20:00Z',
    read: false,
    actionUrl: '/billing'
  },
  {
    id: '5',
    type: 'info',
    title: 'Laporan Bulanan',
    message: 'Laporan kinerja bulan Maret telah tersedia untuk diunduh',
    timestamp: '2024-03-19T14:00:00Z',
    read: true,
    actionUrl: '/reports'
  },
  {
    id: '6',
    type: 'success',
    title: 'Backup Berhasil',
    message: 'Backup database harian telah berhasil dilakukan',
    timestamp: '2024-03-19T02:00:00Z',
    read: true
  }
];

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleLogout = () => {
    logout();
  };

  const isSuperadmin = user?.roles[0]?.alias === 'SUPERADMIN';
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-700">
                {isSuperadmin ? 'TKBM Indonesia' : user?.tenant?.name || 'TKBM Cooperative'}
              </h1>
              <p className="text-xs text-gray-500">
                {isSuperadmin ? 'National Management System' : 'Management System'}
              </p>
            </div>
          </div>
          
          {!isSuperadmin && user?.tenant && (
            <div className="hidden md:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-blue-700">{user.tenant.code}</span>
              <span className="text-xs text-blue-600">•</span>
              <span className="text-xs text-blue-600">{user.tenant.city}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifikasi</h3>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Tandai Semua Dibaca
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {unreadCount > 0 && (
                    <p className="text-sm text-gray-600 mt-1">{unreadCount} notifikasi belum dibaca</p>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            markAsRead(notification.id);
                            if (notification.actionUrl) {
                              // Navigate to action URL
                              setShowNotifications(false);
                            }
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getNotificationBgColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTimeAgo(notification.timestamp)}</span>
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-2 mt-1"></div>
                                )}
                              </div>
                              {notification.actionUrl && (
                                <div className="flex items-center space-x-1 mt-2 text-blue-600">
                                  <span className="text-xs font-medium">Lihat Detail</span>
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Tidak ada notifikasi</p>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Lihat Semua Notifikasi
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.fullname}</p>
                  <p className="text-xs text-gray-500">{user?.roles[0]?.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Settings Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Profil & Pengaturan</h3>
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {/* User Profile Info */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-600 mb-2">{user?.roles[0]?.name}</p>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span>{user?.email}</span>
                        </div>
                        {user?.tenant && (
                          <>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Building2 className="w-3 h-3" />
                              <span>{user.tenant.name}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              <span>{user.tenant.city}, {user.tenant.province}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Settings */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-900">Pengaturan Cepat</h5>
                    
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Edit Profil</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Pengaturan Notifikasi</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">Preferensi</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>

                    {isSuperadmin && (
                      <button 
                        onClick={() => {
                          setShowProfileMenu(false);
                          // Navigate to system settings
                          window.location.href = '/settings';
                        }}
                        className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Settings className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Pengaturan Sistem</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                  </div>

                  {/* Account Info */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center justify-between">
                        <span>Terakhir Login:</span>
                        <span>Hari ini, 08:30</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Versi Sistem:</span>
                        <span>v2.1.0</span>
                      </div>
                      {user?.tenant && (
                        <div className="flex items-center justify-between">
                          <span>Kode Tenant:</span>
                          <span className="font-mono">{user.tenant.code}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Keluar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;