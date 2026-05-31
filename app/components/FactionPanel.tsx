'use client';

import { motion } from 'framer-motion';

export default function FactionPanel({ currentSlide }: { currentSlide: number }) {
  // Logika penentuan faksi dominan atau status dinamis berdasarkan slide aktif
  const getFactionData = (slide: number) => {
    switch (slide) {
      case 0: return { roma: 'Dominan', persia: 'Parthia (Konsolidasi)', era: 'Prolog Rivalitas' };
      case 2: return { roma: 'Krisis Moral', persia: 'Parthia (Menang)', era: 'Invasi Crassus 53 SM' };
      case 3: return { roma: 'Krisis Abad ke-3', persia: 'Sassanid (Agresif)', era: 'Kaisar Tertawan 260 M' };
      case 5: return { roma: 'Bizantium (Kritis)', persia: 'Sassanid (Ekspansi)', era: 'Perang Puncak 602 M' };
      case 6: return { roma: 'Bizantium (Runtuh Sebagian)', persia: 'Sassanid (Musnah)', era: 'Kebangkitan Gurun Arab' };
      default: return { roma: 'Stabil', persia: 'Sassanid (Stabil)', era: 'Pax Diplomatica' };
    }
  };

  const data = getFactionData(currentSlide);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 left-6 z-40 hidden lg:flex flex-col gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 p-4 rounded-xl shadow-2xl"
    >
      <div className="text-xs font-mono text-amber-500 font-bold mb-1">
        Theater Status // {data.era}
      </div>
      <div className="flex justify-between items-center gap-6">
        <span className="text-sm font-semibold text-neutral-300">S.P.Q.R (Roma):</span>
        <span className="text-sm text-neutral-400 font-mono">{data.roma}</span>
      </div>
      <div className="flex justify-between items-center gap-6 mt-1">
        <span className="text-sm font-semibold text-neutral-300">Persia Eran:</span>
        <span className="text-sm text-neutral-400 font-mono">{data.persia}</span>
      </div>
    </motion.div>
  );
}