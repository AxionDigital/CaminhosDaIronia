import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configuração das fontes
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Terapias Integrativas | Caminhos da Ironia",
  description:
    "Acompanhamento emocional e energético com terapias integrativas e vibracionais para equilíbrio emocional, clareza e fortalecimento interior.",
  
  openGraph: {
    title: "Caminhos da Ironia — Terapias Integrativas",
    description:
      "Atendimento terapêutico para organização emocional, autoconhecimento e equilíbrio energético.",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terapias Integrativas",
    description:
      "Equilíbrio emocional e energético com acompanhamento terapêutico sensível e consciente.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* Aplica as variáveis de fonte no corpo do documento */}
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
