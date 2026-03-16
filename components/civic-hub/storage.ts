import type {
  CivicHubProgress,
  CivicHubQuizResults,
  CivicHubSeed,
  CivicHubTheme,
} from "./types";

const LS_KEYS = {
  progress: "civichub_progress",
  quiz: "civichub_quiz",
  theme: "civichub_theme",
  teachers: "civichub_teachers",
  modules: "civichub_modules",
} as const;

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadProgress(): CivicHubProgress {
  return safeJsonParse<CivicHubProgress>(localStorage.getItem(LS_KEYS.progress)) ?? {};
}

export function saveProgress(progress: CivicHubProgress) {
  localStorage.setItem(LS_KEYS.progress, JSON.stringify(progress));
}

export function loadQuizResults(): CivicHubQuizResults {
  return safeJsonParse<CivicHubQuizResults>(localStorage.getItem(LS_KEYS.quiz)) ?? {};
}

export function saveQuizResults(results: CivicHubQuizResults) {
  localStorage.setItem(LS_KEYS.quiz, JSON.stringify(results));
}

export function loadTheme(): CivicHubTheme | null {
  const v = localStorage.getItem(LS_KEYS.theme);
  if (v === "dark" || v === "light") return v;
  return null;
}

export function saveTheme(theme: CivicHubTheme) {
  localStorage.setItem(LS_KEYS.theme, theme);
}

export function loadTeacherOverrides() {
  return safeJsonParse<CivicHubSeed["teachers"]>(localStorage.getItem(LS_KEYS.teachers));
}

export function loadModuleOverrides() {
  return safeJsonParse<CivicHubSeed["modules"]>(localStorage.getItem(LS_KEYS.modules));
}

export function saveTeacherOverrides(teachers: CivicHubSeed["teachers"]) {
  localStorage.setItem(LS_KEYS.teachers, JSON.stringify(teachers));
}

export function saveModuleOverrides(modules: CivicHubSeed["modules"]) {
  localStorage.setItem(LS_KEYS.modules, JSON.stringify(modules));
}

export function clearTeacherOverrides() {
  localStorage.removeItem(LS_KEYS.teachers);
}

export function clearModuleOverrides() {
  localStorage.removeItem(LS_KEYS.modules);
}

export function clearAllCivicHubStorage() {
  Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
}

