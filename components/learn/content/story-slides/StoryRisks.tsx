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
        className="text-2xl font-serif font-light leading-snug text-white mb-10"
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
            className="flex items-center gap-4 p-5 rounded-[24px] bg-[#E53E3E]/5 border border-[#E53E3E]/10"
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-[#E53E3E]/10 flex items-center justify-center font-mono text-[10px] font-bold text-[#E53E3E]">
              {risk.num}
            </div>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              {risk.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryRisks;