'use client';

import React from 'react';
import { X, Bell, Check, DollarSign, UserCheck } from 'lucide-react';
import { NotificationItem } from '@/types/customer';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#008b8b] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <h3 className="text-lg font-bold text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition focus:outline-none"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Recent Alerts
            </span>
            <button
              onClick={onMarkAllRead}
              className="text-xs text-[#008b8b] font-medium hover:underline flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              No new notifications.
            </p>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  item.isUnread
                    ? 'bg-teal-50/60 border-teal-200'
                    : 'bg-gray-50 border-gray-100'
                }`}
              >
                <div className="p-2 rounded-xl bg-[#008b8b]/10 text-[#008b8b] flex-shrink-0">
                  {item.type === 'payment' ? (
                    <DollarSign className="w-4 h-4" />
                  ) : (
                    <UserCheck className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-gray-800 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-gray-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
