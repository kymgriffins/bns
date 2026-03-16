'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  FileText, 
  CheckCircle,
  Clock,
  BookOpen,
  Sparkles,
  Award,
  Share2,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { LearningModule, LearningProgress, ModuleRecommendation, ProtectedResource, Assignment } from '../../types';
import { TeacherAvatar } from '../../teacher-avatar/TeacherAvatar';

interface CallToActionPhaseProps {
  module: LearningModule;
  progress: LearningProgress;
  onComplete: () => void;
}

export function CallToActionPhase({
  module,
  progress,
  onComplete,
}: CallToActionPhaseProps) {
  const resources = module.downloadable_resources || [];
  const assignments = module.assignments || [];
  const nextModuleId = module.next_module_id;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Award className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
        <p className="text-muted-foreground">
          You've completed {module.title}. Here's what's next!
        </p>
      </motion.div>

      {/* Module Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.round(progress.phase_3_score)}%
                </div>
                <p className="text-sm text-muted-foreground">Quiz Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {progress.phase_2_sections_complete.length}
                </div>
                <p className="text-sm text-muted-foreground">Sections Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {Math.floor(progress.time_spent_seconds / 60)}m
                </div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Teacher Avatar Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <TeacherAvatar
          config={{
            character_id: 'teacher-1',
            style: 'storytelling',
            language: 'en',
            position: 'center',
          }}
          state={{
            current_action: 'celebrating',
            expression: 'happy',
            position: 'center',
            is_speaking: false,
            visible: true,
          }}
          message="Great work! You've taken an important step in understanding public finance. Now let's put this knowledge into action!"
        />
      </motion.div>

      {/* Next Module Recommendation */}
      {nextModuleId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Continue Your Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Next Module</h3>
                  <p className="text-sm text-muted-foreground">
                    Build on what you've learned with our next module
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/learn/${nextModuleId}`}>
                    Start Next Module
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Downloadable Resources */}
      {resources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    asChild
                  >
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Assignments */}
      {assignments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Practice Assignments
          </h2>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary">
                          {assignment.type}
                        </Badge>
                        {assignment.due_date && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Share & Certificate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-secondary/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold">Share Your Achievement</h3>
                <p className="text-sm text-muted-foreground">
                  Let others know about your learning progress
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Complete button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center pt-4"
      >
        <Button size="lg" onClick={onComplete}>
          <CheckCircle className="h-5 w-5 mr-2" />
          Complete Module
        </Button>
      </motion.div>
    </div>
  );
}

export default CallToActionPhase;
