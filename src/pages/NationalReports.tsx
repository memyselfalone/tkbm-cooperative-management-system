import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter, 
  Calendar,
  Building2,
  Users,
  DollarSign,
  Briefcase,
  Truck,
  MapPin,
  FileText,
  PieChart,
  Activity,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Layers,
  Eye,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import { mockTenants, mockSuperadminDashboardStats } from '../utils/mockData';

// Extended mock data for reports
const mockNationalReports = {
  summary: {
    totalRevenue: 15750000000,
    totalJobs: 489,
    totalMembers: 1056,
    totalEquipment: 67,
    activeTenants: 6,
    totalTenants: 8,
    averageJobValue: 32200000,
    memberUtilization: 78.5,
    equipmentUtilization: 82.3,
    customerSatisfaction: 94.2
  },
  
  monthlyPerformance: [
    { month: 'Jul 2023', revenue: 3200000000, jobs: 65, members: 890, efficiency: 76.2 },
    { month: 'Aug 2023', revenue: 3600000000, jobs: 72, members: 920, efficiency: 78.5 },
    { month: 'Sep 2023', revenue: 3900000000, jobs: 78, members: 945, efficiency: 80.1 },
    { month: 'Oct 2023', revenue: 4200000000, jobs: 85, members: 980, efficiency: 82.3 },
    { month: 'Nov 2023', revenue: 4800000000, jobs: 92, members: 1010, efficiency: 84.7 },
    { month: 'Dec 2023', revenue: 5200000000, jobs: 98, members: 1025, efficiency: 86.2 },
    { month: 'Jan 2024', revenue: 5600000000, jobs: 105, members: 1040, efficiency: 87.8 },
    { month: 'Feb 2024', revenue: 6100000000, jobs: 112, members: 1050, efficiency: 89.1 },
    { month: 'Mar 2024', revenue: 6750000000, jobs: 125, members: 1056, efficiency: 91.4 }
  ],

  provincePerformance: [
    { province: 'DKI Jakarta', tenants: 1, revenue: 4200000000, jobs: 125, members: 245, efficiency: 93.2, growth: 15.8 },
    { province: 'Jawa Timur', tenants: 1, revenue: 3500000000, jobs: 98, members: 189, efficiency: 91.7, growth: 12.4 },
    { province: 'Sumatera Utara', tenants: 1, revenue: 2800000000, jobs: 78, members: 156, efficiency: 89.3, growth: 18.2 },
    { province: 'Jawa Tengah', tenants: 1, revenue: 2400000000, jobs: 65, members: 134, efficiency: 87.9, growth: 14.6 },
    { province: 'Kalimantan Timur', tenants: 1, revenue: 1900000000, jobs: 52, members: 98, efficiency: 85.4, growth: 22.1 },
    { province: 'Kalimantan Barat', tenants: 1, revenue: 1500000000, jobs: 42, members: 89, efficiency: 83.7, growth: 16.9 },
    { province: 'Sulawesi Selatan', tenants: 1, revenue: 450000000, jobs: 18, members: 78, efficiency: 65.2, growth: 8.3 },
    { province: 'Kepulauan Riau', tenants: 1, revenue: 0, jobs: 0, members: 67, efficiency: 0, growth: 0 }
  ],

  jobTypeDistribution: [
    { type: 'Container Loading/Unloading', count: 156, percentage: 31.9, revenue: 5200000000 },
    { type: 'Bulk Cargo Handling', count: 98, percentage: 20.0, revenue: 3800000000 },
    { type: 'General Cargo', count: 87, percentage: 17.8, revenue: 2900000000 },
    { type: 'Coal Loading', count: 65, percentage: 13.3, revenue: 2100000000 },
    { type: 'Palm Oil Loading', count: 45, percentage: 9.2, revenue: 1200000000 },
    { type: 'Timber Loading', count: 23, percentage: 4.7, revenue: 350000000 },
    { type: 'Crude Oil Loading', count: 15, percentage: 3.1, revenue: 200000000 }
  ],

  equipmentUtilization: [
    { category: 'Forklift', total: 28, active: 23, utilization: 82.1, revenue: 4200000000 },
    { category: 'Mobile Crane', total: 18, active: 15, utilization: 83.3, revenue: 3800000000 },
    { category: 'Reach Stacker', total: 12, active: 10, utilization: 83.3, revenue: 2900000000 },
    { category: 'Container Handler', total: 9, active: 7, utilization: 77.8, revenue: 2100000000 }
  ],

  tenantRanking: [
    { 
      tenant: mockTenants[0], 
      rank: 1, 
      score: 94.5, 
      revenue: 4200000000, 
      jobs: 125, 
      efficiency: 93.2,
      growth: 15.8,
      satisfaction: 96.2
    },
    { 
      tenant: mockTenants[1], 
      rank: 2, 
      score: 91.8, 
      revenue: 3500000000, 
      jobs: 98, 
      efficiency: 91.7,
      growth: 12.4,
      satisfaction: 94.8
    },
    { 
      tenant: mockTenants[2], 
      rank: 3, 
      score: 89.2, 
      revenue: 2800000000, 
      jobs: 78, 
      efficiency: 89.3,
      growth: 18.2,
      satisfaction: 92.1
    },
    { 
      tenant: mockTenants[4], 
      rank: 4, 
      score: 87.6, 
      revenue: 2400000000, 
      jobs: 65, 
      efficiency: 87.9,
      growth: 14.6,
      satisfaction: 91.5
    },
    { 
      tenant: mockTenants[5], 
      rank: 5, 
      score: 85.3, 
      revenue: 1900000000, 
      jobs: 52, 
      efficiency: 85.4,
      growth: 22.1,
      satisfaction: 89.7
    },
    { 
      tenant: mockTenants[7], 
      rank: 6, 
      score: 83.1, 
      revenue: 1500000000, 
      jobs: 42, 
      efficiency: 83.7,
      growth: 16.9,
      satisfaction: 88.3
    }
  ],

  kpiTrends: [
    { month: 'Jul', revenue: 3200, jobs: 65, efficiency: 76.2, satisfaction: 89.5 },
    { month: 'Aug', revenue: 3600, jobs: 72, efficiency: 78.5, satisfaction: 90.2 },
    { month: 'Sep', revenue: 3900, jobs: 78, efficiency: 80.1, satisfaction: 91.1 },
    { month: 'Oct', revenue: 4200, jobs: 85, efficiency: 82.3, satisfaction: 92.3 },
    { month: 'Nov', revenue: 4800, jobs: 92, efficiency: 84.7, satisfaction: 93.1 },
    { month: 'Dec', revenue: 5200, jobs: 98, efficiency: 86.2, satisfaction: 93.8 },
    { month: 'Jan', revenue: 5600, jobs: 105, efficiency: 87.8, satisfaction: 94.2 },
    { month: 'Feb', revenue: 6100, jobs: 112, efficiency: 89.1, satisfaction: 94.6 },
    { month: 'Mar', revenue: 6750, jobs: 125, efficiency: 91.4, satisfaction: 95.1 }
  ]
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

const NationalReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'3M' | '6M' | '1Y' | 'ALL'>('1Y');
  const [selectedReport, setSelectedReport] = useState<'overview' | 'financial' | 'operational' | 'performance'>('overview');
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getRankBadge = (rank: number) => {
    const badges = {
      1: { icon: '🥇', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      2: { icon: '🥈', color: 'bg-gray-100 text-gray-800 border-gray-200' },
      3: { icon: '🥉', color: 'bg-orange-100 text-orange-800 border-orange-200' }
    };
    
    return badges[rank as keyof typeof badges] || { 
      icon: `#${rank}`, 
      color: 'bg-blue-100 text-blue-800 border-blue-200' 
    };
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 15) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (growth > 10) return <TrendingUp className="w-4 h-4 text-blue-600" />;
    if (growth > 5) return <TrendingUp className="w-4 h-4 text-yellow-600" />;
    return <TrendingUp className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Nasional TKBM</h1>
          <p className="text-gray-600 mt-1">Analisis komprehensif kinerja seluruh koperasi TKBM Indonesia</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Periode:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['3M', '6M', '1Y', 'ALL'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      selectedPeriod === period
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period === 'ALL' ? 'Semua' : period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">Semua Provinsi</option>
                {mockNationalReports.provincePerformance.map((province) => (
                  <option key={province.province} value={province.province}>
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            {([
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'financial', label: 'Keuangan', icon: DollarSign },
              { key: 'operational', label: 'Operasional', icon: Activity },
              { key: 'performance', label: 'Kinerja', icon: Target }
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedReport(key)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedReport === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockNationalReports.summary.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+18.5%</span>
            <span className="text-gray-500 ml-1">YTD</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pekerjaan</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(mockNationalReports.summary.totalJobs)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">+15.2%</span>
            <span className="text-gray-500 ml-1">vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Anggota</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(mockNationalReports.summary.totalMembers)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Utilisasi: {formatPercentage(mockNationalReports.summary.memberUtilization)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Koperasi Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{mockNationalReports.summary.activeTenants}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">dari {mockNationalReports.summary.totalTenants} total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kepuasan Klien</p>
              <p className="text-3xl font-bold text-gray-900">{formatPercentage(mockNationalReports.summary.customerSatisfaction)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Excellent</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tren Pendapatan Nasional</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Pendapatan (Miliar)</span>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockNationalReports.monthlyPerformance}>
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
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fill="#3b82f6"
                fillOpacity={0.1}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* KPI Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tren KPI Utama</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Efisiensi</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Kepuasan</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockNationalReports.kpiTrends}>
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
                dataKey="efficiency" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Province Performance & Job Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Province Performance */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Kinerja Per Provinsi</h3>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockNationalReports.provincePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="province" 
                stroke="#6b7280" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                fontSize={12}
              />
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
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribusi Jenis Pekerjaan</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={mockNationalReports.jobTypeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {mockNationalReports.jobTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  `${value} pekerjaan (${mockNationalReports.jobTypeDistribution.find(item => item.count === value)?.percentage}%)`,
                  'Total'
                ]}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Equipment Utilization */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Utilisasi Alat Berat Nasional</h3>
          <Truck className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockNationalReports.equipmentUtilization.map((equipment, index) => (
            <div key={equipment.category} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{equipment.category}</h4>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Unit:</span>
                  <span className="font-medium">{equipment.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Aktif:</span>
                  <span className="font-medium text-green-600">{equipment.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utilisasi:</span>
                  <span className="font-medium">{formatPercentage(equipment.utilization)}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${equipment.utilization}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Revenue: {formatCurrency(equipment.revenue)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tenant Ranking */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Peringkat Kinerja Koperasi</h3>
          <Award className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Peringkat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Koperasi</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Skor</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Pendapatan</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Pekerjaan</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Efisiensi</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Pertumbuhan</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Kepuasan</th>
              </tr>
            </thead>
            <tbody>
              {mockNationalReports.tenantRanking.map((tenant) => {
                const badge = getRankBadge(tenant.rank);
                return (
                  <tr key={tenant.tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${badge.color} font-medium text-sm`}>
                        {badge.icon}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tenant.tenant.name}</p>
                          <p className="text-sm text-gray-500">{tenant.tenant.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-bold text-lg ${getPerformanceColor(tenant.score)}`}>
                        {tenant.score.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(tenant.revenue)}
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {tenant.jobs}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${tenant.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12">
                          {formatPercentage(tenant.efficiency)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {getGrowthIcon(tenant.growth)}
                        <span className="font-medium">
                          {formatPercentage(tenant.growth)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {formatPercentage(tenant.satisfaction)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Type Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Detail Jenis Pekerjaan</h3>
          <Layers className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockNationalReports.jobTypeDistribution.map((jobType, index) => (
            <div key={jobType.type} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <h4 className="font-medium text-gray-900 text-sm">{jobType.type}</h4>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {formatPercentage(jobType.percentage)}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Pekerjaan:</span>
                  <span className="font-medium">{jobType.count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">{formatCurrency(jobType.revenue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg per Job:</span>
                  <span className="font-medium">{formatCurrency(jobType.revenue / jobType.count)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NationalReports;