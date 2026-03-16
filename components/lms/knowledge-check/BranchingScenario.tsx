'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCcw,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BranchingScenario as BranchingScenarioType, DecisionPoint, ScenarioOutcome } from '../types';

interface BranchingScenarioProps {
  scenario: BranchingScenarioType;
  onComplete: (outcome: ScenarioOutcome) => void;
}

export function BranchingScenario({
  scenario,
  onComplete,
}: BranchingScenarioProps) {
  const [currentPointId, setCurrentPointId] = useState(scenario.decision_points[0]?.id);
  const [history, setHistory] = useState<string[]>([]);
  const [choices, setChoices] = useState<Map<string, string>>(new Map());
  const [showFeedback, setShowFeedback] = useState(false);

  const currentPoint = scenario.decision_points.find(dp => dp.id === currentPointId);
  const isComplete = !currentPoint || currentPointId === 'complete';
  const outcome = scenario.paths.find(p => p.path_id === choices.get(history[history.length - 1]))?.path_id;

  // Calculate outcome based on choices
  const calculateOutcome = (): ScenarioOutcome => {
    // Simple scoring - count certain types of choices
    const choiceCount = choices.size;
    const points = choiceCount * 10;
    
    return {
      id: 'outcome-1',
      title: 'Learning Complete',
      description: 'You have completed this scenario-based learning activity.',
      metrics_affected: {
        knowledge: points,
        engagement: choiceCount,
      },
    };
  };

  const handleChoice = (choiceId: string, nextPointId: string) => {
    setChoices(prev => {
      const newMap = new Map(prev);
      newMap.set(currentPointId, choiceId);
      return newMap;
    });
    
    setHistory(prev => [...prev, currentPointId]);
    setShowFeedback(true);

    // Show feedback briefly, then move to next
    setTimeout(() => {
      setShowFeedback(false);
      if (nextPointId && nextPointId !== 'complete') {
        setCurrentPointId(nextPointId);
      } else {
        // Scenario complete
        const finalOutcome = calculateOutcome();
        onComplete(finalOutcome);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentPointId(scenario.decision_points[0]?.id);
    setHistory([]);
    setChoices(new Map());
    setShowFeedback(false);
  };

  // Get the previous choice for context
  const getPreviousChoice = () => {
    if (history.length === 0) return null;
    const prevPointId = history[history.length - 1];
    return choices.get(prevPointId);
  };

  if (!currentPoint) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Scenario Complete!</h3>
          <p className="text-muted-foreground mb-6">
            You've worked through all the scenarios. Great job!
          </p>
          <Button onClick={handleRestart}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-2">
          <MessageCircle className="h-3 w-3 mr-1" />
          Interactive Scenario
        </Badge>
        <h2 className="text-2xl font-bold">{scenario.title}</h2>
        <p className="text-muted-foreground mt-2">{scenario.introduction}</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2">
        {scenario.decision_points.map((point, idx) => {
          const isActive = point.id === currentPointId;
          const isPast = history.includes(point.id);
          
          return (
            <React.Fragment key={point.id}>
              <div
                className={`
                  h-3 w-3 rounded-full transition-all
                  ${isActive ? 'bg-primary scale-125' : isPast ? 'bg-green-500' : 'bg-secondary'}
                `}
              />
              {idx < scenario.decision_points.length - 1 && (
                <div className={`h-0.5 w-8 ${isPast ? 'bg-green-500' : 'bg-secondary'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Scenario Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPoint.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            {/* Story context */}
            <div className="bg-primary/5 p-4 border-b">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Situation</p>
                  <p className="font-medium">{currentPoint.situation}</p>
                </div>
              </div>
            </div>

            {/* Choices */}
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">What would you do?</h3>
              
              {currentPoint.options.map((option) => {
                const isSelected = showFeedback && choices.get(currentPointId) === option.id;
                const hasFeedback = showFeedback;
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => !hasFeedback && handleChoice(option.id, 
                      typeof currentPoint.next_point_id === 'function' 
                        ? currentPoint.next_point_id(option.id)
                        : currentPoint.next_point_id as string
                    )}
                    disabled={hasFeedback}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all
                      ${hasFeedback 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-primary cursor-pointer'
                      }
                    `}
                    whileHover={!hasFeedback ? { scale: 1.01 } : {}}
                    whileTap={!hasFeedback ? { scale: 0.99 } : {}}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'border-primary bg-primary' : 'border-border'}
                      `}>
                        {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                        
                        {/* Immediate feedback */}
                        <AnimatePresence>
                          {showFeedback && isSelected && option.feedback && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 p-3 bg-primary/10 rounded-lg"
                            >
                              <p className="text-sm">{option.feedback}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (history.length > 0) {
              const prevPoint = history[history.length - 1];
              setCurrentPointId(prevPoint);
              setHistory(prev => prev.slice(0, -1));
            }
          }}
          disabled={history.length === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button variant="ghost" onClick={handleRestart}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Restart
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// Interactive Quiz Component
// =============================================================================

interface InteractiveQuizProps {
  questions: Array<{
    id: string;
    question: string;
    options: Array<{ value: string; label: string }>;
    correctAnswer: string;
    explanation: string;
  }>;
  onComplete: (score: number) => void;
}

export function InteractiveQuiz({
  questions,
  onComplete,
}: InteractiveQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => new Map(prev).set(currentQuestion.id, value));
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
      
      // Calculate score
      let correct = 0;
      questions.forEach(q => {
        if (answers.get(q.id) === q.correctAnswer) correct++;
      });
      onComplete((correct / questions.length) * 100);
    }
  };

  if (isComplete) {
    const correct = questions.filter(q => answers.get(q.id) === q.correctAnswer).length;
    
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-4xl font-bold text-primary mb-4">
            {Math.round((correct / questions.length) * 100)}%
          </p>
          <p className="text-muted-foreground">
            You got {correct} out of {questions.length} questions correct.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = answers.get(currentQuestion.id) === option.value;
            const isCorrect = option.value === currentQuestion.correctAnswer;
            const showAsCorrect = showFeedback && isCorrect;
            const showAsWrong = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={option.value}
                onClick={() => !showFeedback && handleAnswer(option.value)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${showAsCorrect ? 'border-green-500 bg-green-50' : ''}
                  ${showAsWrong ? 'border-red-500 bg-red-50' : ''}
                  ${!showFeedback && isSelected ? 'border-primary bg-primary/10' : ''}
                  ${!showFeedback ? 'hover:border-primary/50' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {showAsCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {showAsWrong && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              </button>
            );
          })}

          {/* Explanation */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-primary/5 rounded-lg"
              >
                <p className="font-medium text-sm mb-1">Explanation</p>
                <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Next button */}
      {showFeedback && (
        <Button onClick={handleNext} className="w-full">
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
}

export default BranchingScenario;
