'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Landmark, TrendingDown } from 'lucide-react';

export default function EpilogueView({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      
      <div className="text-center mb-12">
        <span className="text-sm font-mono text-amber-500 font-bold uppercase tracking-widest">Kesimpulan Sejarah // Epilog</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 font-serif">Destruksi Bersama (<span className="text-amber-500 italic">Mutual Ruin</span>)</h2>
        <p className="text-xl text-neutral-400 mt-4 italic max-w-3xl mx-auto">"Perang 700 tahun tidak melahirkan satu pemenang tunggal, melainkan sebuah kepunahan kolektif."</p>
      </div>

      {/* Infografis Komparatif Sederhana Anti AI Slop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-black/40 border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center">
          <TrendingDown size={40} className="text-amber-600 mb-4" />
          <h3 className="text-2xl font-bold text-white font-serif mb-3">Kekaisaran Persia Sassanid</h3>
          <p className="text-neutral-400 leading-relaxed">
            Musnah sepenuhnya pada tahun 651 M. Sistem monarki absolut tersentralisasi mereka tidak memiliki kedalaman pertahanan sisa setelah seluruh struktur tentaranya habis di Nineveh.
          </p>
        </div>

        <div className="bg-black/40 border border-neutral-800 p-6 rounded-2xl flex flex-col items-center text-center">
          <Landmark size={40} className="text-amber-600 mb-4" />
          <h3 className="text-2xl font-bold text-white font-serif mb-3">Kekaisaran Romawi Timur</h3>
          <p className="text-neutral-400 leading-relaxed">
            Berhasil bertahan hidup tetapi lumpuh secara permanen. Kehilangan wilayah terkayanya (Mesir, Suriah, Levant) dan tereduksi menjadi faksi defensif lokal Yunani-Bizantium di Anatolia.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onRestart}
          className="flex items-center gap-3 bg-amber-600 hover:bg-amber-500 text-black px-8 py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl shadow-amber-900/20"
        >
          <RotateCcw size={20} />
          Kembali ke Arsip Utama
        </button>
      </div>
    </motion.div>
  );
}