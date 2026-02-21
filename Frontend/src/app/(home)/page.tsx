'use client'

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import {
  Heart, Flower2, Brain, Unlock, Compass, Scale, Ear, CircleDot, Sparkles,
  FileCode, Headphones, Waves, Check, Eye, Fingerprint, ArrowRight,
  Mail, Instagram, MessageCircle, LucideProps
} from 'lucide-react';
import Image from 'next/image';
import NavBar from '../components/NavBar';

/**
 * MELHORIAS DE DESIGN APLICADAS:
 * 1. Tipografia: Introdução da fonte 'Cormorant Garamond' para títulos (elegância e espiritualidade) 
 *    e 'Montserrat' para corpo de texto (clareza e modernidade).
 * 2. Paleta de Cores: Transição de tons puramente terrosos para uma paleta "Sage & Earth" 
 *    (Verde Sálvia e Terra), que evoca cura, equilíbrio e natureza.
 * 3. Efeitos Visuais: Glassmorphism sutil, sombras suaves e bordas mais arredondadas.
 * 4. Hierarquia: Melhor distinção visual entre seções e elementos de ação (CTAs).
 */

// --- Tipagens ---

interface Service {
  icon: FC<LucideProps>;
  title: string;
  description: string;
}

interface Tool {
  icon: FC<LucideProps>;
  title: string;
  description: string;
}

interface SocialLink {
  icon: FC<LucideProps>;
  href: string;
  label: string;
}

interface SiteData {
  services: Service[];
  tools: Tool[];
  audiences: string[];
  socialLinks: SocialLink[];
}

interface CardProps extends Service {
  index: number;
}

interface ToolItemProps extends Tool {
  index: number;
}

// --- Componentes Reutilizáveis ---

const ServiceCard: FC<CardProps> = ({ icon: IconComponent, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    className="group h-full"
  >
    <div className="h-full p-8 bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-[#E2E8F0] hover:border-[#A3B18A] transition-all duration-700 hover:shadow-2xl hover:shadow-[#A3B18A]/10 group-hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-[#F0F4F0] flex items-center justify-center mb-8 group-hover:bg-[#4A5D4E] transition-all duration-500 transform group-hover:rotate-6">
        <IconComponent className="w-7 h-7 text-[#5C6B5E] group-hover:text-white transition-colors duration-500" strokeWidth={1.2} />
      </div>
      <h3 className="text-2xl font-serif italic text-[#2D362E] mb-4">{title}</h3>
      <p className="text-[15px] text-[#5C6B5E] leading-relaxed font-light">{description}</p>
    </div>
  </motion.div>
);

const ToolItem: FC<ToolItemProps> = ({ icon: IconComponent, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group flex items-center gap-6 p-6 bg-white/40 border border-[#E2E8F0] rounded-3xl hover:bg-white hover:border-[#A3B18A] hover:shadow-xl transition-all duration-500"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0F4F0] to-[#DDE5D7] flex items-center justify-center flex-shrink-0 group-hover:from-[#4A5D4E] group-hover:to-[#5C6B5E] transition-all duration-500 shadow-sm">
      <IconComponent className="w-6 h-6 text-[#5C6B5E] group-hover:text-white transition-colors duration-500" strokeWidth={1.2} />
    </div>
    <div>
      <h3 className="font-serif text-xl text-[#2D362E] mb-1">{title}</h3>
      <p className="text-sm text-[#5C6B5E]/80 font-light">{description}</p>
    </div>
  </motion.div>
);

// --- Dados ---

const siteData: SiteData = {
  services: [
    { icon: Flower2, title: "Organização emocional", description: "Harmonização do campo energético para maior fluidez e leveza no seu dia a dia." },
    { icon: Brain, title: "Autoconhecimento", description: "Um mergulho profundo para o reencontro com seu próprio eixo e essência interior." },
    { icon: Unlock, title: "Liberação de bloqueios", description: "Dissolução de padrões emocionais repetitivos que limitam sua expansão pessoal." },
    { icon: Compass, title: "Fortalecimento", description: "Clareza sobre sua identidade e direção, fortalecendo seu propósito de vida." },
    { icon: Scale, title: "Equilíbrio integral", description: "A busca pela harmonia perfeita entre mente, emoções e sua energia vital." },
    { icon: Sparkles, title: "Expansão da consciência", description: "Práticas para ampliar a percepção e integrar novos níveis de clareza e presença." }
  ],
  tools: [
    { icon: Ear, title: "Escuta terapêutica", description: "Orientação emocional profunda, acolhedora e sem julgamentos." },
    { icon: CircleDot, title: "Radiestesia", description: "Uso de pêndulo e gráficos para diagnóstico e equilíbrio energético." },
    { icon: FileCode, title: "Protocolos vibracionais", description: "Processos personalizados criados para suas necessidades específicas." },
    { icon: Headphones, title: "Áudios terapêuticos", description: "Meditações guiadas e frequências para harmonização contínua." },
    { icon: Waves, title: "Harmonização", description: "Leitura sensível e reequilíbrio do seu campo energético vital." }
  ],
  audiences: [
    "Pessoas em momentos de transição ou crise emocional",
    "Quem se sente desconectado de sua própria essência",
    "Busca por clareza, leveza e uma nova direção na vida",
    "Desejo por um cuidado terapêutico sensível e profundo"
  ],
  socialLinks: [
    { icon: Instagram, href: "https://www.instagram.com/caminhosdaironia?utm_source=qr&igsh=MWR3ZjE1N2VpYXFzeA%3D%3D", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/5517997860845", label: "WhatsApp" },
    { icon: Mail, href: "mailto:contato@caminhosdaironia.com", label: "Email" }
  ]
};

// --- Componente Principal ---

const Home: FC = () => {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F8F9F5] font-sans text-[#2D362E] selection:bg-[#A3B18A]/30">
      <NavBar />
      {/* Importação de Fontes (Simulada para o ambiente Next.js/Tailwind) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        
        :root {
          --font-serif: 'Cormorant Garamond', serif;
          --font-sans: 'Montserrat', sans-serif;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
      `}</style>

      {/* Seção Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920"
            alt="Natureza serena"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9F5]/80 via-[#F8F9F5]/60 to-[#F8F9F5]" />
        </div>

        {/* Elementos Decorativos Flutuantes */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-[#A3B18A]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#DDE5D7]/30 rounded-full blur-[120px]"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >

            <h1 className="text-2xl md:text-4xl uppercase lg:text-5xl block mt-4 font-sans font-extralight tracking-[0.2em] text-[#A3B18A]">
              Terapias Integrativas
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl block mt-4 font-sans font-extralight tracking-[0.2em] text-[#A3B18A]">
                & VIBRACIONAIS
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-[#5C6B5E] font-light max-w-3xl mx-auto leading-relaxed mb-14 font-sans">
              Acompanhamento emocional e energético para quem busca
              <span className="font-normal text-[#A3B18A]"> equilíbrio, clareza e fortalecimento </span>
              interior através de uma abordagem consciente.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href='https://wa.me/5517997860845'
                className="group relative px-10 py-5 bg-[#4A5D4E] text-white rounded-full text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Agendar Sessão</span>
                <div className="absolute inset-0 bg-[#5C6B5E] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.a>

              <motion.a
                href="#sobre"
                className="px-10 py-5 border border-[#A3B18A] text-[#4A5D4E] rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A3B18A]/10 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conhecer mais
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
          </motion.div>
        </div>
      </section>

      {/* Seção Sobre */}
      <section id="sobre" className="py-32 md:py-48 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
                  alt="Meditação"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-[2s]"
                />
              </div>
              <div className="absolute -bottom-10 -right-3 p-10 bg-white rounded-[3rem] shadow-xl max-w-[280px] border border-[#F0F4F0]">
                <Heart className="w-8 h-8 text-[#A3B18A] mb-4" fill="#A3B18A" fillOpacity={0.2} />
                <h4 className="font-serif text-2xl text-[#2D362E] mb-2">Escuta Profunda</h4>
                <p className="text-sm text-[#5C6B5E] font-light leading-relaxed">Processos únicos construídos com sensibilidade e respeito.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs tracking-[0.4em] text-[#A3B18A] uppercase mb-6 block font-medium">A Essência</span>
              <h2 className="font-serif text-4xl md:text-6xl text-[#2D362E] mb-10 leading-tight">
                Sensibilidade que <br />
                <span className="italic text-[#5C6B5E]">transforma energia</span>
              </h2>
              <div className="space-y-8 text-lg text-[#5C6B5E] font-light leading-relaxed">
                <p>Atuo com terapias integrativas e vibracionais, oferecendo um espaço seguro para o florescimento do seu ser.</p>
                <p>Meu trabalho une a sabedoria milenar de ferramentas energéticas com uma escuta terapêutica contemporânea, criando um caminho personalizado para sua evolução.</p>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div className="w-20 h-[1px] bg-[#A3B18A]" />
                <span className="font-serif italic text-xl text-[#2D362E]">Respeitando sua singularidade</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Serviços */}
      <section id='servicos' className="py-32 px-6 bg-[#F0F4F0]/50 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-[#2D362E] mb-6">Caminhos de Cura</h2>
            <div className="w-24 h-1 bg-[#A3B18A] mx-auto mb-8 rounded-full" />
            <p className="text-[#5C6B5E] max-w-2xl mx-auto text-lg font-light">
              Cada atendimento é uma jornada personalizada, desenhada para atender as necessidades sutis do seu campo emocional.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção Ferramentas */}
      <section className="py-32 md:py-48 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-1 gap-6">
                {siteData.tools.map((tool, index) => (
                  <ToolItem key={tool.title} {...tool} index={index} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-xs tracking-[0.4em] text-[#A3B18A] uppercase mb-6 block font-medium">Recursos</span>
              <h2 className="font-serif text-4xl md:text-6xl text-[#2D362E] mb-8 leading-tight">Alquimia de <br /><span className="italic">Ferramentas</span></h2>
              <p className="text-lg text-[#5C6B5E] font-light leading-relaxed mb-10">
                Integramos diferentes saberes para criar um protocolo vibracional que ressoe com sua frequência atual.
              </p>
              <div className="p-8 bg-[#4A5D4E] rounded-[2.5rem] text-white shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse" />
                  <span className="text-sm tracking-widest uppercase font-light">Abordagem Ética</span>
                </div>
                <p className="text-white/80 font-light">Foco absoluto no seu bem-estar e na integridade do seu processo evolutivo.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Público-Alvo */}
      <section className="py-32 px-6 bg-[#2D362E] text-white rounded-[4rem] mx-4 md:mx-10 my-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://cdn.pixabay.com/photo/2016/12/27/17/10/pendulum-1934311_1280.jpg"
            alt="Pendulo"
            fill
            priority
            sizes="100vw"
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.4em] text-[#A3B18A] uppercase mb-6 block">Ressonância</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Este caminho é <br /><span className="italic text-[#A3B18A]">para você?</span></h2>
              <p className="text-white/60 text-lg font-light leading-relaxed">
                Se você sente o chamado para um mergulho interno mais profundo, talvez estejamos em sintonia.
              </p>
            </motion.div>

            <div className="space-y-6">
              {siteData.audiences.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500"
                >
                  <div className="w-10 h-10 rounded-full bg-[#A3B18A]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#A3B18A]" />
                  </div>
                  <p className="text-white/90 font-light">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção Espelhamento de Consciência */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F0] via-[#F8F9F5] to-[#DDE5D7]/60" />

        <motion.div
          animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#A3B18A]/30 rounded-full blur-[140px]"
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#4A5D4E]/10 text-[#4A5D4E] text-xs tracking-[0.3em] uppercase mb-8">
                <Eye className="w-4 h-4" />
                Bônus Gratuito
              </span>

              <h2 className="font-serif text-4xl md:text-6xl text-[#2D362E] mb-8 leading-tight">
                Espelhamento de <br />
                <span className="italic text-[#5C6B5E]">Consciência do Momento Atual</span>
              </h2>

              <p className="text-lg text-[#5C6B5E] font-light leading-relaxed mb-10 max-w-xl">
                Uma leitura sensível do seu campo no momento presente.
                Sem julgamento, sem promessas — apenas clareza sobre o que está ativo,
                disponível e pedindo atenção agora.
              </p>

              <ul className="space-y-4 text-[#5C6B5E] font-light mb-12">
                {["Leitura do campo energético atual",
                  "Identificação do tema que pede atenção agora",
                  "Compreensão da sua vibração no momento presente",
                  "Devolutiva consciente e orientadora"].map(li => (
                    <li key={li}>• {li}</li>
                  ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.a
                  href="/agendamento/espelhamento"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center text-center gap-4 px-10 py-5 bg-[#4A5D4E] text-white rounded-full text-sm tracking-[0.2em] uppercase shadow-xl shadow-[#4A5D4E]/20"
                >
                  Agendar Gratuitamente
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="#contato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center text-center gap-4 px-10 py-5 border border-[#A3B18A] text-[#4A5D4E] rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A3B18A]/10 transition"
                >
                  Entender a Mentoria
                </motion.a>


              </div>
              <p className="mt-6 text-xs text-center text-[#5C6B5E]/60 tracking-widest uppercase">
                Atendimento online · Vagas limitadas por semana
              </p>
            </motion.div>

            {/* Card Destaque */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="p-12 bg-white/70 backdrop-blur border border-[#E2E8F0] rounded-[3.5rem] shadow-2xl">
                <Fingerprint className="w-10 h-10 text-[#A3B18A] mb-6" />

                <h3 className="font-serif text-2xl text-[#2D362E] mb-6">
                  Para quem é esse espelhamento?
                </h3>

                <p className="text-[#5C6B5E] font-light leading-relaxed mb-8">
                  Para quem sente confusão, repetição de padrões ou necessidade de
                  clareza antes de iniciar um processo mais profundo.
                </p>

                <div className="p-6 bg-[#F0F4F0]/70 rounded-3xl text-sm text-[#5C6B5E] font-light">
                  💡 <strong>Importante:</strong> este encontro não substitui um processo
                  terapêutico contínuo — ele revela se esse caminho faz sentido agora.
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section id='contato' className="py-32 md:py-48 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl text-[#2D362E] mb-10 leading-tight">
              Vamos despertar sua <br /><span className="italic text-[#5C6B5E]">melhor frequência?</span>
            </h2>
            <p className="text-xl text-[#5C6B5E] font-light mb-16 max-w-2xl mx-auto leading-relaxed">
              Agende uma conversa inicial para sentirmos como posso te apoiar na sua jornada de transformação.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.a
                href='https://wa.me/5517997860845'
                className="flex items-center gap-4 px-12 py-6 bg-[#4A5D4E] text-white rounded-full text-sm tracking-[0.2em] uppercase shadow-xl shadow-[#4A5D4E]/20 hover:shadow-2xl hover:shadow-[#4A5D4E]/40 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <MessageCircle className="w-5 h-5" />
                Agendar Sessão Online
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="mailto:contato@caminhosdaironia.com"
                className="flex items-center gap-4 px-12 py-6 border border-[#A3B18A] text-[#4A5D4E] rounded-full text-sm tracking-[0.2em] uppercase hover:bg-[#A3B18A]/10 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <Mail className="w-5 h-5" />
                Enviar Mensagem
              </motion.a>
            </div>

            <div className="mt-24 flex items-center justify-center gap-8">
              {siteData.socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -10, color: '#4A5D4E' }}
                  className="w-16 h-16 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#A3B18A] shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <link.icon className="w-6 h-6" strokeWidth={1.2} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F0F4F0] pt-24 pb-12 px-6 border-t border-[#DDE5D7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697e8e403ab841ea9326cc28/85b1f1d88_logo-full__1_-removebg-preview.png"
                className="h-24 mb-8 grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
                alt="Logo"
              />
              <p className="text-[#5C6B5E] font-light leading-relaxed max-w-sm text-lg">
                Acompanhamento emocional, energético e consciente para sua jornada de fortalecimento pessoal e equilíbrio integral.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-2xl text-[#2D362E] mb-8">Navegação</h4>
              <ul className="space-y-4 text-[#5C6B5E] font-light">
                <li><a href="#sobre" className="hover:text-[#A3B18A] transition-colors">Sobre o Trabalho</a></li>
                <li><a href="#servicos" className="hover:text-[#A3B18A] transition-colors">Caminhos de Cura</a></li>
                <li><a href="https://wa.me/5517997860845" className="hover:text-[#A3B18A] transition-colors">Agendamento</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-2xl text-[#2D362E] mb-8">Conexão</h4>
              <p className="text-[#5C6B5E] font-light mb-6">Sinta-se à vontade para entrar em contato e tirar suas dúvidas.</p>
              <a href="#contato" className="text-[#A3B18A] font-medium tracking-widest uppercase text-xs hover:underline">Iniciar Jornada →</a>
            </div>
          </div>

          <div className="pt-12 border-t border-[#DDE5D7] flex flex-col md:row items-center justify-between gap-6">
            <p className="text-sm text-[#5C6B5E]/60 font-light">
              © {new Date().getFullYear()} · Caminhos da Ironia. Alquimia de Ser Presente.
            </p>
            <div className="flex gap-8 text-[10px] tracking-[0.2em] text-[#5C6B5E]/40 uppercase">
              <a href="#" className="hover:text-[#A3B18A]">Privacidade</a>
              <a href="#" className="hover:text-[#A3B18A]">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
