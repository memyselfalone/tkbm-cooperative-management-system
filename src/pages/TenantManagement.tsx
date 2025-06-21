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
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { mockTenants } from '../utils/mockData';
import { Tenant, TenantStatus } from '../types';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

const TenantManagement: React.FC = () => {
  const [tenants] = useState<Tenant[]>(mockTenants);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TenantStatus | 'ALL'>('ALL');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (tenant: Tenant) => {
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
    const tenantDate = new Date(tenant.updatedAt);
    
    return tenantDate >= cutoffDate;
  };

  const filterByRegional = (tenant: Tenant) => {
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
    
    return tenant.province === provinceMap[selectedRegional];
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.province.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || tenant.status === statusFilter;
    const matchesPeriod = filterByPeriod(tenant);
    const matchesRegional = filterByRegional(tenant);
    return matchesSearch && matchesStatus && matchesPeriod && matchesRegional;
  });

  const openModal = (tenant: Tenant | null, type: 'view' | 'edit' | 'create') => {
    setSelectedTenant(tenant);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTenant(null);
  };

  const getStatusColor = (status: TenantStatus) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      SUSPENDED: 'bg-red-100 text-red-800',
      PENDING_APPROVAL: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: TenantStatus) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'SUSPENDED':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'PENDING_APPROVAL':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredTenants.map((tenant) => (
        <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{tenant.name}</h3>
                  <p className="text-sm text-gray-600">{tenant.code}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(tenant.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tenant.status)}`}>
                  {tenant.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{tenant.city}, {tenant.province}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{tenant.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Est. {new Date(tenant.establishedDate).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-900">Members</span>
                </div>
                <p className="text-lg font-bold text-blue-700">{tenant.totalMembers}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-900">Equipment</span>
                </div>
                <p className="text-lg font-bold text-green-700">{tenant.totalEquipment}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(tenant, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">View Details</span>
              </button>
              <button 
                onClick={() => openModal(tenant, 'edit')}
                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
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
              <th className="text-left py-3 px-6 font-medium text-gray-700">Tenant</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Location</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Contact</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Members</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Equipment</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tenant.name}</p>
                      <p className="text-sm text-gray-500">{tenant.code}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{tenant.city}</p>
                    <p className="text-sm text-gray-500">{tenant.province}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{tenant.phone}</p>
                    <p className="text-sm text-gray-500">{tenant.email}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="font-medium text-gray-900">{tenant.totalMembers}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="font-medium text-gray-900">{tenant.totalEquipment}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(tenant.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tenant.status)}`}>
                      {tenant.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openModal(tenant, 'view')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(tenant, 'edit')}
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
      {filteredTenants.map((tenant) => (
        <div key={tenant.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tenant.name}</h3>
                  <p className="text-gray-600 mb-2">{tenant.code}</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(tenant.status)}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(tenant.status)}`}>
                      {tenant.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{tenant.city}, {tenant.province}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{tenant.email}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">Total Members</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{tenant.totalMembers}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-900">Equipment</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">{tenant.totalEquipment}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Est. {new Date(tenant.establishedDate).toLocaleDateString('id-ID')}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal(tenant, 'view')}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                <button 
                  onClick={() => openModal(tenant, 'edit')}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
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
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-1">Manage TKBM cooperative tenants across Indonesia</p>
        </div>
        <button 
          onClick={() => openModal(null, 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tenant</span>
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
            <RegionalFilter
              selectedRegional={selectedRegional}
              onRegionalChange={setSelectedRegional}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tenants by name, code, city, or province..."
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
                  onChange={(e) => setStatusFilter(e.target.value as TenantStatus | 'ALL')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="SUSPENDED">Suspended</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <ViewTypeSelector
                viewType={viewType}
                onViewTypeChange={setViewType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tenants</p>
              <p className="text-3xl font-bold text-gray-900">{filteredTenants.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tenants</p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredTenants.filter(t => t.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredTenants.reduce((sum, t) => sum + t.totalMembers, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Equipment</p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredTenants.reduce((sum, t) => sum + t.totalEquipment, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-600">Try adjusting your search, period, or regional filters.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalType === 'view' && 'Tenant Details'}
                  {modalType === 'edit' && 'Edit Tenant'}
                  {modalType === 'create' && 'Add New Tenant'}
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
              {modalType === 'view' && selectedTenant && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedTenant.name}</h3>
                      <p className="text-gray-600 mb-2">{selectedTenant.code}</p>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedTenant.status)}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedTenant.status)}`}>
                          {selectedTenant.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Address</p>
                            <p className="text-gray-900">{selectedTenant.address}</p>
                            <p className="text-gray-600">{selectedTenant.city}, {selectedTenant.province}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Phone</p>
                            <p className="text-gray-900">{selectedTenant.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Email</p>
                            <p className="text-gray-900">{selectedTenant.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Organization Details</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Person in Charge</p>
                          <p className="text-gray-900">{selectedTenant.picName}</p>
                          <p className="text-gray-600">{selectedTenant.picPhone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Registration Number</p>
                          <p className="text-gray-900">{selectedTenant.registrationNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Established Date</p>
                          <p className="text-gray-900">{new Date(selectedTenant.establishedDate).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Users className="w-6 h-6 text-blue-600" />
                        <h4 className="text-lg font-medium text-blue-900">Members</h4>
                      </div>
                      <p className="text-3xl font-bold text-blue-700">{selectedTenant.totalMembers}</p>
                      <p className="text-blue-600 text-sm mt-1">Total registered members</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="flex items-center space-x-3 mb-4">
                        <Truck className="w-6 h-6 text-green-600" />
                        <h4 className="text-lg font-medium text-green-900">Equipment</h4>
                      </div>
                      <p className="text-3xl font-bold text-green-700">{selectedTenant.totalEquipment}</p>
                      <p className="text-green-600 text-sm mt-1">Heavy equipment units</p>
                    </div>
                  </div>

                  {selectedTenant.description && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedTenant.description}</p>
                    </div>
                  )}
                </div>
              )}

              {modalType === 'create' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Tenant</h3>
                    <p className="text-gray-600">Tenant creation form would be implemented here</p>
                  </div>
                </div>
              )}

              {modalType === 'edit' && selectedTenant && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Tenant</h3>
                    <p className="text-gray-600">Tenant editing form would be implemented here</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                {modalType !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    {modalType === 'create' ? 'Create Tenant' : 'Save Changes'}
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

export default TenantManagement;