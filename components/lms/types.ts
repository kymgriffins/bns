/**
 * LMS Module Types
 * TypeScript interfaces for the Learning Management System
 */

// =============================================================================
// Core Types
// =============================================================================

export type Phase = 1 | 2 | 3 | 4;

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  module_number: string;
  estimated_duration_minutes: number;
  
  // Phase 1: Introduction
  hook_story: string;
  learning_objectives: string[];
  
  // Phase 2: Content
  content_sections: ContentSection[];
  pdf_content?: ProtectedPDFContent;
  videos?: VideoContent[];
  interactive_elements?: InteractiveElement[];
  
  // Phase 3: Knowledge Check
  quiz_questions: QuizQuestion[];
  quiz_interval: number;
  
  // Phase 4: Call to Action
  next_module_id?: string;
  downloadable_resources?: ProtectedResource[];
  assignments?: Assignment[];
  
  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  tags: string[];
  
  // Avatar
  avatar_config?: AvatarConfig;
  
  created_at: string;
  updated_at: string;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  module_id: string;
  
  // Phase progress
  phase_1_complete: boolean;
  phase_2_progress: number;
  phase_2_sections_complete: string[];
  phase_3_answers: Record<string, QuizAnswer>;
  phase_3_score: number;
  phase_4_complete: boolean;
  
  // Time tracking
  time_spent_seconds: number;
  started_at: string;
  last_activity_at: string;
  completed_at?: string;
  
  // Engagement metrics
  interactions: InteractionLog[];
  
  // Computed
  overall_progress: number;
  current_phase: Phase;
}

// =============================================================================
// Content Types
// =============================================================================

export interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'pdf' | 'video' | 'interactive' | 'timeline';
  order: number;
  content: TextContent | PDFContent | VideoContent | InteractiveContent;
  duration_estimate: number;
  quiz_trigger?: string;
}

export interface TextContent {
  type: 'text';
  html: string;
  reveal_sections?: RevealSection[];
}

export interface RevealSection {
  id: string;
  trigger: 'click' | 'scroll';
  content: string;
}

export interface PDFContent {
  type: 'pdf';
  url: string;
  pages: number;
  protected: boolean;
}

export interface VideoContent {
  type: 'video';
  url: string;
  thumbnail?: string;
  duration: number;
  transcript?: string;
}

export interface InteractiveContent {
  type: 'interactive';
  component: 'drag-drop' | 'timeline' | 'hotspot' | 'calculator';
  config: Record<string, unknown>;
}

export interface ProtectedPDFContent {
  pdf_id: string;
  total_pages: number;
  default_page: number;
}

// =============================================================================
// Quiz Types
// =============================================================================

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching' | 'scenario' | 'hotspot';
  question: string;
  media?: MediaContent;
  options?: QuizOption[];
  correct_answer: string | string[];
  explanation: string;
  points: number;
  order: number;
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  is_correct?: boolean;
}

export interface QuizAnswer {
  question_id: string;
  selected_answer: string | string[];
  is_correct: boolean;
  time_taken_seconds: number;
  answered_at: string;
}

export interface QuizResult {
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  answers: QuizAnswer[];
  passed: boolean;
  time_taken_seconds: number;
}

// =============================================================================
// Interactive Element Types
// =============================================================================

export interface InteractiveElement {
  id: string;
  type: 'click-reveal' | 'drag-drop' | 'scroll-trigger' | 'quiz' | 'branching';
  config: Record<string, unknown>;
}

export interface DragDropItem {
  id: string;
  content: string;
  category?: string;
  image_url?: string;
}

export interface DropZone {
  id: string;
  label: string;
  accept_categories: string[];
}

export interface BranchingScenario {
  id: string;
  title: string;
  introduction: string;
  decision_points: DecisionPoint[];
  paths: ScenarioPath[];
}

export interface DecisionPoint {
  id: string;
  situation: string;
  options: DecisionOption[];
  next_point_id: string | ((choice: string) => string);
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  feedback?: string;
}

export interface ScenarioPath {
  path_id: string;
  decision_point_id: string;
  choice_id: string;
  next_point_id: string;
}

export interface ScenarioOutcome {
  id: string;
  title: string;
  description: string;
  metrics_affected: Record<string, number>;
}

// =============================================================================
// Avatar Types
// =============================================================================

export interface AvatarConfig {
  character_id: string;
  voice_id?: string;
  style: 'formal' | 'casual' | 'storytelling';
  language: 'en' | 'sw';
  position: 'left' | 'right' | 'center';
}

export interface AvatarState {
  current_action: AvatarAction;
  expression: AvatarExpression;
  position: 'left' | 'right' | 'center';
  is_speaking: boolean;
  current_phrase?: string;
  visible: boolean;
}

export type AvatarAction = 
  | 'idle'
  | 'explaining'
  | 'pointing'
  | 'questioning'
  | 'celebrating'
  | 'reading'
  | 'welcoming'
  | 'concluding';

export type AvatarExpression = 
  | 'neutral'
  | 'happy'
  | 'thoughtful'
  | 'excited'
  | 'curious'
  | 'encouraging';

// =============================================================================
// CTA Types
// =============================================================================

export interface ModuleRecommendation {
  module_id: string;
  title: string;
  description: string;
  reason: string;
  estimated_duration: number;
  thumbnail_url?: string;
}

export interface ProtectedResource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'worksheet' | 'checklist' | 'template';
  url: string;
  protected: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'reflection' | 'application' | 'community' | 'quiz';
  due_date?: string;
  submission_type: 'text' | 'file' | 'quiz';
}

// =============================================================================
// Progress Types
// =============================================================================

export interface PhaseProgress {
  phase: Phase;
  progress: number;
  complete: boolean;
}

export interface InteractionLog {
  type: 'click' | 'hover' | 'drag' | 'quiz-answer' | 'branch-choice' | 'video_play' | 'scroll';
  element_id: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked_at?: string;
}

// =============================================================================
// Media Types
// =============================================================================

export interface MediaContent {
  type: 'image' | 'video' | 'audio';
  url: string;
  alt?: string;
  caption?: string;
}
