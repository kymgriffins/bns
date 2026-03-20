/**
 * Video Playlist Data
 * YouTube videos for each module
 */

import type { VideoItem } from '@/types/learn';

// ============================================================================
// VIDEOS FOR MODULE 002
// ============================================================================

export const VIDEOS_002: VideoItem[] = [
  {
    id: '1',
    title: 'Understanding Kenya\'s Budget Policy Statement',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder ID
    duration: '8:24',
    views: '14.2K',
    desc: 'A complete breakdown of what the BPS is, why it matters, and how it shapes the national budget every year. This video walks through the constitutional requirements and the key steps of budget preparation in Kenya.',
    tag: 'Module 002',
  },

  {
    id: '2',
    title: 'The BETA Agenda Explained — 5 Pillars of Kenya\'s Growth',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '12:45',
    views: '9.8K',
    desc: 'Deep dive into the Bottom-Up Economic Transformation Agenda. Agriculture, MSMEs, healthcare, housing, and digital economy. We break down each pillar and what it means for different sectors.',
    tag: 'BETA Agenda',
  },

  {
    id: '3',
    title: 'Kenya\'s Debt Crisis — What You Need to Know',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '10:30',
    views: '22.1K',
    desc: 'Understanding Kenya\'s fiscal situation: debt-to-GDP ratio, interest payments, and the sustainability of government borrowing. This video explains why fiscal risk matters to every citizen.',
    tag: 'Fiscal Policy',
  },

  {
    id: '4',
    title: 'County Budgets & Devolution Explained',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '9:15',
    views: '7.3K',
    desc: 'How county governments receive and spend their budgets. Understanding the Revenue Fund, equitable share, and conditional grants. What does devolution mean for service delivery?',
    tag: 'County Government',
  },

  {
    id: '5',
    title: 'How to Track Government Spending in Kenya',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '7:42',
    views: '11.5K',
    desc: 'Practical guide to accessing budget documents, tracking spending through websites like iBudget, and holding government accountable. Tools and resources for citizen oversight.',
    tag: 'Civic Participation',
  },
];

// ============================================================================
// VIDEOS FOR MODULE 001 (Basic)
// ============================================================================

export const VIDEOS_001: VideoItem[] = [
  {
    id: '1',
    title: 'Budget Basics: What is Money in Government?',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '5:20',
    views: '31.2K',
    desc: 'Start from the beginning! What is a budget? Where does government money come from? And where does it go? This video introduces budget fundamentals in plain language.',
    tag: 'Module 001',
  },

  {
    id: '2',
    title: 'Your Taxes & You — Where Does Your Money Go?',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '6:45',
    views: '18.7K',
    desc: 'Understanding taxation in Kenya and how your taxes are spent. What are the main sources of government revenue? How is money allocated across different sectors?',
    tag: 'Taxation',
  },

  {
    id: '3',
    title: 'Government vs. Your Family Budget',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '4:52',
    views: '12.4K',
    desc: 'The parallels between managing a household budget and running a government. Spending, saving, borrowing, and planning. Why budgets matter at every level.',
    tag: 'Budget Fundamentals',
  },
];

// ============================================================================
// VIDEOS FOR MODULE 003 (County Focus)
// ============================================================================

export const VIDEOS_003: VideoItem[] = [
  {
    id: '1',
    title: 'Devolution Explained — Why We Have County Governments',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:30',
    views: '15.6K',
    desc: 'The 2010 Constitution introduced devolution to bring government closer to people. Understanding why we have county governments and how they work with national government.',
    tag: 'Module 003',
  },

  {
    id: '2',
    title: 'Inside a County Budget: Nairobi Case Study',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '11:20',
    views: '8.9K',
    desc: 'Taking Nairobi County as an example. How a county budget is structured, who makes decisions, and where money goes. What services does the county provide?',
    tag: 'County Finance',
  },

  {
    id: '3',
    title: 'National vs. County: Who Does What?',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '7:45',
    views: '13.2K',
    desc: 'The division of responsibilities between national and county governments. Which government provides which services? Healthcare, education, infrastructure — who\'s responsible?',
    tag: 'Devolution',
  },

  {
    id: '4',
    title: 'Fiscal Transfers: How Counties Get Money',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '9:10',
    views: '6.8K',
    desc: 'Understanding the Revenue Fund, equitable share, and conditional grants. How is revenue distributed among counties? What determines allocations?',
    tag: 'County Finance',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getVideosByModuleId = (moduleId: string): VideoItem[] => {
  switch (moduleId) {
    case 'bps-basic':
      return VIDEOS_001;
    case 'bps-advanced':
      return VIDEOS_002;
    case 'budget-county':
      return VIDEOS_003;
    default:
      return [];
  }
};

export const getVideoById = (moduleId: string, videoId: string): VideoItem | undefined => {
  const videos = getVideosByModuleId(moduleId);
  return videos.find((v) => v.id === videoId);
};

// ============================================================================
// ALL VIDEOS (for search/filtering)
// ============================================================================

export const ALL_VIDEOS = [
  ...VIDEOS_001.map((v) => ({ ...v, moduleId: 'bps-basic' })),
  ...VIDEOS_002.map((v) => ({ ...v, moduleId: 'bps-advanced' })),
  ...VIDEOS_003.map((v) => ({ ...v, moduleId: 'budget-county' })),
];
