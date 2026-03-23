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
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-gold mb-10">
        <HelpCircle className="h-3 w-3" />
        Quick Challenge
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold leading-tight text-white mb-16 tracking-tight"
      >
        {question.q}
      </motion.h2>

      <div className="space-y-3">
        {question.opts.map((opt, idx) => {
          const isSelected = selected === idx;
          const isActuallyCorrect = idx === question.correct;
          
          let stateStyles = "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.04] hover:border-white/10";
          if (showFeedback) {
            if (isActuallyCorrect) stateStyles = "bg-kenya-green/10 border-kenya-green text-kenya-green";
            else if (isSelected) stateStyles = "bg-kenya-red/10 border-kenya-red text-kenya-red";
            else stateStyles = "bg-white/[0.01] border-white/5 text-white/10 opacity-40";
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
                "w-full p-6 rounded-none border-2 text-left text-base font-bold tracking-tight transition-all flex items-center justify-between group",
                stateStyles
              )}
            >
              <span>{opt}</span>
              {showFeedback && isActuallyCorrect && <Check className="h-5 w-5" />}
              {showFeedback && isSelected && !isActuallyCorrect && <X className="h-5 w-5" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 rounded-none bg-white/[0.02] border-l-4 border-l-white/10"
          >
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-[0.2em] mb-3",
              isCorrect ? "text-kenya-green" : "text-kenya-red"
            )}>
              {isCorrect ? 'That\'s Correct!' : 'Analysis Correction'}
            </p>
            <p className="text-lg font-bold text-white/70 leading-tight italic tracking-tight">
              {isCorrect ? question.fb?.c : question.fb?.w}
            </p>
            
            <div className="mt-8 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
               Swipe or tap right to continue <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoryQuiz;