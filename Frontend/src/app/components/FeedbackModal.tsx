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
    feedback?: {
        _id: string;
        hz: string;
        nivel: string;
        mental: string;
        emocional: string;
        energetico: string;
        espiritual: string;
        mensagem: string;
    } | null;
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

export default function FeedbackModal({ open, onClose, onSave, client, feedback }: Props) {
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
            if (feedback) {
                // Carregar dados do feedback existente
                setHz(feedback.hz || '');
                setNivel(feedback.nivel || '');
                setMental(feedback.mental || '');
                setEmocional(feedback.emocional || '');
                setEnergetico(feedback.energetico || '');
                setEspiritual(feedback.espiritual || '');
                setMensagem(feedback.mensagem || '');
            } else {
                // Limpar campos para novo feedback
                setHz('');
                setNivel('');
                setMental('');
                setEmocional('');
                setEnergetico('');
                setEspiritual('');
                setMensagem('');
            }
        }
    }, [open, feedback]);

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

    const isUpdating = !!feedback;

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
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
                        className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] max-h-[80vh] bottom-12 md:max-h-[90vh] md:bottom-0 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E2E8F0] bg-[#F8F9F5] flex justify-between items-center flex-shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="p-1.5 sm:p-2 bg-[#A3B18A]/10 rounded-xl flex-shrink-0">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#A3B18A]" />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-base sm:text-lg lg:text-xl font-serif text-[#2D362E] truncate">
                                        {isUpdating ? 'Atualizar Devolutiva' : 'Devolutiva de Campo'}
                                    </h2>
                                    <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] text-[#5C6B5E]/60 truncate">
                                        Cliente: {client?.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 sm:p-1.5 hover:bg-white rounded-full transition-all text-[#5C6B5E] hover:text-[#2D362E] flex-shrink-0"
                            >
                                <X size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto md:overflow-y-hidden p-3 sm:p-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                    
                                    {/* Coluna 1: Dados Básicos */}
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#5C6B5E] border-b border-[#E2E8F0] pb-1 sm:pb-2">Dados Iniciais</h3>
                                        <div className="space-y-2 sm:space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[8px] sm:text-[9px] font-bold uppercase text-[#A3B18A] ml-1">Frequência (Hz)</label>
                                                <div className="relative">
                                                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A3B18A]/50 flex-shrink-0" />
                                                    <input
                                                        placeholder="Ex: 450"
                                                        type="number"
                                                        value={hz}
                                                        onChange={e => setHz(e.target.value)}
                                                        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 bg-[#F8F9F5] border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-sm text-[#2D362E]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] sm:text-[9px] font-bold uppercase text-[#A3B18A] ml-1">Ponto de Ancoragem</label>
                                                <div className="relative">
                                                    <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A3B18A]/50 flex-shrink-0" />
                                                    <input
                                                        placeholder="Ex: Sabedoria"
                                                        value={nivel}
                                                        onChange={e => setNivel(e.target.value)}
                                                        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 bg-[#F8F9F5] border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-sm text-[#2D362E]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1 pt-2 sm:pt-3">
                                            <div className="flex items-center gap-2 ml-1">
                                                <MessageSquare className="w-3 h-3 text-[#A3B18A] flex-shrink-0" />
                                                <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#5C6B5E]">Mensagem Final</span>
                                            </div>
                                            <textarea
                                                placeholder="Mensagem para o cliente..."
                                                value={mensagem}
                                                onChange={e => setMensagem(e.target.value)}
                                                className="w-full p-2 sm:p-3 bg-[#F8F9F5] border-none rounded-2xl h-[100px] sm:h-[120px] lg:h-[160px] outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Coluna 2 & 3: Eixos de Leitura */}
                                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                                        <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#5C6B5E] border-b border-[#E2E8F0] pb-1 sm:pb-2">Leitura por Eixos</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 ml-1">
                                                    <Compass className="w-3 h-3 text-[#A3B18A] flex-shrink-0" />
                                                    <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#5C6B5E]">Mental</span>
                                                </div>
                                                <textarea
                                                    placeholder="Estado mental..."
                                                    value={mental}
                                                    onChange={e => setMental(e.target.value)}
                                                    className="w-full p-2 sm:p-3 bg-[#F8F9F5] border-none rounded-2xl h-20 sm:h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 ml-1">
                                                    <Heart className="w-3 h-3 text-[#A3B18A] flex-shrink-0" />
                                                    <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#5C6B5E]">Emocional</span>
                                                </div>
                                                <textarea
                                                    placeholder="Estado emocional..."
                                                    value={emocional}
                                                    onChange={e => setEmocional(e.target.value)}
                                                    className="w-full p-2 sm:p-3 bg-[#F8F9F5] border-none rounded-2xl h-20 sm:h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 ml-1">
                                                    <Zap className="w-3 h-3 text-[#A3B18A] flex-shrink-0" />
                                                    <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#5C6B5E]">Energético</span>
                                                </div>
                                                <textarea
                                                    placeholder="Estado energético..."
                                                    value={energetico}
                                                    onChange={e => setEnergetico(e.target.value)}
                                                    className="w-full p-2 sm:p-3 bg-[#F8F9F5] border-none rounded-2xl h-20 sm:h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 ml-1">
                                                    <ShieldCheck className="w-3 h-3 text-[#A3B18A] flex-shrink-0" />
                                                    <span className="text-[8px] sm:text-[9px] font-bold uppercase text-[#5C6B5E]">Espiritual</span>
                                                </div>
                                                <textarea
                                                    placeholder="Estado espiritual..."
                                                    value={espiritual}
                                                    onChange={e => setEspiritual(e.target.value)}
                                                    className="w-full p-2 sm:p-3 bg-[#F8F9F5] border-none rounded-2xl h-20 sm:h-24 outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-xs text-[#5C6B5E] resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F8F9F5] border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0">
                            <button
                                onClick={handleSave}
                                disabled={isSending}
                                className="flex-1 bg-[#4A5D4E] text-white py-2.5 sm:py-3 rounded-2xl font-bold text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-[#3a4a3e] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSending ? 'Salvando...' : <><Activity size={14} /> {isUpdating ? 'Atualizar Leitura' : 'Salvar Leitura'}</>}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
