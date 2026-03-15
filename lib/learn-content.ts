export const LEARN_CHAPTERS = [
  { slug: "overview", title: "Course overview", short: "Overview", order: 1 },
  { slug: "bps-basics", title: "What is the BPS?", short: "BPS 101", order: 2 },
  { slug: "pillars", title: "BETA pillars", short: "Pillars", order: 3 },
  { slug: "numbers", title: "Numbers & risks", short: "Numbers", order: 4 },
  { slug: "quiz", title: "Quiz & reflect", short: "Challenge", order: 5 },
] as const;

export type LearnChapterSlug = (typeof LEARN_CHAPTERS)[number]["slug"];

export const QUIZ_QUESTIONS = [
  {
    question: "What is the main purpose of the Budget Policy Statement (BPS)?",
    options: [
      "To collect taxes from citizens",
      "To guide how national and county governments prepare their budgets",
      "To replace the national development plan",
      "To approve all government projects",
    ],
    correctIndex: 1,
  },
  {
    question: "By law, the BPS must be submitted to Parliament by:",
    options: ["January 1", "February 15", "March 30", "April 30"],
    correctIndex: 1,
  },
  {
    question: "Which agenda guides the 2026 BPS development priorities?",
    options: [
      "Vision 2030 Growth Plan",
      "Bottom-Up Economic Transformation Agenda (BETA)",
      "East African Development Strategy",
      "National Industrial Policy",
    ],
    correctIndex: 1,
  },
  {
    question: "When government spending exceeds revenue, the difference is called:",
    options: ["Fiscal surplus", "Fiscal deficit", "Monetary balance", "Public investment"],
    correctIndex: 1,
  },
  {
    question: "Interest on Kenya's public debt (~Ksh 1T) may lead to:",
    options: [
      "Reduced funds for development and social services",
      "Lower tax collection",
      "Faster economic growth",
      "Reduced public borrowing",
    ],
    correctIndex: 0,
  },
  {
    question: "KES 420B to county governments is mainly for:",
    options: [
      "Funding local development and public services",
      "Repaying domestic loans",
      "Supporting foreign investments",
      "Honouring the constitution",
    ],
    correctIndex: 0,
  },
  {
    question: "A major fiscal risk in the BPS is:",
    options: [
      "Rising public debt and interest payments",
      "Decreasing internet use",
      "Reduced population growth",
      "Lower rainfall every year",
    ],
    correctIndex: 0,
  },
] as const;

export const PILLARS = [
  { name: "Agricultural transformation", tag: "Food security · value chains" },
  { name: "Transforming MSMEs", tag: "Hustler Fund · 47 county hubs" },
  { name: "Healthcare", tag: "UHC · Social Health Authority ~35M" },
  { name: "Housing and Settlement", tag: "KMRC · urban renewal" },
  { name: "Digital & creative economy", tag: "Fibre · youth skills · film/music" },
  { name: "Enablers", tag: "Roads · energy · water · e-mobility" },
  { name: "National Infrastructure Fund", tag: "Sovereign wealth · long-term" },
] as const;

export const REFLECTION_PROMPTS = [
  {
    id: "first-reflection",
    title: "Your First Reflection",
    prompt:
      "How often did you think about how national budgets affect your daily life? What areas do government budgets influence most?",
  },
  {
    id: "pause-reflect",
    title: "Pause & Reflect",
    prompt:
      "If you were designing an economic strategy for Kenya, which sector would you prioritise first and why?",
  },
  {
    id: "citizens-lens",
    title: "Citizens' Lens",
    prompt:
      "Why should citizens understand government budgets even if they are not economists?",
  },
  {
    id: "final-challenge",
    title: "Final Budget Challenge",
    prompt:
      "Imagine Parliament asks for one key improvement before approving the BPS. Which area would you strengthen most and why?",
  },
] as const;

export const QUESTIONS_PER_PAGE = 2;
