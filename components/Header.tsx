'use client';

import React from 'react';
import { User, Bell } from 'lucide-react';

interface HeaderProps {
  agentName?: string;
  appName?: string;
  unreadNotificationsCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  agentName = 'Rajes Roy',
  appName = 'Small Finice',
  unreadNotificationsCount = 2,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <div className="relative bg-[#008b8b] text-white pt-6 pb-14 px-6 rounded-b-[2.8rem] shadow-md transition-all">
      <div className="flex items-start justify-between max-w-md mx-auto">
        {/* Left Agent Profile */}
        <button
          onClick={onOpenProfile}
          className="flex flex-col items-center group focus:outline-none"
          title="View Agent Profile"
        >
          <div className="w-11 h-11 rounded-full border-2 border-white/80 flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all shadow-xs">
            <User className="w-6 h-6 text-white" />
          </div>
          <span className="mt-1 text-sm font-medium tracking-wide text-white/95 group-hover:text-white transition-colors">
            {agentName}
          </span>
        </button>

        {/* Center App Name */}
        <div className="pt-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans drop-shadow-xs">
            {appName}
          </h1>
        </div>

        {/* Right Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full hover:bg-white/10 active:scale-95 focus:outline-none transition-all"
          title="Notifications"
        >
          <Bell className="w-6 h-6 text-white stroke-[2.2]" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#008b8b] animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};
