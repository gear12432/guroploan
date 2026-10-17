'use client';

import React from 'react';
import Image from 'next/image';
import { Customer } from '@/types/customer';

interface CustomerItemProps {
  customer: Customer;
  onViewClick: (customer: Customer) => void;
}

export const CustomerItem: React.FC<CustomerItemProps> = ({
  customer,
  onViewClick,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-2 group hover:bg-white/60 rounded-2xl transition-all">
      {/* Left: Avatar + Customer Details */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 shadow-xs">
          <Image
            src={customer.avatarUrl}
            alt={customer.name}
            fill
            sizes="56px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-gray-900 text-lg font-bold leading-tight truncate">
            {customer.name}
          </h3>
          <p className="text-gray-500 text-base font-medium mt-0.5">
            ID {customer.id}
          </p>
        </div>
      </div>

      {/* Right: Status Indicator Dot & View Button */}
      <div className="flex items-center gap-6 flex-shrink-0 pl-2">
        {/* Status dot */}
        <span
          className={`w-4 h-4 rounded-full flex-shrink-0 shadow-xs ${
            customer.status === 'Successful'
              ? 'bg-[#15803d]'
              : 'bg-[#d97706]'
          }`}
          title={`Status: ${customer.status}`}
        />

        {/* View button */}
        <button
          onClick={() => onViewClick(customer)}
          className="bg-[#dcdfe3] hover:bg-[#cfd4da] active:scale-95 text-gray-700 font-semibold text-sm px-5 py-1.5 rounded-full transition-all focus:outline-none shadow-2xs"
        >
          View
        </button>
      </div>
    </div>
  );
};
