"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Trophy,
  Lightbulb
} from 'lucide-react';
import { QuizQuestion, UserProgress } from '@/types/learn';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizPaneProps {
  questions: QuizQuestion[];
  progress: UserProgress | null;
  onComplete?: (score: number) => void;
}

export const QuizPane: React.FC<QuizPaneProps> = ({
  questions,
  progress,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const selectedAnswer = answers[currentIdx];
  
  const handleAnswer = (optIdx: number) => {
    if (showFeedback) return;
    setAnswers({ ...answers, [currentIdx]: optIdx });
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      const score = questions.reduce((acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0), 0);
      onComplete?.(score);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const score = questions.reduce((acc, q, idx) => acc + (answers[idx] === q.correct ? 1 : 0), 0);
    const percent = Math.round((score / questions.length) * 100);
    
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-[#0D0D14] text-center max-w-2xl mx-auto overflow-y-auto no-scrollbar">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="mb-8 p-10 rounded-[48px] bg-gradient-to-br from-[#F5C842]/20 to-[#F5C842]/5 border border-[#F5C842]/20 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          <Trophy className="h-20 w-20 text-[#F5C842] mx-auto mb-6" />
          <h2 className="text-4xl font-serif text-white mb-2">Quiz Complete!</h2>
          <p className="text-sm text-white/50 uppercase tracking-[0.3em] font-mono">You scored {percent}%</p>
        </motion.div>

        <div className="w-full space-y-3">
          <Button 
            onClick={restart}
            variant="outline"
            className="w-full py-6 rounded-[24px] border-white/10 bg-white/5 text-white hover:bg-white/10 flex items-center justify-center gap-3"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button 
            className="w-full py-6 rounded-[24px] bg-[#F5C842] text-[#1A1200] font-bold hover:scale-[1.02] transition-transform"
          >
            Continue Learning <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="h-full w-full bg-[#0D0D14] flex flex-col p-6 lg:p-12 max-w-4xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#9F7AEA]">
          <HelpCircle className="h-4 w-4" />
          Knowledge Check
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          Question {currentIdx + 1} of {questions.length}
        </div>
      </div>

      <div className="flex-1">
        <motion.h2
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-serif font-light leading-snug text-white mb-12"
        >
          {question.q}
        </motion.h2>

        <div className="grid gap-4">
          {question.opts.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isActuallyCorrect = idx === question.correct;
            
            let btnBg = "bg-white/5 border-white/5 text-[#F0EDE6]/80 hover:bg-white/[0.08] hover:border-white/10";
            if (showFeedback) {
              if (isActuallyCorrect) btnBg = "bg-[#48BB78]/20 border-[#48BB78]/30 text-[#48BB78]";
              else if (isSelected) btnBg = "bg-[#E53E3E]/20 border-[#E53E3E]/30 text-[#E53E3E]";
              else btnBg = "bg-white/[0.02] border-white/5 text-white/30 opacity-60";
            }

            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleAnswer(idx)}
                disabled={showFeedback}
                className={cn(
                  "relative w-full p-6 p-8 rounded-[32px] border text-left text-base transition-all flex items-center justify-between group",
                  btnBg
                )}
              >
                <div className="flex items-center gap-6">
                   <div className={cn(
                     "h-10 w-10 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition-colors shadow-inner",
                     isSelected ? "bg-currentColor" : "bg-white/5 border-white/10"
                   )}>
                      {String.fromCharCode(65 + idx)}
                   </div>
                   <span className="font-sans">{opt}</span>
                </div>
                {showFeedback && isActuallyCorrect && <CheckCircle2 className="h-6 w-6" />}
                {showFeedback && isSelected && !isActuallyCorrect && <XCircle className="h-6 w-6" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 rounded-[40px] bg-white/[0.04] border border-white/10 flex flex-col md:flex-row items-center gap-6"
          >
            <div className={cn(
              "p-4 rounded-full flex items-center justify-center",
              isCorrect ? "bg-[#48BB78]/20 text-[#48BB78]" : "bg-[#E53E3E]/20 text-[#E53E3E]"
            )}>
               <Lightbulb className="h-8 w-8" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <p className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] mb-1",
                isCorrect ? "text-[#48BB78]" : "text-[#E53E3E]"
              )}>
                {isCorrect ? 'Correct Answer!' : 'Needs Review'}
              </p>
              <p className="text-base text-white/70 leading-relaxed italic">
                {isCorrect ? question.fb?.c : question.fb?.w}
              </p>
            </div>

            <Button 
               onClick={nextQuestion}
               className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 uppercase font-bold text-xs tracking-widest whitespace-nowrap"
            >
               {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
               <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPane;