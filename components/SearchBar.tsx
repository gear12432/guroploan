'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative -mt-7 px-5 max-w-md mx-auto z-10">
      <div className="relative flex items-center bg-white rounded-full shadow-md border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-[#008b8b]/40">
        <Search className="absolute left-5 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by id or name"
          className="w-full pl-12 pr-10 py-3.5 bg-transparent text-gray-800 placeholder-gray-400 text-base font-normal rounded-full focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
