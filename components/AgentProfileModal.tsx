'use client';

import React from 'react';
import { X, User, CheckCircle2, Clock, RefreshCw, FileText } from 'lucide-react';

interface AgentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  totalCustomers: number;
  successfulCount: number;
  pendingCount: number;
  onResetData: () => void;
}

export const AgentProfileModal: React.FC<AgentProfileModalProps> = ({
  isOpen,
  onClose,
  agentName = 'Rajes Roy',
  totalCustomers,
  successfulCount,
  pendingCount,
  onResetData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#008b8b] text-white p-6 relative flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full border-2 border-white/80 bg-white/10 flex items-center justify-center shadow-md mb-2">
            <User className="w-9 h-9 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">{agentName}</h3>
          <p className="text-white/80 text-xs font-medium mt-0.5">
            Senior Field Collection Executive • Small Finice
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-gray-800">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Daily Collection Overview
          </h4>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                Total Clients
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <p className="text-2xl font-bold">{successfulCount}</p>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                Successful
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-700">
                <Clock className="w-3.5 h-3.5" />
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <p className="text-[11px] text-amber-600 font-medium mt-0.5">
                Pending
              </p>
            </div>
          </div>

          {/* Reset & Utility Actions */}
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <button
              onClick={() => {
                if (
                  confirm(
                    'Reset customer list to initial Small Finice layout state?'
                  )
                ) {
                  onResetData();
                  onClose();
                }
              }}
              className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-[#008b8b] font-medium rounded-xl text-sm flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset to Original Image Demo Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
