'use client';

import NavBar from '@/app/components/NavBar';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, LogOut, ShieldCheck, Zap, Heart, Compass } from 'lucide-react';
import Link from 'next/link';

export default function AreaClientePage() {
  // Função simulada de logout
  const handleLogout = () => {
    // Aqui você pode adicionar a lógica real de logout (ex: limpar cookies, localStorage, etc)
    console.log('Saindo...');
    window.location.href = '/'; // Redireciona para a home
  };

  const eixos = [
    { 
      eixo: 'Mental', 
      leitura: 'Excesso de pensamento e busca por controle.', 
      icon: <Compass className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-blue-50'
    },
    { 
      eixo: 'Emocional', 
      leitura: 'Sensibilidade elevada e memórias ativadas.', 
      icon: <Heart className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-rose-50'
    },
    { 
      eixo: 'Energético', 
      leitura: 'Campo aberto, pedindo alinhamento.', 
      icon: <Zap className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-amber-50'
    },
    { 
      eixo: 'Espiritual', 
      leitura: 'Conexão presente, porém instável.', 
      icon: <ShieldCheck className="w-5 h-5 text-[#A3B18A]" />,
      color: 'bg-purple-50'
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9F5] px-6 py-12 md:py-24 relative overflow-hidden">

      <NavBar/>

      <div className="max-w-4xl mx-auto relative mt-5 z-10">

        {/* Abertura */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-[#A3B18A]/10 text-[#A3B18A] text-[10px] tracking-[0.3em] uppercase font-bold border border-[#A3B18A]/20">
              Espelhamento de Consciência
            </span>
          </motion.div>

          <h1 className="font-serif text-4xl md:text-7xl text-[#2D362E] mb-8 tracking-tight">
            Devolutiva do <span className="italic text-[#A3B18A]">Campo Atual</span>
          </h1>

          <p className="text-lg md:text-xl text-[#5C6B5E] font-light max-w-2xl mx-auto leading-relaxed">
            Esta leitura reflete o seu estado vibracional no momento presente.
            Receba com <span className="font-medium text-[#2D362E]">abertura</span> e <span className="font-medium text-[#2D362E]">gentileza</span>.
          </p>
        </motion.section>

        {/* Leitura Principal */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-[#E2E8F0]"></div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2D362E] whitespace-nowrap">
              Leitura do Campo
            </h2>
            <div className="h-[1px] flex-1 bg-[#E2E8F0]"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] text-[#5C6B5E] font-light leading-relaxed space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-24 h-24 text-[#A3B18A]" />
            </div>
            
            <p className="text-xl md:text-2xl font-serif text-[#2D362E]/80 italic">
              "No momento atual, seu campo demonstra um chamado para reorganização interna, especialmente no eixo emocional e energético."
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-[#F8F9F5] rounded-2xl border border-[#E2E8F0]/50">
                <p className="text-sm">Há sensibilidade elevada, o que indica abertura, mas também pede enraizamento e direcionamento consciente.</p>
              </div>
              <div className="p-6 bg-[#F8F9F5] rounded-2xl border border-[#E2E8F0]/50">
                <p className="text-sm">O campo responde bem à escuta e à continuidade de cuidado constante em sua jornada.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tabela de Ágatha (Cards) */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl text-[#2D362E] flex items-center gap-3 mb-2">
                <Sparkles className="text-[#A3B18A] w-6 h-6" />
                Tabela de Ágatha
              </h2>
              <p className="text-sm text-[#5C6B5E] font-light">Análise detalhada por dimensões de consciência</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {eixos.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white rounded-[2rem] border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-2xl ${item.color} transition-colors`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#A3B18A] tracking-widest uppercase">Eixo 0{index + 1}</span>
                </div>
                
                <h3 className="font-serif text-2xl text-[#2D362E] mb-3 group-hover:text-[#A3B18A] transition-colors">
                  {item.eixo}
                </h3>
                <p className="text-[#5C6B5E] font-light leading-relaxed">
                  {item.leitura}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Integração */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 bg-[#4A5D4E] text-white rounded-[3rem] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h3 className="font-serif text-3xl mb-6">
                Integração do Espelhamento
              </h3>
              <p className="text-white/80 text-lg font-light leading-relaxed mb-0">
                O espelhamento não é um diagnóstico, mas um <span className="text-white font-medium">convite</span>. 
                Um convite para seguir cuidando do que foi revelado com presença, consciência e suporte adequado.
              </p>
            </div>
          </motion.div>
        </section>

        {/* CTA Final */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center bg-white/40 backdrop-blur-sm p-12 md:p-20 rounded-[4rem] border border-white/60"
        >
          <h3 className="font-serif text-3xl md:text-4xl text-[#2D362E] mb-6">
            Deseja continuar este caminho?
          </h3>

          <p className="text-[#5C6B5E] font-light mb-12 max-w-xl mx-auto text-lg">
            Caso sinta o chamado, é possível aprofundar este processo
            através de um acompanhamento contínuo e personalizado.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a
              href="https://wa.me/5517997860845"
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-4 px-10 py-5 bg-[#A3B18A] hover:bg-[#92a179] text-white rounded-full text-sm tracking-[0.2em] uppercase font-bold shadow-lg shadow-[#A3B18A]/20 transition-all"
            >
              Continuar o Trabalho
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            
            <button 
              onClick={handleLogout}
              className="text-[#5C6B5E] hover:text-[#2D362E] text-sm tracking-widest uppercase font-medium transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </motion.section>

      </div>

      {/* Elementos Decorativos de Fundo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A3B18A]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4A5D4E]/5 rounded-full blur-[120px]"></div>
      </div>
    </main>
  );
}
