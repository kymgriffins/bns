import type { ReactNode } from "react";

export type SlideType = "cover" | "concept" | "chapters" | "snapshot" | "pillars" | "risks" | "quiz" | "cta";

export type QuizFeedback = {
  correct: string;
  wrong: string;
};

export type QuizContent = {
  question: string;
  options: { letter: string; text: string }[];
  correct: number;
  feedback: QuizFeedback;
};

export type QuizState = {
  answered: boolean[];
  selectedIdx: (number | null)[];
};

export type SlideContent =
  | {
      tag: string;
      title: string;
      sub: string;
      promise: string;
    }
  | {
      tag: string;
      tagBg: string;
      tagColor: string;
      question: string;
      bullets: { dot: string; text: string }[];
      badge?: string;
    }
  | {
      headline: string;
      chapters: { num: string; label: string; name: string }[];
    }
  | {
      headline: string;
      divider1?: string;
      tiles1: { icon: string; val: string; label: string; accent?: string }[];
      debtNote?: string;
    }
  | {
      headline: string;
      sub: string;
      pillars: { emoji: string; title: string; desc: string; money: string }[];
    }
  | {
      headline: string;
      sub: string;
      risks: { icon: string; title: string; text: string }[];
      quote: string;
    }
  | QuizContent
  | {
      title: string;
      sub: string;
      actions: { icon: string; style: string; title: string; sub: string; onclickMsg: string }[];
    };

export type StorySlide = {
  id: string;
  type: SlideType;
  bg: string;
  orbA?: string;
  orbB?: string;
  content: SlideContent;
  quizIdx?: number;
};

export type ModuleMetadata = {
  id: string;
  num: string;
  title: string;
  description: string;
  category: string;
  credits: string[];
  accentA: string;
  accentB: string;
  teacher: {
    name: string;
    role: string;
    avatar: string;
  };
  structure: {
    basic?: {
      title: string;
      description: string;
      duration: string;
      level: "basic";
      slides: number;
    };
    advanced?: {
      title: string;
      description: string;
      duration: string;
      level: "advanced";
      slides: number;
    };
    stories?: {
      basicCount: number;
      description: string;
    };
  };
  tags: string[];
  isLocked: boolean;
};

export type ModuleSlides = {
  id: string;
  moduleId: string;
  level: "basic" | "advanced" | "stories";
  title: string;
  slides: StorySlide[];
};

export type HubModule = {
  id: string;
  num: string;
  title: string;
  level: "basic" | "advanced";
  desc: string;
  duration: string;
  slidesCount: number;
  lessonsCount: number;
  videosCount: number;
  quizCount: number;
  category: string;
  catColor: string;
  catBg: string;
  accentA: string;
  accentB: string;
  teacher: {
    name: string;
    role: string;
    avatar: string;
  };
  types: ("stories" | "learn" | "videos" | "quiz")[];
  locked?: boolean;
};

/**
 * Load module metadata
 */
export async function loadModuleMetadata(moduleId: string): Promise<ModuleMetadata | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/data/modules/${moduleId}/metadata.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    console.error(`Failed to load metadata for module ${moduleId}`);
    return null;
  }
}

/**
 * Load slides for a specific level (basic, advanced, or stories)
 */
export async function loadModuleSlides(
  moduleId: string,
  level: "basic" | "advanced" | "stories"
): Promise<StorySlide[] | null> {
  try {
    const fileName = `slides-${level}.json`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/data/modules/${moduleId}/${fileName}`);
    if (!response.ok) return null;
    const data: ModuleSlides = await response.json();
    return data.slides;
  } catch {
    console.error(`Failed to load ${level} slides for module ${moduleId}`);
    return null;
  }
}

/**
 * Load all available modules
 */
export async function loadAllModules(): Promise<ModuleMetadata[]> {
  try {
    // This would need to be a dynamic endpoint that lists all modules
    // For now, we'll return a hardcoded list that gets loaded from individual metadata files
    const moduleIds = ["bps-2026"];
    const modules: ModuleMetadata[] = [];

    for (const id of moduleIds) {
      const metadata = await loadModuleMetadata(id);
      if (metadata) modules.push(metadata);
    }

    return modules;
  } catch {
    console.error("Failed to load all modules");
    return [];
  }
}

/**
 * Convert module metadata to hub module format
 */
export function convertToHubModule(metadata: ModuleMetadata, level: "basic" | "advanced"): HubModule | null {
  const levelData = level === "basic" ? metadata.structure.basic : metadata.structure.advanced;

  if (!levelData) return null;

  return {
    id: level === "basic" ? metadata.id : `${metadata.id}-advanced`,
    num: metadata.num,
    title: levelData.title,
    level,
    desc: levelData.description,
    duration: levelData.duration,
    slidesCount: levelData.slides,
    lessonsCount: levelData.slides || 0,
    videosCount: 0,
    quizCount: 0,
    category: metadata.category,
    catColor: metadata.accentA,
    catBg: `rgba(${hexToRgb(metadata.accentA)?.join(",")},0.12)`,
    accentA: metadata.accentA,
    accentB: metadata.accentB,
    teacher: metadata.teacher,
    types: ["stories", "learn", "quiz"],
    locked: metadata.isLocked,
  };
}

/**
 * Helper to convert hex to RGB
 */
function hexToRgb(hex: string): number[] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}
