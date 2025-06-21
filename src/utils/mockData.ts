import { JobRequest, PBM, Member, HeavyEquipmentUnit, HeavyEquipmentCategory, DashboardStats, SuperadminDashboardStats, Invoice, Attendance, JobTracking, Tenant, TenantPerformance, ProvinceData } from '../types';

// Helper function to generate dates in the past
const generatePastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Helper function to generate random date within a range
const generateRandomDate = (minDaysAgo: number, maxDaysAgo: number) => {
  const randomDays = Math.floor(Math.random() * (maxDaysAgo - minDaysAgo + 1)) + minDaysAgo;
  return generatePastDate(randomDays);
};

export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Koperasi TKBM Jakarta Utara',
    code: 'TKBM-JKT-UT',
    address: 'Jl. Pelabuhan Tanjung Priok No. 123',
    city: 'Jakarta Utara',
    province: 'DKI Jakarta',
    phone: '+62-21-4370-1234',
    email: 'info@tkbmjakut.co.id',
    picName: 'Budi Hartono',
    picPhone: '+62-812-3456-7890',
    registrationNumber: 'REG-001/TKBM/2020',
    establishedDate: '2020-01-15',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Koperasi tenaga kerja bongkar muat terbesar di Jakarta Utara',
    totalMembers: 245,
    totalEquipment: 18,
    createdAt: generatePastDate(400),
    updatedAt: generatePastDate(2)
  },
  {
    id: '2',
    name: 'Koperasi TKBM Surabaya',
    code: 'TKBM-SBY',
    address: 'Jl. Pelabuhan Tanjung Perak No. 456',
    city: 'Surabaya',
    province: 'Jawa Timur',
    phone: '+62-31-3291-5678',
    email: 'admin@tkbmsurabaya.co.id',
    picName: 'Siti Aminah',
    picPhone: '+62-813-9876-5432',
    registrationNumber: 'REG-002/TKBM/2019',
    establishedDate: '2019-06-20',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Melayani pelabuhan Tanjung Perak dan sekitarnya',
    totalMembers: 189,
    totalEquipment: 12,
    createdAt: generatePastDate(500),
    updatedAt: generatePastDate(5)
  },
  {
    id: '3',
    name: 'Koperasi TKBM Medan',
    code: 'TKBM-MDN',
    address: 'Jl. Pelabuhan Belawan No. 789',
    city: 'Medan',
    province: 'Sumatera Utara',
    phone: '+62-61-6853-9012',
    email: 'kontak@tkbmmedan.co.id',
    picName: 'Ahmad Rizki',
    picPhone: '+62-814-1111-2222',
    registrationNumber: 'REG-003/TKBM/2021',
    establishedDate: '2021-03-10',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Koperasi TKBM yang melayani Pelabuhan Belawan',
    totalMembers: 156,
    totalEquipment: 9,
    createdAt: generatePastDate(300),
    updatedAt: generatePastDate(10)
  },
  {
    id: '4',
    name: 'Koperasi TKBM Makassar',
    code: 'TKBM-MKS',
    address: 'Jl. Pelabuhan Soekarno-Hatta No. 321',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    phone: '+62-411-871-3456',
    email: 'info@tkbmmakassar.co.id',
    picName: 'Nurul Hidayah',
    picPhone: '+62-815-2222-3333',
    registrationNumber: 'REG-004/TKBM/2022',
    establishedDate: '2022-08-05',
    status: 'PENDING_APPROVAL',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Koperasi baru yang akan melayani Pelabuhan Makassar',
    totalMembers: 78,
    totalEquipment: 5,
    createdAt: generatePastDate(200),
    updatedAt: generatePastDate(1)
  },
  {
    id: '5',
    name: 'Koperasi TKBM Semarang',
    code: 'TKBM-SMG',
    address: 'Jl. Pelabuhan Tanjung Emas No. 567',
    city: 'Semarang',
    province: 'Jawa Tengah',
    phone: '+62-24-3520-7890',
    email: 'admin@tkbmsemarang.co.id',
    picName: 'Bambang Sutrisno',
    picPhone: '+62-816-3333-4444',
    registrationNumber: 'REG-005/TKBM/2020',
    establishedDate: '2020-11-12',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Melayani Pelabuhan Tanjung Emas Semarang',
    totalMembers: 134,
    totalEquipment: 8,
    createdAt: generatePastDate(350),
    updatedAt: generatePastDate(15)
  },
  {
    id: '6',
    name: 'Koperasi TKBM Balikpapan',
    code: 'TKBM-BPN',
    address: 'Jl. Pelabuhan Semayang No. 890',
    city: 'Balikpapan',
    province: 'Kalimantan Timur',
    phone: '+62-542-421-5678',
    email: 'info@tkbmbalikpapan.co.id',
    picName: 'Dewi Sartika',
    picPhone: '+62-817-4444-5555',
    registrationNumber: 'REG-006/TKBM/2021',
    establishedDate: '2021-07-20',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Koperasi TKBM untuk wilayah Kalimantan Timur',
    totalMembers: 98,
    totalEquipment: 6,
    createdAt: generatePastDate(280),
    updatedAt: generatePastDate(25)
  },
  {
    id: '7',
    name: 'Koperasi TKBM Batam',
    code: 'TKBM-BTM',
    address: 'Jl. Pelabuhan Sekupang No. 234',
    city: 'Batam',
    province: 'Kepulauan Riau',
    phone: '+62-778-460-1234',
    email: 'kontak@tkbmbatam.co.id',
    picName: 'Rudi Hermawan',
    picPhone: '+62-818-5555-6666',
    registrationNumber: 'REG-007/TKBM/2023',
    establishedDate: '2023-02-14',
    status: 'SUSPENDED',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Koperasi TKBM untuk wilayah Kepulauan Riau',
    totalMembers: 67,
    totalEquipment: 4,
    createdAt: generatePastDate(100),
    updatedAt: generatePastDate(45)
  },
  {
    id: '8',
    name: 'Koperasi TKBM Pontianak',
    code: 'TKBM-PNK',
    address: 'Jl. Pelabuhan Dwikora No. 345',
    city: 'Pontianak',
    province: 'Kalimantan Barat',
    phone: '+62-561-732-4567',
    email: 'admin@tkbmpontianak.co.id',
    picName: 'Sari Indah',
    picPhone: '+62-819-6666-7777',
    registrationNumber: 'REG-008/TKBM/2022',
    establishedDate: '2022-05-30',
    status: 'ACTIVE',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Melayani Pelabuhan Dwikora Pontianak',
    totalMembers: 89,
    totalEquipment: 5,
    createdAt: generatePastDate(250),
    updatedAt: generatePastDate(8)
  }
];

export const mockPBMs: PBM[] = [
  {
    id: '1',
    name: 'PT Samudera Makmur',
    email: 'info@samudramakmur.com',
    telephone: '+62-21-5551234',
    address: 'Jl. Pelabuhan Raya No. 123, Jakarta Utara',
    picName: 'Budi Santoso',
    isActive: true,
    tenant: mockTenants[0],
    createdAt: generatePastDate(120)
  },
  {
    id: '2',
    name: 'PT Nusantara Shipping',
    email: 'contact@nusantarashipping.co.id',
    telephone: '+62-21-5559876',
    address: 'Jl. Maritime Center No. 45, Tanjung Priok',
    picName: 'Sari Dewi',
    isActive: true,
    tenant: mockTenants[0],
    createdAt: generatePastDate(90)
  },
  {
    id: '3',
    name: 'PT Jaya Maritim Surabaya',
    email: 'admin@jayamaritim.co.id',
    telephone: '+62-31-5551111',
    address: 'Jl. Tanjung Perak No. 67, Surabaya',
    picName: 'Eko Prasetyo',
    isActive: true,
    tenant: mockTenants[1],
    createdAt: generatePastDate(150)
  }
];

export const mockHeavyEquipmentCategories: HeavyEquipmentCategory[] = [
  {
    id: '1',
    name: 'Forklift',
    slug: 'forklift',
    description: 'Industrial forklifts for cargo handling',
    isActive: true
  },
  {
    id: '2',
    name: 'Crane',
    slug: 'crane',
    description: 'Heavy lifting cranes',
    isActive: true
  },
  {
    id: '3',
    name: 'Excavator',
    slug: 'excavator',
    description: 'Excavators for heavy construction',
    isActive: true
  }
];

export const mockHeavyEquipmentUnits: HeavyEquipmentUnit[] = [
  {
    id: '1',
    category: mockHeavyEquipmentCategories[0],
    name: 'Forklift Toyota A',
    inventoryNumber: 'FL-001',
    brand: 'Toyota',
    model: '8FG25',
    capacity: '2.5',
    unit: 'ton',
    status: 'AVAILABLE',
    isActive: true,
    tenant: mockTenants[0],
    images: [{
      id: '1',
      imgUrl: 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg',
      isDefault: true,
      uploadedAt: generatePastDate(30)
    }]
  },
  {
    id: '2',
    category: mockHeavyEquipmentCategories[1],
    name: 'Mobile Crane Kato',
    inventoryNumber: 'CR-001',
    brand: 'Kato',
    model: 'NK-200H',
    capacity: '20',
    unit: 'ton',
    status: 'IN_USE',
    isActive: true,
    tenant: mockTenants[0],
    images: [{
      id: '2',
      imgUrl: 'https://images.pexels.com/photos/162568/crane-construction-site-lift-162568.jpeg',
      isDefault: true,
      uploadedAt: generatePastDate(45)
    }]
  },
  {
    id: '3',
    category: mockHeavyEquipmentCategories[0],
    name: 'Forklift Mitsubishi B',
    inventoryNumber: 'FL-SBY-001',
    brand: 'Mitsubishi',
    model: 'FG30N',
    capacity: '3.0',
    unit: 'ton',
    status: 'AVAILABLE',
    isActive: true,
    tenant: mockTenants[1],
    images: [{
      id: '3',
      imgUrl: 'https://images.pexels.com/photos/1619839/pexels-photo-1619839.jpeg',
      isDefault: true,
      uploadedAt: generatePastDate(60)
    }]
  }
];

export const mockMembers: Member[] = [
  {
    id: '1',
    fullname: 'Ahmad Wijaya',
    email: 'ahmad.wijaya@tkbmjakut.co.id',
    phone: '+62-812-3456-7890',
    address: 'Jl. Merdeka No. 10, Jakarta Utara',
    memberNumber: 'TL-JKT-001',
    joinDate: generatePastDate(180),
    position: 'TEAM_LEADER',
    isActive: true,
    tenant: mockTenants[0],
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: '2',
    fullname: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@tkbmjakut.co.id',
    phone: '+62-813-9876-5432',
    address: 'Jl. Pelabuhan No. 25, Jakarta Utara',
    memberNumber: 'WK-JKT-001',
    joinDate: generatePastDate(150),
    position: 'WORKER',
    isActive: true,
    tenant: mockTenants[0],
    profilePhoto: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg'
  },
  {
    id: '3',
    fullname: 'Bambang Sutrisno',
    email: 'bambang.sutrisno@tkbmjakut.co.id',
    phone: '+62-814-1111-2222',
    address: 'Jl. Dermaga No. 8, Jakarta Utara',
    memberNumber: 'WK-JKT-002',
    joinDate: generatePastDate(120),
    position: 'WORKER',
    isActive: true,
    tenant: mockTenants[0],
    profilePhoto: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
  },
  {
    id: '4',
    fullname: 'Eko Prasetyo',
    email: 'eko.prasetyo@tkbmsurabaya.co.id',
    phone: '+62-815-4444-5555',
    address: 'Jl. Pahlawan No. 15, Surabaya',
    memberNumber: 'TL-SBY-001',
    joinDate: generatePastDate(200),
    position: 'TEAM_LEADER',
    isActive: true,
    tenant: mockTenants[1],
    profilePhoto: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  }
];

export const mockJobRequests: JobRequest[] = [
  {
    id: '1',
    jobCode: 'PJ-JKT-001',
    tenant: mockTenants[0],
    pbm: mockPBMs[0],
    jobType: 'Container Loading/Unloading',
    shipName: 'MV Ocean Star',
    portLocation: 'Tanjung Priok Terminal 1',
    startDate: generatePastDate(3),
    endDate: generatePastDate(3),
    startTime: '08:00',
    endTime: '17:00',
    requiredWorkers: 12,
    requiredHeavyEquipment: [
      {
        heavyEquipmentCategoryId: '1',
        quantity: 2,
        categoryName: 'Forklift'
      }
    ],
    status: 'IN_PROGRESS',
    notes: 'Urgent cargo handling required',
    contactPersonName: 'Budi Santoso',
    contactPersonEmail: 'budi@samudramakmur.com',
    contactPersonPhone: '+62-812-5555-1234',
    assignedTeamLeaders: [mockMembers[0]],
    assignedWorkers: [mockMembers[1], mockMembers[2]],
    assignedHeavyEquipment: [mockHeavyEquipmentUnits[0]],
    createdAt: generatePastDate(5),
    updatedAt: generatePastDate(1)
  },
  {
    id: '2',
    tenant: mockTenants[0],
    pbm: mockPBMs[1],
    jobType: 'Bulk Cargo Unloading',
    shipName: 'KM Nusantara Jaya',
    portLocation: 'Tanjung Priok Terminal 2',
    startDate: generatePastDate(10),
    endDate: generatePastDate(8),
    startTime: '06:00',
    endTime: '18:00',
    requiredWorkers: 20,
    requiredHeavyEquipment: [
      {
        heavyEquipmentCategoryId: '2',
        quantity: 1,
        categoryName: 'Crane'
      }
    ],
    status: 'PENDING',
    notes: 'Coal unloading operation',
    contactPersonName: 'Sari Dewi',
    contactPersonEmail: 'sari@nusantarashipping.co.id',
    contactPersonPhone: '+62-813-6666-7890',
    createdAt: generatePastDate(12),
    updatedAt: generatePastDate(12)
  },
  {
    id: '3',
    jobCode: 'PJ-SBY-001',
    tenant: mockTenants[1],
    pbm: mockPBMs[2],
    jobType: 'General Cargo Handling',
    shipName: 'KM Surabaya Express',
    portLocation: 'Tanjung Perak Terminal A',
    startDate: generatePastDate(20),
    endDate: generatePastDate(19),
    startTime: '07:00',
    endTime: '16:00',
    requiredWorkers: 15,
    requiredHeavyEquipment: [
      {
        heavyEquipmentCategoryId: '1',
        quantity: 1,
        categoryName: 'Forklift'
      }
    ],
    status: 'COMPLETED_APPROVED',
    notes: 'Standard cargo handling',
    contactPersonName: 'Eko Prasetyo',
    contactPersonEmail: 'eko@jayamaritim.co.id',
    contactPersonPhone: '+62-813-7777-8888',
    assignedTeamLeaders: [mockMembers[3]],
    createdAt: generatePastDate(25),
    updatedAt: generatePastDate(18)
  }
];

export const mockDashboardStats: DashboardStats = {
  totalActiveJobs: 5,
  totalCompletedJobs: 23,
  totalActiveWorkers: 45,
  totalRevenue: 2850000000,
  monthlyJobTrend: [
    { month: 'Jan', jobs: 18, revenue: 1200000000 },
    { month: 'Feb', jobs: 22, revenue: 1450000000 },
    { month: 'Mar', jobs: 28, revenue: 1850000000 }
  ],
  equipmentUtilization: [
    { name: 'FL-001', utilization: 85, status: 'IN_USE' },
    { name: 'FL-002', utilization: 72, status: 'AVAILABLE' },
    { name: 'CR-001', utilization: 90, status: 'IN_USE' }
  ],
  recentActivities: [
    {
      id: '1',
      type: 'job_completed',
      description: 'Job PJ-JKT-001 completed successfully',
      timestamp: generatePastDate(0), // Today
      user: 'Ahmad Wijaya'
    },
    {
      id: '2',
      type: 'job_assigned',
      description: 'New job assigned to Team Leader Ahmad',
      timestamp: generatePastDate(1), // Yesterday
      user: 'Admin System'
    },
    {
      id: '3',
      type: 'equipment_maintenance',
      description: 'Forklift FL-002 scheduled for maintenance',
      timestamp: generatePastDate(2), // 2 days ago
      user: 'Maintenance Team'
    },
    {
      id: '4',
      type: 'member_joined',
      description: 'New member registered: Siti Nurhaliza',
      timestamp: generatePastDate(5), // 5 days ago
      user: 'HR Admin'
    },
    {
      id: '5',
      type: 'job_started',
      description: 'Container loading operation started',
      timestamp: generatePastDate(7), // 1 week ago
      user: 'Bambang Sutrisno'
    },
    {
      id: '6',
      type: 'payment_received',
      description: 'Payment received for invoice INV-JKT-001',
      timestamp: generatePastDate(15), // 2 weeks ago
      user: 'Finance Team'
    },
    {
      id: '7',
      type: 'equipment_added',
      description: 'New crane added to equipment fleet',
      timestamp: generatePastDate(35), // 1 month ago
      user: 'Equipment Manager'
    },
    {
      id: '8',
      type: 'training_completed',
      description: 'Safety training completed by 15 workers',
      timestamp: generatePastDate(95), // 3 months ago
      user: 'Training Coordinator'
    },
    {
      id: '9',
      type: 'contract_signed',
      description: 'New contract signed with PT Samudera Makmur',
      timestamp: generatePastDate(180), // 6 months ago
      user: 'Business Development'
    },
    {
      id: '10',
      type: 'system_upgrade',
      description: 'Management system upgraded to v2.0',
      timestamp: generatePastDate(400), // Over 1 year ago
      user: 'IT Administrator'
    }
  ]
};

export const mockSuperadminDashboardStats: SuperadminDashboardStats = {
  totalTenants: 8,
  activeTenants: 6,
  totalMembers: 1056,
  totalEquipment: 67,
  totalRevenue: 15750000000,
  monthlyRevenue: [
    { month: 'Oct', jobs: 78, revenue: 4200000000 },
    { month: 'Nov', jobs: 85, revenue: 4800000000 },
    { month: 'Dec', jobs: 92, revenue: 5200000000 },
    { month: 'Jan', jobs: 98, revenue: 5600000000 },
    { month: 'Feb', jobs: 105, revenue: 6100000000 },
    { month: 'Mar', jobs: 112, revenue: 6750000000 }
  ],
  tenantPerformance: [
    {
      tenant: mockTenants[0],
      totalJobs: 45,
      completedJobs: 42,
      revenue: 4200000000,
      efficiency: 93.3
    },
    {
      tenant: mockTenants[1],
      totalJobs: 38,
      completedJobs: 35,
      revenue: 3500000000,
      efficiency: 92.1
    },
    {
      tenant: mockTenants[2],
      totalJobs: 32,
      completedJobs: 29,
      revenue: 2800000000,
      efficiency: 90.6
    },
    {
      tenant: mockTenants[4],
      totalJobs: 28,
      completedJobs: 25,
      revenue: 2400000000,
      efficiency: 89.3
    },
    {
      tenant: mockTenants[5],
      totalJobs: 22,
      completedJobs: 20,
      revenue: 1900000000,
      efficiency: 90.9
    },
    {
      tenant: mockTenants[7],
      totalJobs: 18,
      completedJobs: 16,
      revenue: 1500000000,
      efficiency: 88.9
    },
    {
      tenant: mockTenants[3],
      totalJobs: 8,
      completedJobs: 5,
      revenue: 450000000,
      efficiency: 62.5
    },
    {
      tenant: mockTenants[6],
      totalJobs: 0,
      completedJobs: 0,
      revenue: 0,
      efficiency: 0
    }
  ],
  recentActivities: [
    {
      id: '1',
      type: 'tenant_registered',
      description: 'New tenant application submitted: Koperasi TKBM Makassar',
      timestamp: generatePastDate(0), // Today
      user: 'System',
      tenant: mockTenants[3]
    },
    {
      id: '2',
      type: 'job_completed',
      description: 'Major container operation completed at Tanjung Perak',
      timestamp: generatePastDate(1), // Yesterday
      user: 'Eko Prasetyo',
      tenant: mockTenants[1]
    },
    {
      id: '3',
      type: 'equipment_added',
      description: 'New mobile crane added to Jakarta Utara fleet',
      timestamp: generatePastDate(3), // 3 days ago
      user: 'Admin Jakarta',
      tenant: mockTenants[0]
    },
    {
      id: '4',
      type: 'tenant_suspended',
      description: 'Tenant suspended due to compliance issues: Koperasi TKBM Batam',
      timestamp: generatePastDate(8), // 1 week ago
      user: 'Superadmin',
      tenant: mockTenants[6]
    },
    {
      id: '5',
      type: 'revenue_milestone',
      description: 'Monthly revenue target exceeded by 15% in Semarang',
      timestamp: generatePastDate(12), // 12 days ago
      user: 'System',
      tenant: mockTenants[4]
    },
    {
      id: '6',
      type: 'member_milestone',
      description: 'Medan cooperative reached 150+ active members',
      timestamp: generatePastDate(20), // 20 days ago
      user: 'Admin Medan',
      tenant: mockTenants[2]
    },
    {
      id: '7',
      type: 'contract_renewal',
      description: 'Major PBM contract renewed in Surabaya',
      timestamp: generatePastDate(35), // 1 month ago
      user: 'Business Manager',
      tenant: mockTenants[1]
    },
    {
      id: '8',
      type: 'safety_audit',
      description: 'Safety audit completed for all Jakarta operations',
      timestamp: generatePastDate(50), // 50 days ago
      user: 'Safety Inspector',
      tenant: mockTenants[0]
    },
    {
      id: '9',
      type: 'training_program',
      description: 'National training program launched for team leaders',
      timestamp: generatePastDate(95), // 3 months ago
      user: 'Training Director',
      tenant: undefined
    },
    {
      id: '10',
      type: 'expansion_approved',
      description: 'Expansion to Kalimantan region approved',
      timestamp: generatePastDate(180), // 6 months ago
      user: 'Board of Directors',
      tenant: undefined
    },
    {
      id: '11',
      type: 'system_integration',
      description: 'National database integration completed',
      timestamp: generatePastDate(400), // Over 1 year ago
      user: 'IT Team',
      tenant: undefined
    }
  ],
  provinceDistribution: [
    {
      province: 'DKI Jakarta',
      tenantCount: 1,
      totalMembers: 245,
      totalRevenue: 4200000000
    },
    {
      province: 'Jawa Timur',
      tenantCount: 1,
      totalMembers: 189,
      totalRevenue: 3500000000
    },
    {
      province: 'Sumatera Utara',
      tenantCount: 1,
      totalMembers: 156,
      totalRevenue: 2800000000
    },
    {
      province: 'Jawa Tengah',
      tenantCount: 1,
      totalMembers: 134,
      totalRevenue: 2400000000
    },
    {
      province: 'Kalimantan Timur',
      tenantCount: 1,
      totalMembers: 98,
      totalRevenue: 1900000000
    },
    {
      province: 'Kalimantan Barat',
      tenantCount: 1,
      totalMembers: 89,
      totalRevenue: 1500000000
    },
    {
      province: 'Sulawesi Selatan',
      tenantCount: 1,
      totalMembers: 78,
      totalRevenue: 450000000
    },
    {
      province: 'Kepulauan Riau',
      tenantCount: 1,
      totalMembers: 67,
      totalRevenue: 0
    }
  ]
};

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-JKT-2024-001',
    pbm: mockPBMs[0],
    jobRequest: mockJobRequests[0],
    totalAmount: 25000000,
    status: 'ISSUED',
    issuedDate: generatePastDate(5),
    dueDate: generatePastDate(-10), // Future date
    createdAt: generatePastDate(5)
  },
  {
    id: '2',
    invoiceNumber: 'INV-SBY-2024-001',
    pbm: mockPBMs[2],
    jobRequest: mockJobRequests[2],
    totalAmount: 18000000,
    status: 'PAID',
    issuedDate: generatePastDate(15),
    dueDate: generatePastDate(5),
    paidDate: generatePastDate(3),
    createdAt: generatePastDate(15)
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    member: mockMembers[1],
    jobRequest: mockJobRequests[0],
    attendanceType: 'CHECK_IN',
    timestamp: generatePastDate(1),
    latitude: -6.1275,
    longitude: 106.8817,
    jobCode: 'PJ-JKT-001',
    isValidLocation: true,
    notes: 'On time arrival'
  }
];

export const mockJobTracking: JobTracking[] = [
  {
    id: '1',
    jobRequest: mockJobRequests[0],
    teamLeader: mockMembers[0],
    jobStatus: 'IN_PROGRESS',
    volumeHandled: 150,
    volumeUnit: 'containers',
    timestamp: generatePastDate(2),
    notes: '50% completion, good progress',
    images: [{
      id: '1',
      imgUrl: 'https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg',
      notes: 'Container stacking progress',
      uploadedAt: generatePastDate(2)
    }]
  }
];