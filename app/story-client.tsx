'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, RotateCcw, X, Calendar, ShieldAlert } from 'lucide-react';

// --- TIPE DATA ---
interface StoryItem {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  media_url: string;
  media_type: 'video' | 'image';
  description: string;
  fullHistory: string;
}

interface StoryClientProps {
  initialStories: StoryItem[];
}

// --- KOMPONEN MIKRO: ANIMASI TEKS (TEXT REVEAL) ---
const StaggeredText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
          }}
          className="mr-1.5 mb-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- KOMPONEN UTAMA ---
export default function StoryClient({ initialStories }: StoryClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Navigasi
  const nextSlide = () => {
    if (currentIndex < initialStories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsDrawerOpen(false);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsDrawerOpen(false);
    }
  };

  const resetStory = () => {
    setCurrentIndex(0);
    setIsDrawerOpen(false);
  };

  // Navigasi Keyboard (Bekerja hanya jika drawer tertutup)
  useEffect(() => {
    if (isDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isDrawerOpen]);

  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center overflow-hidden font-sans">
      
      {/* HEADER & PROGRESS INDICATOR */}
      <header className="absolute top-0 w-full max-w-7xl mx-auto p-6 z-30">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono tracking-widest text-amber-500 uppercase font-bold">Historical Interactive Chronicle</span>
          <span className="text-xs font-mono text-neutral-400">Arsip {currentIndex + 1} dari {initialStories.length}</span>
        </div>
        <div className="flex gap-2 w-full">
          {initialStories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-neutral-800 rounded-full overflow-hidden shadow-inner">
              <div className={`h-full bg-amber-500 transition-all duration-500 ${idx <= currentIndex ? 'w-full shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'w-0'}`} />
            </div>
          ))}
        </div>
      </header>

      {/* 3D DECK STACK CAROUSEL */}
      <section className="relative w-full max-w-7xl h-[75vh] flex justify-center items-center perspective-[1500px] z-20">
        <AnimatePresence mode="popLayout">
          {initialStories.map((story, index) => {
            const isFront = index === currentIndex;
            const isBack = index === currentIndex + 1;
            
            // Render hanya kartu yang aktif dan satu kartu di belakangnya
            if (!isFront && !isBack) return null;

            return (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 100 }}
                animate={{
                  scale: isFront ? 1 : 0.95,
                  y: isFront ? 0 : 50,
                  rotateX: isFront ? 0 : 5,
                  rotateZ: isFront ? 0 : -1,
                  opacity: isFront ? 1 : 0.4,
                  zIndex: isFront ? 10 : 5,
                  filter: isFront ? 'blur(0px)' : 'blur(4px)'
                }}
                exit={{ 
                  y: -1000, // Terlempar ke atas (Efek Gravitasi)
                  opacity: 0, 
                  scale: 1.05, 
                  rotateZ: 2,
                  transition: { duration: 0.6, ease: "easeInOut" } 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute w-[95%] lg:w-full h-full bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-800 grid grid-cols-1 lg:grid-cols-12"
              >
                
                {/* KIRI: MEDIA DENGAN ANIMASI MIKRO */}
                <div className="lg:col-span-7 relative h-full bg-black overflow-hidden">
                  {story.media_type === 'video' ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                      src={story.media_url}
                    />
                  ) : (
                    <motion.img
                      src={story.media_url}
                      alt={story.title}
                      className="w-full h-full object-cover opacity-80"
                      animate={isFront ? { scale: [1, 1.05] } : { scale: 1 }}
                      transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }} // Efek Ken Burns
                    />
                  )}
                  {/* Gradien Penyatuan Split-Screen */}
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-900 to-transparent hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent lg:hidden" />
                  
                  {/* Badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                    className="absolute top-6 left-6 bg-amber-600/90 backdrop-blur-sm text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest font-mono shadow-[0_0_15px_rgba(217,119,6,0.4)]"
                  >
                    {story.tag}
                  </motion.div>
                </div>

                {/* KANAN: KONTEN TEKS (TEXT REVEAL) */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full p-8 lg:p-12 bg-neutral-900 relative">
                  {isFront && (
                    <motion.div className="space-y-6">
                      <div className="flex gap-4 text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-1.5"><Calendar size={14} className="text-amber-500" /><span>{story.year}</span></div>
                        <div className="flex items-center gap-1.5"><ShieldAlert size={14} className="text-amber-500" /><span>Data Terkurasi</span></div>
                      </div>

                      <div className="space-y-3">
                        <motion.h2 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                          className="text-4xl lg:text-5xl font-extrabold text-white leading-tight font-serif" // Asumsi font-serif sudah di-set ke Cinzel di Tailwind config
                        >
                          {story.title}
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                          className="text-lg lg:text-xl text-amber-500/80 font-medium italic"
                        >
                          {story.subtitle}
                        </motion.p>
                      </div>

                      {/* Implementasi Text Reveal */}
                      <StaggeredText text={story.description} className="text-neutral-300 leading-relaxed text-base lg:text-lg font-serif" />
                    </motion.div>
                  )}

                  {/* TOMBOL AKSI BAWAH */}
                  {isFront && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                      className="mt-8 flex flex-wrap gap-4"
                    >
                      <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="flex items-center gap-2 text-sm font-bold bg-neutral-800 border border-neutral-700 hover:border-amber-500 text-white hover:text-amber-400 px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                      >
                        <BookOpen size={18} />
                        Kupas Sejarah Asli
                      </button>

                      {currentIndex === initialStories.length - 1 && (
                        <button onClick={resetStory} className="flex items-center gap-2 text-sm font-bold bg-amber-600 hover:bg-amber-500 text-black px-5 py-3 rounded-xl transition-all duration-300">
                          <RotateCcw size={18} /> Kembali
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* FOOTER NAVIGASI MENGAMBANG */}
      <footer className="absolute bottom-6 w-full max-w-7xl mx-auto flex justify-between items-center px-6 z-30 pointer-events-none">
        <span className="hidden sm:inline text-xs text-neutral-500 font-mono bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-md">
          <kbd className="font-bold text-amber-500">←</kbd> <kbd className="font-bold text-amber-500">→</kbd> Navigasi Keyboard Tersedia
        </span>
        <div className="flex gap-4 ml-auto pointer-events-auto">
          <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-4 rounded-2xl backdrop-blur-md transition-all ${currentIndex === 0 ? 'bg-neutral-900/50 text-neutral-600 border border-neutral-800/50 cursor-not-allowed' : 'bg-neutral-800/80 hover:bg-amber-600 text-white hover:text-black shadow-xl border border-neutral-700 hover:border-amber-500'}`}><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} disabled={currentIndex === initialStories.length - 1} className={`p-4 rounded-2xl backdrop-blur-md transition-all ${currentIndex === initialStories.length - 1 ? 'bg-neutral-900/50 text-neutral-600 border border-neutral-800/50 cursor-not-allowed' : 'bg-neutral-800/80 hover:bg-amber-600 text-white hover:text-black shadow-xl border border-neutral-700 hover:border-amber-500'}`}><ChevronRight size={24} /></button>
        </div>
      </footer>

      {/* PANEL INTERAKTIF (DRAWER) ANTI-AI SLOP */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black z-40 cursor-pointer"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="absolute bottom-0 left-0 right-0 max-h-[60vh] min-h-[40vh] bg-neutral-900 border-t-2 border-amber-900/50 z-50 p-8 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.8)] rounded-t-[2.5rem]"
            >
              <div className="w-full max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-start border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">Catatan Historis & Analisis Akademis</span>
                    <h3 className="text-3xl font-bold text-white font-serif mt-2">{initialStories[currentIndex].title}</h3>
                  </div>
                  <button onClick={() => setIsDrawerOpen(false)} className="p-3 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-neutral-300 leading-loose text-lg font-serif whitespace-pre-line antialiased">
                  {initialStories[currentIndex].fullHistory}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}