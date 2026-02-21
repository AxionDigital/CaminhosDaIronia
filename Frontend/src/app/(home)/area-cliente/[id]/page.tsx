'use client';

import NavBar from '@/src/app/components/NavBar';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart, Compass, Info, ChevronRight, Activity } from 'lucide-react';
import { useState } from 'react';
import { useParams } from "next/navigation";
import { useEffect } from "react";
import LoadingOverlay from '@/src/app/components/Loading';

export default function AreaClientePage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

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

  const handleLogout = () => {
    window.location.href = '/';
  };

  // Dados completos da Escala de Ágatha para a ilustração
  const escalaAgatha = [
    {
      mundo: 'Expansão', niveis: [
        { nome: 'Gratidão', hz: '800 Hz', color: 'bg-amber-400', text: 'Conexão com o TODO, Iluminação.' },
        { nome: 'Conexão', hz: '720 Hz', color: 'bg-amber-300', text: 'Consciência plena e integrada.' },
        { nome: 'Clareza', hz: '660 Hz', color: 'bg-amber-200', text: 'Fluir da vida, paz incessante.' },
      ]
    },
    {
      mundo: 'Evolução', niveis: [
        { nome: 'Paz', hz: '600 Hz', color: 'bg-emerald-400', text: 'Despreocupação, estabilidade.' },
        { nome: 'Amor', hz: '500 Hz', color: 'bg-emerald-300', text: 'Servir, compaixão incondicional.' },
        { nome: 'Sabedoria', hz: '450 Hz', color: 'bg-emerald-200', text: 'Orientação interna, nova percepção.' },
        { nome: 'Intenção', hz: '350 Hz', color: 'bg-emerald-100', text: 'Vontade de evoluir, prontidão.' },
      ]
    },
    {
      mundo: 'Ilusão', niveis: [
        { nome: 'Neutralidade', hz: '250 Hz', color: 'bg-blue-200', text: 'Movimento, pensamento positivo.' },
        { nome: 'Coragem', hz: '200 Hz', color: 'bg-blue-100', text: 'Ponto crítico de mudança.' },
        { nome: 'Orgulho', hz: '175 Hz', color: 'bg-rose-100', text: 'Apego a bens e status.' },
        { nome: 'Medo', hz: '100 Hz', color: 'bg-rose-200', text: 'Ansiedade, retração energética.' },
      ]
    },
    {
      mundo: 'Terror', niveis: [
        { nome: 'Primitivo', hz: '20 Hz', color: 'bg-slate-300', text: 'Paralisia, sem forças para agir.' },
        { nome: 'Desconstrução', hz: '< 0 Hz', color: 'bg-slate-800', text: 'Mundo do terror, autodestruição.', dark: true },
      ]
    }
  ];

  const eixos = [
    {
      eixo: 'Mental',
      leitura: feedback?.mental || 'Aguardando leitura...',
      icon: <Compass className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-blue-50'
    },
    {
      eixo: 'Emocional',
      leitura: feedback?.emocional || 'Aguardando leitura...',
      icon: <Heart className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-rose-50'
    },
    {
      eixo: 'Energético',
      leitura: feedback?.energetico || 'Aguardando leitura...',
      icon: <Zap className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-amber-50'
    },
    {
      eixo: 'Espiritual',
      leitura: feedback?.espiritual || 'Aguardando leitura...',
      icon: <ShieldCheck className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-purple-50'
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9F5] px-6 py-12 md:py-24 relative overflow-hidden">
      <NavBar />

      {/* Loading */}
      <LoadingOverlay show={loading} message="Autenticando..." />

      <div className="max-w-6xl mx-auto relative mt-5 z-10">

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="px-4 py-1.5 rounded-full bg-[#A3B18A]/10 text-[#A3B18A] text-[10px] tracking-[0.4em] uppercase font-bold border border-[#A3B18A]/20 mb-6 inline-block">
            Espelhamento de Consciência
          </span>
          <h1 className="font-serif text-4xl md:text-7xl text-[#2D362E] mb-8 tracking-tight">
            Devolutiva do <span className="italic text-[#A3B18A]">Campo Atual</span>
          </h1>
          <p className="text-lg md:text-xl text-[#5C6B5E] font-light max-w-2xl mx-auto leading-relaxed">
            Sua frequência vibracional mapeada através da <span className="font-medium text-[#2D362E]">Escala de Ágatha</span>.
          </p>
        </motion.section>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Ilustração da Tabela de Ágatha (Esquerda) */}
          <section className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-[#A3B18A] w-6 h-6" />
              <h2 className="font-serif text-2xl text-[#2D362E]">Mapa Vibracional (Hz)</h2>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[3rem] border border-white shadow-sm">
              <div className="flex flex-col gap-1">
                {escalaAgatha.map((mundo, mIdx) => (
                  <div key={mIdx} className="space-y-1 mb-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#5C6B5E]/60 ml-2">
                      Mundo da {mundo.mundo}
                    </span>
                    {mundo.niveis.map((nivel, nIdx) => (
                      <motion.div
                        key={nIdx}
                        whileHover={{ x: 10 }}
                        onClick={() => setSelectedLevel(nivel.nome)}
                        className={`relative cursor-pointer group flex items-center justify-between px-5 py-3 rounded-xl border border-black/5 transition-all ${nivel.color} ${nivel.dark ? 'text-white' : 'text-[#2D362E]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold opacity-70">{nivel.hz}</span>
                          <span className="font-serif text-sm font-medium">{nivel.nome}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity`} />

                        {/* Tooltip/Info ao selecionar */}
                        {selectedLevel === nivel.nome && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute left-full ml-4 w-48 p-4 bg-white text-[#2D362E] rounded-2xl shadow-xl border border-[#E2E8F0] z-20 hidden md:block"
                          >
                            <p className="text-[10px] font-bold uppercase text-[#A3B18A] mb-1">{nivel.nome}</p>
                            <p className="text-xs font-light leading-relaxed">{nivel.text}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-center text-[#5C6B5E]/60 italic">Clique nos níveis para ver os detalhes</p>
          </section>

          {/* Feedback do Cliente (Direita) */}
          <section className="lg:col-span-7 space-y-12">

            {/* Seu Estado Atual */}
            <div className="bg-white p-10 rounded-[3rem] border border-[#E2E8F0] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sparkles className="w-20 h-20 text-[#A3B18A]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2D362E] mb-6 flex items-center gap-3">
                <div className="w-2 h-2 bg-[#A3B18A] rounded-full animate-pulse"></div>
                Seu Ponto de Ancoragem
              </h3>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif text-[#A3B18A]">{feedback?.hz || 450}</span>
                <span className="text-xl font-light text-[#5C6B5E]">Hz</span>
                <span className="px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full border border-emerald-100">{feedback?.nivel || "Nível"}</span>
              </div>
              <p className="text-[#5C6B5E] font-light leading-relaxed text-lg">
                {feedback?.mensagem}
              </p>
            </div>

            {/* Leitura por Eixos */}
            <div className="grid md:grid-cols-2 gap-6">
              {eixos.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-[2.5rem] border border-[#E2E8F0] shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${item.color}`}>{item.icon}</div>
                    <h3 className="font-serif text-xl text-[#2D362E]">{item.eixo}</h3>
                  </div>
                  <p className="text-[#5C6B5E] font-light text-sm leading-relaxed">{item.leitura}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center bg-[#4A5D4E] p-12 rounded-[3rem] text-white shadow-xl">
              <h3 className="font-serif text-2xl mb-6">Deseja expandir sua frequência?</h3>
              <motion.a
                href="https://wa.me/5517997860845"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#A3B18A] text-white rounded-full text-sm tracking-[0.2em] uppercase font-bold shadow-lg"
              >
                Agendar Acompanhamento
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

          </section>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A3B18A]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4A5D4E]/5 rounded-full blur-[120px]"></div>
      </div>
    </main>
  );
}
