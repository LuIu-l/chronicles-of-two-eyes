'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Shield, Volume2, ArrowDown, Map as MapIcon, Compass, Info } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
}

export default function EnhancedLanding({ onStart, title, subtitle, buttonText }: LandingPageProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const exhibitionRef = useRef<HTMLElement>(null);

  // Deteksi scroll untuk efek paralaks teks tingkat 1
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const yHero = useTransform(scrollY, [0, 400], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToExhibition = () => {
    exhibitionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory bg-black text-neutral-100 font-sans hide-scrollbar">
      
      {/* ========================================================================= */}
      {/* TINGKAT 1: THE CINEMATIC HERO COVER (SNAP SECTION) */}
      {/* ========================================================================= */}
      <section className="relative w-full h-screen snap-start flex items-center justify-center overflow-hidden">
        {/* Layer Peta SVG dengan Efek Mouse Parallax */}
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute inset-[-5%] w-[110%] h-[110%]"
        >
          <img 
            src="/images/landing-bg.jpg"
            alt="Landing Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <img 
            src="/images/roman-parthian-map.svg" 
            alt="Roman Parthian Frontier Map" 
            className="absolute inset-0 w-full h-full object-contain opacity-20 mix-blend-screen"
          />
        </motion.div>

        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />

        {/* Konten Utama Sampul */}
        <motion.div 
          style={{ opacity: opacityHero, y: yHero }}
          className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-6"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 text-neutral-400 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest backdrop-blur-md mb-2"
          >
            <Shield size={14} className="text-amber-500" />
            Human-Curated Historical Document
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight font-serif drop-shadow-2xl"
          >
            {title}
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xl text-neutral-300 max-w-2xl font-medium drop-shadow-lg"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStart}
              className="flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(217,119,6,0.3)]"
            >
              <Play size={20} fill="currentColor" />
              {buttonText}
            </button>

            <button 
              onClick={scrollToExhibition}
              className="flex items-center gap-3 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 backdrop-blur-sm"
            >
              <MapIcon size={20} />
              TELITI ARSIP PETA
            </button>
          </motion.div>
        </motion.div>

        {/* Hint Indikator Scroll Ke Bawah */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 cursor-pointer hover:text-amber-500 transition-colors"
          onClick={scrollToExhibition}
        >
          <span className="text-xs font-mono tracking-widest uppercase">Gulir ke bawah untuk Pameran</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* TINGKAT 2: THE MAP EXHIBITION HALL (SNAP SECTION) */}
      {/* ========================================================================= */}
      <section ref={exhibitionRef} className="relative w-full h-screen snap-start bg-neutral-950 flex items-center justify-center p-6 lg:p-12 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full max-h-[85vh]">
          
          {/* PANEL KIRI: Penampil Utama Peta SVG Skala Besar */}
          <div className="lg:col-span-8 bg-black border border-neutral-800 rounded-3xl p-6 flex flex-col relative overflow-hidden group shadow-2xl">
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-2">
                <Compass size={14} /> EXHIBITION CANVAS // VECTOR RENDERING
              </span>
            </div>
            
            {/* Gambar Utama Peta Taktis SVG */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden bg-neutral-900/30 rounded-2xl border border-neutral-800/50 p-4">
              <img 
                src="/images/roman-parthian-map.svg" 
                alt="Detailed Cartography Analysis"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* PANEL KANAN: Analisis Kartografi Sejarah */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-6 h-full">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-3 text-sm font-bold font-mono tracking-widest uppercase">
                <Info size={16} /> Dokumen Kartografi Armenia
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-extrabold text-white leading-tight mb-4">
                Garis Batas Perang <br/><span className="text-amber-500">Romawi-Parthia</span> (58–60 M)
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Arsip peta militer otentik di samping memetakan jalur kampanye Jenderal Romawi <strong>Gnaeus Domitius Corbulo</strong> atas perintah Kaisar Nero.
              </p>
            </div>

            <div className="space-y-4 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="text-sm text-neutral-500 font-mono">Zona Konflik:</span>
                <span className="font-semibold text-white">Kerajaan Armenia</span>
              </div>
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="text-sm text-neutral-500 font-mono">Faksi Roma:</span>
                <span className="font-semibold text-red-500">Legio III Gallica & VI Ferrata</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500 font-mono">Faksi Persia:</span>
                <span className="font-semibold text-blue-400">Dinasti Arsacid (Parthia)</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 italic">
              *Detail visual mencakup nama kuno seperti Artaxata dan Tigranocerta yang hancur dalam konflik perebutan takhta penyangga ini.
            </p>

            <button 
              onClick={onStart}
              className="mt-4 w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20"
            >
              Masuk ke Alur Kronologi <Play size={18} fill="currentColor" />
            </button>
          </div>

        </div>
      </section>

      {/* Watermark Dekorasi Universal */}
      <div className="fixed bottom-6 right-6 z-50 text-xs font-mono text-neutral-600 md:flex items-center gap-2 hidden pointer-events-none">
        <Volume2 size={14} className="text-neutral-500" />
        <span>AUDIO AMBIENT ENABLED</span>
      </div>

      {/* CSS Injection untuk menyembunyikan scrollbar native pada layout scroll-snap */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}