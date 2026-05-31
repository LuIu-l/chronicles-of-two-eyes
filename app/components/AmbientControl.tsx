'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AmbientControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Memanggil musik otentik dari folder public
    audioRef.current = new Audio('/audio/cinematic-ambient.mp3'); 
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25; // Volume latar belakang yang ideal agar tidak menenggelamkan fokus membaca
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Interaksi user diperlukan terlebih dahulu:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={toggleAudio}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500 text-amber-500 px-4 py-2 rounded-full shadow-lg transition-all"
    >
      <Music size={16} />
      <span className="text-xs font-mono font-bold">AMBIENT</span>
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} className="text-neutral-500" />}
    </motion.button>
  );
}