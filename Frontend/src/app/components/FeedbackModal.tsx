'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Send, Activity, Sparkles, Heart, Compass, ShieldCheck, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    client: {
        id: string;
        name: string;
        phone: string;
    };
    onSave: (data: {
        hz: string;
        nivel: string;
        mental: string;
        emocional: string;
        energetico: string;
        espiritual: string;
        mensagem: string
    }) => void;
};

export default function FeedbackModal({ open, onClose, onSave, client }: Props) {
    const [hz, setHz] = useState('');
    const [nivel, setNivel] = useState('');
    const [mental, setMental] = useState('');
    const [emocional, setEmocional] = useState('');
    const [energetico, setEnergetico] = useState('');
    const [espiritual, setEspiritual] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        if (open) {
            setHz('');
            setNivel('');
            setMental('');
            setEmocional('');
            setEnergetico('');
            setEspiritual('');
            setMensagem('');
        }
    }, [open]);

    const handleSave = async () => {
        if (!hz || !nivel || !mental || !emocional || !energetico || !espiritual || !mensagem) {
            alert('Por favor, preencha todos os campos da leitura.');
            return;
        }

        setIsSending(true);
        try {
            await onSave({ hz, nivel, mental, emocional, energetico, espiritual, mensagem });
            onClose();
        } catch (error) {
            alert('Erro ao salvar feedback.');
        } finally {
            setIsSending(false);
        }
    };

    const handleWhatsApp = () => {
        const message = `Olá ${client.name}! Sua devolutiva do campo atual já está disponível. Confira aqui: https://caminhodaironia/area-cliente/${client.id}`;
        const encoded = encodeURIComponent(message);
        const phone = client.phone.replace(/\D/g, '');
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#2D362E]/40 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl border border-[#E2E8F0] overflow-y-scroll md:overflow-hidden"
                    >
                        {/* Header - Mais compacto */}
                        <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8F9F5] flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#A3B18A]/10 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-[#A3B18A]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-serif text-[#2D362E]">Devolutiva de Campo</h2>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#5C6B5E]/60">
                                        Cliente: {client.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-white rounded-full transition-all text-[#5C6B5E] hover:text-[#2D362E]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content - Grid de 3 colunas para evitar scroll */}
                        <div className="p-6 space-y-6 overflow-y-scroll md:overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                
                                {/* Coluna 1: Dados Básicos */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B5E] border-b border-[#E2E8F0] pb-1">Dados Iniciais</h3>
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase text-[#A3B18A] ml-1">Frequência (Hz)</label>
                                            <div className="relative">
                                                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3B18A]/50" />
                                                <input
                                                    placeholder="Ex: 450"
                                                    type="number"
                                                    value={hz}
                                                    onChange={e => setHz(e.target.value)}
                                                    className="w-full pl-10 pr-3 py-2.5 bg-[#F8F9F5] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-sm text-[#2D362E]"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase text-[#A3B18A] ml-1">Ponto de Ancoragem</label>
                                            <div className="relative">
                                                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A3B18A]/50" />
                                                <input
                                                    placeholder="Ex: Sabedoria"
                                                    value={nivel}
                                                    onChange={e => setNivel(e.target.value)}
                                                    className="w-full pl-10 pr-3 py-2.5 bg-[#F8F9F5] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-sm text-[#2D362E]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-2">
                                        <div className="flex items-center gap-2 ml-1">
                                            <MessageSquare className="w-3 h-3 text-[#A3B18A]" />
                                            <span className="text-[9px] font-bold uppercase text-[#5C6B5E]">Mensagem Final</span>
                                        </div>
                                        <textarea
                                            placeholder="Mensagem para o cliente..."
                                            value={mensagem}
                                            onChange={e => setMensagem(e.target.value)}
                                            className="w-full p-3 bg-[#F8F9F5] border-none rounded-xl h-[120px] lg:h-[160px] outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Coluna 2 & 3: Eixos de Leitura (Grid 2x2 interno) */}
                                <div className="lg:col-span-2 space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#5C6B5E] border-b border-[#E2E8F0] pb-1">Leitura por Eixos</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 ml-1">
                                                <Compass className="w-3 h-3 text-[#A3B18A]" />
                                                <span className="text-[9px] font-bold uppercase text-[#5C6B5E]">Mental</span>
                                            </div>
                                            <textarea
                                                placeholder="Estado mental..."
                                                value={mental}
                                                onChange={e => setMental(e.target.value)}
                                                className="w-full p-3 bg-[#F8F9F5] border-none rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 ml-1">
                                                <Heart className="w-3 h-3 text-[#A3B18A]" />
                                                <span className="text-[9px] font-bold uppercase text-[#5C6B5E]">Emocional</span>
                                            </div>
                                            <textarea
                                                placeholder="Estado emocional..."
                                                value={emocional}
                                                onChange={e => setEmocional(e.target.value)}
                                                className="w-full p-3 bg-[#F8F9F5] border-none rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 ml-1">
                                                <Zap className="w-3 h-3 text-[#A3B18A]" />
                                                <span className="text-[9px] font-bold uppercase text-[#5C6B5E]">Energético</span>
                                            </div>
                                            <textarea
                                                placeholder="Estado energético..."
                                                value={energetico}
                                                onChange={e => setEnergetico(e.target.value)}
                                                className="w-full p-3 bg-[#F8F9F5] border-none rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 ml-1">
                                                <ShieldCheck className="w-3 h-3 text-[#A3B18A]" />
                                                <span className="text-[9px] font-bold uppercase text-[#5C6B5E]">Espiritual</span>
                                            </div>
                                            <textarea
                                                placeholder="Estado espiritual..."
                                                value={espiritual}
                                                onChange={e => setEspiritual(e.target.value)}
                                                className="w-full p-3 bg-[#F8F9F5] border-none rounded-xl h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer - Mais compacto */}
                        <div className="px-6 py-4 bg-[#F8F9F5] border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleSave}
                                disabled={isSending}
                                className="flex-1 bg-[#4A5D4E] text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#3a4a3e] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSending ? 'Salvando...' : <><Activity size={14} /> Salvar Leitura</>}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
