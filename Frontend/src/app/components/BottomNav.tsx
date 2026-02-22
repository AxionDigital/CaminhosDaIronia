'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Gift, CreditCard, Settings } from 'lucide-react';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function BottomNav({ activeTab, setActiveTab }: Props) {
  const menuItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'gratuitos', label: 'Grátis', icon: Gift },
    { id: 'agendamentos', label: 'Agenda', icon: CreditCard },
    { id: 'configuracoes', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-t border-[#E2E8F0] px-6 pb-8 pt-3">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center gap-1 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive ? 'text-[#A3B18A]' : 'text-[#5C6B5E]'
              }`}>
                <Icon className={`w-6 h-6 ${isActive ? 'fill-[#A3B18A]/10' : ''}`} />
              </div>
              
              <span className={`text-[10px] font-bold uppercase tracking-tighter transition-all duration-300 ${
                isActive ? 'text-[#A3B18A]' : 'text-[#5C6B5E]/60'
              }`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-3 w-1 h-1 bg-[#A3B18A] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
