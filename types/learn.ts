/**
 * Learning Platform Type Definitions
 * Centralized TypeScript interfaces for the entire learning system
 */

// ============================================================================
// CONTENT TYPES & ENUMS
// ============================================================================

export type ContentType = 'stories' | 'learn' | 'videos' | 'quiz';
export type LevelType = 'basic' | 'advanced' | 'expert';
export type StoryType = 'cover' | 'bullets' | 'pillars' | 'tiles' | 'risks' | 'quiz' | 'cta';
export type StatusType = 'new' | 'progress' | 'done';

// ============================================================================
// MODULE
// ============================================================================

export interface TeacherInfo {
  name: string;
  role: string;
  avatar: string; // emoji or image path
}

export interface LearningModule {
  id: string; // e.g., 'bps-basic', 'bps-advanced'
  num: string; // '001', '002', '003'
  title: string;
  level: LevelType;
  credits: string; // Author attribution
  desc: string; // Short description
  duration: string; // e.g., '10 min', '25 min'
  
  // Content counts for badges
  slidesCount: number; // Stories
  lessonsCount: number; // Sections in lesson
  videosCount: number; // Videos in playlist
  quizCount: number; // Quiz questions
  
  // Category & styling
  category: string; // e.g., 'Budget Basics', 'Advanced'
  catColor: string; // Hex color
  catBg: string; // rgba color for background
  accentA: string; // Primary accent hex
  accentB: string; // Secondary accent hex
  
  teacher: TeacherInfo;
  types: ContentType[]; // What content types this module has
  
  // Optional metadata
  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================================================
// STORIES / SLIDES
// ============================================================================

export interface StorySlideBase {
  id: string;
  type: StoryType;
  bg: string; // Background color hex
  orb1: string; // Gradient orb 1 (rgba)
  orb2: string; // Gradient orb 2 (rgba)
}

export interface StoryCoverSlide extends StorySlideBase {
  type: 'cover';
  title: string;
  subtitle: string;
}

export interface StoryBulletsSlide extends StorySlideBase {
  type: 'bullets';
  title: string;
  bullets: string[];
}

export interface StoryPillarsSlide extends StorySlideBase {
  type: 'pillars';
  title: string;
  pillars: {
    icon: string; // emoji
    title: string;
    desc: string;
  }[];
}

export interface StoryTilesSlide extends StorySlideBase {
  type: 'tiles';
  title: string;
  tiles: {
    num: string;
    label: string;
    desc?: string;
  }[];
}

export interface StoryRisksSlide extends StorySlideBase {
  type: 'risks';
  title: string;
  risks: {
    num: string;
    text: string;
  }[];
}

export interface StoryQuizSlide extends StorySlideBase {
  type: 'quiz';
  quizIdx: number; // Index into STORY_QUIZ array
}

export interface StoryCTASlide extends StorySlideBase {
  type: 'cta';
  emoji: string;
  title: string;
  subtitle: string;
  buttons: {
    icon: string;
    title: string;
    subtitle?: string;
    type: 'primary' | 'ghost' | 'gold';
    action: string; // callback identifier
  }[];
}

export type StorySlide =
  | StoryCoverSlide
  | StoryBulletsSlide
  | StoryPillarsSlide
  | StoryTilesSlide
  | StoryRisksSlide
  | StoryQuizSlide
  | StoryCTASlide;

// ============================================================================
// QUIZ
// ============================================================================

export interface QuizQuestion {
  q: string; // Question text
  opts: string[]; // Answer options
  correct: number; // Index of correct answer (0-based)
  fb: {
    c: string; // Feedback for correct answer
    w: string; // Feedback for wrong answer
  };
}

// ============================================================================
// LESSON / SECTIONS
// ============================================================================

export type LessonContentType = 'text' | 'bullets' | 'image' | 'quote' | 'code' | 'title';

export interface LessonContent {
  type: LessonContentType;
  content: string; // Could be markdown, plain text, or reference to asset
  align?: 'left' | 'center' | 'right';
}

export interface LessonSection {
  id: string; // e.g., 's-intro', 's-beta', 's-numbers'
  title: string;
  label: string; // e.g., 'Section 1'
  content: LessonContent[];
}

// ============================================================================
// VIDEOS
// ============================================================================

export interface VideoItem {
  id: string; // Video ID in playlist
  title: string;
  url: string; // YouTube video URL or ID
  youtubeId?: string; // Optional YouTube video ID
  thumbnail?: string; // Optional thumbnail URL
  duration: string; // e.g., '8:24'
  views?: string; // e.g., '14.2K'
  desc: string; // Full description
  tag: string; // Tag/category
}

// ============================================================================
// USER PROGRESS
// ============================================================================

export interface UserProgress {
  id: string; // UUID
  userId: string; // From auth system
  moduleId: string; // Which module
  
  // Story progress
  currentSlide: number; // 0-based index
  completedSlides: number[]; // Indices of completed slides
  storyAnswers: {
    slideIdx: number;
    answer: number; // 0-based index of selected answer
  }[];
  
  // Video progress
  watchedVideos: {
    videoId: string;
    percentage: number; // 0-100
  }[];
  completedVideos?: string[]; // List of completed video IDs
  
  // Quiz progress
  quizAnswers: {
    questionIdx: number;
    selected: number; // 0-based index
  }[];
  quizScore: number; // Total correct answers
  quizAttempts: number;
  
  // Overall
  completed: boolean;
  progressPercent: number; // 0-100
  startedAt: Date;
  completedAt?: Date;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

// Learning Layout Props
export interface LearningLayoutProps {
  children: React.ReactNode;
}

// Hub Screen Props
export interface HubScreenProps {
  modules: LearningModule[];
  onModuleClick: (moduleId: string) => void;
  isLoading?: boolean;
}

// Module Screen Props
export interface ModuleScreenProps {
  module: LearningModule;
  progress: UserProgress | null;
  onBack: () => void;
}

// Sidebar Props
export interface ModuleSidebarProps {
  module: LearningModule;
  progress: UserProgress | null;
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
  onSectionScroll?: (sectionId: string) => void;
  activeSection?: string;
}

// Tab Bar Props
export interface TabBarProps {
  activeTab: ContentType;
  onTabChange: (tab: ContentType) => void;
  modules: LearningModule;
}

// Story Viewer Props
export interface StoryViewerProps {
  slides: StorySlide[];
  currentSlideIdx: number;
  onSlideChange: (idx: number) => void;
  onQuizAnswer?: (slideIdx: number, answer: number) => void;
  onComplete?: () => void;
}

// Lesson Pane Props
export interface LessonPaneProps {
  sections: LessonSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

// Video Player Props
export interface VideoPlayerProps {
  videos: VideoItem[];
  progress: UserProgress | null;
  onVideoWatched?: (videoId: string, percentage: number) => void;
}

// Quiz Pane Props
export interface QuizPaneProps {
  questions: QuizQuestion[];
  progress: UserProgress | null;
  onAnswerSubmit?: (questionIdx: number, answer: number) => void;
  onComplete?: (score: number) => void;
}

// ============================================================================
// UI COMPONENTS PROPS
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export interface BadgeProps {
  variant: 'basic' | 'advanced' | 'expert' | 'new' | 'progress' | 'done';
  children: React.ReactNode;
}

export interface CardProps {
  module: LearningModule;
  progress?: UserProgress;
  onClick: () => void;
  className?: string;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  animated?: boolean;
}

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiModulesResponse {
  modules: LearningModule[];
  total: number;
  page: number;
  pages: number;
}

export interface ApiModuleDetailResponse {
  module: LearningModule;
  stories: StorySlide[];
  videos: VideoItem[];
  sections: LessonSection[];
  quiz: QuizQuestion[];
  userProgress?: UserProgress;
}

export interface ApiProgressResponse {
  success: boolean;
  progress: UserProgress;
}

export interface ApiQuizResponse {
  isCorrect: boolean;
  feedback: string;
  score: number;
}

// ============================================================================
// THEME
// ============================================================================

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
