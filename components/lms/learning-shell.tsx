'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronRight, 
  BookOpen, 
  Trophy,
  Clock,
  Settings,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import type { 
  LearningModule, 
  LearningProgress, 
  Phase,
  ContentSection 
} from './types';
import { PhaseIndicator } from './shared/PhaseIndicator';
import { IntroductionPhase } from './phases/introduction/IntroductionPhase';
import { ContentPhase } from './phases/content/ContentPhase';
import { KnowledgeCheckPhase } from './phases/knowledge-check/KnowledgeCheckPhase';
import { CallToActionPhase } from './phases/call-to-action/CallToActionPhase';

// =============================================================================
// Context
// =============================================================================

interface LMSContextType {
  module: LearningModule;
  progress: LearningProgress;
  currentPhase: Phase;
  currentSection: number;
  setCurrentPhase: (phase: Phase) => void;
  setCurrentSection: (section: number) => void;
  updateProgress: (updates: Partial<LearningProgress>) => void;
  markSectionComplete: (sectionId: string) => void;
  completePhase: (phase: Phase) => void;
}

const LMSContext = createContext<LMSContextType | null>(null);

export const useLMS = () => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within a LearningShell');
  }
  return context;
};

// =============================================================================
// Component Props
// =============================================================================

interface LearningShellProps {
  module: LearningModule;
  initialProgress?: Partial<LearningProgress>;
  onProgressUpdate?: (progress: LearningProgress) => void;
  onComplete?: () => void;
  children?: React.ReactNode;
}

// =============================================================================
// Default Progress
// =============================================================================

const createDefaultProgress = (moduleId: string, userId: string): LearningProgress => ({
  id: `progress-${moduleId}`,
  user_id: userId,
  module_id: moduleId,
  phase_1_complete: false,
  phase_2_progress: 0,
  phase_2_sections_complete: [],
  phase_3_answers: {},
  phase_3_score: 0,
  phase_4_complete: false,
  time_spent_seconds: 0,
  started_at: new Date().toISOString(),
  last_activity_at: new Date().toISOString(),
  interactions: [],
  overall_progress: 0,
  current_phase: 1,
});

// =============================================================================
// Main Component
// =============================================================================

export function LearningShell({
  module,
  initialProgress,
  onProgressUpdate,
  onComplete,
}: LearningShellProps) {
  const [currentPhase, setCurrentPhase] = useState<Phase>(1);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState<LearningProgress>(
    initialProgress 
      ? { ...createDefaultProgress(module.id, 'current-user'), ...initialProgress }
      : createDefaultProgress(module.id, 'current-user')
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate overall progress
  const calculateOverallProgress = (): number => {
    const phaseWeight = { 1: 10, 2: 60, 3: 15, 4: 15 };
    let total = 0;
    
    if (progress.phase_1_complete) total += phaseWeight[1];
    else if (currentPhase === 1) total += 5;
    
    total += (progress.phase_2_progress / 100) * phaseWeight[2];
    
    if (currentPhase >= 3) {
      total += phaseWeight[3];
      if (progress.phase_4_complete) total += phaseWeight[4];
    }
    
    return Math.min(total, 100);
  };

  // Handle phase completion
  const completePhase = (phase: Phase) => {
    const updates: Partial<LearningProgress> = {
      last_activity_at: new Date().toISOString(),
    };
    
    switch (phase) {
      case 1:
        updates.phase_1_complete = true;
        break;
      case 3:
        updates.phase_3_score = calculateQuizScore();
        break;
      case 4:
        updates.phase_4_complete = true;
        updates.completed_at = new Date().toISOString();
        onComplete?.();
        break;
    }
    
    updateProgress(updates);
    
    // Move to next phase
    if (phase < 4) {
      setCurrentPhase((phase + 1) as Phase);
    }
  };

  // Handle section completion in content phase
  const markSectionComplete = (sectionId: string) => {
    if (!progress.phase_2_sections_complete.includes(sectionId)) {
      const newSections = [...progress.phase_2_sections_complete, sectionId];
      const newProgress = (newSections.length / module.content_sections.length) * 100;
      
      updateProgress({
        phase_2_sections_complete: newSections,
        phase_2_progress: newProgress,
      });
      
      // Check if quiz should trigger
      const nextSectionIndex = module.content_sections.findIndex(s => s.id === sectionId) + 1;
      if (module.quiz_interval && nextSectionIndex > 0 && nextSectionIndex % module.quiz_interval === 0) {
        setCurrentPhase(3);
      }
    }
  };

  // Update progress
  const updateProgress = (updates: Partial<LearningProgress>) => {
    const newProgress = { ...progress, ...updates };
    setProgress(newProgress);
    onProgressUpdate?.(newProgress);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`lms-progress-${module.id}`, JSON.stringify(newProgress));
    }
  };

  // Calculate quiz score
  const calculateQuizScore = () => {
    const questions = module.quiz_questions;
    const answers = progress.phase_3_answers;
    let correct = 0;
    
    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer?.is_correct) correct++;
    });
    
    return questions.length > 0 ? (correct / questions.length) * 100 : 0;
  };

  // Time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      updateProgress({
        time_spent_seconds: progress.time_spent_seconds + 1,
        last_activity_at: new Date().toISOString(),
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [progress.time_spent_seconds]);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`lms-progress-${module.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProgress({ ...progress, ...parsed });
          if (parsed.current_phase) {
            setCurrentPhase(parsed.current_phase);
          }
        } catch (e) {
          console.error('Failed to load progress:', e);
        }
      }
    }
  }, []);

  const contextValue: LMSContextType = {
    module,
    progress,
    currentPhase,
    currentSection,
    setCurrentPhase,
    setCurrentSection,
    updateProgress,
    markSectionComplete,
    completePhase,
  };

  return (
    <LMSContext.Provider value={contextValue}>
      <div className="lms-shell min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <ModuleSidebar 
                  module={module}
                  progress={progress}
                  currentPhase={currentPhase}
                  currentSection={currentSection}
                  onPhaseChange={setCurrentPhase}
                  onSectionChange={setCurrentSection}
                />
              </SheetContent>
            </Sheet>

            {/* Module title */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-semibold text-sm">{module.title}</h1>
                <p className="text-xs text-muted-foreground">Module {module.module_number}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {Math.floor(progress.time_spent_seconds / 60)}m
                </span>
              </div>
              <div className="w-32">
                <Progress value={calculateOverallProgress()} className="h-2" />
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {Math.round(calculateOverallProgress())}%
                </span>
              </div>
            </div>
          </div>

          {/* Phase indicator */}
          <div className="hidden lg:block border-t bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 py-2">
              <PhaseIndicator 
                currentPhase={currentPhase}
                phases={[
                  { number: 1, label: 'Introduction', icon: '🚀' },
                  { number: 2, label: 'Learn', icon: '📚' },
                  { number: 3, label: 'Quiz', icon: '🎯' },
                  { number: 4, label: 'Action', icon: '⚡' },
                ]}
                onPhaseChange={setCurrentPhase}
              />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 border-r bg-background/50 min-h-[calc(100vh-8rem)] sticky top-32">
            <ScrollArea className="h-full">
              <ModuleSidebar 
                module={module}
                progress={progress}
                currentPhase={currentPhase}
                currentSection={currentSection}
                onPhaseChange={setCurrentPhase}
                onSectionChange={setCurrentSection}
              />
            </ScrollArea>
          </aside>

          {/* Content area */}
          <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentPhase === 1 && (
                  <IntroductionPhase 
                    module={module}
                    onComplete={() => completePhase(1)}
                  />
                )}
                {currentPhase === 2 && (
                  <ContentPhase 
                    sections={module.content_sections}
                    currentSection={currentSection}
                    onSectionChange={setCurrentSection}
                    onComplete={() => completePhase(2)}
                  />
                )}
                {currentPhase === 3 && (
                  <KnowledgeCheckPhase 
                    questions={module.quiz_questions}
                    onComplete={(results) => {
                      updateProgress({
                        phase_3_answers: Object.fromEntries(
                          results.answers.map(a => [a.question_id, a])
                        ),
                        phase_3_score: results.score_percentage,
                      });
                      completePhase(3);
                    }}
                  />
                )}
                {currentPhase === 4 && (
                  <CallToActionPhase 
                    module={module}
                    progress={progress}
                    onComplete={() => completePhase(4)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </LMSContext.Provider>
  );
}

// =============================================================================
// Module Sidebar Component
// =============================================================================

interface ModuleSidebarProps {
  module: LearningModule;
  progress: LearningProgress;
  currentPhase: Phase;
  currentSection: number;
  onPhaseChange: (phase: Phase) => void;
  onSectionChange: (section: number) => void;
}

function ModuleSidebar({
  module,
  progress,
  currentPhase,
  currentSection,
  onPhaseChange,
  onSectionChange,
}: ModuleSidebarProps) {
  const phaseProgress = {
    1: progress.phase_1_complete ? 100 : 0,
    2: progress.phase_2_progress,
    3: Object.keys(progress.phase_3_answers).length > 0 ? 100 : 0,
    4: progress.phase_4_complete ? 100 : 0,
  };

  return (
    <div className="p-4 space-y-6">
      {/* Phase 1: Introduction */}
      <div className="space-y-2">
        <button
          onClick={() => onPhaseChange(1)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
            currentPhase === 1 ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🚀</span>
            <span className="font-medium text-sm">Introduction</span>
          </div>
          {progress.phase_1_complete && <Trophy className="h-4 w-4 text-yellow-500" />}
        </button>
        <Progress value={phaseProgress[1]} className="h-1" />
      </div>

      {/* Phase 2: Content Sections */}
      <div className="space-y-2">
        <button
          onClick={() => onPhaseChange(2)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
            currentPhase === 2 ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📚</span>
            <span className="font-medium text-sm">Content</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.round(phaseProgress[2])}%
          </span>
        </button>
        
        {currentPhase === 2 && (
          <div className="ml-4 space-y-1">
            {module.content_sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(idx)}
                className={`w-full flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                  currentSection === idx 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-secondary text-muted-foreground'
                }`}
              >
                {progress.phase_2_sections_complete.includes(section.id) ? (
                  <Trophy className="h-3 w-3 text-yellow-500" />
                ) : (
                  <span className="h-3 w-3 rounded-full border" />
                )}
                <span className="truncate">{section.title}</span>
              </button>
            ))}
          </div>
        )}
        <Progress value={phaseProgress[2]} className="h-1" />
      </div>

      {/* Phase 3: Quiz */}
      <div className="space-y-2">
        <button
          onClick={() => onPhaseChange(3)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
            currentPhase === 3 ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🎯</span>
            <span className="font-medium text-sm">Knowledge Check</span>
          </div>
          {phaseProgress[3] === 100 && <Trophy className="h-4 w-4 text-yellow-500" />}
        </button>
        <Progress value={phaseProgress[3]} className="h-1" />
      </div>

      {/* Phase 4: Action */}
      <div className="space-y-2">
        <button
          onClick={() => onPhaseChange(4)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
            currentPhase === 4 ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">⚡</span>
            <span className="font-medium text-sm">Take Action</span>
          </div>
          {progress.phase_4_complete && <Trophy className="h-4 w-4 text-yellow-500" />}
        </button>
        <Progress value={phaseProgress[4]} className="h-1" />
      </div>
    </div>
  );
}

export default LearningShell;
