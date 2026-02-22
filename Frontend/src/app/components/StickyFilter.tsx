'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFilterClick?: () => void;
};

export default function StickyFilter({ searchTerm, setSearchTerm, onFilterClick }: Props) {
  return (
    <div className="sticky top-0 z-[40] -mx-6 px-6  md:relative md:top-auto md:z-0 md:mx-0 md:px-0 md:py-0 md:bg-transparent md:border-none mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white md:bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#E2E8F0] shadow-sm md:shadow-none">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6B5E]/50" />
          <input 
            type="text" 
            placeholder="Buscar solicitações..." 
            value={searchTerm}  
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#F8F9F5] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#A3B18A]/20 outline-none" 
          />
        </div>
      </div>
    </div>
  );
}
