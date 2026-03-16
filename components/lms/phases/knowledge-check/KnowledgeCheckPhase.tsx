'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Trophy,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Clock,
  Target,
  Award,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { QuizQuestion, QuizAnswer, QuizResult } from '../../types';

interface KnowledgeCheckPhaseProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult) => void;
  showFeedback?: 'immediate' | 'deferred';
  passingScore?: number;
}

export function KnowledgeCheckPhase({
  questions,
  onComplete,
  showFeedback = 'immediate',
  passingScore = 70,
}: KnowledgeCheckPhaseProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<string, QuizAnswer>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Reset question timer when moving to new question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === question.correct_answer || 
      (Array.isArray(question.correct_answer) && question.correct_answer.includes(answer));

    const quizAnswer: QuizAnswer = {
      question_id: question.id,
      selected_answer: answer,
      is_correct: isCorrect,
      time_taken_seconds: Math.floor((Date.now() - questionStartTime) / 1000),
      answered_at: new Date().toISOString(),
    };

    setAnswers(prev => {
      const newMap = new Map(prev);
      newMap.set(question.id, quizAnswer);
      return newMap;
    });

    // Immediate feedback
    if (showFeedback === 'immediate') {
      // Auto-advance after delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          finishQuiz();
        }
      }, 1500);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    const result = calculateResults();
    setShowResults(true);
    onComplete(result);
  };

  const calculateResults = (): QuizResult => {
    let correct = 0;
    const finalAnswers: QuizAnswer[] = [];

    questions.forEach(q => {
      const answer = answers.get(q.id);
      if (answer?.is_correct) {
        correct++;
      }
      finalAnswers.push(answer || {
        question_id: q.id,
        selected_answer: '',
        is_correct: false,
        time_taken_seconds: 0,
        answered_at: '',
      });
    });

    return {
      total_questions: questions.length,
      correct_answers: correct,
      score_percentage: Math.round((correct / questions.length) * 100),
      answers: finalAnswers,
      passed: (correct / questions.length) * 100 >= passingScore,
      time_taken_seconds: Math.floor((Date.now() - startTime) / 1000),
    };
  };

  const resetQuiz = () => {
    setAnswers(new Map());
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const currentAnswer = answers.get(question?.id);

  // Results view
  if (showResults) {
    const result = calculateResults();
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        {/* Results card */}
        <Card className={`text-center overflow-hidden ${
          result.passed 
            ? 'border-green-500 bg-gradient-to-b from-green-50 to-green-100/50' 
            : 'border-yellow-500 bg-gradient-to-b from-yellow-50 to-yellow-100/50'
        }`}>
          <CardContent className="p-8">
            {/* Trophy/Star icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                result.passed ? 'bg-green-100' : 'bg-yellow-100'
              }`}
            >
              {result.passed ? (
                <Trophy className="h-12 w-12 text-green-600" />
              ) : (
                <Star className="h-12 w-12 text-yellow-600" />
              )}
            </motion.div>

            {/* Score */}
            <h2 className="text-3xl font-bold mb-2">
              {result.passed ? 'Great Job!' : 'Keep Learning!'}
            </h2>
            <p className="text-6xl font-bold text-primary mb-2">
              {result.score_percentage}%
            </p>
            <p className="text-muted-foreground mb-6">
              You got {result.correct_answers} out of {result.total_questions} questions correct
            </p>

            {/* Time taken */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock className="h-4 w-4" />
              <span>Completed in {Math.floor(result.time_taken_seconds / 60)}m {result.time_taken_seconds % 60}s</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              {!result.passed && (
                <Button onClick={() => setShowResults(false)}>
                  Review Answers
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Answer review */}
        <div className="space-y-4">
          <h3 className="font-semibold">Review Your Answers</h3>
          {questions.map((q, idx) => {
            const answer = answers.get(q.id);
            return (
              <Card key={q.id} className={answer?.is_correct ? 'border-green-200' : 'border-red-200'}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {answer?.is_correct ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-1">Question {idx + 1}</p>
                      <p className="text-sm text-muted-foreground mb-2">{q.question}</p>
                      {answer && (
                        <p className="text-sm">
                          Your answer: <span className={answer.is_correct ? 'text-green-600' : 'text-red-600'}>
                            {answer.selected_answer}
                          </span>
                        </p>
                      )}
                      {!answer?.is_correct && (
                        <p className="text-sm text-green-600">
                          Correct answer: {q.correct_answer}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>
    );
  }

  // Question view
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="outline">
                  {question.points} points
                </Badge>
                {currentAnswer && showFeedback === 'immediate' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {currentAnswer.is_correct ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Correct!
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500">
                        <XCircle className="h-3 w-3 mr-1" />
                        Incorrect
                      </Badge>
                    )}
                  </motion.div>
                )}
              </div>
              <CardTitle className="text-xl mt-4">
                {question.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {question.options?.map((option, idx) => {
                const isSelected = currentAnswer?.selected_answer === option.value;
                const isCorrect = option.value === question.correct_answer;
                const showCorrectness = showFeedback === 'immediate' && currentAnswer;

                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => !currentAnswer && handleAnswer(option.value)}
                    disabled={!!currentAnswer}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all
                      ${isSelected 
                        ? showCorrectness
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                      }
                      ${!currentAnswer ? 'cursor-pointer' : 'cursor-not-allowed'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{option.label}</span>
                      {showCorrectness && isCorrect && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                      )}
                      {showCorrectness && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </motion.button>
                );
              })}

              {/* Explanation */}
              <AnimatePresence>
                {showFeedback === 'immediate' && currentAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-primary/5 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Explanation</p>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {showFeedback === 'deferred' ? (
          <Button onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          currentAnswer && (
            <Button onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default KnowledgeCheckPhase;
