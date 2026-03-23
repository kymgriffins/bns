"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface StoryRisksProps {
  slide: {
    title: string;
    risks: {
      num: string;
      text: string;
    }[];
  };
}

const StoryRisks: React.FC<StoryRisksProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col pt-8">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#E53E3E] mb-6">
        <AlertTriangle className="h-3 w-3" />
        Fiscal Risks
      </div>

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-black leading-tight text-white mb-12 tracking-tighter uppercase"
      >
        {slide.title}
      </motion.h2>

      <div className="space-y-4">
        {slide.risks.map((risk, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="flex items-center gap-6 p-6 rounded-none bg-kenya-red/5 border-l-4 border-kenya-red"
          >
            <div className="h-10 w-10 shrink-0 border border-kenya-red/20 flex items-center justify-center text-[10px] font-black text-kenya-red uppercase">
              {risk.num}
            </div>
            <p className="text-lg font-bold text-white/70 leading-tight tracking-tight uppercase">
              {risk.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryRisks;