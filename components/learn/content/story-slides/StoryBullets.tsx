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
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-black leading-tight text-white mb-12 tracking-tighter uppercase"
      >
        {slide.title}
      </motion.h2>

      <div className="space-y-4">
        {slide.bullets.map((bullet, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-start gap-5 p-6 rounded-none bg-white/[0.03] border-l-4 border-kenya-red"
          >
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-kenya-gold" />
            <p className="text-lg font-bold text-white/70 leading-tight tracking-tight uppercase">
              {bullet}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryBullets;