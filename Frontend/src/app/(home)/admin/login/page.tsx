'use client'

import LoadingOverlay from '@/src/app/components/Loading';
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function AdminLogin() {
  // NAVEGAÇÃO
  const router = useRouter();

  // FORMULÁRIO
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // FEEDBACK
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Usuário ou senha inválidos.");
        return;
      }

      router.push("/admin/dashboard");

    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9F5] flex items-center justify-center px-6">

      {/* Loading */}
      <LoadingOverlay show={loading} message="Autenticando..." />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/70 backdrop-blur border border-[#E2E8F0] rounded-[3rem] shadow-2xl p-12"
      >

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] text-[#A3B18A] uppercase block mb-4">
            Área Restrita
          </span>
          <h1 className="font-serif text-3xl text-[#2D362E]">
            Painel Administrativo
          </h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-8">

          {/* Email */}
          <div>
            <label className="text-sm text-[#5C6B5E] mb-2 block">
              Email
            </label>
            <div className="flex items-center gap-3 px-5 py-4 rounded-full border border-[#E2E8F0] focus-within:border-[#A3B18A] transition">
              <Mail className="w-5 h-5 text-[#A3B18A]" />
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="name"
                placeholder="admin@caminhosdaironia.com"
                className="w-full bg-transparent outline-none text-[#2D362E]"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm text-[#5C6B5E] mb-2 block">
              Senha
            </label>
            <div className="flex items-center gap-3 px-5 py-4 rounded-full border border-[#E2E8F0] focus-within:border-[#A3B18A] transition">
              <Lock className="w-5 h-5 text-[#A3B18A]" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-[#2D362E]"
              />
            </div>
          </div>

          {/* Botão */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-[#4A5D4E] text-white rounded-full uppercase text-xs tracking-[0.3em] hover:bg-[#5C6B5E] transition"
          >
            Entrar
            <ArrowRight className="w-4 h-4" />
          </motion.button>

        </form>

        {/* Rodapé */}
        <p className="text-center text-xs text-[#5C6B5E]/60 mt-10">
          Acesso exclusivo para administração
        </p>

      </motion.div>
    </main>
  )
}
