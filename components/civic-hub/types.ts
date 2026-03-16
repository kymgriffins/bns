export type CivicHubTheme = "dark" | "light";

export type TeacherTone = "warm-mentor" | "sharp-analyst" | "inspiring-coach" | string;
export type TeacherFormality = "casual" | "professional" | string;

export interface CivicHubTeacher {
  id: string;
  name: string;
  role: string;
  avatar: string;
  accentColor: string;
  tone: TeacherTone;
  formality: TeacherFormality;
  signature: string;
  avoids: string[];
  signoffLine: string;
}

export type CivicHubCategory = "budget-basics" | "national" | "county" | "oversight" | "action" | string;
export type CivicHubModuleStatus = "published" | "draft" | "review" | "archived" | string;

export type CivicHubStepType = "intro" | "lesson" | "cta";

export interface TeacherLine {
  intro: string;
  text: string;
}

export interface HookBlock {
  headline: string;
  statTiles?: Array<{ value: string; label: string }>;
  outcomes?: string[];
}

export interface ContentKeyPointsBlock {
  blockType: "key-points";
  sectionTitle: string;
  points: Array<{ id: string; text: string }>;
  callout?: { label: string; text: string };
}

export interface ContentConceptCardsBlock {
  blockType: "concept-cards";
  sectionTitle: string;
  cards: Array<{ id: string; title: string; body: string; keyPoint?: string }>;
}

export interface ContentFrameworkBlock {
  blockType: "framework";
  sectionTitle: string;
  steps: Array<{ id: string; stepNumber: number; verb: string; description: string }>;
  resources?: Array<{ id: string; type: "article" | "video" | string; label: string }>;
}

export interface ContentEvidenceBlock {
  blockType: "evidence";
  source: string;
  sectionTitle: string;
  cards: Array<{
    id: string;
    title: string;
    body: string;
    keyFindingLabel: string;
    keyFinding: string;
  }>;
}

export type CivicHubContentBlock =
  | ContentKeyPointsBlock
  | ContentConceptCardsBlock
  | ContentFrameworkBlock
  | ContentEvidenceBlock;

export interface CivicHubQuiz {
  question: string;
  options: string[];
  correct: number;
  feedback: { correct: string; wrong: string };
}

export interface CivicHubStep {
  type: CivicHubStepType;
  id: string;
  label: string;
  title: string;
  teacherLine?: TeacherLine;
  hook?: HookBlock;
  content?: CivicHubContentBlock;
  callout?: { label: string; text: string };
  quiz?: CivicHubQuiz;
}

export interface CivicHubModule {
  id: string;
  slug: string;
  moduleNumber: number;
  title: string;
  category: CivicHubCategory;
  status: CivicHubModuleStatus;
  estimatedMinutes: number;
  accentA: string;
  accentB: string;
  badgeBg: string;
  badgeColor: string;
  badgeLabel: string;
  teacherId: string;
  steps: CivicHubStep[];
}

export interface CivicHubSeed {
  version: string;
  teachers: Record<string, CivicHubTeacher>;
  modules: CivicHubModule[];
}

export interface CivicHubProgressItem {
  stepIdx: number;
  completed: boolean;
}

export type CivicHubProgress = Record<string, CivicHubProgressItem>;

export interface CivicHubQuizResultsItem {
  stepId: string;
  selectedIdx: number;
  correct: boolean;
  at: number;
}

export type CivicHubQuizResults = Record<string, CivicHubQuizResultsItem>;

