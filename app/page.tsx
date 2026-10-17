'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ActionBarAndLegend } from '@/components/ActionBarAndLegend';
import { CustomerItem } from '@/components/CustomerItem';
import { ViewCustomerModal } from '@/components/ViewCustomerModal';
import { AddCustomerModal } from '@/components/AddCustomerModal';
import { NotificationsModal } from '@/components/NotificationsModal';
import { AgentProfileModal } from '@/components/AgentProfileModal';
import { Customer, CustomerStatus, NotificationItem } from '@/types/customer';
import { INITIAL_CUSTOMERS } from '@/data/initialCustomers';
import { Smartphone, Maximize2, RefreshCw, Users, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'small_finice_customers_v1';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Payment Received',
    description: 'Sagar Dad (ID 36464) paid ₹2,500 EMI via UPI.',
    time: '10m ago',
    isUnread: true,
    type: 'payment',
  },
  {
    id: 'n2',
    title: 'Account Verification',
    description: 'Riya Sharma (ID 36465) document verified for approval.',
    time: '1h ago',
    isUnread: true,
    type: 'approval',
  },
];

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'All'>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial data from localStorage or default
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomers(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.error('Error loading customers from storage:', e);
    }
    setCustomers(INITIAL_CUSTOMERS);
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
      } catch (e) {
        console.error('Error saving customers:', e);
      }
    }
  }, [customers, isLoaded]);

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Search check by name or ID
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        cust.name.toLowerCase().includes(query) ||
        cust.id.toLowerCase().includes(query) ||
        `id ${cust.id}`.toLowerCase().includes(query);

      // Status filter check
      const matchesStatus =
        statusFilter === 'All' || cust.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  // Handlers
  const handleUpdateCustomer = (updated: Customer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    if (selectedCustomer && selectedCustomer.id === updated.id) {
      setSelectedCustomer(updated);
    }
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer(null);
    }
  };

  const handleAddCustomer = (newCust: Customer) => {
    setCustomers((prev) => [newCust, ...prev]);
    // Add notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'New Customer Created',
      description: `${newCust.name} (ID ${newCust.id}) added to list.`,
      time: 'Just now',
      isUnread: true,
      type: 'approval',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleResetData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  // Auto generate next ID suggestion
  const suggestedId = useMemo(() => {
    const baseNum = 36468 + customers.length;
    return `${baseNum}`;
  }, [customers.length]);

  // Counts for profile
  const totalCount = customers.length;
  const successfulCount = customers.filter((c) => c.status === 'Successful').length;
  const pendingCount = customers.filter((c) => c.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-900 font-sans flex flex-col items-center justify-start antialiased selection:bg-[#008b8b] selection:text-white">
      {/* Top Controls Bar for View Mode Switcher */}
      <header className="w-full bg-slate-950 text-slate-300 py-2.5 px-4 text-xs font-medium border-b border-slate-800 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#008b8b]" />
          <span className="font-bold text-white tracking-wide">Small Finice</span>
          <span className="hidden sm:inline text-slate-500">• Customer Management Portal</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition focus:outline-none"
            title="Toggle Smartphone Frame View"
          >
            {isMobileFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetData}
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-white transition"
            title="Reset to Demo State"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main
        className={`w-full transition-all duration-300 my-0 sm:my-4 ${
          isMobileFrame
            ? 'max-w-[430px] sm:rounded-[2.5rem] sm:shadow-2xl sm:ring-8 sm:ring-slate-800'
            : 'max-w-2xl'
        } bg-[#f4f7f6] min-h-[92vh] flex flex-col overflow-hidden relative pb-10`}
      >
        {/* Teal Header */}
        <Header
          agentName="Rajes Roy"
          appName="Small Finice"
          unreadNotificationsCount={unreadCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Floating Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Action Row & Legend */}
        <ActionBarAndLegend
          onAddClick={() => setIsAddModalOpen(true)}
          activeFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />

        {/* Customer List Section */}
        <div className="px-5 mt-4 flex-1 overflow-y-auto max-w-md mx-auto w-full space-y-1">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white/70 rounded-3xl border border-gray-100 shadow-2xs my-4">
              <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-700 font-medium text-base">
                No matching customer found
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Try searching for a different name or ID, or clear active status filter.
              </p>
              {(searchQuery || statusFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All');
                  }}
                  className="mt-3 px-4 py-1.5 bg-[#008b8b] text-white rounded-full text-xs font-medium hover:bg-[#00796b] transition"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <CustomerItem
                key={customer.id}
                customer={customer}
                onViewClick={setSelectedCustomer}
              />
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      <ViewCustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onUpdateCustomer={handleUpdateCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />

      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCustomer={handleAddCustomer}
        suggestedId={suggestedId}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      <AgentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        agentName="Rajes Roy"
        totalCustomers={totalCount}
        successfulCount={successfulCount}
        pendingCount={pendingCount}
        onResetData={handleResetData}
      />
    </div>
  );
}
