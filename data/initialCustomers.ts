import { Customer } from '@/types/customer';

// Exact photo matching the image avatar profile
export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
export const AVATAR_MALE_1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';
export const AVATAR_FEMALE_2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80';
export const AVATAR_MALE_2 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: '36464',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43210',
    address: '12-B Park Street, Kolkata, WB',
    loanAmount: 25000,
    paidAmount: 25000,
    emiAmount: 2500,
    nextEmiDate: 'Completed',
    category: 'Micro Finance - Group A',
    createdAt: '2026-01-10',
    payments: [
      { id: 'p1', amount: 5000, date: '2026-03-01', mode: 'UPI', receiptNo: 'REC-9012' },
      { id: 'p2', amount: 10000, date: '2026-02-01', mode: 'Cash', receiptNo: 'REC-8841' },
      { id: 'p3', amount: 10000, date: '2026-01-10', mode: 'Bank Transfer', receiptNo: 'REC-8210' }
    ]
  },
  {
    id: '36464-B',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43211',
    address: '45 Lake Gardens, Kolkata, WB',
    loanAmount: 30000,
    paidAmount: 30000,
    emiAmount: 3000,
    nextEmiDate: 'Completed',
    category: 'Small Loan - Option B',
    createdAt: '2026-02-01',
    payments: [
      { id: 'p4', amount: 15000, date: '2026-03-10', mode: 'UPI', receiptNo: 'REC-9211' }
    ]
  },
  {
    id: '36464-C',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43212',
    address: 'Block C, Salt Lake Sector V, Kolkata',
    loanAmount: 18000,
    paidAmount: 18000,
    emiAmount: 1800,
    nextEmiDate: 'Completed',
    category: 'Daily Collection Loan',
    createdAt: '2026-02-15'
  },
  {
    id: '36465',
    name: 'Riya Sharma',
    status: 'Pending',
    avatarUrl: AVATAR_FEMALE_2,
    phone: '+91 98300 12345',
    address: '88 Rashbehari Avenue, Kolkata',
    loanAmount: 40000,
    paidAmount: 20000,
    emiAmount: 4000,
    nextEmiDate: '2026-10-25',
    category: 'Personal Finance',
    createdAt: '2026-03-01',
    payments: [
      { id: 'p5', amount: 10000, date: '2026-03-15', mode: 'UPI', receiptNo: 'REC-9512' }
    ]
  },
  {
    id: '36464-D',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43213',
    address: 'Gariahat Market Road, Kolkata',
    loanAmount: 22000,
    paidAmount: 22000,
    emiAmount: 2200,
    nextEmiDate: 'Completed',
    category: 'Group Finance',
    createdAt: '2026-01-20'
  },
  {
    id: '36466',
    name: 'Vikram Singh',
    status: 'Pending',
    avatarUrl: AVATAR_MALE_1,
    phone: '+91 97112 33445',
    address: 'New Town Action Area 1, Kolkata',
    loanAmount: 50000,
    paidAmount: 15000,
    emiAmount: 5000,
    nextEmiDate: '2026-10-20',
    category: 'Commercial Business Loan',
    createdAt: '2026-02-10'
  },
  {
    id: '36464-E',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43214',
    address: 'Jadavpur 8B Bus Stand, Kolkata',
    loanAmount: 15000,
    paidAmount: 15000,
    emiAmount: 1500,
    nextEmiDate: 'Completed',
    category: 'Micro Finance - Group A',
    createdAt: '2026-01-05'
  },
  {
    id: '36467',
    name: 'Ankit Verma',
    status: 'Successful',
    avatarUrl: AVATAR_MALE_2,
    phone: '+91 91234 56789',
    address: 'Behala Chowrasta, Kolkata',
    loanAmount: 35000,
    paidAmount: 35000,
    emiAmount: 3500,
    nextEmiDate: 'Completed',
    category: 'Small Business Loan',
    createdAt: '2026-01-18'
  },
  {
    id: '36464-F',
    name: 'Sagar Dad',
    status: 'Successful',
    avatarUrl: DEFAULT_AVATAR,
    phone: '+91 98765 43215',
    address: 'Dum Dum Station Road, Kolkata',
    loanAmount: 20000,
    paidAmount: 20000,
    emiAmount: 2000,
    nextEmiDate: 'Completed',
    category: 'Group Finance',
    createdAt: '2026-02-11'
  }
];
