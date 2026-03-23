"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { getStoryQuizQuestion } from '@/lib/learn-data/stories';
import { cn } from '@/lib/utils';

interface StoryQuizProps {
  slide: {
    quizIdx: number;
    bg?: string;
  };
  onAnswer?: (answer: number) => void;
}

const StoryQuiz: React.FC<StoryQuizProps> = ({ slide, onAnswer }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const question = getStoryQuizQuestion(slide.quizIdx);

  if (!question) return null;

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    onAnswer?.(idx);
  };

  const isCorrect = selected === question.correct;

  return (
    <div className="flex-1 flex flex-col pt-4">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#9F7AEA] mb-6">
        <HelpCircle className="h-3 w-3" />
        Quick Challenge
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-serif font-light leading-snug text-white mb-10"
      >
        {question.q}
      </motion.h2>

      <div className="space-y-3">
        {question.opts.map((opt, idx) => {
          const isSelected = selected === idx;
          const isActuallyCorrect = idx === question.correct;
          
          let stateStyles = "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10";
          if (showFeedback) {
            if (isActuallyCorrect) stateStyles = "bg-[#48BB78]/20 border-[#48BB78]/30 text-[#48BB78]";
            else if (isSelected) stateStyles = "bg-[#E53E3E]/20 border-[#E53E3E]/30 text-[#E53E3E]";
            else stateStyles = "bg-white/5 border-white/5 text-white/30 opacity-60";
          }

          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => handleSelect(idx)}
              disabled={showFeedback}
              className={cn(
                "w-full p-5 rounded-[24px] border text-left text-sm transition-all flex items-center justify-between group",
                stateStyles
              )}
            >
              <span>{opt}</span>
              {showFeedback && isActuallyCorrect && <Check className="h-4 w-4" />}
              {showFeedback && isSelected && !isActuallyCorrect && <X className="h-4 w-4" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-[24px] bg-white/5 border border-white/5"
          >
            <p className={cn(
              "text-xs font-bold uppercase tracking-widest mb-2",
              isCorrect ? "text-[#48BB78]" : "text-[#E53E3E]"
            )}>
              {isCorrect ? 'That\'s Correct!' : 'Not Quite...'}
            </p>
            <p className="text-sm text-white/60 leading-relaxed italic">
              {isCorrect ? question.fb?.c : question.fb?.w}
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
               Tap right to continue <ArrowRight className="h-3 w-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryQuiz;