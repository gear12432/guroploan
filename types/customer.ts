export type CustomerStatus = 'Pending' | 'Successful';

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  mode: 'Cash' | 'UPI' | 'Bank Transfer';
  receiptNo: string;
}

export interface Customer {
  id: string; // e.g. "36464"
  name: string; // e.g. "Sagar Dad"
  status: CustomerStatus;
  avatarUrl: string;
  phone: string;
  address?: string;
  loanAmount: number;
  paidAmount: number;
  nextEmiDate: string;
  emiAmount: number;
  category: string;
  createdAt: string;
  payments?: PaymentRecord[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  type: 'payment' | 'approval' | 'system';
}
