'use client';

import NavBar from '@/app/components/NavBar';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function EspelhamentoPage() {
    // Função para voltar
    const handleBack = () => {
        window.location.href = '/'; // Redireciona para a home
    };

    return (
        <main className="min-h-screen bg-[#F8F9F5] px-6 py-12 md:py-32 relative overflow-hidden">

            <NavBar/>

            {/* Elementos Decorativos de Fundo */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#A3B18A]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[#4A5D4E]/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
            

                {/* Header */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-[#A3B18A]/10 text-[#A3B18A] text-[10px] tracking-[0.4em] uppercase font-bold border border-[#A3B18A]/20">
                            Atendimento Gratuito
                        </span>
                    </motion.div>

                    <h1 className="font-serif text-4xl md:text-6xl text-[#2D362E] mb-8 leading-tight">
                        Espelhamento de <span className="italic text-[#A3B18A]">Consciência</span>
                    </h1>

                    <div className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-[2.5rem] border border-white/60 max-w-2xl mx-auto">
                        <p className="text-lg text-[#5C6B5E] font-light leading-relaxed">
                            Um espaço de leitura consciente do seu campo energético atual.
                            As solicitações passam por avaliação e, quando aprovadas:
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-sm font-medium text-[#2D362E]">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#A3B18A]/10 rounded-full border border-[#A3B18A]/20">
                                <Calendar className="w-4 h-4 text-[#A3B18A]" />
                                <span>Leitura: Terça-feira</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#A3B18A]/40 hidden sm:block" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#4A5D4E]/10 rounded-full border border-[#4A5D4E]/20">
                                <Sparkles className="w-4 h-4 text-[#4A5D4E]" />
                                <span>Devolutiva: Quarta-feira</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Formulário */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-8 bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        <Input 
                            label="Nome completo" 
                            placeholder="Seu nome" 
                            icon={<User className="w-4 h-4" />}
                        />
                        <Input 
                            label="Data de nascimento" 
                            type="date" 
                            icon={<Calendar className="w-4 h-4" />}
                        />
                    </div>
                    
                    <Input 
                        label="Telefone (WhatsApp)" 
                        placeholder="(DDD) 99999-9999" 
                        icon={<Phone className="w-4 h-4" />}
                    />

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-[#5C6B5E]">
                            <Sparkles className="w-3 h-3 text-[#A3B18A]" />
                            Tema principal
                        </label>
                        <div className="relative">
                            <select className="w-full rounded-2xl border border-[#E2E8F0] px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/20 focus:border-[#A3B18A] transition-all appearance-none cursor-pointer text-[#2D362E]">
                                <option>Financeiro</option>
                                <option>Saúde</option>
                                <option>Relacionamentos</option>
                                <option>Emocional</option>
                                <option>Espiritual</option>
                                <option>Outro</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#A3B18A]">
                                <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-[#5C6B5E]">
                            <MessageSquare className="w-3 h-3 text-[#A3B18A]" />
                            Como você sente sua vibração agora?
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Descreva com suas próprias palavras o que você tem sentido ultimamente..."
                            className="w-full rounded-2xl border border-[#E2E8F0] px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/20 focus:border-[#A3B18A] transition-all resize-none text-[#2D362E]"
                        />
                    </div>

                    <div className="pt-4">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, translateY: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-4 px-10 py-6 bg-[#4A5D4E] hover:bg-[#3a4a3e] text-white rounded-full text-sm tracking-[0.2em] uppercase font-bold shadow-xl shadow-[#4A5D4E]/20 transition-all"
                        >
                            Solicitar Espelhamento
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#5C6B5E]/60 tracking-widest uppercase font-medium">
                        <div className="w-1 h-1 bg-[#A3B18A] rounded-full"></div>
                        Você receberá um retorno sobre sua aprovação
                        <div className="w-1 h-1 bg-[#A3B18A] rounded-full"></div>
                    </div>
                </motion.form>
            </div>
        </main>
    );
}

function Input({ label, type = 'text', placeholder, icon }: any) {
    return (
        <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-[#5C6B5E]">
                <span className="text-[#A3B18A]">{icon}</span>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-[#E2E8F0] px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/20 focus:border-[#A3B18A] transition-all text-[#2D362E]"
            />
        </div>
    );
}
