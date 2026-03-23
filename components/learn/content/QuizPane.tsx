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
      <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-kenya-black text-center max-w-2xl mx-auto overflow-y-auto no-scrollbar font-sans">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-12 p-12 rounded-none bg-white/[0.02] border border-white/10"
        >
          <div className="h-24 w-24 mx-auto mb-8 bg-kenya-gold/10 border border-kenya-gold/20 flex items-center justify-center">
            <Trophy className="h-12 w-12 text-kenya-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight uppercase">Quiz Complete!</h2>
          <div className="text-6xl font-black text-kenya-red mb-2 tracking-tighter">{percent}%</div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Performance Merit</p>
        </motion.div>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button 
            onClick={restart}
            variant="outline"
            className="py-8 rounded-none border-white/10 bg-white/5 text-white hover:bg-white/10 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button 
            className="py-8 rounded-none bg-kenya-green text-white font-bold hover:bg-kenya-green/90 text-[11px] uppercase tracking-widest transition-all"
          >
            Module Done <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="h-full w-full bg-kenya-black flex flex-col p-6 lg:p-16 max-w-4xl mx-auto overflow-y-auto no-scrollbar font-sans">
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-kenya-gold">
          <HelpCircle className="h-4 w-4" />
          Knowledge Check
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          Question {currentIdx + 1} / {questions.length}
        </div>
      </div>

      <div className="flex-1">
        <motion.h2
          key={currentIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-bold leading-tight text-white mb-16 tracking-tight"
        >
          {question.q}
        </motion.h2>

        <div className="grid gap-4">
          {question.opts.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isActuallyCorrect = idx === question.correct;
            
            let btnBg = "bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/[0.04] hover:border-white/20";
            if (showFeedback) {
              if (isActuallyCorrect) btnBg = "bg-kenya-green/10 border-kenya-green text-kenya-green";
              else if (isSelected) btnBg = "bg-kenya-red/10 border-kenya-red text-kenya-red";
              else btnBg = "bg-white/[0.01] border-white/5 text-white/10 opacity-40";
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
                  "relative w-full p-8 rounded-none border-2 text-left text-base transition-all duration-350 flex items-center justify-between group",
                  btnBg
                )}
              >
                <div className="flex items-center gap-8">
                   <div className={cn(
                     "h-10 w-10 rounded-none border-t-2 border-r-2 flex items-center justify-center text-[10px] font-bold transition-colors shadow-inner",
                     isSelected ? "bg-currentColor" : "bg-white/5 border-white/10 text-white/20"
                   )}>
                      {String.fromCharCode(65 + idx)}
                   </div>
                   <span className="font-bold text-lg tracking-tight">{opt}</span>
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
            className="mt-16 p-10 rounded-none bg-white/[0.03] border-l-4 border-l-white/20 flex flex-col md:flex-row items-center gap-10"
          >
            <div className={cn(
              "h-16 w-16 rounded-none flex items-center justify-center border",
              isCorrect ? "bg-kenya-green/10 text-kenya-green border-kenya-green/20" : "bg-kenya-red/10 text-kenya-red border-kenya-red/20"
            )}>
               <Lightbulb className="h-8 w-8" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <p className={cn(
                "text-[10px] font-bold uppercase tracking-[0.4em] mb-2",
                isCorrect ? "text-kenya-green" : "text-kenya-red"
              )}>
                {isCorrect ? 'Correct Analysis' : 'Correction Required'}
              </p>
              <p className="text-xl text-white/80 leading-tight font-bold tracking-tight italic">
                {isCorrect ? question.fb?.c : question.fb?.w}
              </p>
            </div>

            <Button 
               onClick={nextQuestion}
               className="bg-white text-black hover:bg-white/90 rounded-none px-12 py-8 uppercase font-bold text-[11px] tracking-[0.2em] whitespace-nowrap transition-all active:scale-95"
            >
               {currentIdx < questions.length - 1 ? 'Next' : 'Finish'}
               <ArrowRight className="h-4 w-4 ml-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPane;