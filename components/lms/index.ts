/**
 * LMS Module - Main Entry Point
 * Learning Management System for BudgetNdioStory
 */

export { LearningShell } from './learning-shell';
export { PhaseIndicator } from './shared/PhaseIndicator';
export { ProgressBar } from './progress/ProgressBar';
export { IntroductionPhase } from './phases/introduction/IntroductionPhase';
export { ContentPhase } from './phases/content/ContentPhase';
export { KnowledgeCheckPhase } from './phases/knowledge-check/KnowledgeCheckPhase';
export { CallToActionPhase } from './phases/call-to-action/CallToActionPhase';
export { TeacherAvatar } from './teacher-avatar/TeacherAvatar';
export { ClickReveal } from './interactive/ClickReveal';
export { DragDropActivity } from './interactive/DragDropActivity';
export { ScrollReveal } from './interactive/ScrollReveal';
export { ProtectedPDFViewer } from './content/ProtectedPDFViewer';
export { InteractiveQuiz } from './knowledge-check/InteractiveQuiz';
export { BranchingScenario } from './knowledge-check/BranchingScenario';
export { AchievementBadge } from './progress/AchievementBadge';

// Types
export type { 
  LearningModule, 
  LearningProgress, 
  Phase, 
  ContentSection, 
  QuizQuestion,
  ModuleRecommendation,
  ProtectedResource,
  Assignment
} from './types';
