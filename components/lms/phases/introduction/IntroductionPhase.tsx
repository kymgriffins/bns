'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Target, 
  BookOpen, 
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { LearningModule } from '../../types';
import { TeacherAvatar } from '../../teacher-avatar/TeacherAvatar';

interface IntroductionPhaseProps {
  module: LearningModule;
  onComplete: () => void;
}

export function IntroductionPhase({ module, onComplete }: IntroductionPhaseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [objectivesRevealed, setObjectivesRevealed] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section with Teacher Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl -z-10" />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Module {module.module_number}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {module.difficulty}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {module.estimated_duration_minutes} min
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {module.title}
            </h1>

            {/* Hook Story */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 text-4xl">💡</div>
              <p className="text-lg text-muted-foreground pl-8 leading-relaxed">
                {module.hook_story}
              </p>
            </motion.div>

            {/* Learning Objectives - Click to reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => setObjectivesRevealed(!objectivesRevealed)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Target className="h-5 w-5" />
                <span className="font-semibold">What you'll learn</span>
                <motion.span
                  animate={{ rotate: objectivesRevealed ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ 
                  height: objectivesRevealed ? 'auto' : 0,
                  opacity: objectivesRevealed ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-3">
                  {module.learning_objectives.map((objective, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: objectivesRevealed ? 1 : 0, x: objectivesRevealed ? 0 : -10 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* Teacher Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:w-80"
          >
            <TeacherAvatar
              config={{
                character_id: 'teacher-1',
                style: 'storytelling',
                language: 'en',
                position: 'right',
              }}
              state={{
                current_action: 'welcoming',
                expression: 'happy',
                position: 'right',
                is_speaking: false,
                visible: true,
              }}
              message="Welcome! I'm excited to guide you through this learning journey."
            />
          </motion.div>
        </div>
      </motion.div>

      {/* What to Expect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          What to Expect
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {/* Phase 1 */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-blue-900">Introduction</h3>
              <p className="text-sm text-blue-700/70 mt-1">
                Hook story and learning objectives
              </p>
            </CardContent>
          </Card>

          {/* Phase 2 */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-green-900">Core Content</h3>
              <p className="text-sm text-green-700/70 mt-1">
                Interactive lessons with videos and activities
              </p>
            </CardContent>
          </Card>

          {/* Phase 3 */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-purple-900">Knowledge Check</h3>
              <p className="text-sm text-purple-700/70 mt-1">
                Test your understanding with quizzes
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Prerequisites */}
      {module.prerequisites && module.prerequisites.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Recommended Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {module.prerequisites.map((prereq, idx) => (
              <Badge key={idx} variant="outline">
                {prereq}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Progress indicator preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="bg-secondary/30 rounded-lg p-4"
      >
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Module Progress</span>
          <span className="font-medium">0%</span>
        </div>
        <Progress value={0} className="h-2" />
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ delay: 1.1 }}
        className="flex justify-center"
      >
        <Button 
          size="lg" 
          onClick={onComplete}
          className="text-lg px-8 py-6"
        >
          Start Learning
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}

export default IntroductionPhase;
