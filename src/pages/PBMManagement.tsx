import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  User,
  Briefcase,
  DollarSign,
  TrendingUp,
  BarChart3,
  FileText,
  Activity
} from 'lucide-react';
import { mockPBMs, mockTenants, mockJobRequests } from '../utils/mockData';
import { PBM } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

// Extended mock PBM data for demonstration
const extendedMockPBMs: PBM[] = [
  ...mockPBMs,
  {
    id: '4',
    name: 'PT Pelindo Logistik',
    email: 'info@pelindologistik.co.id',
    telephone: '+62-21-5552345',
    address: 'Jl. Pelabuhan Utama No. 88, Jakarta Utara',
    picName: 'Agus Setiawan',
    isActive: true,
    tenant: mockTenants[0],
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '5',
    name: 'PT Mitra Pelabuhan Surabaya',
    email: 'admin@mitrapelabuhan.co.id',
    telephone: '+62-31-5553456',
    address: 'Jl. Tanjung Perak Barat No. 12, Surabaya',
    picName: 'Indira Sari',
    isActive: true,
    tenant: mockTenants[1],
    createdAt: '2024-02-05T11:30:00Z'
  },
  {
    id: '6',
    name: 'PT Cargo Express Medan',
    email: 'contact@cargoexpress.co.id',
    telephone: '+62-61-5554567',
    address: 'Jl. Belawan Raya No. 34, Medan',
    picName: 'Rahman Hakim',
    isActive: true,
    tenant: mockTenants[2],
    createdAt: '2024-01-25T14:15:00Z'
  },
  {
    id: '7',
    name: 'PT Bahari Shipping',
    email: 'info@baharishipping.co.id',
    telephone: '+62-411-5555678',
    address: 'Jl. Pelabuhan Makassar No. 56, Makassar',
    picName: 'Nurul Aisyah',
    isActive: false,
    tenant: mockTenants[3],
    createdAt: '2024-03-01T08:45:00Z'
  },
  {
    id: '8',
    name: 'PT Semarang Port Services',
    email: 'admin@semarangport.co.id',
    telephone: '+62-24-5556789',
    address: 'Jl. Tanjung Emas No. 78, Semarang',
    picName: 'Bambang Wijaya',
    isActive: true,
    tenant: mockTenants[4],
    createdAt: '2024-02-20T16:20:00Z'
  },
  {
    id: '9',
    name: 'PT Kalimantan Maritime',
    email: 'contact@kalimaritime.co.id',
    telephone: '+62-542-5557890',
    address: 'Jl. Semayang Port No. 90, Balikpapan',
    picName: 'Dewi Kartika',
    isActive: true,
    tenant: mockTenants[5],
    createdAt: '2024-02-15T13:10:00Z'
  },
  {
    id: '10',
    name: 'PT Batam Logistics Hub',
    email: 'info@batamlogi.co.id',
    telephone: '+62-778-5558901',
    address: 'Jl. Sekupang Terminal No. 12, Batam',
    picName: 'Rudi Santoso',
    isActive: false,
    tenant: mockTenants[6],
    createdAt: '2024-03-05T10:30:00Z'
  },
  {
    id: '11',
    name: 'PT Pontianak Cargo',
    email: 'admin@pontianakcargo.co.id',
    telephone: '+62-561-5559012',
    address: 'Jl. Dwikora Port No. 45, Pontianak',
    picName: 'Sari Melati',
    isActive: true,
    tenant: mockTenants[7],
    createdAt: '2024-02-28T15:45:00Z'
  }
];

const PBMManagement: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();
  const isSuperadmin = userRole === 'superadmin';
  
  const [pbms] = useState<PBM[]>(extendedMockPBMs);
  const [selectedPBM, setSelectedPBM] = useState<PBM | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | 'jobs'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [tenantFilter, setTenantFilter] = useState<string>('ALL');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (pbm: PBM) => {
    if (selectedPeriod === 'ALL') return true;
    
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
    const pbmDate = new Date(pbm.createdAt);
    
    return pbmDate >= cutoffDate;
  };

  const filterByRegional = (pbm: PBM) => {
    if (selectedRegional === 'ALL') return true;
    
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
    
    return pbm.tenant.province === provinceMap[selectedRegional];
  };

  const filteredPBMs = pbms.filter(pbm => {
    const matchesSearch = pbm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pbm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pbm.picName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pbm.tenant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || 
                         (statusFilter === 'ACTIVE' && pbm.isActive) ||
                         (statusFilter === 'INACTIVE' && !pbm.isActive);
    const matchesTenant = tenantFilter === 'ALL' || pbm.tenant.id === tenantFilter;
    const matchesPeriod = filterByPeriod(pbm);
    const matchesRegional = isSuperadmin ? filterByRegional(pbm) : true;
    return matchesSearch && matchesStatus && matchesTenant && matchesPeriod && matchesRegional;
  });

  const openModal = (pbm: PBM | null, type: 'view' | 'edit' | 'create' | 'jobs') => {
    setSelectedPBM(pbm);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPBM(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate statistics
  const totalPBMs = filteredPBMs.length;
  const activePBMs = filteredPBMs.filter(pbm => pbm.isActive).length;
  const inactivePBMs = filteredPBMs.filter(pbm => !pbm.isActive).length;
  const totalJobs = mockJobRequests.length;

  // Get PBM jobs for selected PBM
  const getPBMJobs = (pbmId: string) => {
    return mockJobRequests.filter(job => job.pbm.id === pbmId);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredPBMs.map((pbm) => {
        const pbmJobs = getPBMJobs(pbm.id);
        const completedJobs = pbmJobs.filter(job => job.status === 'COMPLETED_APPROVED').length;
        
        return (
          <div key={pbm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{pbm.name}</h3>
                    <p className="text-sm text-gray-600">{pbm.tenant.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {pbm.isActive ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Aktif
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Tidak Aktif
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{pbm.tenant.city}, {pbm.tenant.province}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{pbm.telephone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{pbm.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{pbm.picName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Bergabung {formatDate(pbm.createdAt)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">Total Jobs</span>
                  </div>
                  <p className="text-lg font-bold text-blue-700">{pbmJobs.length}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-900">Selesai</span>
                  </div>
                  <p className="text-lg font-bold text-green-700">{completedJobs}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => openModal(pbm, 'view')}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Lihat Detail</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(pbm, 'jobs')}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                    title="Lihat Pekerjaan"
                  >
                    <Briefcase className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal(pbm, 'edit')}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTableView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-700">PBM</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Koperasi</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Kontak</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Jobs</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPBMs.map((pbm) => {
              const pbmJobs = getPBMJobs(pbm.id);
              const completedJobs = pbmJobs.filter(job => job.status === 'COMPLETED_APPROVED').length;
              
              return (
                <tr key={pbm.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pbm.name}</p>
                        <p className="text-sm text-gray-500">{pbm.picName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-gray-900">{pbm.tenant.name}</p>
                      <p className="text-sm text-gray-500">{pbm.tenant.city}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-gray-900">{pbm.telephone}</p>
                      <p className="text-sm text-gray-500">{pbm.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div>
                      <span className="font-medium text-gray-900">{pbmJobs.length}</span>
                      <p className="text-sm text-green-600">{completedJobs} selesai</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {pbm.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Aktif
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                            Tidak Aktif
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openModal(pbm, 'view')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal(pbm, 'jobs')}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        title="Lihat Pekerjaan"
                      >
                        <Briefcase className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal(pbm, 'edit')}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredPBMs.map((pbm) => {
        const pbmJobs = getPBMJobs(pbm.id);
        const completedJobs = pbmJobs.filter(job => job.status === 'COMPLETED_APPROVED').length;
        
        return (
          <div key={pbm.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pbm.name}</h3>
                    <p className="text-gray-600 mb-2">{pbm.tenant.name}</p>
                    <div className="flex items-center space-x-2">
                      {pbm.isActive ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                            Aktif
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                            Tidak Aktif
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pbm.tenant.city}, {pbm.tenant.province}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{pbm.telephone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{pbm.email}</span>
                  </div>
                  <div className="flex items-center space-x-2  text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{pbm.picName}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">Total Jobs</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{pbmJobs.length}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-900">Selesai</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{completedJobs}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Bergabung {formatDate(pbm.createdAt)}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openModal(pbm, 'view')}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Detail</span>
                  </button>
                  <button
                    onClick={() => openModal(pbm, 'jobs')}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                    title="Lihat Pekerjaan"
                  >
                    <Briefcase className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => openModal(pbm, 'edit')}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderContent = () => {
    switch (viewType) {
      case 'table':
        return renderTableView();
      case 'card':
        return renderCardView();
      default:
        return renderGridView();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen PBM Nasional</h1>
          <p className="text-gray-600 mt-1">Kelola seluruh perusahaan bongkar muat di Indonesia</p>
        </div>
        <button 
          onClick={() => openModal(null, 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah PBM Baru</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
            <PeriodFilter
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />
            {isSuperadmin && (
              <RegionalFilter
                selectedRegional={selectedRegional}
                onRegionalChange={setSelectedRegional}
              />
            )}
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari PBM berdasarkan nama, email, PIC, atau koperasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="ACTIVE">Aktif</option>
                  <option value="INACTIVE">Tidak Aktif</option>
                </select>
              </div>
              <select
                value={tenantFilter}
                onChange={(e) => setTenantFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">Semua Koperasi</option>
                {mockTenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
                ))}
              </select>
              <ViewTypeSelector
                viewType={viewType}
                onViewTypeChange={setViewType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PBM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total PBM</p>
              <p className="text-3xl font-bold text-gray-900">{totalPBMs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Filtered results</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">PBM Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{activePBMs}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{totalPBMs > 0 ? ((activePBMs/totalPBMs)*100).toFixed(1) : 0}% dari total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">PBM Tidak Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{inactivePBMs}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Perlu perhatian</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pekerjaan</p>
              <p className="text-3xl font-bold text-gray-900">{totalJobs}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Activity className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">Semua PBM</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {filteredPBMs.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada PBM ditemukan</h3>
          <p className="text-gray-600">Coba sesuaikan kriteria pencarian, periode, atau filter regional Anda.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalType === 'view' && 'Detail PBM'}
                  {modalType === 'edit' && 'Edit PBM'}
                  {modalType === 'create' && 'Tambah PBM Baru'}
                  {modalType === 'jobs' && 'Riwayat Pekerjaan PBM'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {modalType === 'view' && selectedPBM && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPBM.name}</h3>
                      <p className="text-gray-600 mb-2">{selectedPBM.tenant.name}</p>
                      <div className="flex items-center space-x-2">
                        {selectedPBM.isActive ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                              Tidak Aktif
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Informasi Kontak</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Alamat</p>
                            <p className="text-gray-900">{selectedPBM.address}</p>
                            <p className="text-gray-600">{selectedPBM.tenant.city}, {selectedPBM.tenant.province}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Telepon</p>
                            <p className="text-gray-900">{selectedPBM.telephone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Email</p>
                            <p className="text-gray-900">{selectedPBM.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Informasi Perusahaan</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Person in Charge</p>
                            <p className="text-gray-900">{selectedPBM.picName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Building2 className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Koperasi Mitra</p>
                            <p className="text-gray-900">{selectedPBM.tenant.name}</p>
                            <p className="text-gray-600">{selectedPBM.tenant.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Tanggal Bergabung</p>
                            <p className="text-gray-900">{formatDate(selectedPBM.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-medium text-blue-900">Total Pekerjaan</h4>
                      </div>
                      <p className="text-3xl font-bold text-blue-700">{getPBMJobs(selectedPBM.id).length}</p>
                      <p className="text-blue-600 text-sm mt-1">Sejak bergabung</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h4 className="text-lg font-medium text-green-900">Selesai</h4>
                      </div>
                      <p className="text-3xl font-bold text-green-700">
                        {getPBMJobs(selectedPBM.id).filter(job => job.status === 'COMPLETED_APPROVED').length}
                      </p>
                      <p className="text-green-600 text-sm mt-1">Pekerjaan berhasil</p>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className="w-6 h-6 text-yellow-600" />
                        <h4 className="text-lg font-medium text-yellow-900">Berlangsung</h4>
                      </div>
                      <p className="text-3xl font-bold text-yellow-700">
                        {getPBMJobs(selectedPBM.id).filter(job => job.status === 'IN_PROGRESS').length}
                      </p>
                      <p className="text-yellow-600 text-sm mt-1">Sedang dikerjakan</p>
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'jobs' && selectedPBM && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedPBM.name}</h3>
                      <p className="text-gray-600">Riwayat pekerjaan dan permintaan</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {getPBMJobs(selectedPBM.id).map((job) => (
                      <div key={job.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{job.jobType}</h4>
                            <p className="text-sm text-gray-600 mt-1">{job.shipName} - {job.portLocation}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>{new Date(job.startDate).toLocaleDateString('id-ID')}</span>
                              <span>•</span>
                              <span>{job.requiredWorkers} pekerja</span>
                              <span>•</span>
                              <span>{job.requiredHeavyEquipment.reduce((sum, eq) => sum + eq.quantity, 0)} alat berat</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            job.status === 'COMPLETED_APPROVED' ? 'bg-green-100 text-green-800' :
                            job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                            job.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {getPBMJobs(selectedPBM.id).length === 0 && (
                      <div className="text-center py-8">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Belum ada riwayat pekerjaan</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'create' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tambah PBM Baru</h3>
                    <p className="text-gray-600">Form penambahan PBM akan diimplementasikan di sini</p>
                  </div>
                </div>
              )}

              {modalType === 'edit' && selectedPBM && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit PBM</h3>
                    <p className="text-gray-600">Form edit PBM akan diimplementasikan di sini</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Tutup
                </button>
                {modalType !== 'view' && modalType !== 'jobs' && (
                  <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    {modalType === 'create' ? 'Tambah PBM' : 'Simpan Perubahan'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PBMManagement;