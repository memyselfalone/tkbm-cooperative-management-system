import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Badge,
  UserCheck,
  Clock
} from 'lucide-react';
import { mockMembers } from '../utils/mockData';
import { Member } from '../types';
import ViewTypeSelector, { ViewType } from '../components/common/ViewTypeSelector';
import PeriodFilter, { PeriodType } from '../components/common/PeriodFilter';
import RegionalFilter, { RegionalType } from '../components/common/RegionalFilter';
import { useAuth } from '../contexts/AuthContext';

const Members: React.FC = () => {
  const { user } = useAuth();
  const userRole = user?.roles[0]?.alias?.toLowerCase();
  const isSuperadmin = userRole === 'superadmin';
  
  const [members] = useState<Member[]>(mockMembers);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState<'ALL' | 'WORKER' | 'TEAM_LEADER'>('ALL');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('1D');
  const [selectedRegional, setSelectedRegional] = useState<RegionalType>('ALL');

  const filterByPeriod = (member: Member) => {
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
    const memberDate = new Date(member.joinDate);
    
    return memberDate >= cutoffDate;
  };

  const filterByRegional = (member: Member) => {
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
    
    return member.tenant.province === provinceMap[selectedRegional];
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'ALL' || member.position === positionFilter;
    const matchesPeriod = filterByPeriod(member);
    const matchesRegional = isSuperadmin ? filterByRegional(member) : true;
    return matchesSearch && matchesPosition && matchesPeriod && matchesRegional && member.isActive;
  });

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  const getPositionColor = (position: string) => {
    return position === 'TEAM_LEADER' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getPositionLabel = (position: string) => {
    return position === 'TEAM_LEADER' ? 'Team Leader' : 'Worker';
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMembers.map((member) => (
        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {member.profilePhoto ? (
                  <img
                    src={member.profilePhoto}
                    alt={member.fullname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{member.fullname}</h3>
                <p className="text-sm text-gray-600">{member.memberNumber}</p>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getPositionColor(member.position)}`}>
                  {getPositionLabel(member.position)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => openModal(member)}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">View Details</span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
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
              <th className="text-left py-3 px-6 font-medium text-gray-700">Member</th>
              <th className="text-left py-3 px-6 font-medium text-gray-700">Contact</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Position</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Join Date</th>
              <th className="text-center py-3 px-6 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                      {member.profilePhoto ? (
                        <img
                          src={member.profilePhoto}
                          alt={member.fullname}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.fullname}</p>
                      <p className="text-sm text-gray-500">{member.memberNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-gray-900">{member.email}</p>
                    <p className="text-sm text-gray-500">{member.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(member.position)}`}>
                    {getPositionLabel(member.position)}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <span className="text-gray-900">{new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openModal(member)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
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
      {filteredMembers.map((member) => (
        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {member.profilePhoto ? (
                  <img
                    src={member.profilePhoto}
                    alt={member.fullname}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.fullname}</h3>
                <p className="text-gray-600 mb-2">{member.memberNumber}</p>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPositionColor(member.position)}`}>
                  {getPositionLabel(member.position)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{member.address}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Active Member
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal(member)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
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
          <h1 className="text-3xl font-bold text-gray-900">Members Management</h1>
          <p className="text-gray-600 mt-1">Manage cooperative members and workers</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
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
                placeholder="Search members by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={positionFilter}
                  onChange={(e) => setPositionFilter(e.target.value as 'ALL' | 'WORKER' | 'TEAM_LEADER')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ALL">All Positions</option>
                  <option value="WORKER">Workers</option>
                  <option value="TEAM_LEADER">Team Leaders</option>
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

      {/* Members Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">{filteredMembers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Filtered results</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Leaders</p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredMembers.filter(m => m.position === 'TEAM_LEADER').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Workers</p>
              <p className="text-3xl font-bold text-gray-900">
                {filteredMembers.filter(m => m.position === 'WORKER').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">Try adjusting your search, period, or regional filters.</p>
        </div>
      )}

      {/* Member Details Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Member Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {selectedMember.profilePhoto ? (
                    <img
                      src={selectedMember.profilePhoto}
                      alt={selectedMember.fullname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <User className="w-10 h-10 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.fullname}</h3>
                  <p className="text-gray-600 mb-2">{selectedMember.memberNumber}</p>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getPositionColor(selectedMember.position)}`}>
                    {getPositionLabel(selectedMember.position)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900">{selectedMember.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900">{selectedMember.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Address</p>
                        <p className="text-gray-900">{selectedMember.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Membership Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Badge className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Member ID</p>
                        <p className="text-gray-900">{selectedMember.memberNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Join Date</p>
                        <p className="text-gray-900">{new Date(selectedMember.joinDate).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Status</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
                  Edit Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;