'use client';

import NavBar from '@/src/app/components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart, Compass, Info, ChevronRight, Activity, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import LoadingOverlay from '@/src/app/components/Loading';

export default function AreaClientePage() {
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const { id } = useParams();
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/abrir/${id}`)
      .then(res => res.json())
      .then(data => setFeedback(data))
      .catch(() => setFeedback(null))
      .finally(() => setLoading(false));
  }, [id]);

  const escalaAgatha = [
    { mundo: 'Expansão', niveis: [
      { nome: 'Gratidão', hz: '800 Hz', color: 'bg-amber-400', text: 'Conexão com o TODO, Iluminação.' },
      { nome: 'Conexão', hz: '720 Hz', color: 'bg-amber-300', text: 'Consciência plena e integrada.' },
      { nome: 'Clareza', hz: '660 Hz', color: 'bg-amber-200', text: 'Fluir da vida, paz incessante.' },
    ]},
    { mundo: 'Evolução', niveis: [
      { nome: 'Paz', hz: '600 Hz', color: 'bg-emerald-400', text: 'Despreocupação, estabilidade.' },
      { nome: 'Amor', hz: '500 Hz', color: 'bg-emerald-300', text: 'Servir, compaixão incondicional.' },
      { nome: 'Sabedoria', hz: '450 Hz', color: 'bg-emerald-200', text: 'Orientação interna, nova percepção.' },
      { nome: 'Intenção', hz: '350 Hz', color: 'bg-emerald-100', text: 'Vontade de evoluir, prontidão.' },
    ]},
    { mundo: 'Ilusão', niveis: [
      { nome: 'Neutralidade', hz: '250 Hz', color: 'bg-blue-200', text: 'Movimento, pensamento positivo.' },
      { nome: 'Coragem', hz: '200 Hz', color: 'bg-blue-100', text: 'Ponto crítico de mudança.' },
      { nome: 'Orgulho', hz: '175 Hz', color: 'bg-rose-100', text: 'Apego a bens e status.' },
      { nome: 'Medo', hz: '100 Hz', color: 'bg-rose-200', text: 'Ansiedade, retração energética.' },
    ]},
    { mundo: 'Terror', niveis: [
      { nome: 'Primitivo', hz: '20 Hz', color: 'bg-slate-300', text: 'Paralisia, sem forças para agir.' },
      { nome: 'Desconstrução', hz: '< 0 Hz', color: 'bg-slate-800', text: 'Mundo do terror, autodestruição.', dark: true },
    ]}
  ];

  const eixos = [
    { eixo: 'Mental', leitura: feedback?.mental || 'Aguardando leitura...', icon: <Compass className="w-5 h-5 text-[#A3B18A]" />, color: 'bg-blue-50' },
    { eixo: 'Emocional', leitura: feedback?.emocional || 'Aguardando leitura...', icon: <Heart className="w-5 h-5 text-[#A3B18A]" />, color: 'bg-rose-50' },
    { eixo: 'Energético', leitura: feedback?.energetico || 'Aguardando leitura...', icon: <Zap className="w-5 h-5 text-[#A3B18A]" />, color: 'bg-amber-50' },
    { eixo: 'Espiritual', leitura: feedback?.espiritual || 'Aguardando leitura...', icon: <ShieldCheck className="w-5 h-5 text-[#A3B18A]" />, color: 'bg-purple-50' },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9F5] px-4 sm:px-6 py-12 md:py-24 relative overflow-hidden">
      <NavBar />
      <LoadingOverlay show={loading} message="Carregando sua leitura..." />

      <div className="max-w-6xl mx-auto relative mt-15 md:mt-10 z-10">
        
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-24"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#A3B18A]/10 text-[#A3B18A] text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold border border-[#A3B18A]/20 mb-6 inline-block">
            Espelhamento de Consciência
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#2D362E] mb-6 md:mb-8 tracking-tight leading-tight">
            Devolutiva do <span className="italic text-[#A3B18A]">Campo Atual</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5C6B5E] font-light max-w-2xl mx-auto leading-relaxed px-4">
            Sua frequência vibracional mapeada através da <span className="font-medium text-[#2D362E]">Escala de Ágatha</span>.
          </p>
        </motion.section>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Ilustração da Tabela de Ágatha (Esquerda) */}
          <section className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6 px-2">
              <Activity className="text-[#A3B18A] w-5 h-5 md:w-6 md:h-6" />
              <h2 className="font-serif text-xl md:text-2xl text-[#2D362E]">Mapa Vibracional (Hz)</h2>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] border border-white shadow-sm">
              <div className="flex flex-col gap-1">
                {escalaAgatha.map((mundo, mIdx) => (
                  <div key={mIdx} className="space-y-1 mb-4">
                    <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-[#5C6B5E]/60 ml-2">
                      Mundo da {mundo.mundo}
                    </span>
                    {mundo.niveis.map((nivel, nIdx) => (
                      <motion.div
                        key={nIdx}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedLevel(nivel)}
                        className={`relative cursor-pointer group flex items-center justify-between px-4 py-2.5 md:px-5 md:py-3 rounded-xl border border-black/5 transition-all ${nivel.color} ${nivel.dark ? 'text-white' : 'text-[#2D362E]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] md:text-xs font-bold opacity-70">{nivel.hz}</span>
                          <span className="font-serif text-xs md:text-sm font-medium">{nivel.nome}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[9px] md:text-[10px] text-center text-[#5C6B5E]/60 italic">Toque nos níveis para ver os detalhes</p>
          </section>

          {/* Feedback do Cliente (Direita) */}
          <section className="lg:col-span-7 space-y-8 md:space-y-12 order-1 lg:order-2">
            
            {/* Seu Estado Atual */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#E2E8F0] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5">
                <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-[#A3B18A]" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-[#2D362E] mb-4 md:mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-[#A3B18A] rounded-full animate-pulse"></div>
                Seu Ponto de Ancoragem
              </h3>
              <div className="flex items-baseline flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="text-5xl md:text-6xl font-serif text-[#A3B18A]">{feedback?.hz || 450}</span>
                <span className="text-lg md:text-xl font-light text-[#5C6B5E]">Hz</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] md:text-[10px] font-bold uppercase rounded-full border border-emerald-100">
                  {feedback?.nivel || "Sabedoria"}
                </span>
              </div>
              <p className="text-[#5C6B5E] font-light leading-relaxed text-base md:text-lg">
                {feedback?.mensagem || "Sua leitura está sendo processada com carinho."}
              </p>
            </div>

            {/* Leitura por Eixos */}
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {eixos.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className="p-6 md:p-8 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-[#E2E8F0] shadow-sm"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className={`p-2.5 md:p-3 rounded-xl ${item.color}`}>{item.icon}</div>
                    <h3 className="font-serif text-lg md:text-xl text-[#2D362E]">{item.eixo}</h3>
                  </div>
                  <p className="text-[#5C6B5E] font-light text-xs md:text-sm leading-relaxed">{item.leitura}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center bg-[#4A5D4E] p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] text-white shadow-xl">
              <h3 className="font-serif text-xl md:text-2xl mb-6">Deseja expandir sua frequência?</h3>
              <motion.a
                href="https://wa.me/5517997860845"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-10 md:py-5 bg-[#A3B18A] text-white rounded-full text-[11px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold shadow-lg w-full sm:w-auto justify-center"
              >
                Agendar Acompanhamento
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </section>
        </div>
      </div>

      {/* Modal de Detalhes do Nível (Mobile & Desktop) */}
      <AnimatePresence>
        {selectedLevel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-[#E2E8F0] relative"
            >
              <button 
                onClick={() => setSelectedLevel(null)}
                className="absolute top-6 right-6 p-2 hover:bg-[#F8F9F5] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#5C6B5E]" />
              </button>
              <div className={`w-12 h-12 ${selectedLevel.color} rounded-2xl mb-6 flex items-center justify-center border border-black/5`}>
                <span className={`text-xs font-bold ${selectedLevel.dark ? 'text-white' : 'text-[#2D362E]'}`}>{selectedLevel.hz}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#2D362E] mb-2">{selectedLevel.nome}</h3>
              <p className="text-[#5C6B5E] font-light leading-relaxed">{selectedLevel.text}</p>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="mt-8 w-full py-4 bg-[#F8F9F5] text-[10px] font-bold uppercase tracking-widest text-[#5C6B5E] rounded-2xl"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#A3B18A]/5 rounded-full blur-[80px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#4A5D4E]/5 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>
    </main>
  );
}
