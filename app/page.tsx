'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar, Users, Play, BookOpen, X } from 'lucide-react';
import { LANDING_PAGE_DATA, STORY_DATA } from './data';
import AmbientControl from './components/AmbientControl';
import FactionPanel from './components/FactionPanel';
import EpilogueView from './components/EpilogueView';
import EnhancedLanding from './components/EnhancedLanding';

export default function WebStoryApp() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEpilogue, setIsEpilogue] = useState(false);

  const currentStory = STORY_DATA[currentIndex];

  // Fungsi Navigasi
  const nextSlide = () => {
    if (currentIndex < STORY_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsDrawerOpen(false); // Tutup drawer otomatis saat ganti slide
    } else {
      // Transisi ke Epilogue
      setIsEpilogue(true);
      setIsDrawerOpen(false);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsDrawerOpen(false); // Tutup drawer otomatis saat ganti slide
    }
  };

  const resetStory = () => { 
    setCurrentIndex(0); 
    setShowLanding(true); 
    setIsDrawerOpen(false);
    setIsEpilogue(false);
  };

  // Navigasi Keyboard (Hanya bekerja jika drawer sedang tertutup)
  useEffect(() => {
    if (showLanding || isDrawerOpen || isEpilogue) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showLanding, isDrawerOpen, isEpilogue]);

  // --- KOMPONEN LANDING PAGE ---
  if (showLanding) {
    return (
      <EnhancedLanding
        title={LANDING_PAGE_DATA.title}
        subtitle={LANDING_PAGE_DATA.subtitle}
        buttonText={LANDING_PAGE_DATA.buttonText}
        onStart={() => setShowLanding(false)}
      />
    );
  }

  // --- KOMPONEN STORY WEB (SPLIT SCREEN) ---
  return (
    <motion.main 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="relative min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-6 overflow-hidden font-sans"
    >
      <AmbientControl />
      {!isEpilogue && <FactionPanel currentSlide={currentIndex} />}

      {isEpilogue ? (
        <div className="flex-1 flex items-center justify-center relative z-10 w-full">
          <EpilogueView onRestart={resetStory} />
        </div>
      ) : (
        <>
          {/* HEADER & PROGRESS BAR */}
          <header className="w-full max-w-7xl mx-auto mb-4 z-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono tracking-widest text-amber-500 uppercase font-bold">Historical Interactive Chronicle</span>
          <span className="text-xs font-mono text-neutral-400">Slide {currentIndex + 1} of {STORY_DATA.length}</span>
        </div>
        <div className="flex gap-2 w-full">
          {STORY_DATA.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-neutral-900 rounded-full overflow-hidden">
              <div className={`h-full bg-amber-500 transition-all duration-300 ${idx < currentIndex ? 'w-full' : idx === currentIndex ? 'w-full animate-pulse' : 'w-0'}`} />
            </div>
          ))}
        </div>
      </header>

      {/* CORE LAYOUT */}
      <section className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4 z-10">
        {/* GAMBAR NYATA / PETA (KIRI) */}
        <div className="lg:col-span-7 relative aspect-[16/10] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentStory.id} src={currentStory.image} alt={currentStory.title}
              initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
          <span className="absolute top-4 left-4 bg-amber-600 text-black text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider font-mono">{currentStory.tag}</span>
        </div>

        {/* TEKS UTAMA (KANAN) */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full pl-0 lg:pl-6">
          <AnimatePresence mode="wait">
            <motion.div key={currentStory.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="flex gap-4 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1"><Calendar size={14} className="text-amber-500" /><span>{currentStory.year}</span></div>
                <div className="flex items-center gap-1"><Users size={14} className="text-amber-500" /><span>Kurasi Manusia</span></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif">{currentStory.title}</h2>
                <p className="text-lg text-amber-200/70 font-medium italic">{currentStory.subtitle}</p>
              </div>
              <p className="text-neutral-300 leading-relaxed text-base lg:text-lg">{currentStory.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* UTUKS ANTI-AI SLOP: Tombol Buka Catatan Sejarah Lengkap */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold bg-neutral-900 border border-neutral-800 text-amber-500 hover:text-amber-400 hover:border-amber-500/40 px-4 py-2.5 rounded-lg transition-all"
            >
              <BookOpen size={16} />
              Buka Analisis & Catatan Sejarah
            </button>

            {/* TOMBOL LANJUT KE EPILOG DI SLIDE TERAKHIR */}
            {currentIndex === STORY_DATA.length - 1 && (
              <button onClick={nextSlide} className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 hover:text-black text-black px-4 py-2.5 rounded-lg font-semibold transition-all border border-neutral-800">
                 Lanjut ke Epilogue <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGASI */}
      <footer className="w-full max-w-7xl mx-auto flex justify-between items-center border-t border-neutral-900 pt-4 mt-4 z-10">
        <span className="hidden sm:inline text-xs text-neutral-500 font-mono">Gunakan <kbd className="bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400">←</kbd> dan <kbd className="bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-400">→</kbd> pada keyboard.</span>
        <div className="flex gap-4 ml-auto">
          <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-neutral-800'}`}><ChevronLeft size={20} /></button>
          <button onClick={nextSlide} className={`p-3 rounded-xl border border-neutral-800 bg-neutral-900 text-white transition-all hover:bg-neutral-800 hover:border-amber-500`}><ChevronRight size={20} /></button>
        </div>
      </footer>
      </>
      )}

      {/* INTERACTIVE INTERFACE: SLIDE-UP DRAWER FOR DETAILED HISTORY */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay Gelap di Background */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black z-40 cursor-pointer"
            />
            {/* Panel Laci Sejarah */}
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="absolute bottom-0 left-0 right-0 max-h-[50vh] min-h-[35vh] bg-neutral-900 border-t border-neutral-800 z-50 p-8 overflow-y-auto shadow-2xl rounded-t-3xl"
            >
              <div className="w-full max-w-4xl mx-auto space-y-4">
                <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">Catatan Arkeologi & Dokumen Sejarah Asli</span>
                    <h3 className="text-2xl font-bold text-white font-serif mt-1">{currentStory.title}</h3>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-neutral-400 hover:text-white bg-neutral-800 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-neutral-300 leading-relaxed text-base md:text-lg font-normal whitespace-pre-line antialiased">
                  {currentStory.fullHistory}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}