'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Customer, CustomerStatus } from '@/types/customer';
import { X, UserPlus, Image as ImageIcon } from 'lucide-react';
import {
  DEFAULT_AVATAR,
  AVATAR_MALE_1,
  AVATAR_FEMALE_2,
  AVATAR_MALE_2,
} from '@/data/initialCustomers';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (customer: Customer) => void;
  suggestedId: string;
}

const PRESET_AVATARS = [
  { name: 'Default Female', url: DEFAULT_AVATAR },
  { name: 'Male 1', url: AVATAR_MALE_1 },
  { name: 'Female 2', url: AVATAR_FEMALE_2 },
  { name: 'Male 2', url: AVATAR_MALE_2 },
];

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onAddCustomer,
  suggestedId,
}) => {
  const [name, setName] = useState('');
  const [id, setId] = useState(suggestedId);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('25000');
  const [status, setStatus] = useState<CustomerStatus>('Pending');
  const [category, setCategory] = useState('Micro Finance - Group A');
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const amountNum = parseFloat(loanAmount) || 25000;
    const isSuccess = status === 'Successful';

    const newCustomer: Customer = {
      id: id.trim() || suggestedId,
      name: name.trim(),
      status,
      avatarUrl,
      phone: phone.trim() || '+91 98765 00000',
      address: address.trim() || 'Kolkata, WB',
      loanAmount: amountNum,
      paidAmount: isSuccess ? amountNum : 0,
      emiAmount: Math.round(amountNum / 10),
      nextEmiDate: isSuccess ? 'Completed' : '2026-11-01',
      category,
      createdAt: new Date().toISOString().split('T')[0],
      payments: isSuccess
        ? [
            {
              id: `p-${Date.now()}`,
              amount: amountNum,
              date: new Date().toISOString().split('T')[0],
              mode: 'Cash',
              receiptNo: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
            },
          ]
        : [],
    };

    onAddCustomer(newCustomer);
    // Reset form
    setName('');
    setId(suggestedId);
    setPhone('');
    setAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#008b8b] text-white p-5 relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Create New Customer</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Select Profile Picture
            </label>
            <div className="flex items-center gap-3">
              {PRESET_AVATARS.map((av, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setAvatarUrl(av.url)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    avatarUrl === av.url
                      ? 'border-[#008b8b] ring-2 ring-[#008b8b]/40 scale-105'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={av.url}
                    alt={av.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name & ID */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sagar Dad"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Customer ID
              </label>
              <input
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="36464"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
            />
          </div>

          {/* Loan Amount & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="25000"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value as CustomerStatus)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
              >
                <option value="Successful">Successful (Green Dot)</option>
                <option value="Pending">Pending (Orange Dot)</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Finance Group / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
            >
              <option value="Micro Finance - Group A">Micro Finance - Group A</option>
              <option value="Small Loan - Option B">Small Loan - Option B</option>
              <option value="Daily Collection Loan">Daily Collection Loan</option>
              <option value="Commercial Business Loan">Commercial Business Loan</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Address / Location
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Park Street, Kolkata"
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#008b8b] hover:bg-[#00796b] text-white font-semibold rounded-2xl shadow-md transition active:scale-98 mt-2"
          >
            Save & Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};
