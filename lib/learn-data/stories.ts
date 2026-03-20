/**
 * Story Slides Data for Module 002
 * Advanced: Reflecting on Kenya's 2026 Budget Policy Statement
 */

import type { StorySlide, QuizQuestion } from '@/types/learn';

// ============================================================================
// STORIES FOR MODULE 002
// ============================================================================

export const STORIES_002: StorySlide[] = [
  {
    id: 'cover',
    type: 'cover',
    bg: '#100D1A',
    orb1: 'rgba(159, 122, 234, 0.45)',
    orb2: 'rgba(245, 200, 66, 0.25)',
    title: 'Reflecting on Kenya\'s 2026 Budget Policy Statement',
    subtitle: 'Deeper insights into fiscal policy and government priorities',
  },

  {
    id: 'what-expect',
    type: 'bullets',
    bg: '#0D0D14',
    orb1: 'rgba(159, 122, 234, 0.3)',
    orb2: 'rgba(56, 178, 172, 0.15)',
    title: 'What to Expect',
    bullets: [
      'Deep dive into the 5 pillars of the BETA Agenda',
      'Understanding fiscal risks in the 2026 budget',
      'County-by-county budget allocations',
      'How to track government spending',
      'Your role in budget accountability',
    ],
  },

  {
    id: 'bps-definition',
    type: 'bullets',
    bg: '#041A18',
    orb1: 'rgba(56, 178, 172, 0.35)',
    orb2: 'rgba(245, 200, 66, 0.18)',
    title: 'What is the BPS?',
    bullets: [
      'A strategic guidance document submitted to Parliament',
      'Submitted by February 15th each year (constitutional requirement)',
      'Guides how governments prepare their detailed budgets',
      'Reflects national priorities and economic focus',
      'NOT the budget itself — that comes later',
    ],
  },

  {
    id: 'beta-explained',
    type: 'bullets',
    bg: '#0D0D14',
    orb1: 'rgba(245, 200, 66, 0.3)',
    orb2: 'rgba(229, 62, 62, 0.15)',
    title: 'The BETA Agenda',
    bullets: [
      'Bottom-Up Economic Transformation Agenda',
      '5 pillars to transform Kenya\'s economy',
      'Focus on MSMEs (micro, small, medium enterprises)',
      'Digital economy and technology',
      'Agricultural transformation',
    ],
  },

  {
    id: 'beta-pillars',
    type: 'pillars',
    bg: '#0A1A0A',
    orb1: 'rgba(72, 187, 120, 0.3)',
    orb2: 'rgba(56, 178, 172, 0.18)',
    title: 'The 5 BETA Pillars',
    pillars: [
      {
        icon: '🌾',
        title: 'Agriculture',
        desc: 'Transform farming into profitable business',
      },
      {
        icon: '🏪',
        title: 'MSMEs',
        desc: 'Support small businesses to grow',
      },
      {
        icon: '💻',
        title: 'Digital',
        desc: 'Build tech ecosystem and innovation',
      },
      {
        icon: '🔧',
        title: 'Manufacturing',
        desc: 'Develop local production capacity',
      },
    ],
  },

  {
    id: 'beta-pillars-2',
    type: 'pillars',
    bg: '#0A0A1A',
    orb1: 'rgba(159, 122, 234, 0.3)',
    orb2: 'rgba(245, 200, 66, 0.15)',
    title: 'Healthcare Focus',
    pillars: [
      {
        icon: '🏥',
        title: 'Healthcare',
        desc: 'Universal health coverage & quality care',
      },
      {
        icon: '🏠',
        title: 'Housing',
        desc: 'Affordable homes for all Kenyans',
      },
      {
        icon: '📚',
        title: 'Education',
        desc: 'Quality education for youth',
      },
      {
        icon: '⚡',
        title: 'Infrastructure',
        desc: 'Modern roads, ports, and energy',
      },
    ],
  },

  {
    id: 'numbers',
    type: 'tiles',
    bg: '#1A0A0A',
    orb1: 'rgba(229, 62, 62, 0.3)',
    orb2: 'rgba(245, 200, 66, 0.2)',
    title: 'Budget Numbers',
    tiles: [
      {
        num: '3.2T',
        label: 'Total Budget',
        desc: 'Trillion Kenyan Shillings allocated for 2026',
      },
      {
        num: '1.8T',
        label: 'Debt Service',
        desc: 'Going just to pay interest on loans',
      },
      {
        num: '47',
        label: 'Counties',
        desc: 'Receiving budget allocations',
      },
      {
        num: '800B',
        label: 'BETA Agenda',
        desc: 'Investment in economic transformation',
      },
    ],
  },

  {
    id: 'counties-alloc',
    type: 'tiles',
    bg: '#041A18',
    orb1: 'rgba(56, 178, 172, 0.35)',
    orb2: 'rgba(72, 187, 120, 0.18)',
    title: 'County Allocations',
    tiles: [
      {
        num: '1.0T',
        label: 'County Budgets',
        desc: 'Distributed to 47 counties for services',
      },
      {
        num: '35-45%',
        label: 'Revenue Share',
        desc: 'Percentage of national revenue to counties',
      },
      {
        num: '850B',
        label: 'Equitable Fund',
        desc: 'Based on population and needs',
      },
      {
        num: '400B',
        label: 'Performance Fund',
        desc: 'Tied to county government performance',
      },
    ],
  },

  {
    id: 'fiscal-risks',
    type: 'risks',
    bg: '#1A0808',
    orb1: 'rgba(229, 62, 62, 0.4)',
    orb2: 'rgba(245, 200, 66, 0.18)',
    title: 'Fiscal Risks to Monitor',
    risks: [
      {
        num: '1',
        text: 'Rising debt servicing costs eating into development spending',
      },
      {
        num: '2',
        text: 'Climate impacts could reduce tax revenues',
      },
      {
        num: '3',
        text: 'Currency fluctuations affecting borrowed money',
      },
      {
        num: '4',
        text: 'Potential delays in revenue collection',
      },
      {
        num: '5',
        text: 'County budget execution challenges',
      },
    ],
  },

  {
    id: 'quiz-1',
    type: 'quiz',
    bg: '#0D0D14',
    orb1: 'rgba(245, 200, 66, 0.28)',
    orb2: 'rgba(56, 178, 172, 0.12)',
    quizIdx: 0,
  },

  {
    id: 'quiz-2',
    type: 'quiz',
    bg: '#0D0D14',
    orb1: 'rgba(245, 200, 66, 0.25)',
    orb2: 'rgba(229, 62, 62, 0.12)',
    quizIdx: 1,
  },

  {
    id: 'cta',
    type: 'cta',
    bg: '#1A1200',
    orb1: 'rgba(245, 200, 66, 0.45)',
    orb2: 'rgba(56, 178, 172, 0.18)',
    emoji: '🎉',
    title: 'You\'ve Completed the <em>Learning Challenge!</em>',
    subtitle:
      'You have a solid grasp of Kenya\'s budget priorities and fiscal landscape. Share this knowledge with friends.',
    buttons: [
      {
        icon: '📲',
        title: 'Share Module',
        type: 'primary',
        action: 'share',
      },
      {
        icon: '🎓',
        title: 'Explore More Modules',
        type: 'ghost',
        action: 'explore',
      },
    ],
  },
];

// ============================================================================
// QUIZ QUESTIONS EMBEDDED IN STORIES
// ============================================================================

export const STORY_QUIZ_002: QuizQuestion[] = [
  {
    q: 'What is the main purpose of the Budget Policy Statement (BPS)?',
    opts: [
      'To collect taxes from citizens',
      'To guide how national and county governments prepare their budgets',
      'To replace the national development plan',
      'To approve all government projects',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! The BPS guides budget preparation — it\'s the roadmap, not the final budget itself.',
      w: 'The BPS is a strategic guidance document — it helps governments prepare their budgets. Tax collection is KERA\'s job.',
    },
  },

  {
    q: 'By law, the BPS must be submitted to Parliament by:',
    opts: ['January 1st', 'February 15th', 'March 30th', 'April 30th'],
    correct: 1,
    fb: {
      c: '✓ Right! February 15th is the constitutional deadline under the PFM Act.',
      w: 'Section 25 of the Public Finance Management Act sets the deadline as February 15th each year.',
    },
  },
];

// ============================================================================
// HELPER EXPORTS
// ============================================================================

export const getStorySlide = (slideId: string): StorySlide | undefined => {
  return STORIES_002.find((s) => s.id === slideId);
};

export const getStoryQuizQuestion = (idx: number): QuizQuestion | undefined => {
  return STORY_QUIZ_002[idx];
};
