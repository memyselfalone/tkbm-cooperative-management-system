import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  Globe,
  MapPin,
  Truck,
  Ship,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Package,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { mockDashboardStats, mockSuperadminDashboardStats } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();
  const isSuperadmin = userRole === 'superadmin';
  
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');
  
  const stats = isSuperadmin ? mockSuperadminDashboardStats : mockDashboardStats;

  const statusColors = {
    AVAILABLE: '#10b981',
    IN_USE: '#f59e0b',
    MAINTENANCE: '#ef4444',
    OUT_OF_SERVICE: '#6b7280'
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter data based on period and regional
  const filterDataByPeriod = (data: any[], dateField: string = 'timestamp') => {
    if (selectedPeriod === 'ALL') return data;
    
    const now = new Date();
    const periodDays = {
      '1D': 1,
      '7D': 7,
      '30D': 30,
      '90D': 90,
      '1Y': 365
    };
    
    const days = periodDays[selectedPeriod];
    const cutoffDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return data.filter(item => {
      const itemDate = new Date(item[dateField]);
      return itemDate >= cutoffDate;
    });
  };

  const filterDataByRegional = (data: any[]) => {
    if (selectedRegional === 'ALL') return data;
    
    const provinceMap = {
      'DKI_JAKARTA': 'DKI Jakarta',
      'JAWA_TIMUR': 'Jawa Timur',
      'SUMATERA_UTARA': 'Sumatera Utara',
      'JAWA_TENGAH': 'Jawa Tengah',
      'KALIMANTAN_TIMUR': 'Kalimantan Timur',
      'KALIMANTAN_BARAT': 'Kalimantan Barat',
      'SULAWESI_SELATAN': 'Sulawesi Selatan',
      'KEPULAUAN_RIAU': 'Kepulauan Riau'
    };
    
    const targetProvince = provinceMap[selectedRegional];
    return data.filter(item => {
      if (item.tenant) return item.tenant.province === targetProvince;
      if (item.province) return item.province === targetProvince;
      return true;
    });
  };

  if (isSuperadmin) {
    const superStats = stats as typeof mockSuperadminDashboardStats;
    
    // Apply filters to activities
    const filteredActivities = filterDataByPeriod(
      filterDataByRegional(superStats.recentActivities),
      'timestamp'
    );
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Nasional TKBM</h1>
            <p className="text-gray-600 mt-1">Selamat datang kembali, {user?.fullname}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Peran Sistem</p>
            <p className="font-semibold text-blue-600">{user?.roles[0]?.name}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <PeriodFilter
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
            <RegionalFilter
              selectedRegional={selectedRegional}
              onRegionalChange={setSelectedRegional}
            />
          </div>
        </div>

        {/* National Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Koperasi</p>
                <p className="text-3xl font-bold text-gray-900">{superStats.totalTenants}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">{superStats.activeTenants} Aktif</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Anggota</p>
                <p className="text-3xl font-bold text-gray-900">{superStats.totalMembers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Globe className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600 font-medium">Seluruh Indonesia</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alat Berat</p>
                <p className="text-3xl font-bold text-gray-900">{superStats.totalEquipment}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">Semua Wilayah</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendapatan Nasional</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(superStats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+18% YTD</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Koperasi Aktif</p>
                <p className="text-3xl font-bold text-gray-900">{superStats.activeTenants}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">dari {superStats.totalTenants} total</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* National Revenue Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Tren Pendapatan Nasional</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={superStats.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Pendapatan']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Province Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Distribusi Provinsi</h3>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={superStats.provinceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="province" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="totalMembers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenant Performance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Kinerja Koperasi</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Koperasi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Lokasi</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Total Pekerjaan</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Selesai</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Pendapatan</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Efisiensi</th>
                </tr>
              </thead>
              <tbody>
                {superStats.tenantPerformance.map((performance) => (
                  <tr key={performance.tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{performance.tenant.name}</p>
                          <p className="text-sm text-gray-500">{performance.tenant.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{performance.tenant.city}</p>
                      <p className="text-sm text-gray-500">{performance.tenant.province}</p>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">{performance.totalJobs}</td>
                    <td className="py-4 px-4 text-right font-medium text-green-600">{performance.completedJobs}</td>
                    <td className="py-4 px-4 text-right font-medium">{formatCurrency(performance.revenue)}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${performance.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {performance.efficiency.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Nasional Terkini</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {activity.type === 'tenant_registered' ? (
                    <Building2 className="w-4 h-4 text-blue-600" />
                  ) : activity.type === 'job_completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : activity.type === 'tenant_suspended' ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : activity.type === 'revenue_milestone' ? (
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  ) : activity.type === 'member_milestone' ? (
                    <Users className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Activity className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">oleh {activity.user}</p>
                    {activity.tenant && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-blue-600">{activity.tenant.name}</p>
                      </>
                    )}
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Tidak ada aktivitas dalam periode dan regional yang dipilih</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Regular tenant dashboard
  const regularStats = stats as typeof mockDashboardStats;
  
  // Apply filters to activities
  const filteredActivities = filterDataByPeriod(regularStats.recentActivities, 'timestamp');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Selamat datang kembali, {user?.fullname}</p>
          {user?.tenant && (
            <p className="text-sm text-blue-600 mt-1">{user.tenant.name} - {user.tenant.city}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Peran Saat Ini</p>
          <p className="font-semibold text-blue-600">{user?.roles[0]?.name}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          <PeriodFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
          {/* Regional filter hidden for tenant users since they only see their own data */}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pekerjaan Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{regularStats.totalActiveJobs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Ship className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pekerjaan Selesai</p>
              <p className="text-3xl font-bold text-gray-900">{regularStats.totalCompletedJobs}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Buruh Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{regularStats.totalActiveWorkers}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+5%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(regularStats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+15%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Job Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tren Pekerjaan Bulanan</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={regularStats.monthlyJobTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="jobs" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Equipment Utilization */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Utilisasi Alat Berat</h3>
            <Truck className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {regularStats.equipmentUtilization.map((equipment) => (
              <div key={equipment.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColors[equipment.status] }}
                  ></div>
                  <span className="font-medium text-gray-900">{equipment.name}</span>
                  <span className="text-sm text-gray-500 capitalize">
                    {equipment.status === 'AVAILABLE' ? 'Tersedia' :
                     equipment.status === 'IN_USE' ? 'Digunakan' :
                     equipment.status === 'MAINTENANCE' ? 'Perawatan' : 'Tidak Beroperasi'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${equipment.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {equipment.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terkini</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                {activity.type === 'job_completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : activity.type === 'job_assigned' ? (
                  <Package className="w-4 h-4 text-blue-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">oleh {activity.user}</p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          
          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada aktivitas dalam periode yang dipilih</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;