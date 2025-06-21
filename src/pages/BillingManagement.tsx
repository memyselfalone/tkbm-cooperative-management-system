import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Receipt,
  DollarSign,
  Calendar,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Send,
  FileText,
  TrendingUp,
  BarChart3,
  CreditCard,
  Banknote,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { mockTenants, mockPBMs, mockJobRequests } from '../utils/mockData';
import { Tenant, PBM, JobRequest } from '../types';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

interface BillingRecord {
  id: string;
  invoiceNumber: string;
  tenant: Tenant;
  pbm: PBM;
  jobRequest: JobRequest;
  amount: number;
  status: 'DRAFT' | 'ISSUED' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  issuedDate?: string;
  dueDate?: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Extended mock billing data
const mockBillingRecords: BillingRecord[] = [
  {
    id: '1',
    invoiceNumber: 'INV-JKT-2024-001',
    tenant: mockTenants[0],
    pbm: mockPBMs[0],
    jobRequest: mockJobRequests[0],
    amount: 25000000,
    status: 'PAID',
    issuedDate: '2024-03-16T10:00:00Z',
    dueDate: '2024-04-01T00:00:00Z',
    paidDate: '2024-03-28T14:30:00Z',
    createdAt: '2024-03-16T10:00:00Z',
    updatedAt: '2024-03-28T14:30:00Z'
  },
  {
    id: '2',
    invoiceNumber: 'INV-SBY-2024-001',
    tenant: mockTenants[1],
    pbm: mockPBMs[2],
    jobRequest: mockJobRequests[2],
    amount: 18000000,
    status: 'ISSUED',
    issuedDate: '2024-03-20T09:00:00Z',
    dueDate: '2024-04-05T00:00:00Z',
    createdAt: '2024-03-20T09:00:00Z',
    updatedAt: '2024-03-20T09:00:00Z'
  },
  {
    id: '3',
    invoiceNumber: 'INV-JKT-2024-002',
    tenant: mockTenants[0],
    pbm: mockPBMs[1],
    jobRequest: mockJobRequests[1],
    amount: 32000000,
    status: 'OVERDUE',
    issuedDate: '2024-03-10T08:00:00Z',
    dueDate: '2024-03-25T00:00:00Z',
    createdAt: '2024-03-10T08:00:00Z',
    updatedAt: '2024-03-25T00:00:00Z'
  },
  {
    id: '4',
    invoiceNumber: 'INV-MDN-2024-001',
    tenant: mockTenants[2],
    pbm: {
      id: '12',
      name: 'PT Medan Cargo Services',
      email: 'admin@medancargo.co.id',
      telephone: '+62-61-5551234',
      address: 'Jl. Belawan Port No. 56, Medan',
      picName: 'Andi Pratama',
      isActive: true,
      tenant: mockTenants[2],
      createdAt: '2024-02-01T10:00:00Z'
    },
    jobRequest: {
      ...mockJobRequests[0],
      id: '4',
      tenant: mockTenants[2],
      jobType: 'Palm Oil Loading',
      shipName: 'MV Sumatra Express',
      portLocation: 'Pelabuhan Belawan'
    },
    amount: 28500000,
    status: 'SENT',
    issuedDate: '2024-03-18T11:00:00Z',
    dueDate: '2024-04-02T00:00:00Z',
    createdAt: '2024-03-18T11:00:00Z',
    updatedAt: '2024-03-19T09:30:00Z'
  },
  {
    id: '5',
    invoiceNumber: 'INV-SMG-2024-001',
    tenant: mockTenants[4],
    pbm: {
      id: '13',
      name: 'PT Semarang Maritime',
      email: 'info@semarangmaritime.co.id',
      telephone: '+62-24-5551234',
      address: 'Jl. Tanjung Emas No. 78, Semarang',
      picName: 'Siti Rahayu',
      isActive: true,
      tenant: mockTenants[4],
      createdAt: '2024-01-15T08:00:00Z'
    },
    jobRequest: {
      ...mockJobRequests[0],
      id: '5',
      tenant: mockTenants[4],
      jobType: 'Coal Unloading',
      shipName: 'MV Central Java',
      portLocation: 'Pelabuhan Tanjung Emas'
    },
    amount: 22000000,
    status: 'DRAFT',
    createdAt: '2024-03-22T14:00:00Z',
    updatedAt: '2024-03-22T14:00:00Z'
  },
  {
    id: '6',
    invoiceNumber: 'INV-BPN-2024-001',
    tenant: mockTenants[5],
    pbm: {
      id: '14',
      name: 'PT Balikpapan Logistics',
      email: 'contact@balikpapanlogistics.co.id',
      telephone: '+62-542-5551234',
      address: 'Jl. Semayang Port No. 90, Balikpapan',
      picName: 'Rizky Firmansyah',
      isActive: true,
      tenant: mockTenants[5],
      createdAt: '2024-01-20T12:00:00Z'
    },
    jobRequest: {
      ...mockJobRequests[0],
      id: '6',
      tenant: mockTenants[5],
      jobType: 'Crude Oil Loading',
      shipName: 'MT Kalimantan Star',
      portLocation: 'Pelabuhan Semayang'
    },
    amount: 45000000,
    status: 'PAID',
    issuedDate: '2024-03-12T09:00:00Z',
    dueDate: '2024-03-27T00:00:00Z',
    paidDate: '2024-03-25T16:45:00Z',
    createdAt: '2024-03-12T09:00:00Z',
    updatedAt: '2024-03-25T16:45:00Z'
  },
  {
    id: '7',
    invoiceNumber: 'INV-PNK-2024-001',
    tenant: mockTenants[7],
    pbm: {
      id: '15',
      name: 'PT Pontianak Shipping',
      email: 'admin@pontianakshipping.co.id',
      telephone: '+62-561-5551234',
      address: 'Jl. Dwikora Port No. 45, Pontianak',
      picName: 'Maya Sari',
      isActive: true,
      tenant: mockTenants[7],
      createdAt: '2024-02-10T15:00:00Z'
    },
    jobRequest: {
      ...mockJobRequests[0],
      id: '7',
      tenant: mockTenants[7],
      jobType: 'Timber Loading',
      shipName: 'MV Borneo Express',
      portLocation: 'Pelabuhan Dwikora'
    },
    amount: 19500000,
    status: 'ISSUED',
    issuedDate: '2024-03-21T10:30:00Z',
    dueDate: '2024-04-06T00:00:00Z',
    createdAt: '2024-03-21T10:30:00Z',
    updatedAt: '2024-03-21T10:30:00Z'
  },
  {
    id: '8',
    invoiceNumber: 'INV-JKT-2024-003',
    tenant: mockTenants[0],
    pbm: mockPBMs[0],
    jobRequest: {
      ...mockJobRequests[0],
      id: '8',
      jobType: 'Container Handling',
      shipName: 'MV Jakarta Pride',
      portLocation: 'Tanjung Priok Terminal 3'
    },
    amount: 38000000,
    status: 'CANCELLED',
    issuedDate: '2024-03-08T13:00:00Z',
    createdAt: '2024-03-08T13:00:00Z',
    updatedAt: '2024-03-15T11:20:00Z'
  }
];

const BillingManagement: React.FC = () => {
  const [billings] = useState<BillingRecord[]>(mockBillingRecords);
  const [selectedBilling, setSelectedBilling] = useState<BillingRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'create'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [tenantFilter, setTenantFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'amount_high' | 'amount_low'>('latest');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (billing: BillingRecord) => {
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
    const billingDate = new Date(billing.updatedAt);
    
    return billingDate >= cutoffDate;
  };

  const filterByRegional = (billing: BillingRecord) => {
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
    
    return billing.tenant.province === provinceMap[selectedRegional];
  };

  const filteredAndSortedBillings = billings
    .filter(billing => {
      const matchesSearch = billing.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           billing.pbm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           billing.tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           billing.jobRequest.jobType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || billing.status === statusFilter;
      const matchesTenant = tenantFilter === 'ALL' || billing.tenant.id === tenantFilter;
      const matchesPeriod = filterByPeriod(billing);
      const matchesRegional = filterByRegional(billing);
      return matchesSearch && matchesStatus && matchesTenant && matchesPeriod && matchesRegional;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'oldest':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'amount_high':
          return b.amount - a.amount;
        case 'amount_low':
          return a.amount - b.amount;
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const openModal = (billing: BillingRecord | null, type: 'view' | 'edit' | 'create') => {
    setSelectedBilling(billing);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBilling(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-800',
      ISSUED: 'bg-blue-100 text-blue-800',
      SENT: 'bg-purple-100 text-purple-800',
      PAID: 'bg-green-100 text-green-800',
      OVERDUE: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-orange-100 text-orange-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <FileText className="w-4 h-4 text-gray-600" />;
      case 'ISSUED':
        return <Receipt className="w-4 h-4 text-blue-600" />;
      case 'SENT':
        return <Send className="w-4 h-4 text-purple-600" />;
      case 'PAID':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'OVERDUE':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Receipt className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      DRAFT: 'Draft',
      ISSUED: 'Diterbitkan',
      SENT: 'Terkirim',
      PAID: 'Dibayar',
      OVERDUE: 'Terlambat',
      CANCELLED: 'Dibatalkan'
    };
    return labels[status as keyof typeof labels] || status;
  };

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
      year: 'numeric'
    });
  };

  // Calculate statistics
  const totalBillings = filteredAndSortedBillings.length;
  const totalAmount = filteredAndSortedBillings.reduce((sum, billing) => sum + billing.amount, 0);
  const paidAmount = filteredAndSortedBillings.filter(b => b.status === 'PAID').reduce((sum, billing) => sum + billing.amount, 0);
  const overdueAmount = filteredAndSortedBillings.filter(b => b.status === 'OVERDUE').reduce((sum, billing) => sum + billing.amount, 0);
  const pendingAmount = filteredAndSortedBillings.filter(b => ['ISSUED', 'SENT'].includes(b.status)).reduce((sum, billing) => sum + billing.amount, 0);

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredAndSortedBillings.map((billing) => (
        <div key={billing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{billing.invoiceNumber}</h3>
                <p className="text-sm text-gray-600">{billing.tenant.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(billing.status)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(billing.status)}`}>
                  {getStatusLabel(billing.status)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>{billing.pbm.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Receipt className="w-4 h-4" />
                <span>{billing.jobRequest.jobType}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(billing.createdAt)}</span>
              </div>
              {billing.dueDate && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Jatuh tempo: {formatDate(billing.dueDate)}</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-blue-900">Total Tagihan</span>
              </div>
              <p className="text-xl font-bold text-blue-700">{formatCurrency(billing.amount)}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(billing, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Lihat Detail</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openModal(billing, 'edit')}
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
              <th className="text-left py-3 px-6 font-medium text-gray-700">Nomor Faktur</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Koperasi</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">PBM</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Pekerjaan</th>
              <th className="text-right py-3 px-6 font-medium text-gray-700">Nilai</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Tanggal</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBillings.map((billing) => (
              <tr key={billing.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{billing.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(billing.createdAt)}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{billing.tenant.name}</p>
                      <p className="text-sm text-gray-500">{billing.tenant.city}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{billing.pbm.name}</p>
                    <p className="text-sm text-gray-500">{billing.pbm.picName}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{billing.jobRequest.jobType}</p>
                    <p className="text-sm text-gray-500">{billing.jobRequest.shipName}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(billing.amount)}</p>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(billing.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(billing.status)}`}>
                      {getStatusLabel(billing.status)}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="text-sm">
                    {billing.issuedDate && (
                      <p className="text-gray-900">Terbit: {formatDate(billing.issuedDate)}</p>
                    )}
                    {billing.dueDate && (
                      <p className="text-gray-500">Jatuh tempo: {formatDate(billing.dueDate)}</p>
                    )}
                    {billing.paidDate && (
                      <p className="text-green-600">Dibayar: {formatDate(billing.paidDate)}</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openModal(billing, 'view')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal(billing, 'edit')}
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
      {filteredAndSortedBillings.map((billing) => (
        <div key={billing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{billing.invoiceNumber}</h3>
                <p className="text-gray-600 mb-2">{billing.tenant.name}</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(billing.status)}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(billing.status)}`}>
                    {getStatusLabel(billing.status)}
                  </span>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-900">Total</span>
                </div>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(billing.amount)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{billing.pbm.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Receipt className="w-4 h-4" />
                  <span>{billing.jobRequest.jobType}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{billing.pbm.picName}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(billing.createdAt)}</span>
                </div>
                {billing.dueDate && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Jatuh tempo: {formatDate(billing.dueDate)}</span>
                  </div>
                )}
                {billing.paidDate && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Dibayar: {formatDate(billing.paidDate)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Detail Pekerjaan</h4>
              <p className="text-gray-900 font-medium">{billing.jobRequest.shipName}</p>
              <p className="text-sm text-gray-600">{billing.jobRequest.portLocation}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(billing, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Lihat Detail</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => openModal(billing, 'edit')}
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
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Billing Nasional</h1>
          <p className="text-gray-600 mt-1">Kelola semua tagihan dan faktur dari seluruh koperasi TKBM Indonesia</p>
        </div>
        <button 
          onClick={() => openModal(null, 'create')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Faktur Baru</span>
        </button>
      </div>

      {/* Filters and Search */}
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
                placeholder="Cari berdasarkan nomor faktur, PBM, koperasi, atau jenis pekerjaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ISSUED">Diterbitkan</option>
                  <option value="SENT">Terkirim</option>
                  <option value="PAID">Dibayar</option>
                  <option value="OVERDUE">Terlambat</option>
                  <option value="CANCELLED">Dibatalkan</option>
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="latest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="amount_high">Nilai Tertinggi</option>
                <option value="amount_low">Nilai Terendah</option>
              </select>
              <ViewTypeSelector
                viewType={viewType}
                onViewTypeChange={setViewType}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Faktur</p>
              <p className="text-3xl font-bold text-gray-900">{totalBillings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <BarChart3 className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">Periode & Regional</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Nilai</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Akumulasi</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sudah Dibayar</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(paidAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">{totalAmount > 0 ? ((paidAmount/totalAmount)*100).toFixed(1) : 0}% dari total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Terlambat</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-600 font-medium">Perlu tindakan</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {filteredAndSortedBillings.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada faktur ditemukan</h3>
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
                  {modalType === 'view' && 'Detail Faktur'}
                  {modalType === 'edit' && 'Edit Faktur'}
                  {modalType === 'create' && 'Buat Faktur Baru'}
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
              {modalType === 'view' && selectedBilling && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBilling.invoiceNumber}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedBilling.status)}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBilling.status)}`}>
                          {getStatusLabel(selectedBilling.status)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Tagihan</p>
                      <p className="text-3xl font-bold text-gray-900">{formatCurrency(selectedBilling.amount)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Informasi Koperasi</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Building2 className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedBilling.tenant.name}</p>
                            <p className="text-gray-600">{selectedBilling.tenant.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-900">{selectedBilling.tenant.phone}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-900">{selectedBilling.tenant.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Informasi PBM</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Building2 className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedBilling.pbm.name}</p>
                            <p className="text-gray-600">{selectedBilling.pbm.picName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-900">{selectedBilling.pbm.telephone}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-900">{selectedBilling.pbm.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Detail Pekerjaan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Jenis Pekerjaan</p>
                        <p className="text-gray-900">{selectedBilling.jobRequest.jobType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Nama Kapal</p>
                        <p className="text-gray-900">{selectedBilling.jobRequest.shipName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Lokasi Pelabuhan</p>
                        <p className="text-gray-900">{selectedBilling.jobRequest.portLocation}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Jumlah Pekerja</p>
                        <p className="text-gray-900">{selectedBilling.jobRequest.requiredWorkers} orang</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Tanggal Dibuat</p>
                      <p className="text-blue-700">{formatDate(selectedBilling.createdAt)}</p>
                    </div>
                    {selectedBilling.issuedDate && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-purple-900">Tanggal Terbit</p>
                        <p className="text-purple-700">{formatDate(selectedBilling.issuedDate)}</p>
                      </div>
                    )}
                    {selectedBilling.dueDate && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-yellow-900">Jatuh Tempo</p>
                        <p className="text-yellow-700">{formatDate(selectedBilling.dueDate)}</p>
                      </div>
                    )}
                    {selectedBilling.paidDate && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-900">Tanggal Dibayar</p>
                        <p className="text-green-700">{formatDate(selectedBilling.paidDate)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalType === 'create' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Buat Faktur Baru</h3>
                    <p className="text-gray-600">Form pembuatan faktur akan diimplementasikan di sini</p>
                  </div>
                </div>
              )}

              {modalType === 'edit' && selectedBilling && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Edit Faktur</h3>
                    <p className="text-gray-600">Form edit faktur akan diimplementasikan di sini</p>
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
                {modalType === 'view' && selectedBilling && (
                  <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                )}
                {modalType !== 'view' && (
                  <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                    {modalType === 'create' ? 'Buat Faktur' : 'Simpan Perubahan'}
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

export default BillingManagement;