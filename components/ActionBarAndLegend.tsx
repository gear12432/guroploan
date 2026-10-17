'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { CustomerStatus } from '@/types/customer';

interface ActionBarAndLegendProps {
  onAddClick: () => void;
  activeFilter: CustomerStatus | 'All';
  onFilterChange: (filter: CustomerStatus | 'All') => void;
}

export const ActionBarAndLegend: React.FC<ActionBarAndLegendProps> = ({
  onAddClick,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="px-6 mt-6 max-w-md mx-auto space-y-4">
      {/* Action Row: 'create new customer' label & 'Add now' button */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 text-lg font-medium tracking-tight">
          create new customer
        </span>
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 bg-[#00897b] hover:bg-[#00796b] text-white font-medium px-5 py-2 rounded-full text-base transition-all active:scale-95 shadow-xs focus:outline-none"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add now</span>
        </button>
      </div>

      {/* Legend / Status Filter Row */}
      <div className="flex items-center gap-6 pt-1">
        {/* All Filter Button (Optional quick toggle) */}
        {activeFilter !== 'All' && (
          <button
            onClick={() => onFilterChange('All')}
            className="text-xs font-semibold text-[#00897b] underline hover:text-teal-800 transition"
          >
            Show All
          </button>
        )}

        {/* Pending Legend / Filter */}
        <button
          onClick={() =>
            onFilterChange(activeFilter === 'Pending' ? 'All' : 'Pending')
          }
          className={`flex items-center gap-2.5 transition-all focus:outline-none rounded-lg px-2 py-1 -ml-2 ${
            activeFilter === 'Pending'
              ? 'bg-amber-100 ring-1 ring-amber-400/50'
              : 'hover:opacity-80'
          }`}
          title="Filter by Pending status"
        >
          <span className="w-5 h-5 rounded-full bg-[#d97706] border border-amber-600/30 shadow-xs flex-shrink-0" />
          <span className="text-gray-800 text-base font-normal">Pending</span>
        </button>

        {/* Successful Legend / Filter */}
        <button
          onClick={() =>
            onFilterChange(
              activeFilter === 'Successful' ? 'All' : 'Successful'
            )
          }
          className={`flex items-center gap-2.5 transition-all focus:outline-none rounded-lg px-2 py-1 ${
            activeFilter === 'Successful'
              ? 'bg-emerald-100 ring-1 ring-emerald-400/50'
              : 'hover:opacity-80'
          }`}
          title="Filter by Successful status"
        >
          <span className="w-5 h-5 rounded-full bg-[#15803d] border border-emerald-700/30 shadow-xs flex-shrink-0" />
          <span className="text-gray-800 text-base font-normal">
            Successful
          </span>
        </button>
      </div>
    </div>
  );
};
