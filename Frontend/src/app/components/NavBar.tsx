'use client';

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';


export default function NavBar() {
    const pathname = usePathname();

    const handleExit = () => {
        // Lógica para sair/voltar
        window.location.href = '/';
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50">
            {pathname == '/' ? (
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mt-4 flex items-center justify-between rounded-full border border-[#E2E8F0] bg-white/70 backdrop-blur-md shadow-sm px-6 py-3">

                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697e8e403ab841ea9326cc28/85b1f1d88_logo-full__1_-removebg-preview.png"
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </a>

                        {/* Links */}
                        <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-[#5C6B5E]">
                            <a href="#sobre" className="hover:text-[#2D362E] transition-colors">Sobre</a>
                            <a href="#servicos" className="hover:text-[#2D362E] transition-colors">Serviços</a>
                            <a href="#contato" className="hover:text-[#2D362E] transition-colors">Contato</a>
                        </nav>

                        {/* CTA */}
                        <motion.a
                            href='https://wa.me/5517997860845'
                            className="group relative px-5 py-3 bg-[#4A5D4E] text-white rounded-full text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Agendar</span>
                            <div className="absolute inset-0 bg-[#5C6B5E] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </motion.a>
                    </div>
                </div>
            ) : (
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mt-4 flex items-center justify-between rounded-full border border-[#E2E8F0] bg-white/70 backdrop-blur-md shadow-sm px-6 py-3">

                        {/* Logo */}
                        <a href="/" className="flex items-center gap-3">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697e8e403ab841ea9326cc28/85b1f1d88_logo-full__1_-removebg-preview.png"
                                alt="Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </a>

                        {/* Botão de Sair (Apenas a Flecha) */}
                        <motion.button
                            onClick={handleExit}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center p-3 text-[#5C6B5E] hover:text-red-500 transition-colors bg-[#F8F9F5] rounded-full border border-[#E2E8F0]"
                            title="Sair"
                        >
                            <LogOut className="w-5 h-5" />
                        </motion.button>

                    </div>
                </div >
            )
            }
        </nav >
    )
}