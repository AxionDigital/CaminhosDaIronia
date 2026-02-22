'use client';

import React, { useEffect, useState } from 'react';
import {
  Check, X, Calendar, User, Phone, Sparkles, LogOut,
  Clock, Filter, Search, ChevronRight, LayoutDashboard,
  Gift, CreditCard, Settings, Menu, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '@/src/app/components/Loading';
import Toast from '@/src/app/components/Toast';
import { ComponentType } from 'react';
import FeedbackModal from '@/src/app/components/FeedbackModal';
import BottomNav from '@/src/app/components/BottomNav';
import StickyFilter from '@/src/app/components/StickyFilter';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: ComponentType<{ className?: string }>;
}

type Solicitacao = {
  _id: string;
  nome: string;
  nascimento: string;
  whatsapp: string;
  tema: string;
  mensagem: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {

  // URL
  const API = process.env.NEXT_PUBLIC_API_URL;

  // NAVEGAÇÃO
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // FEEDBACK
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  // FILTRO
  const [searchTerm, setSearchTerm] = useState('');

  // MODAL FEEDBACK
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const abrirFeedback = (cliente: any) => {
    setSelectedClient(cliente);
    setModalOpen(true);
  };

  // FECTH
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/solicitacao`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res2 = await fetch(`/api/feedback`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data2 = await res2.json();
      setFeedbacks(data2);

      if (!res.ok) throw new Error("Erro ao buscar solicitações");

      const data = await res.json();
      setSolicitacoes(data);

    } catch (err: any) {
      console.error(err);
      showToast("Erro ao carregar solicitações", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  // ATUALIZAR STATUS - SOLICITAÇÃO GRATIS
  const atualizarStatus = async (id: string, status: "aprovado" | "recusado") => {
    try {
      const res = await fetch(`/api/solicitacao/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error();

      setSolicitacoes(prev =>
        prev.map(s => s._id === id ? { ...s, status } : s)
      );

      showToast(`Solicitação ${status}!`);

    } catch {
      showToast("Erro ao atualizar status", "error");
    }
  };

  const getFeedbackToken = (solicitacaoId: string) => {
    const fb = feedbacks.find(f => f.solicitacaoId === solicitacaoId);
    return fb?.token;
  };

  // FORMARTAR TEMPO
  const ultimos = solicitacoes.slice(0, 2);

  const formatarTempo = (data: string) => {
    const diff = Date.now() - new Date(data).getTime();
    const horas = Math.floor(diff / 1000 / 60 / 60);

    if (horas < 1) return "Agora";
    if (horas < 24) return `Há ${horas}h`;

    const dias = Math.floor(horas / 24);
    return `Há ${dias}d`;
  };

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'gratuitos', label: 'Espelhamento por Consiência', icon: <Gift className="w-5 h-5" /> },
    { id: 'agendamentos', label: 'Agendamentos', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex text-[#2D362E] overflow-hidden">

      {/* Loading */}
      <LoadingOverlay show={loading} message="Autenticando..." />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Modal Feedback */}
      <FeedbackModal
        open={modalOpen}
        client={selectedClient}
        onClose={() => setModalOpen(false)}
        onSave={async (data) => {
          try {
            const res = await fetch(`/api/feedback`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                solicitacaoId: selectedClient.id,
                hz: data.hz,
                nivel: data.nivel,
                mental: data.mental,
                emocional: data.emocional,
                energetico: data.energetico,
                espiritual: data.espiritual,
                mensagem: data.mensagem,
                nome: selectedClient.name,
                telefone: selectedClient.phone,
              })
            });

            if (!res.ok) throw new Error();

            showToast("Feedback enviado com sucesso!");
            setModalOpen(false);
            fetchData();

          } catch {
            showToast("Erro ao enviar feedback", "error");
          }
        }}
      />

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-72' : 'w-20'
          } bg-white hidden md:flex border-r border-[#E2E8F0] transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <span className="font-serif font-bold text-xl">Admin</span>
            </motion.div>
          )};
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="relative right-1.5 p-2 hover:bg-[#F8F9F5] rounded-lg transition-colors"
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
      <main className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'} ml-0 p-6 md:p-12 pb-32 md:pb-12`}>

        {/* Top Bar */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-serif mt-5 text-3xl md:text-4xl">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-[#5C6B5E] text-sm mt-1">Bem-vindo de volta ao seu painel de controle.</p>
          </div>
          <div className="flex items-center mb-5 gap-4">
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
                <StatCard
                  title="Solicitações Grátis"
                  value={solicitacoes.length.toString()}
                  icon={Gift}
                  trend="+3 novos"
                />

                <StatCard
                  title="Agendamentos Pagos"
                  value="8"
                  icon={CreditCard}
                  trend="+1 hoje"
                />

                <StatCard
                  title="Total Faturado"
                  value="R$ 2.450"
                  icon={Check}
                  trend="Este mês"
                />
              </div>

              {/* Recent Activity Split */}
              <div className="grid lg:grid-cols-2 gap-12">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl">Últimas Gratuitas</h2>
                    <button onClick={() => setActiveTab('gratuitos')} className="text-xs text-[#A3B18A] font-bold uppercase tracking-widest hover:underline">Ver todas</button>
                  </div>
                  <div className="space-y-4">
                    {ultimos.length === 0 && (
                      <p className="text-sm text-[#5C6B5E]">Nenhuma solicitação ainda.</p>
                    )}

                    {ultimos.map((s) => (
                      <SimpleRequestCard
                        key={s._id}
                        name={s.nome}
                        theme={s.tema}
                        time={formatarTempo(s.createdAt)}
                      />
                    ))}
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
              {/* FILTRO */}
              <StickyFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <div className="space-y-6">
                {solicitacoes.map((s) => (
                  <FullRequestCard
                    key={s._id}
                    id={s._id}
                    token={getFeedbackToken(s._id)}
                    name={s.nome}
                    date={s.nascimento}
                    phone={s.whatsapp}
                    theme={s.tema}
                    message={s.mensagem}
                    type="Gratuito"
                    status={s.status}
                    onAction={atualizarStatus}
                    onFeedback={abrirFeedback}
                  />
                ))}
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

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}

/* ---------------- COMPONENTES AUXILIARES ---------------- */

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#F8F9F5] rounded-2xl group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">
          {trend}
        </span>
      </div>
      <p className="text-xs text-[#5C6B5E] uppercase tracking-wider font-medium mb-1">
        {title}
      </p>
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

function FullRequestCard({ id, token, name, date, phone, theme, message, type, status, onAction, onFeedback }: any) {
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

          {status === "pendente" && (
            <>
              <button
                onClick={() => onAction(id, "aprovado")}
                className="flex-1 py-4 bg-[#4A5D4E] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#3a4a3e]"
              >
                Aceitar
              </button>

              <button
                onClick={() => onAction(id, "recusado")}
                className="flex-1 py-4 bg-white border border-red-100 text-red-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-50"
              >
                Recusar
              </button>
            </>
          )}

          {status === "aprovado" && (
            <button
              onClick={() => onFeedback({ id, name, phone })}
              className="flex-1 py-4 bg-[#A3B18A] text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90"
            >
              Dar devolutiva
            </button>
          )}

          {status === "devolvido" && (
            <a
              href={`/area-cliente/${token}`}
              target="_blank"
              className="flex-1 py-4 bg-blue-600 text-white text-center rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700"
            >
              Abrir link
            </a>
          )}

          {status === "recusado" && (
            <div className="w-full py-4 text-center rounded-2xl text-[10px] font-bold uppercase tracking-widest bg-red-50 border text-red-400">
              Recusado
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
