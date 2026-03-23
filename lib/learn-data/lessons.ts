/**
 * Lesson Sections Data
 * Full lessons for each module
 */

import type { LessonSection } from '@/types/learn';

// ============================================================================
// LESSON SECTIONS FOR MODULE 002 (Advanced - 8 sections)
// ============================================================================

export const LESSON_SECTIONS_002: LessonSection[] = [
  {
    id: 's-intro',
    label: 'Section 1',
    title: 'What is a Budget Policy Statement?',
    content: [
      {
        type: 'title',
        content: 'Understanding the BPS',
      },
      {
        type: 'text',
        content:
          'The Budget Policy Statement (BPS) is a strategic guidance document that provides the framework for budget preparation in Kenya. It is submitted to Parliament by February 15th each year, as required by the Public Finance Management Act, 2012.',
      },
      {
        type: 'bullets',
        content:
          '• Guides how national and county governments prepare their detailed budgets\n• Reflects national priorities and macroeconomic targets\n• Provides spending ceilings for different government sectors\n• NOT the budget itself — that comes later (June)\n• Subject to public reviews and parliamentary approval',
      },
      {
        type: 'text',
        content:
          'The timing is important: BPS comes first (Feb), then counties prepare their budgets (Mar-May), then the national budget is tabled (June). This sequential process ensures coordination between national and local governments.',
      },
    ],
  },

  {
    id: 's-beta',
    label: 'Section 2',
    title: 'The BETA Agenda Explained',
    content: [
      {
        type: 'title',
        content: 'Bottom-Up Economic Transformation Agenda',
      },
      {
        type: 'text',
        content:
          'The BETA Agenda is Kenya\'s new economic transformation framework. It represents a shift from top-down planning to bottom-up development, focusing on enabling Kenyan businesses and communities to drive growth.',
      },
      {
        type: 'bullets',
        content:
          '• **Agriculture**: Transforming subsistence farming into profitable agribusiness\n• **MSMEs**: Supporting micro, small, and medium enterprises that create jobs\n• **Digital Economy**: Building tech infrastructure and innovation hubs\n• **Manufacturing**: Developing local production to reduce imports\n• **Healthcare & Housing**: Improving living standards\n• **Infrastructure**: Roads, ports, and energy to connect the economy',
      },
      {
        type: 'text',
        content:
          'Each pillar receives substantial budget allocation in the 2026 BPS. The BETA approach acknowledges that sustainable growth comes from enabling private enterprise, not just government spending.',
      },
    ],
  },

  {
    id: 's-numbers',
    label: 'Section 3',
    title: 'Key Budget Numbers',
    content: [
      {
        type: 'title',
        content: 'Understanding the Numbers',
      },
      {
        type: 'text',
        content: 'The 2026 national budget is approximately 3.2 trillion Kenyan shillings. Here\'s how it breaks down:',
      },
      {
        type: 'quote',
        content:
          '💡 **3.2 Trillion Total** / **1.8 Trillion Debt Service** / **800 Billion BETA Investment** / **1.0 Trillion County Allocations**',
      },
      {
        type: 'text',
        content:
          'The debt servicing number (1.8 trillion) is concerning. When nearly 60% of government revenue goes to paying interest and principal on loans, it leaves less than 1 trillion for development — healthcare, education, infrastructure, and everything else that improves lives.',
      },
      {
        type: 'bullets',
        content:
          '• **Debt Service**: 1.8 trillion (56% of revenue)\n• **Development Budget**: ~1 trillion (development spending)\n• **BETA Agenda**: 800 billion (transformation initiatives)\n• **County Budgets**: 1.0 trillion (local services)\n• **Other**: Salaries, pensions, operations',
      },
    ],
  },

  {
    id: 's-counties',
    label: 'Section 4',
    title: 'County Budget Allocations',
    content: [
      {
        type: 'title',
        content: 'Financing Local Governments',
      },
      {
        type: 'text',
        content:
          'Kenya\'s 47 counties receive approximately 1.0 trillion shillings from the national budget. This is called the County Revenue Fund, and it\'s distributed through two main mechanisms:',
      },
      {
        type: 'bullets',
        content:
          '• **Equitable Fund (~60%)**: Distributed based on population, poverty levels, and development needs. Ensures all counties can provide basic services.\n• **Performance Fund (~40%)**: Tied to county government performance in financial management, service delivery, and governance. Incentivizes accountability.',
      },
      {
        type: 'text',
        content:
          'The Revenue Fund (approximately 850 billion) is allocated through a formula considering:\n\n- County population (55%)\n- Land area and sparsity (15%)\n- Poverty levels (20%)\n- Other needs (10%)\n\nThis ensures that poorer counties with larger populations receive more support.',
      },
      {
        type: 'text',
        content:
          'Additionally, counties receive **conditional grants** for specific services (health, education, roads) and may raise their own revenues through local taxes and user fees.',
      },
    ],
  },

  {
    id: 's-risks',
    label: 'Section 5',
    title: 'Fiscal Risks & Challenges',
    content: [
      {
        type: 'title',
        content: 'Threats to Budget Sustainability',
      },
      {
        type: 'text',
        content:
          'The 2026 BPS acknowledges several fiscal risks — events or trends that could undermine budget execution and economic stability. Citizens should understand these because they affect service delivery and future generations.',
      },
      {
        type: 'bullets',
        content:
          '• **Debt Service Spiral**: If interest rates rise, more revenue goes to debt, less to services.\n• **Climate Shocks**: Drought reduces tax revenues (agricultural income falls, fewer transactions).\n• **Currency Fluctuations**: When shilling weakens, imported goods cost more, which risks inflation.\n• **Revenue Shortfalls**: If tax collection comes in below estimates, spending must be cut.\n• **County Capacity**: Some counties struggle to execute budgets efficiently.',
      },
      {
        type: 'text',
        content:
          '**Why This Matters:**\n\nThese risks aren\'t just abstract economic concepts. Real risks mean:\n- Hospitals might run out of medicines\n- Teachers might not be paid on time\n- Roads might not be maintained\n- Investment in BETA Agenda could be delayed\n\nEven small delays in revenue collection can cascade through the system.',
      },
    ],
  },

  {
    id: 's-debt',
    label: 'Section 6',
    title: 'Understanding Kenya\'s Debt',
    content: [
      {
        type: 'title',
        content: 'The Debt Question',
      },
      {
        type: 'text',
        content:
          'Kenya has borrowed money internationally (from the World Bank, IMF, China, and others) and domestically (from Kenyan banks and citizens through Treasury bonds). Current debt is approximately 9-10 trillion shillings, roughly 70% of GDP.',
      },
      {
        type: 'bullets',
        content:
          '• **International Debt**: ~4.5 trillion shillings (45%)\n• **Domestic Debt**: ~4.5-5 trillion shillings (55%)\n• **Average Interest Rate**: 6-8% annually\n• **Debt Service Cost**: ~1.8 trillion per year (56% of revenue)',
      },
      {
        type: 'text',
        content:
          '**Is This a Crisis?**\n\nKenyan economists debate this. Some say the debt level is unsustainable. Others argue it\'s manageable if borrowed money is used for productive investments that generate returns. The key question: **What was the money borrowed for?**\n\nIf borrowed to build the Standard Gauge Railway or dams that improve productivity, that might generate returns. But if borrowed for consumption spending, it becomes a burden with no productive benefit.',
      },
    ],
  },

  {
    id: 's-accountability',
    label: 'Section 7',
    title: 'Budget Accountability & Tracking',
    content: [
      {
        type: 'title',
        content: 'Citizen Oversight of Budgets',
      },
      {
        type: 'text',
        content:
          'Transparency and accountability are central to good governance. Citizens have tools and rights to track government spending and demand accountability.',
      },
      {
        type: 'bullets',
        content:
          '• **iBudget**: Kenya\'s online platform where you can search budget documentation\n• **Parliamentary Debates**: Budget debates are televised; parliamentarians discuss and question spending\n• **County Forums**: Counties hold public participation meetings where citizens can comment on budgets\n• **Civil Society**: Organizations like KIPPRA and Africog monitor budgets and publish reports\n• **Media**: Budget journalism helps explain and scrutinize spending decisions\n• **Freedom of Information**: Citizens can request budget documents and spending reports',
      },
      {
        type: 'text',
        content: '**Your Role:**\nShow up to county budget forums. Ask questions. Request information. Share your concerns. Used together, these tools help keep government accountable.',
      },
    ],
  },

  {
    id: 's-action',
    label: 'Section 8',
    title: 'Taking Action as a Citizen',
    content: [
      {
        type: 'title',
        content: 'From Knowledge to Engagement',
      },
      {
        type: 'text',
        content:
          'Understanding the budget is the first step. Acting on that knowledge is what drives change. Here are concrete ways you can engage:',
      },
      {
        type: 'bullets',
        content:
          '• **Local Level**: Attend county budget forums (usually Feb-March). Ask why health/education/roads get certain allocations.\n• **National Level**: Contact your MP during budget debates. Share your concerns about priorities.\n• **Community**: Start or join a budget watchdog group in your community. Meet monthly to discuss spending.\n• **Voting**: Vote based on candidates\' budget proposals and fiscal track records.\n• **Sharing**: Teach others. Budget literacy makes democracy stronger.',
      },
      {
        type: 'text',
        content:
          '**The Bottom Line:**\n\nYour tax money pays for government. You have a right and responsibility to know how it\'s spent. The budget isn\'t just for economists and politicians — it\'s about you, your community, and Kenya\'s future.',
      },
    ],
  },
];

// ============================================================================
// LESSON SECTIONS FOR MODULE 001 (Basic - 5 sections)
// ============================================================================

export const LESSON_SECTIONS_001: LessonSection[] = [
  {
    id: 's-intro',
    label: 'Section 1',
    title: 'What is a Budget?',
    content: [
      {
        type: 'title',
        content: 'Budget Basics',
      },
      {
        type: 'text',
        content:
          'A budget is a financial plan. Just like you might plan how to spend your pocket money or your monthly salary, government creates a budget to plan how it will spend money.',
      },
      {
        type: 'text',
        content:
          '**Your household budget** might look like:\n- Income: 50,000 KES (salary)\n- Rent: 15,000 KES\n- Food: 12,000 KES\n- Transport: 8,000 KES\n- Savings: 5,000 KES\n- Other: 10,000 KES\n\n**A government budget** looks similar but at a much larger scale, planning how to spend billions of shillings.',
      },
    ],
  },

  {
    id: 's-why',
    label: 'Section 2',
    title: 'Why Budgets Matter',
    content: [
      {
        type: 'title',
        content: 'The Importance of Planning',
      },
      {
        type: 'text',
        content:
          'Budgets matter because without them, spending becomes chaotic. Money runs out unexpectedly. Important services don\'t get funded. Waste increases.',
      },
      {
        type: 'bullets',
        content:
          '• **Planning**: Decide priorities before spending\n• **Accountability**: Citizens and parliament know where money goes\n• **Prevention**: Prevents overspending and crisis\n• **Fairness**: Ensures all regions and groups are considered\n• **Sustainability**: Long-term planning for national development',
      },
    ],
  },

  {
    id: 's-sources',
    label: 'Section 3',
    title: 'Where Government Money Comes From',
    content: [
      {
        type: 'title',
        content: 'Revenue Sources',
      },
      {
        type: 'text',
        content: 'Government revenue has multiple sources:',
      },
      {
        type: 'bullets',
        content:
          '• **Income Tax**: 15-30% of your salary goes to government\n• **Value Added Tax (VAT)**: 16% tax on most goods/services you buy\n• **Corporate Tax**: Tax on company profits\n• **Customs Duties**: Taxes on imported goods\n• **Foreign Aid**: Money from other countries\n• **Loans**: Borrowing money to fund spending',
      },
      {
        type: 'text',
        content:
          'For every 100 shillings in your pocket, government takes about 16 shillings in VAT when you spend it. Your employer sends part of your salary to government too.',
      },
    ],
  },

  {
    id: 's-spending',
    label: 'Section 4',
    title: 'Where the Money Goes',
    content: [
      {
        type: 'title',
        content: 'Government Spending',
      },
      {
        type: 'text',
        content: 'Government spends money on services we all benefit from:',
      },
      {
        type: 'bullets',
        content:
          '• **Healthcare**: Building hospitals, training doctors, medicines\n• **Education**: Schools, teachers, learning materials\n• **Infrastructure**: Roads, Water, Electricity\n• **Defence & Security**: Armed forces, police\n• **Administration**: Running government offices\n• **Debt Service**: Paying back loans\n• **Social Services**: Support for elderly, disabled',
      },
      {
        type: 'text',
        content:
          'When budget money runs out, something doesn\'t get done. If education gets less money, fewer schools are built. If roads get less, our transport system suffers. Budget decisions directly affect your daily life.',
      },
    ],
  },

  {
    id: 's-action',
    label: 'Section 5',
    title: 'You & The Budget',
    content: [
      {
        type: 'title',
        content: 'Citizen Participation',
      },
      {
        type: 'text',
        content:
          'Your money funds government. You have a right to know how it\'s spent. Here are ways to get involved:',
      },
      {
        type: 'bullets',
        content:
          '• **Ask Questions**: Why is health budget low? Why are roads underfunded?\n• **Vote**: Support leaders with good budget plans\n• **Attend Forums**: Participate in budget public hearings (usually in Feb-March)\n• **Research**: Read budget documents online\n• **Advocate**: Speak up for priorities you care about',
      },
      {
        type: 'text',
        content:
          'Every citizen who engages with budgets makes government more accountable. That\'s how democracy works.',
      },
    ],
  },
];

// ============================================================================
// LESSON SECTIONS FOR MODULE 003 (County Focus - 6 sections)
// ============================================================================

export const LESSON_SECTIONS_003: LessonSection[] = [
  {
    id: 's-intro',
    label: 'Section 1',
    title: 'What is Devolution?',
    content: [
      {
        type: 'title',
        content: 'Counties & Local Government',
      },
      {
        type: 'text',
        content:
          'Devolution means the transfer of power and resources from national government to county governments. Kenya established 47 counties in 2013 following the 2010 Constitution.',
      },
      {
        type: 'text',
        content:
          'The idea behind devolution: Government should be closer to people. Local leaders understand local needs better. Services are more responsive and accountable when decided locally.',
      },
    ],
  },

  {
    id: 's-structure',
    label: 'Section 2',
    title: 'National vs. County Government',
    content: [
      {
        type: 'title',
        content: 'Division of Responsibilities',
      },
      {
        type: 'text',
        content: '**National Government** focuses on big-picture issues:',
      },
      {
        type: 'bullets',
        content:
          '• Foreign affairs and diplomacy\n• National defense and security\n• National currency and banking\n• Major infrastructure (national highways, airports)\n• Tertiary education (universities)\n• Income and corporate taxation\n• Social security (national schemes)',
      },
      {
        type: 'text',
        content: '**County Governments** manage local service delivery:',
      },
      {
        type: 'bullets',
        content:
          '• Primary and secondary education\n• Hospitals and primary health care\n• County roads and water supply\n• Agricultural extension services\n• Local business licensing\n• County planning and development\n• Social services (orphanages, elderly care)',
      },
    ],
  },

  {
    id: 's-budget',
    label: 'Section 3',
    title: 'County Budget Allocation',
    content: [
      {
        type: 'title',
        content: 'How Counties Get Money',
      },
      {
        type: 'text',
        content:
          'Counties receive money from three main sources:\n\n1. **National Revenue Fund**: About 850 billion shillings from national taxes, distributed to all counties\n2. **Conditional Grants**: Specific funding for health, education, roads (from national or donors)\n3. **Own Revenue**: Taxes and fees counties collect locally (parking, business licenses, etc.)',
      },
      {
        type: 'text',
        content:
          'The National Revenue Fund is distributed using a formula:\n- 55% based on county population\n- 20% based on poverty levels\n- 15% based on land area (sparsity)\n- 10% for other factors\n\nThis ensures poor counties with large populations receive adequate support.',
      },
    ],
  },

  {
    id: 's-challenges',
    label: 'Section 4',
    title: 'County Challenges',
    content: [
      {
        type: 'title',
        content: 'Devolution Issues',
      },
      {
        type: 'text',
        content: 'Devolution is still young (started in 2013). Counties face real challenges:',
      },
      {
        type: 'bullets',
        content:
          '• **Capacity**: Many counties lack experienced financial managers\n• **Coordination**: Sometimes national and counties disagree on responsibility\n• **Funding**: Counties depend heavily on national revenue; own revenue is limited\n• **Accountability**: Corruption cases in some counties\n• **Service Delivery**: Progress varies widely between counties\n• **Equity**: Some counties remain underfunded despite formulas',
      },
      {
        type: 'text',
        content:
          'These challenges don\'t mean devolution is bad. They mean it needs refinement and oversight from citizens like you.',
      },
    ],
  },

  {
    id: 's-examples',
    label: 'Section 5',
    title: 'County Budget Example',
    content: [
      {
        type: 'title',
        content: 'Real County Budgets',
      },
      {
        type: 'text',
        content:
          'Each county creates its own budget annually. A typical county budget structure:\n\n**Nairobi County Revenues (~50 billion):**\n- National Revenue Fund: 30 billion\n- Own Revenue (parking, licenses): 12 billion\n- Grants (roads, health): 8 billion \n\n**Nairobi County Spending:**\n- Salaries: 15 billion\n- Healthcare: 8 billion\n- Education: 6 billion\n- Roads/Infrastructure: 10 billion\n- Water: 5 billion\n- Administration/Overhead: 6 billion',
      },
      {
        type: 'text',
        content:
          'Counties must balance competing demands with limited money. A teacher shortage conflicts with road needs. Health facilities conflict with water projects. Budget decisions reflect local priorities.',
      },
    ],
  },

  {
    id: 's-engage',
    label: 'Section 6',
    title: 'Engaging Your County',
    content: [
      {
        type: 'title',
        content: 'Citizen Participation at County Level',
      },
      {
        type: 'text',
        content:
          'Counties are closest to you. Your voice carries more weight at county level than national level. Here\'s how to engage:',
      },
      {
        type: 'bullets',
        content:
          '• **Attend Budget Forums** (Feb-March): Your county holds public participation meetings; attend and ask questions\n• **County Assembly**: Attend public hearings; watch debates; question your representatives\n• **Follow Up**: Request actual vs. budgeted spending reports\n• **Organize**: Form community groups to monitor health centers, schools, roads\n• **Vote**: Elect leaders based on their track records and fiscal plans\n• **Media**: Write letters to newspapers about county budget concerns',
      },
      {
        type: 'text',
        content:
          'Counties that are held to account by citizens deliver better services. Your engagement directly improves your area.',
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getLessonsByModuleId = (moduleId: string): LessonSection[] => {
  switch (moduleId) {
    case 'bps-basic':
      return LESSON_SECTIONS_001;
    case 'bps-advanced':
      return LESSON_SECTIONS_002;
    case 'budget-county':
      return LESSON_SECTIONS_003;
    default:
      return [];
  }
};

export const getLessonSection = (moduleId: string, sectionId: string): LessonSection | undefined => {
  const sections = getLessonsByModuleId(moduleId);
  return sections.find((s) => s.id === sectionId);
};

export const getSectionCount = (moduleId: string): number => {
  return getLessonsByModuleId(moduleId).length;
};
