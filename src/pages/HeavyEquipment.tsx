import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Truck,
  Settings,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
  XCircle,
  Activity,
  Package,
  BarChart3,
  FileText,
  Camera
} from 'lucide-react';
import { mockHeavyEquipmentUnits, mockHeavyEquipmentCategories, mockTenants } from '../utils/mockData';
import { HeavyEquipmentUnit, EquipmentStatus, HeavyEquipmentCategory } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

const HeavyEquipment: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();
  const isSuperadmin = userRole === 'superadmin';
  
  // Extended mock data for demonstration
  const [equipment] = useState<HeavyEquipmentUnit[]>([
    ...mockHeavyEquipmentUnits,
    {
      id: '4',
      category: mockHeavyEquipmentCategories[0],
      name: 'Forklift Komatsu C',
      inventoryNumber: 'FL-002',
      brand: 'Komatsu',
      model: 'FG25T-16',
      capacity: '2.5',
      unit: 'ton',
      status: 'MAINTENANCE',
      isActive: true,
      tenant: mockTenants[0],
      images: [{
        id: '4',
        imgUrl: 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg',
        isDefault: true,
        uploadedAt: '2024-01-01T00:00:00Z'
      }]
    },
    {
      id: '5',
      category: mockHeavyEquipmentCategories[1],
      name: 'Tower Crane Liebherr',
      inventoryNumber: 'CR-002',
      brand: 'Liebherr',
      model: '280 EC-H',
      capacity: '12',
      unit: 'ton',
      status: 'AVAILABLE',
      isActive: true,
      tenant: mockTenants[0],
      images: [{
        id: '5',
        imgUrl: 'https://images.pexels.com/photos/162568/crane-construction-site-lift-162568.jpeg',
        isDefault: true,
        uploadedAt: '2024-01-01T00:00:00Z'
      }]
    },
    {
      id: '6',
      category: mockHeavyEquipmentCategories[2],
      name: 'Excavator Caterpillar',
      inventoryNumber: 'EX-001',
      brand: 'Caterpillar',
      model: '320D',
      capacity: '20',
      unit: 'ton',
      status: 'OUT_OF_SERVICE',
      isActive: true,
      tenant: mockTenants[0],
      images: [{
        id: '6',
        imgUrl: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg',
        isDefault: true,
        uploadedAt: '2024-01-01T00:00:00Z'
      }]
    },
    {
      id: '7',
      category: mockHeavyEquipmentCategories[0],
      name: 'Forklift Hyundai D',
      inventoryNumber: 'FL-SBY-002',
      brand: 'Hyundai',
      model: '30D-7E',
      capacity: '3.0',
      unit: 'ton',
      status: 'IN_USE',
      isActive: true,
      tenant: mockTenants[1],
      images: [{
        id: '7',
        imgUrl: 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg',
        isDefault: true,
        uploadedAt: '2024-01-01T00:00:00Z'
      }]
    }
  ]);

  const [selectedEquipment, setSelectedEquipment] = useState<HeavyEquipmentUnit | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create' | 'maintenance'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<EquipmentStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (eq: HeavyEquipmentUnit) => {
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
    const equipmentDate = new Date(eq.images?.[0]?.uploadedAt || '2024-01-01T00:00:00Z');
    
    return equipmentDate >= cutoffDate;
  };

  const filterByRegional = (eq: HeavyEquipmentUnit) => {
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
    
    return eq.tenant.province === provinceMap[selectedRegional];
  };

  const filteredEquipment = equipment.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.inventoryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eq.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || eq.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || eq.category.id === categoryFilter;
    const matchesTenant = isSuperadmin || eq.tenant.id === user?.tenant?.id;
    const matchesPeriod = filterByPeriod(eq);
    const matchesRegional = isSuperadmin ? filterByRegional(eq) : true;
    return matchesSearch && matchesStatus && matchesCategory && matchesTenant && matchesPeriod && matchesRegional && eq.isActive;
  });

  const openModal = (equipment: HeavyEquipmentUnit | null, type: 'view' | 'edit' | 'create' | 'maintenance') => {
    setSelectedEquipment(equipment);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEquipment(null);
  };

  const getStatusColor = (status: EquipmentStatus) => {
    const colors = {
      AVAILABLE: 'bg-green-100 text-green-800',
      IN_USE: 'bg-blue-100 text-blue-800',
      MAINTENANCE: 'bg-yellow-100 text-yellow-800',
      OUT_OF_SERVICE: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: EquipmentStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'IN_USE':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'MAINTENANCE':
        return <Wrench className="w-4 h-4 text-yellow-600" />;
      case 'OUT_OF_SERVICE':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: EquipmentStatus) => {
    const labels = {
      AVAILABLE: 'Tersedia',
      IN_USE: 'Sedang Digunakan',
      MAINTENANCE: 'Perawatan',
      OUT_OF_SERVICE: 'Tidak Beroperasi'
    };
    return labels[status] || status;
  };

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'forklift':
        return <Package className="w-5 h-5" />;
      case 'crane':
        return <Activity className="w-5 h-5" />;
      case 'excavator':
        return <Truck className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  // Calculate statistics
  const totalEquipment = filteredEquipment.length;
  const availableEquipment = filteredEquipment.filter(eq => eq.status === 'AVAILABLE').length;
  const inUseEquipment = filteredEquipment.filter(eq => eq.status === 'IN_USE').length;
  const maintenanceEquipment = filteredEquipment.filter(eq => eq.status === 'MAINTENANCE').length;

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredEquipment.map((eq) => (
        <div key={eq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative">
            <img
              src={eq.images?.[0]?.imgUrl || 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg'}
              alt={eq.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              {getStatusIcon(eq.status)}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(eq.status)}`}>
                {getStatusLabel(eq.status)}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getCategoryIcon(eq.category.slug)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{eq.name}</h3>
                  <p className="text-sm text-gray-600">{eq.inventoryNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Merek:</span>
                <span className="font-medium text-gray-900">{eq.brand}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium text-gray-900">{eq.model}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Kapasitas:</span>
                <span className="font-medium text-gray-900">{eq.capacity} {eq.unit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Kategori:</span>
                <span className="font-medium text-gray-900">{eq.category.name}</span>
              </div>
              {isSuperadmin && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Koperasi:</span>
                  <span className="font-medium text-blue-600">{eq.tenant.code}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(eq, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Lihat Detail</span>
              </button>
              
              <div className="flex items-center space-x-2">
                {eq.status === 'AVAILABLE' && (
                  <button
                    onClick={() => openModal(eq, 'maintenance')}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                    title="Jadwalkan Perawatan"
                  >
                    <Wrench className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => openModal(eq, 'edit')}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Equipment</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Details</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Category</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Capacity</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
              {isSuperadmin && <th className="text-center py-3 px-6 font-medium text-gray-700">Tenant</th>}
              <th className="text-center py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((eq) => (
              <tr key={eq.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={eq.images?.[0]?.imgUrl || 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg'}
                      alt={eq.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{eq.name}</p>
                      <p className="text-sm text-gray-500">{eq.inventoryNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{eq.brand} {eq.model}</p>
                    <p className="text-sm text-gray-500">Brand & Model</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(eq.category.slug)}
                    <span className="text-gray-900">{eq.category.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="font-medium text-gray-900">{eq.capacity} {eq.unit}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(eq.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(eq.status)}`}>
                      {getStatusLabel(eq.status)}
                    </span>
                  </div>
                </td>
                {isSuperadmin && (
                  <td className="py-4 px-6 text-center">
                    <span className="text-blue-600 font-medium">{eq.tenant.code}</span>
                  </td>
                )}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openModal(eq, 'view')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {eq.status === 'AVAILABLE' && (
                      <button
                        onClick={() => openModal(eq, 'maintenance')}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                        title="Jadwalkan Perawatan"
                      >
                        <Wrench className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openModal(eq, 'edit')}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredEquipment.map((eq) => (
        <div key={eq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start space-x-6 mb-6">
              <img
                src={eq.images?.[0]?.imgUrl || 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg'}
                alt={eq.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{eq.name}</h3>
                <p className="text-gray-600 mb-2">{eq.inventoryNumber}</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(eq.status)}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(eq.status)}`}>
                    {getStatusLabel(eq.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Brand & Model</p>
                  <p className="text-gray-900">{eq.brand} {eq.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category</p>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(eq.category.slug)}
                    <span className="text-gray-900">{eq.category.name}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Capacity</p>
                  <p className="text-gray-900">{eq.capacity} {eq.unit}</p>
                </div>
                {isSuperadmin && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tenant</p>
                    <p className="text-blue-600 font-medium">{eq.tenant.code}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(eq, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Lihat Detail</span>
              </button>
              
              <div className="flex items-center space-x-2">
                {eq.status === 'AVAILABLE' && (
                  <button
                    onClick={() => openModal(eq, 'maintenance')}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                    title="Jadwalkan Perawatan"
                  >
                    <Wrench className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => openModal(eq, 'edit')}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
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
          <h1 className="text-3xl font-bold text-gray-900">
            {isSuperadmin ? 'Manajemen Alat Berat Nasional' : 'Manajemen Alat Berat'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isSuperadmin 
              ? 'Kelola alat berat di seluruh koperasi TKBM Indonesia'
              : 'Kelola alat berat koperasi untuk operasi bongkar muat'
            }
          </p>
        </div>
        <button 
          onClick={() => openModal(null, 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Alat Berat</span>
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
                placeholder="Cari berdasarkan nama, nomor inventaris, merek, atau model..."
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
                  onChange={(e) => setStatusFilter(e.target.value as EquipmentStatus | 'ALL')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="AVAILABLE">Tersedia</option>
                  <option value="IN_USE">Sedang Digunakan</option>
                  <option value="MAINTENANCE">Perawatan</option>
                  <option value="OUT_OF_SERVICE">Tidak Beroperasi</option>
                </select>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALL">Semua Kategori</option>
                {mockHeavyEquipmentCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
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

      {/* Equipment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alat Berat</p>
              <p className="text-3xl font-bold text-gray-900">{totalEquipment}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Filtered results</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tersedia</p>
              <p className="text-3xl font-bold text-gray-900">{availableEquipment}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sedang Digunakan</p>
              <p className="text-3xl font-bold text-gray-900">{inUseEquipment}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Perawatan</p>
              <p className="text-3xl font-bold text-gray-900">{maintenanceEquipment}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada alat berat ditemukan</h3>
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
                  {modalType === 'view' && 'Detail Alat Berat'}
                  {modalType === 'edit' && 'Edit Alat Berat'}
                  {modalType === 'create' && 'Tambah Alat Berat Baru'}
                  {modalType === 'maintenance' && 'Jadwalkan Perawatan'}
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
              {modalType === 'view' && selectedEquipment && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedEquipment.images?.[0]?.imgUrl || 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg'}
                        alt={selectedEquipment.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEquipment.name}</h3>
                        <p className="text-gray-600 mb-2">{selectedEquipment.inventoryNumber}</p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(selectedEquipment.status)}
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedEquipment.status)}`}>
                            {getStatusLabel(selectedEquipment.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Merek</p>
                          <p className="text-gray-900">{selectedEquipment.brand}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Model</p>
                          <p className="text-gray-900">{selectedEquipment.model}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Kapasitas</p>
                          <p className="text-gray-900">{selectedEquipment.capacity} {selectedEquipment.unit}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Kategori</p>
                          <p className="text-gray-900">{selectedEquipment.category.name}</p>
                        </div>
                      </div>
                      
                      {isSuperadmin && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">Koperasi</p>
                          <p className="text-gray-900">{selectedEquipment.tenant.name}</p>
                          <p className="text-gray-600 text-sm">{selectedEquipment.tenant.city}, {selectedEquipment.tenant.province}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Riwayat Operasional</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">Terakhir digunakan:</span>
                        <span className="font-medium">15 Maret 2024 - Job PJ-JKT-001</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Wrench className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-600">Perawatan terakhir:</span>
                        <span className="font-medium">10 Maret 2024</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Perawatan berikutnya:</span>
                        <span className="font-medium">10 April 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'create' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tambah Alat Berat Baru</h3>
                    <p className="text-gray-600">Form penambahan alat berat akan diimplementasikan di sini</p>
                  </div>
                </div>
              )}

              {modalType === 'edit' && selectedEquipment && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Alat Berat</h3>
                    <p className="text-gray-600">Form edit alat berat akan diimplementasikan di sini</p>
                  </div>
                </div>
              )}

              {modalType === 'maintenance' && selectedEquipment && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Jadwalkan Perawatan</h3>
                    <p className="text-gray-600">Form penjadwalan perawatan akan diimplementasikan di sini</p>
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
                {modalType !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    {modalType === 'create' ? 'Tambah Alat Berat' : 
                     modalType === 'edit' ? 'Simpan Perubahan' : 'Jadwalkan Perawatan'}
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

export default HeavyEquipment;