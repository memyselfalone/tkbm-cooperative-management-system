import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  UserPlus,
  Calendar,
  MapPin,
  Ship,
  Users,
  Truck,
  Clock,
  AlertCircle
} from 'lucide-react';
import { mockJobRequests, mockPBMs, mockMembers, mockHeavyEquipmentUnits } from '../utils/mockData';
import { JobRequest, JobStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';

const JobManagement: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();
  const isSuperadmin = userRole === 'superadmin';
  
  const [jobs] = useState<JobRequest[]>(mockJobRequests);
  const [selectedJob, setSelectedJob] = useState<JobRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'assign'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'ALL'>('ALL');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (job: JobRequest) => {
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
    const jobDate = new Date(job.updatedAt);
    
    return jobDate >= cutoffDate;
  };

  const filterByRegional = (job: JobRequest) => {
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
    
    return job.tenant.province === provinceMap[selectedRegional];
  };

  const getStatusColor = (status: JobStatus) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      APPROVED: 'bg-blue-100 text-blue-800',
      REJECTED: 'bg-red-100 text-red-800',
      ASSIGNED: 'bg-purple-100 text-purple-800',
      IN_PROGRESS: 'bg-indigo-100 text-indigo-800',
      COMPLETED_BY_TL: 'bg-green-100 text-green-800',
      COMPLETED_APPROVED: 'bg-emerald-100 text-emerald-800',
      COMPLETION_REJECTED: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.shipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.pbm.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
    const matchesPeriod = filterByPeriod(job);
    const matchesRegional = isSuperadmin ? filterByRegional(job) : true;
    return matchesSearch && matchesStatus && matchesPeriod && matchesRegional;
  });

  const openModal = (job: JobRequest, type: 'view' | 'approve' | 'reject' | 'assign') => {
    setSelectedJob(job);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const canManageJobs = userRole === 'superadmin' || userRole === 'admin';
  const canCreateJobs = userRole === 'pbm' || canManageJobs;

  const renderGridView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.jobType}</h3>
                <p className="text-sm text-gray-600">{job.pbm.name}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                {job.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Ship className="w-4 h-4" />
                <span>{job.shipName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{job.portLocation}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(job.startDate).toLocaleDateString('id-ID')} - {new Date(job.endDate).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{job.startTime} - {job.endTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{job.requiredWorkers} workers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span>{job.requiredHeavyEquipment.reduce((sum, eq) => sum + eq.quantity, 0)} equipment</span>
              </div>
            </div>

            {job.jobCode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-800">Job Code: {job.jobCode}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(job, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">View Details</span>
              </button>

              {canManageJobs && (
                <div className="flex items-center space-x-2">
                  {job.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => openModal(job, 'approve')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal(job, 'reject')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {job.status === 'APPROVED' && (
                    <button
                      onClick={() => openModal(job, 'assign')}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      title="Assign Resources"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
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
              <th className="text-left py-3 px-6 font-medium text-gray-700">Job</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">PBM</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Ship & Location</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Schedule</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Resources</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-medium text-gray-900">{job.jobType}</p>
                    {job.jobCode && (
                      <p className="text-sm text-blue-600">{job.jobCode}</p>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-gray-900">{job.pbm.name}</p>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{job.shipName}</p>
                    <p className="text-sm text-gray-500">{job.portLocation}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{new Date(job.startDate).toLocaleDateString('id-ID')}</p>
                    <p className="text-sm text-gray-500">{job.startTime} - {job.endTime}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">{job.requiredWorkers}</span> workers</p>
                    <p className="text-sm"><span className="font-medium">{job.requiredHeavyEquipment.reduce((sum, eq) => sum + eq.quantity, 0)}</span> equipment</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openModal(job, 'view')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {canManageJobs && job.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => openModal(job, 'approve')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal(job, 'reject')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    {canManageJobs && job.status === 'APPROVED' && (
                      <button
                        onClick={() => openModal(job, 'assign')}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        title="Assign Resources"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    )}
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
      {filteredJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.jobType}</h3>
                <p className="text-gray-600 mb-2">{job.pbm.name}</p>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(job.status)}`}>
                  {job.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Ship className="w-4 h-4" />
                  <span>{job.shipName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{job.portLocation}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(job.startDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{job.startTime} - {job.endTime}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-900">Workers</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{job.requiredWorkers}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-900">Equipment</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {job.requiredHeavyEquipment.reduce((sum, eq) => sum + eq.quantity, 0)}
                  </p>
                </div>
              </div>
            </div>

            {job.jobCode && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-800">Job Code: {job.jobCode}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(job, 'view')}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">View Details</span>
              </button>

              {canManageJobs && (
                <div className="flex items-center space-x-2">
                  {job.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => openModal(job, 'approve')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal(job, 'reject')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {job.status === 'APPROVED' && (
                    <button
                      onClick={() => openModal(job, 'assign')}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                      title="Assign Resources"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
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
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-1">Manage loading and unloading job requests</p>
        </div>
        {canCreateJobs && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Job Request</span>
          </button>
        )}
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
                placeholder="Search jobs by type, ship name, or PBM..."
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
                  onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'ALL')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED_BY_TL">Completed by TL</option>
                  <option value="COMPLETED_APPROVED">Completed & Approved</option>
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

      {/* Content */}
      {renderContent()}

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search, period, or regional filters.</p>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {modalType === 'view' && 'Job Details'}
                  {modalType === 'approve' && 'Approve Job Request'}
                  {modalType === 'reject' && 'Reject Job Request'}
                  {modalType === 'assign' && 'Assign Resources'}
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
              {/* Job Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Job Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Job Type</label>
                      <p className="text-gray-900">{selectedJob.jobType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Ship Name</label>
                      <p className="text-gray-900">{selectedJob.shipName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Port Location</label>
                      <p className="text-gray-900">{selectedJob.portLocation}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Schedule</label>
                      <p className="text-gray-900">
                        {new Date(selectedJob.startDate).toLocaleDateString('id-ID')} - {new Date(selectedJob.endDate).toLocaleDateString('id-ID')}
                      </p>
                      <p className="text-gray-600 text-sm">{selectedJob.startTime} - {selectedJob.endTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">PBM Company</label>
                      <p className="text-gray-900">{selectedJob.pbm.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact Person</label>
                      <p className="text-gray-900">{selectedJob.contactPersonName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedJob.contactPersonEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900">{selectedJob.contactPersonPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Requirements */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Workers Needed</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{selectedJob.requiredWorkers}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Equipment Needed</span>
                    </div>
                    <div className="space-y-1">
                      {selectedJob.requiredHeavyEquipment.map((eq, index) => (
                        <p key={index} className="text-sm text-green-700">
                          {eq.quantity}x {eq.categoryName || 'Equipment'}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {selectedJob.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedJob.notes}</p>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                
                {modalType === 'approve' && (
                  <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors">
                    Approve Request
                  </button>
                )}
                
                {modalType === 'reject' && (
                  <button className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors">
                    Reject Request
                  </button>
                )}
                
                {modalType === 'assign' && (
                  <button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors">
                    Assign Resources
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

export default JobManagement;