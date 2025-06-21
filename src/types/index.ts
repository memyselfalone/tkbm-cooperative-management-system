export interface User {
  id: string;
  username: string;
  email: string;
  fullname: string;
  roles: Role[];
  tenant?: Tenant;
  accessToken?: string;
  refreshToken?: string;
}

export interface Role {
  id: string;
  name: string;
  alias: string;
}

export interface Tenant {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  picName: string;
  picPhone: string;
  registrationNumber: string;
  establishedDate: string;
  status: TenantStatus;
  logo?: string;
  description?: string;
  totalMembers: number;
  totalEquipment: number;
  createdAt: string;
  updatedAt: string;
}

export type TenantStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_APPROVAL';

export interface JobRequest {
  id: string;
  jobCode?: string;
  tenant: Tenant;
  pbm: PBM;
  jobType: string;
  shipName: string;
  portLocation: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  requiredWorkers: number;
  requiredHeavyEquipment: RequiredEquipment[];
  status: JobStatus;
  notes?: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  assignedTeamLeaders?: Member[];
  assignedWorkers?: Member[];
  assignedHeavyEquipment?: HeavyEquipmentUnit[];
  createdAt: string;
  updatedAt: string;
}

export interface RequiredEquipment {
  heavyEquipmentCategoryId: string;
  quantity: number;
  categoryName?: string;
}

export type JobStatus = 
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED_BY_TL'
  | 'COMPLETED_APPROVED'
  | 'COMPLETION_REJECTED';

export interface PBM {
  id: string;
  name: string;
  email: string;
  telephone: string;
  address: string;
  picName: string;
  isActive: boolean;
  tenant: Tenant;
  createdAt: string;
}

export interface Member {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  memberNumber: string;
  joinDate: string;
  position: 'WORKER' | 'TEAM_LEADER';
  isActive: boolean;
  tenant: Tenant;
  profilePhoto?: string;
}

export interface HeavyEquipmentCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface HeavyEquipmentUnit {
  id: string;
  category: HeavyEquipmentCategory;
  name: string;
  inventoryNumber: string;
  brand: string;
  model: string;
  capacity: string;
  unit: string;
  status: EquipmentStatus;
  isActive: boolean;
  tenant: Tenant;
  images?: EquipmentImage[];
}

export type EquipmentStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';

export interface EquipmentImage {
  id: string;
  imgUrl: string;
  isDefault: boolean;
  uploadedAt: string;
}

export interface Attendance {
  id: string;
  member: Member;
  jobRequest: JobRequest;
  attendanceType: 'CHECK_IN' | 'CHECK_OUT';
  timestamp: string;
  latitude: number;
  longitude: number;
  jobCode: string;
  isValidLocation: boolean;
  notes?: string;
}

export interface JobTracking {
  id: string;
  jobRequest: JobRequest;
  teamLeader: Member;
  jobStatus: JobStatus;
  volumeHandled: number;
  volumeUnit: string;
  timestamp: string;
  notes?: string;
  images?: TrackingImage[];
}

export interface TrackingImage {
  id: string;
  imgUrl: string;
  notes?: string;
  uploadedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  pbm: PBM;
  jobRequest: JobRequest;
  totalAmount: number;
  status: InvoiceStatus;
  issuedDate?: string;
  dueDate?: string;
  paidDate?: string;
  createdAt: string;
}

export type InvoiceStatus = 'DRAFT' | 'ISSUED' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface MemberObligation {
  id: string;
  member: Member;
  obligationType: ObligationType;
  amount: number;
  dueDate: string;
  description: string;
  status: ObligationStatus;
  paidDate?: string;
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
}

export interface ObligationType {
  id: string;
  name: string;
  isDeductibleFromPayroll: boolean;
}

export type ObligationStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface PayrollPeriod {
  id: string;
  tenant: Tenant;
  yearPeriod: number;
  monthPeriod: number;
  status: PayrollStatus;
  totalWorkers: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  processedAt?: string;
  createdAt: string;
}

export type PayrollStatus = 'DRAFT' | 'PROCESSED' | 'APPROVED' | 'PAID';

export interface PayrollDetail {
  id: string;
  member: Member;
  payrollPeriod: PayrollPeriod;
  basicPay: number;
  overtimePay: number;
  bonus: number;
  grossPay: number;
  deductions: PayrollDeduction[];
  netPay: number;
  workingDays: number;
  overtimeHours: number;
}

export interface PayrollDeduction {
  type: string;
  amount: number;
  description?: string;
}

export interface DashboardStats {
  totalActiveJobs: number;
  totalCompletedJobs: number;
  totalActiveWorkers: number;
  totalRevenue: number;
  monthlyJobTrend: MonthlyData[];
  equipmentUtilization: EquipmentUtilization[];
  recentActivities: Activity[];
}

export interface SuperadminDashboardStats {
  totalTenants: number;
  activeTenants: number;
  totalMembers: number;
  totalEquipment: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyData[];
  tenantPerformance: TenantPerformance[];
  recentActivities: Activity[];
  provinceDistribution: ProvinceData[];
}

export interface TenantPerformance {
  tenant: Tenant;
  totalJobs: number;
  completedJobs: number;
  revenue: number;
  efficiency: number;
}

export interface ProvinceData {
  province: string;
  tenantCount: number;
  totalMembers: number;
  totalRevenue: number;
}

export interface MonthlyData {
  month: string;
  jobs: number;
  revenue: number;
}

export interface EquipmentUtilization {
  name: string;
  utilization: number;
  status: EquipmentStatus;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
  tenant?: Tenant;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  paging?: {
    page: number;
    size: number;
    totalPages: number;
    totalItems: number;
  };
}