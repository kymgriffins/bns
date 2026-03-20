/**
 * Quiz Questions Data
 * Full quiz sets for each module
 */

import type { QuizQuestion } from '@/types/learn';

// ============================================================================
// QUIZ FOR MODULE 001 (Basic - 4 questions)
// ============================================================================

export const QUIZ_001: QuizQuestion[] = [
  {
    q: 'What is a government budget?',
    opts: [
      'A plan for how much money to spend on different things',
      'The total amount of money a country has',
      'A law that citizens must follow',
      'A report on past spending only',
    ],
    correct: 0,
    fb: {
      c: '✓ Correct! A budget is a financial plan showing planned income and spending.',
      w: 'A budget is a plan. It shows where money comes from and where it will be spent.',
    },
  },

  {
    q: 'Where does Kenya\'s government get most of its money?',
    opts: ['Foreign aid only', 'Taxes from citizens and businesses', 'Selling government property', 'Borrowing only'],
    correct: 1,
    fb: {
      c: '✓ Right! Taxes are the primary source of government revenue.',
      w: 'While Kenya does receive aid and borrows, most revenue comes from taxes paid by citizens and businesses.',
    },
  },

  {
    q: 'Why is having a budget important for government?',
    opts: [
      'It\'s not really important',
      'To plan spending, prevent waste, and explain to citizens where money goes',
      'Only rich countries need budgets',
      'To increase taxes',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Budgets help plan, prevent waste, and enable transparency.',
      w: 'Budgets are essential for planning, efficiency, and accountability to taxpayers.',
    },
  },

  {
    q: 'What is fiscal responsibility?',
    opts: [
      'Spending all available money immediately',
      'Managing money wisely — spending within means, avoiding waste, planning ahead',
      'Earning only through taxes',
      'Borrowing as much as possible',
    ],
    correct: 1,
    fb: {
      c: '✓ Excellent! Fiscal responsibility means wise money management.',
      w: 'Fiscal responsibility means governing finances prudently — not overspending, managing debt, and planning ahead.',
    },
  },
];

// ============================================================================
// QUIZ FOR MODULE 002 (Advanced - 15 questions)
// ============================================================================

export const QUIZ_002: QuizQuestion[] = [
  {
    q: 'What does BPS stand for?',
    opts: [
      'Budget Planning System',
      'Budget Policy Statement',
      'Between Policy Services',
      'Basic Public Services',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! BPS = Budget Policy Statement',
      w: 'The BPS is the Budget Policy Statement — the strategic guidance for budget preparation.',
    },
  },

  {
    q: 'By law, the BPS must be submitted to Parliament by:',
    opts: ['January 1st', 'February 15th', 'March 30th', 'April 30th'],
    correct: 1,
    fb: {
      c: '✓ Right! February 15th is the constitutional deadline.',
      w: 'The Public Finance Management Act requires the BPS by February 15th each year.',
    },
  },

  {
    q: 'What does BETA stand for?',
    opts: [
      'Basic Economic Transformation Agenda',
      'Bottom-Up Economic Transformation Agenda',
      'Business and Economics Trade Alliance',
      'Broad Employment Training Area',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! BETA = Bottom-Up Economic Transformation Agenda',
      w: 'The BETA Agenda focuses on transforming Kenya\'s economy from the bottom up.',
    },
  },

  {
    q: 'How many pillars does the BETA Agenda have?',
    opts: ['3', '4', '5', '7'],
    correct: 2,
    fb: {
      c: '✓ Right! 5 main pillars support the BETA Agenda.',
      w: 'The BETA Agenda has 5 pillars: Agriculture, MSMEs, Healthcare, Housing, and Digital Economy.',
    },
  },

  {
    q: 'What is the approximate total national budget for 2026?',
    opts: ['1.5 trillion', '2.0 trillion', '3.2 trillion', '5.0 trillion'],
    correct: 2,
    fb: {
      c: '✓ Correct! Kenya\'s 2026 budget is approximately 3.2 trillion shillings.',
      w: 'The 2026 national budget is approximately 3.2 trillion Kenyan shillings.',
    },
  },

  {
    q: 'What percentage of Kenya\'s budget goes to debt servicing?',
    opts: ['About 10%', 'About 25%', 'About 40-50%', 'About 70%'],
    correct: 2,
    fb: {
      c: '✓ Concerning but correct! Debt service takes a huge portion of the budget.',
      w: 'Approximately 40-50% of government revenue goes to debt servicing, leaving less for development.',
    },
  },

  {
    q: 'How many counties in Kenya receive budget allocations?',
    opts: ['32', '42', '47', '52'],
    correct: 2,
    fb: {
      c: '✓ Right! Kenya has 47 counties.',
      w: 'Following devolution, Kenya has 47 counties, each receiving budget allocations.',
    },
  },

  {
    q: 'What is the "Revenue Fund" in the context of county budgets?',
    opts: [
      'Money counties earn from tourism',
      'The pool of national revenue shared with counties',
      'Money saved by counties for emergencies',
      'International loans to counties',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! The Revenue Fund is money shared from national revenue.',
      w: 'The Revenue Fund is where national tax revenue is collected and then shared with counties.',
    },
  },

  {
    q: 'What is a fiscal risk?',
    opts: [
      'When government has too much money',
      'An event that could negatively impact government finances',
      'A type of tax',
      'Money borrowed internationally',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Fiscal risks are potential threats to government finances.',
      w: 'Fiscal risks are uncertainties that could hurt budgets — like climate shocks, currency swings, or revenue shortfalls.',
    },
  },

  {
    q: 'Which of these is NOT mentioned as a fiscal risk in the module?',
    opts: [
      'Rising debt servicing costs',
      'Climate impacts on revenues',
      'County population growth',
      'Currency fluctuations',
    ],
    correct: 2,
    fb: {
      c: '✓ Correct! County population growth is not mentioned as a fiscal risk.',
      w: 'The fiscal risks covered were: debt costs, climate, currency, revenue delays, and county execution challenges.',
    },
  },

  {
    q: 'What is the purpose of the "Equitable Fund" for counties?',
    opts: [
      'To reward high-performing counties only',
      'To distribute resources based on population and basic needs',
      'To fund only national projects',
      'To give money to the capital city',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! The Equitable Fund ensures fair distribution.',
      w: 'The Equitable Fund allocates money to counties based on population and development needs.',
    },
  },

  {
    q: 'What is the "Performance Fund" for counties?',
    opts: [
      'Money for county sports events',
      'Funding tied to county government performance',
      'Bonus for elected officials',
      'Budget for county employees',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Performance Fund rewards counties for meeting targets.',
      w: 'The Performance Fund is conditional on counties meeting performance standards and governance measures.',
    },
  },

  {
    q: 'As a citizen, why should you care about the BPS?',
    opts: [
      'I shouldn\'t — it\'s a technical government document',
      'Because it shapes how your taxes are spent and national priorities',
      'Only if I work in government',
      'It\'s just background information',
    ],
    correct: 1,
    fb: {
      c: '✓ Exactly! The BPS directly affects your life and your country\'s future.',
      w: 'The BPS reflects national priorities and how your taxes will be spent. Understanding it helps you participate in civic life.',
    },
  },

  {
    q: 'What is one way you can make government more accountable?',
    opts: [
      'There\'s nothing citizens can do',
      'Follow budget documents, ask questions, and participate in public forums',
      'Only vote once every 5 years',
      'Trust that government will always do the right thing',
    ],
    correct: 1,
    fb: {
      c: '✓ Exactly! Citizen oversight drives accountability.',
      w: 'Citizens can track spending, ask questions, and participate in budget forums. This oversight helps ensure responsible government.',
    },
  },

  {
    q: 'Which of these is a realistic expectation from the 2026 BPS?',
    opts: [
      'Eliminate all government debt immediately',
      'Focus on key priorities while managing fiscal constraints',
      'Guarantee unlimited free services',
      'Reduce all government spending to zero',
    ],
    correct: 1,
    fb: {
      c: '✓ Realistic and correct! Government must balance priorities with reality.',
      w: 'The BPS sets strategic direction within real budget constraints. Solutions must be practical.',
    },
  },
];

// ============================================================================
// QUIZ FOR MODULE 003 (County Focus - 8 questions)
// ============================================================================

export const QUIZ_003: QuizQuestion[] = [
  {
    q: 'What is devolution?',
    opts: [
      'Moving the capital city',
      'The transfer of government power from national to local (county) level',
      'A type of currency',
      'A voting system',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Devolution brought power to counties.',
      w: 'Devolution refers to the transfer of power and resources from the national government to county governments.',
    },
  },

  {
    q: 'When did Kenya officially devolve power to counties?',
    opts: ['2000', '2010', '2013', '2015'],
    correct: 2,
    fb: {
      c: '✓ Correct! County governments launched elections were in 2013.',
      w: 'The 2010 Constitution established devolution, with first county elections held in 2013.',
    },
  },

  {
    q: 'What is the primary benefit of having county governments?',
    opts: [
      'Having more government jobs available',
      'Bringing government closer to people and services',
      'Making government move slower',
      'Just another level of bureaucracy',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Counties bring government closer to citizens.',
      w: 'County governments enable local decision-making and service delivery tailored to local needs.',
    },
  },

  {
    q: 'Which services are primarily the responsibility of county governments?',
    opts: [
      'National defense and foreign affairs',
      'Health facilities, education, water, agriculture',
      'Currency and national taxes',
      'International trade agreements',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! Counties manage local services.',
      w: 'Counties are responsible for health facilities, primary education, roads, water, and agriculture support.',
    },
  },

  {
    q: 'How is county budget revenue primarily distributed?',
    opts: [
      'All counties get equal amounts',
      'Only the richest counties receive funds',
      'Based on population, poverty levels, and development needs',
      'Based on political party affiliation',
    ],
    correct: 2,
    fb: {
      c: '✓ Correct! Distribution is based on need and population.',
      w: 'County allocations use a formula considering population, poverty rates, population density, and development needs.',
    },
  },

  {
    q: 'What is "Intergovernmental Fiscal Transfers"?',
    opts: [
      'Money sent between countries',
      'Money transferred between national and county governments',
      'Personal money transfers',
      'Bank transfers only',
    ],
    correct: 1,
    fb: {
      c: '✓ Correct! This is how money flows from national to counties.',
      w: 'Intergovernmental fiscal transfers are the mechanism for sending national revenue to counties.',
    },
  },

  {
    q: 'What is one challenge counties face with their budgets?',
    opts: [
      'Having too much money',
      'Capacity to manage resources and deliver services effectively',
      'No national support',
      'Too many residents',
    ],
    correct: 1,
    fb: {
      c: '✓ Realistic challenge. Counties are building capacity.',
      w: 'Many counties struggle with financial management, procurement, and service delivery capacity.',
    },
  },

  {
    q: 'As a county resident, how can you participate in county budget planning?',
    opts: [
      'Attend county budget forums and public hearings',
      'Wait for the budget to be announced',
      'Complain online only',
      'Accept whatever is decided',
    ],
    correct: 0,
    fb: {
      c: '✓ Correct! Participation starts with showing up to forums.',
      w: 'Counties hold public participation forums. Attending and providing input helps shape priorities.',
    },
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getQuizByModuleId = (moduleId: string): QuizQuestion[] => {
  switch (moduleId) {
    case 'bps-basic':
      return QUIZ_001;
    case 'bps-advanced':
      return QUIZ_002;
    case 'budget-county':
      return QUIZ_003;
    default:
      return [];
  }
};

export const getQuizQuestion = (moduleId: string, questionIdx: number): QuizQuestion | undefined => {
  const quiz = getQuizByModuleId(moduleId);
  return quiz[questionIdx];
};

export const getQuestionCount = (moduleId: string): number => {
  return getQuizByModuleId(moduleId).length;
};
