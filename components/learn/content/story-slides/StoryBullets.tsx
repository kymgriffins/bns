"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface StoryBulletsProps {
  slide: {
    title: string;
    bullets: string[];
    bg?: string;
  };
}

const StoryBullets: React.FC<StoryBulletsProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col pt-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-black leading-[0.9] text-white mb-16 tracking-tighter uppercase border-l-8 border-kenya-red pl-6"
      >
        {slide.title}
      </motion.h2>

      <div className="space-y-4">
        {slide.bullets.map((bullet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.15 }}
            className="flex items-start gap-6 p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-kenya-gold/30 transition-all shadow-xl group"
          >
            <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-kenya-gold shadow-[0_0_12px_rgba(245,200,66,0.6)] group-hover:scale-125 transition-transform" />
            <p className="text-xl font-black text-white/90 leading-none tracking-tight uppercase italic drop-shadow-md">
              {bullet}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryBullets;