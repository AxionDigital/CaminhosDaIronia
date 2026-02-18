'use client';

import React, { useEffect, useState } from 'react';
import {
  Check, X, Calendar, User, Phone, Sparkles, LogOut,
  Clock, Filter, Search, ChevronRight, LayoutDashboard,
  Gift, CreditCard, Settings, Menu, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/app/components/Loading';
import Toast from '@/app/components/Toast';

export default function AdminDashboard() {
  
  // NAVEGAÇÃO
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // FEEDBACK
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  // FECTH
  useEffect(() => {
    setLoading(false);
  }, []);

  // FEEDBACK - TOAST
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        showToast("Erro ao fazer logout.", "error");
        throw new Error("Erro ao fazer logout.");
      }

      router.replace("/admin/login");
    } catch (err: any) {
      console.error(err);
      showToast("Erro ao desconectar.", "error");
      setError(err.message || "Erro ao desconectar.");
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'gratuitos', label: 'Solicitações Grátis', icon: <Gift className="w-5 h-5" /> },
    { id: 'agendamentos', label: 'Agendamentos Pagos', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex text-[#2D362E]">

      {/* Loading */}
      <LoadingOverlay show={loading} message="Autenticando..." />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}


      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-72' : 'w-20'
          } bg-white border-r border-[#E2E8F0] transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-[#A3B18A] rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl">Admin</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#F8F9F5] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-[#5C6B5E]" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                ? 'bg-[#A3B18A] text-white shadow-lg shadow-[#A3B18A]/20'
                : 'text-[#5C6B5E] hover:bg-[#F8F9F5]'
                }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E2E8F0]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium text-sm">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'} p-8 md:p-12`}>

        {/* Top Bar */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-[#5C6B5E] text-sm mt-1">Bem-vindo de volta ao seu painel de controle.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-[#E2E8F0] rounded-full hover:shadow-sm transition-all relative">
              <Bell className="w-5 h-5 text-[#5C6B5E]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-[#4A5D4E] rounded-full border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard title="Solicitações Grátis" value="14" icon={<Gift className="text-amber-500" />} trend="+3 novos" />
                <StatCard title="Agendamentos Pagos" value="8" icon={<CreditCard className="text-[#A3B18A]" />} trend="+1 hoje" />
                <StatCard title="Total Faturado" value="R$ 2.450" icon={<Check className="text-blue-500" />} trend="Este mês" />
              </div>

              {/* Recent Activity Split */}
              <div className="grid lg:grid-cols-2 gap-12">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl">Últimas Gratuitas</h2>
                    <button onClick={() => setActiveTab('gratuitos')} className="text-xs text-[#A3B18A] font-bold uppercase tracking-widest hover:underline">Ver todas</button>
                  </div>
                  <div className="space-y-4">
                    <SimpleRequestCard name="Ana Clara" theme="Emocional" time="Há 2h" />
                    <SimpleRequestCard name="Lucas Lima" theme="Espiritual" time="Há 5h" />
                  </div>
                </section>
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl">Próximos Pagos</h2>
                    <button onClick={() => setActiveTab('agendamentos')} className="text-xs text-[#A3B18A] font-bold uppercase tracking-widest hover:underline">Ver agenda</button>
                  </div>
                  <div className="space-y-4">
                    <SimpleRequestCard name="Roberto Silva" theme="Financeiro" time="Amanhã, 14h" isPaid />
                    <SimpleRequestCard name="Carla Souza" theme="Relacionamento" time="22/02, 10h" isPaid />
                  </div>
                </section>
              </div>
            </motion.div>
          )}

          {activeTab === 'gratuitos' && (
            <motion.div
              key="gratuitos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-3xl border border-[#E2E8F0]">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C6B5E]/50" />
                  <input type="text" placeholder="Buscar solicitações grátis..." className="w-full pl-11 pr-4 py-3 bg-[#F8F9F5] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#A3B18A]/20 outline-none" />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#F8F9F5] rounded-xl text-sm font-medium hover:bg-[#E2E8F0] transition-colors">
                  <Filter className="w-4 h-4" /> Filtrar
                </button>
              </div>

              <div className="space-y-6">
                <FullRequestCard
                  name="Maria Silva"
                  date="12/03/1989"
                  phone="(17) 99786-0845"
                  theme="Relacionamento"
                  message="Sinto minha vibração baixa e confusa ultimamente."
                  type="Gratuito"
                />
                <FullRequestCard
                  name="João Pereira"
                  date="05/07/1982"
                  phone="(11) 98877-6655"
                  theme="Carreira"
                  message="Busco clareza sobre novos caminhos profissionais."
                  type="Gratuito"
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'agendamentos' && (
            <motion.div
              key="agendamentos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-[#4A5D4E] p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="font-serif text-2xl mb-2">Agenda de Atendimentos</h3>
                  <p className="text-white/70 text-sm">Você tem 5 atendimentos confirmados para esta semana.</p>
                </div>
                <button className="px-8 py-4 bg-white text-[#4A5D4E] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F8F9F5] transition-all">
                  Abrir Calendário
                </button>
              </div>

              <div className="space-y-6">
                <FullRequestCard
                  name="Ricardo Oliveira"
                  date="20/11/1975"
                  phone="(21) 97766-5544"
                  theme="Espiritual"
                  message="Agendamento confirmado para quarta-feira às 15h."
                  type="Pago"
                  isConfirmed
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTES AUXILIARES ---------------- */

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#F8F9F5] rounded-2xl group-hover:scale-110 transition-transform">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
        </div>
        <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">{trend}</span>
      </div>
      <p className="text-xs text-[#5C6B5E] uppercase tracking-wider font-medium mb-1">{title}</p>
      <p className="font-serif text-4xl text-[#2D362E]">{value}</p>
    </div>
  );
}

function SimpleRequestCard({ name, theme, time, isPaid }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#A3B18A]/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif ${isPaid ? 'bg-[#4A5D4E] text-white' : 'bg-[#A3B18A]/10 text-[#A3B18A]'}`}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-[10px] text-[#5C6B5E] uppercase tracking-tight">{theme}</p>
        </div>
      </div>
      <span className="text-[10px] text-[#5C6B5E]/60 font-medium">{time}</span>
    </div>
  );
}

function FullRequestCard({ name, date, phone, theme, message, type, isConfirmed }: any) {
  return (
    <div className="p-8 bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all duration-500">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl ${type === 'Pago' ? 'bg-[#4A5D4E] text-white' : 'bg-[#A3B18A]/10 text-[#A3B18A]'}`}>
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif text-xl">{name}</h3>
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${type === 'Pago' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                {type}
              </span>
            </div>
          </div>
          <div className="space-y-1 text-xs text-[#5C6B5E]">
            <p className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Nasc: {date}</p>
            <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> {phone}</p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#F8F9F5] p-6 rounded-2xl border border-[#E2E8F0]/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3B18A] mb-2">Tema: {theme}</p>
          <p className="italic text-sm text-[#5C6B5E]">“{message}”</p>
        </div>

        <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3">
          {isConfirmed ? (
            <button className="w-full py-4 bg-[#F8F9F5] text-[#4A5D4E] rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-[#E2E8F0]">
              Ver Detalhes
            </button>
          ) : (
            <>
              <button className="flex-1 py-4 bg-[#4A5D4E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#3a4a3e] transition-all">
                Aceitar
              </button>
              <button className="flex-1 py-4 bg-white border border-red-100 text-red-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all">
                Recusar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
