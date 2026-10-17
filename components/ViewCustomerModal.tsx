'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Customer, CustomerStatus } from '@/types/customer';
import {
  X,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Calendar,
  CreditCard,
  MapPin,
  Trash2,
  IndianRupee,
  PlusCircle,
  Tag,
} from 'lucide-react';

interface ViewCustomerModalProps {
  customer: Customer | null;
  onClose: () => void;
  onUpdateCustomer: (updated: Customer) => void;
  onDeleteCustomer: (id: string) => void;
}

export const ViewCustomerModal: React.FC<ViewCustomerModalProps> = ({
  customer,
  onClose,
  onUpdateCustomer,
  onDeleteCustomer,
}) => {
  const [showCollectPayment, setShowCollectPayment] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payMode, setPayMode] = useState<'UPI' | 'Cash' | 'Bank Transfer'>('UPI');

  if (!customer) return null;

  const percentage = Math.min(
    100,
    Math.round((customer.paidAmount / (customer.loanAmount || 1)) * 100)
  );

  const handleToggleStatus = () => {
    const nextStatus: CustomerStatus =
      customer.status === 'Successful' ? 'Pending' : 'Successful';
    onUpdateCustomer({
      ...customer,
      status: nextStatus,
    });
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newPaid = customer.paidAmount + amountNum;
    const isNowFinished = newPaid >= customer.loanAmount;

    const newPayment = {
      id: `p-${Date.now()}`,
      amount: amountNum,
      date: new Date().toISOString().split('T')[0],
      mode: payMode,
      receiptNo: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const updatedPayments = [newPayment, ...(customer.payments || [])];

    onUpdateCustomer({
      ...customer,
      paidAmount: newPaid,
      status: isNowFinished ? 'Successful' : customer.status,
      nextEmiDate: isNowFinished ? 'Completed' : customer.nextEmiDate,
      payments: updatedPayments,
    });

    setPayAmount('');
    setShowCollectPayment(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#008b8b] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mt-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/80 shadow-sm flex-shrink-0">
              <Image
                src={customer.avatarUrl}
                alt={customer.name}
                fill
                sizes="64px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {customer.name}
              </h2>
              <p className="text-white/80 text-sm font-medium mt-0.5">
                ID: {customer.id}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={handleToggleStatus}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs transition-transform active:scale-95 ${
                    customer.status === 'Successful'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                  title="Click to toggle status"
                >
                  {customer.status === 'Successful' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                  <span>{customer.status}</span>
                  <span className="text-[10px] opacity-75 underline ml-1">
                    (Change)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-gray-800">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${customer.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 bg-teal-50 hover:bg-teal-100 text-[#008b8b] font-medium rounded-xl text-sm transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call Customer</span>
            </a>
            <a
              href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(customer.name)},%20regarding%20your%20Small%20Finice%20account%20ID%20${customer.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl text-sm transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Financial Overview Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Loan Progress
              </span>
              <span className="text-xs font-bold text-[#008b8b]">
                {percentage}% Paid
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#008b8b] h-full transition-all duration-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-gray-500">Total Loan</p>
                <p className="text-lg font-bold text-gray-900 flex items-center">
                  <IndianRupee className="w-4 h-4" />
                  {customer.loanAmount.toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Paid Amount</p>
                <p className="text-lg font-bold text-emerald-600 flex items-center">
                  <IndianRupee className="w-4 h-4" />
                  {customer.paidAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200/60 pt-3 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CreditCard className="w-4 h-4 text-[#008b8b]" />
                <span>EMI: ₹{customer.emiAmount.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Due: {customer.nextEmiDate}</span>
              </div>
            </div>
          </div>

          {/* Collect Payment Drawer / Form */}
          {!showCollectPayment ? (
            <button
              onClick={() => setShowCollectPayment(true)}
              className="w-full py-3 bg-[#008b8b] hover:bg-[#00796b] text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-98"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Record EMI / Payment</span>
            </button>
          ) : (
            <form
              onSubmit={handleAddPayment}
              className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 space-y-3 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#008b8b]">
                  Record New Payment
                </h4>
                <button
                  type="button"
                  onClick={() => setShowCollectPayment(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder={`e.g. ${customer.emiAmount}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Payment Mode
                </label>
                <select
                  value={payMode}
                  onChange={(e: any) => setPayMode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#008b8b]"
                >
                  <option value="UPI">UPI / GPay / PhonePe</option>
                  <option value="Cash">Cash Collection</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#008b8b] text-white font-medium text-sm rounded-xl hover:bg-[#00796b] transition"
              >
                Confirm Payment
              </button>
            </form>
          )}

          {/* Details Section */}
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-500">Category:</span>
              <span className="font-semibold text-gray-800">
                {customer.category}
              </span>
            </div>

            {customer.address && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="font-medium text-gray-500">Address:</span>
                <span className="font-normal text-gray-800">
                  {customer.address}
                </span>
              </div>
            )}
          </div>

          {/* Payment History */}
          {customer.payments && customer.payments.length > 0 && (
            <div className="border-t border-gray-200 pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Payment History
              </h4>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {customer.payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        ₹{p.amount.toLocaleString('en-IN')} ({p.mode})
                      </p>
                      <p className="text-gray-400 text-[11px]">{p.receiptNo}</p>
                    </div>
                    <span className="text-gray-500 font-medium">{p.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Danger Zone / Delete */}
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
                  onDeleteCustomer(customer.id);
                  onClose();
                }
              }}
              className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Customer</span>
            </button>
            <span className="text-[11px] text-gray-400">
              Created: {customer.createdAt}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
