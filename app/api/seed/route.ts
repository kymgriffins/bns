import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Category IDs from the database
const categories = {
  news: "0c5be222-0238-4988-96eb-a8f0875670f4",
  insights: "e96ea3f1-d1c9-4ba9-9b89-16da8c4f8358",
  learn: "b4eb7410-f5f9-497e-80a6-f7d852028385",
  county: "d9975dda-6195-499b-8f2b-128c6f1c7115",
  budgetReports: "dd85234c-ccf6-428f-b0ce-ff2339f284ad",
};

// Seed data for important calendar dates and budget decisions
const seedData = [
  // Calendar Dates - Important Budget Milestones
  {
    title: "FY 2025-26 County Budget Deadline - March 31, 2026",
    slug: "fy-2025-26-county-budget-deadline-march-2026",
    excerpt: "County governments must submit their FY 2025-26 budget proposals by March 31, 2026. Learn about the key requirements and timelines.",
    content: JSON.stringify({
      html: `<h2>Important Budget Deadline Approaching</h2>
<p>County governments have until <strong>March 31, 2026</strong> to submit their FY 2025-26 budget proposals to the Controller of Budget.</p>
<h3>Key Requirements:</h3>
<ul>
<li>Comprehensive revenue projections</li>
<li>Detailed expenditure estimates by sector</li>
<li>Debt management plan</li>
<li>Public participation documentation</li>
</ul>
<h3>What This Means for Citizens:</h3>
<p>This budget will determine funding allocations for critical services including healthcare, education, infrastructure, and water services for the fiscal year starting July 1, 2026.</p>
<h3>How to Participate:</h3>
<p>Citizens can engage with their county assemblies during public participation forums held before the budget is finalized. Check your county's website for scheduled town halls and submission deadlines for public memoranda.</p>`,
      plain: "Important Budget Deadline Approaching - County governments have until March 31, 2026 to submit their FY 2025-26 budget proposals."
    }),
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    category_id: categories.county,
    status: "published",
    is_featured: true,
    published_at: "2026-02-15T00:00:00Z",
    reading_time_minutes: 5,
    seo_title: "FY 2025-26 County Budget Deadline - March 31, 2026",
    seo_description: "Important deadline for county budget submissions. Learn about key requirements and how to participate."
  },
  {
    title: "National Treasury Budget Review Committee Meetings - February 2026",
    slug: "national-treasury-budget-review-committee-february-2026",
    excerpt: "The National Treasury's Budget Review Committee meets throughout February 2026 to analyze sector budget proposals.",
    content: JSON.stringify({
      html: `<h2>National Treasury Budget Review</h2>
<p>The Budget Review Committee (BRC) convenes in February 2026 to analyze and prioritize budget requests from all government sectors.</p>
<h3>Key Sectors Under Review:</h3>
<ul>
<li>Education - Allocation for free education programs</li>
<li>Healthcare - Universal Health Coverage funding</li>
<li>Infrastructure - Roads and public works</li>
<li>Agriculture - Farmer support programs</li>
</ul>
<h3>Expected Outcomes:</h3>
<p>The committee will submit its recommendations to the Cabinet by end of February, which will inform the Budget Policy Statement (BPS) to be presented to Parliament in March.</p>`,
      plain: "The National Treasury's Budget Review Committee meets in February 2026 to analyze sector budget proposals."
    }),
    cover_image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    category_id: categories.news,
    status: "published",
    is_featured: false,
    published_at: "2026-02-10T00:00:00Z",
    reading_time_minutes: 4,
    seo_title: "National Treasury Budget Review Committee - February 2026",
    seo_description: "The Budget Review Committee analyzes sector budget proposals for FY 2025-26."
  },
  {
    title: "Public Participation Forums Schedule - February-March 2026",
    slug: "public-participation-forums-schedule-february-march-2026",
    excerpt: "Schedule of public participation forums for the FY 2025-26 budget across all 47 counties.",
    content: JSON.stringify({
      html: `<h2>Have Your Say in the Budget</h2>
<p>Public participation is a constitutional right and critical part of the budget process. Here's the schedule for FY 2025-26 budget forums.</p>
<h3>National Level:</h3>
<ul>
<li>February 20, 2026 - Nairobi County Hall</li>
<li>February 22, 2026 - Mombasa City Hall</li>
<li>February 24, 2026 - Kisumu City Hall</li>
</ul>
<h3>County Level:</h3>
<p>Each county assembly will hold at least three public participation forums. Check your county assembly website for specific dates and venues.</p>
<h3>How to Submit Memoranda:</h3>
<p>Written memoranda can be submitted to the Clerk of the County Assembly at least 7 days before the relevant forum. Download the template from your county website.</p>`,
      plain: "Schedule of public participation forums for the FY 2025-26 budget across all 47 counties."
    }),
    cover_image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800",
    category_id: categories.learn,
    status: "published",
    is_featured: true,
    published_at: "2026-02-08T00:00:00Z",
    reading_time_minutes: 6,
    seo_title: "Public Participation Forums Schedule - February-March 2026",
    seo_description: "Schedule of public participation forums for the FY 2025-26 budget."
  },

  // Decisions and Outcomes - Blog Posts
  {
    title: "FY 2024-25 Budget Implementation Report: Key Outcomes",
    slug: "fy-2024-25-budget-implementation-report-key-outcomes",
    excerpt: "Analysis of the FY 2024-25 budget implementation - what was achieved, challenges faced, and lessons learned.",
    content: JSON.stringify({
      html: `<h2>FY 2024-25 Budget Implementation Review</h2>
<p>The government has released the implementation report for FY 2024-25, showing mixed results across different sectors.</p>
<h3>Key Achievements:</h3>
<ul>
<li><strong>Education:</strong> Free Day Secondary Education received 100% of allocated funds (KSh 42.8B)</li>
<li><strong>Healthcare:</strong> Linda Mama program covered 1.2M deliveries</li>
<li><strong>Infrastructure:</strong> 2,500km of roads maintained</li>
<li><strong>Agriculture:</strong> Farmer input subsidies reached 500,000 smallholder farmers</li>
</ul>
<h3>Challenges:</h3>
<ul>
<li>Revenue shortfall of 8.3% due to economic slowdown</li>
<li>Delayed disbursements to counties affecting service delivery</li>
<li>Pending bills of KSh 120B creating cash flow challenges</li>
</ul>
<h3>Lessons for FY 2025-26:</h3>
<p>The Treasury has proposed increased revenue mobilization and improved cash flow management for the next fiscal year.</p>`,
      plain: "Analysis of the FY 2024-25 budget implementation - achievements, challenges, and lessons learned."
    }),
    cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    category_id: categories.budgetReports,
    status: "published",
    is_featured: true,
    published_at: "2026-01-28T00:00:00Z",
    reading_time_minutes: 8,
    seo_title: "FY 2024-25 Budget Implementation Report: Key Outcomes",
    seo_description: "Analysis of the FY 2024-25 budget implementation - achievements and challenges."
  },
  {
    title: "Controller of Budget's Mid-Term Review: Counties Miss Targets",
    slug: "controller-of-budget-mid-term-review-counties-2025",
    excerpt: "The Controller of Budget's mid-term review shows most counties missed absorption targets for FY 2024-25.",
    content: JSON.stringify({
      html: `<h2>Mid-Term Budget Absorption Review</h2>
<p>The Controller of Budget's mid-term review for FY 2024-25 reveals that only 12 of 47 counties met their budget absorption targets.</p>
<h3>Key Findings:</h3>
<ul>
<li><strong>Average Absorption Rate:</strong> 68% (target was 75%)</li>
<li><strong>Best Performers:</strong> Nairobi (89%), Nakuru (82%), Kiambu (79%)</li>
<li><strong>Lowest Performers:</strong> Wajir (42%), Mandera (45%), Marsabit (51%)</li>
</ul>
<h3>Reasons for Under-absorption:</h3>
<ul>
<li>Delays in procurement processes</li>
<li>Capacity constraints in project implementation</li>
<li>Delayed disbursements from the National Treasury</li>
<li>Staff shortages in key technical positions</li>
</ul>
<h3>Recommendations:</h3>
<p>The COB has recommended early procurement planning, capacity building, and improved disbursement timelines for FY 2025-26.</p>`,
      plain: "The Controller of Budget's mid-term review shows most counties missed absorption targets for FY 2024-25."
    }),
    cover_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    category_id: categories.insights,
    status: "published",
    is_featured: false,
    published_at: "2026-01-20T00:00:00Z",
    reading_time_minutes: 6,
    seo_title: "Controller of Budget Mid-Term Review 2025",
    seo_description: "Most counties missed budget absorption targets according to the Controller of Budget's mid-term review."
  },
  {
    title: "Education Sector Budget Allocation Increase for FY 2025-26",
    slug: "education-sector-budget-allocation-increase-fy-2025-26",
    excerpt: "The Ministry of Education has proposed a 15% increase in education budget allocation for FY 2025-26.",
    content: JSON.stringify({
      html: `<h2>Education Budget 2025-26</h2>
<p>The proposed budget for the education sector for FY 2025-26 stands at KSh 650B, a 15% increase from the current fiscal year.</p>
<h3>Proposed Allocations:</h3>
<ul>
<li><strong>Free Day Secondary Education:</strong> KSh 52B (up from KSh 42.8B)</li>
<li><strong>Technical and Vocational Education:</strong> KSh 18B (up from KSh 12B)</li>
<li><strong>University Education:</strong> KSh 45B</li>
<li><strong>School Infrastructure:</strong> KSh 25B</li>
<li><strong>Digital Learning Program:</strong> KSh 8B</li>
</ul>
<h3>Key Priorities:</h3>
<ul>
<li>Expansion of free education to cover secondary schools</li>
<li>Training of 20,000 additional teachers</li>
<li>Construction of 500 new classrooms</li>
<li>Digital literacy program roll-out to all secondary schools</li>
</ul>
<h3>Funding Source:</h3>
<p>The increase will be funded through improved revenue collection and reallocation from non-essential spending.</p>`,
      plain: "The Ministry of Education has proposed a 15% increase in education budget allocation for FY 2025-26."
    }),
    cover_image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    category_id: categories.news,
    status: "published",
    is_featured: true,
    published_at: "2026-01-15T00:00:00Z",
    reading_time_minutes: 5,
    seo_title: "Education Sector Budget FY 2025-26",
    seo_description: "15% increase proposed in education budget allocation for FY 2025-26."
  },
  {
    title: "Understanding the Budget Process: A Citizen's Guide",
    slug: "understanding-budget-process-citizens-guide",
    excerpt: "A comprehensive guide to understanding Kenya's budget process and how citizens can participate.",
    content: JSON.stringify({
      html: `<h2>Kenya's Budget Process Explained</h2>
<p>The budget process in Kenya follows a constitutional timeline and provides multiple opportunities for citizen participation.</p>
<h3>The Budget Cycle:</h3>
<ol>
<li><strong>February:</strong> Budget Review Committee analyzes proposals</li>
<li><strong>March:</strong> Budget Policy Statement presented to Parliament</li>
<li><strong>April:</strong> Sector hearings and public participation</li>
<li><strong>May:</strong> Budget estimates presented to Parliament</li>
<li><strong>June:</strong> Parliament debates and passes the Appropriation Bill</li>
<li><strong>July:</strong> New fiscal year begins</li>
</ol>
<h3>How Citizens Can Participate:</h3>
<ul>
<li>Attend public participation forums</li>
<li>Submit written memoranda to Parliament or County Assemblies</li>
<li>Engage with elected representatives</li>
<li>Monitor budget implementation through public reports</li>
</ul>
<h3>Key Documents:</h3>
<ul>
<li>Budget Policy Statement (BPS)</li>
<li>Budget Estimates</li>
<li>Controller of Budget Reports</li>
<li>Auditor General Reports</li>
</ul>`,
      plain: "A comprehensive guide to understanding Kenya's budget process and how citizens can participate."
    }),
    cover_image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    category_id: categories.learn,
    status: "published",
    is_featured: false,
    published_at: "2026-01-10T00:00:00Z",
    reading_time_minutes: 10,
    seo_title: "Understanding the Budget Process: A Citizen's Guide",
    seo_description: "Learn about Kenya's budget process and how you can participate in budget decisions."
  },
  {
    title: "Health Sector Budget 2025-26: Focus on Universal Health Coverage",
    slug: "health-sector-budget-2025-26-universal-health-coverage",
    excerpt: "The proposed health sector budget prioritizes Universal Health Coverage with a 20% allocation increase.",
    content: JSON.stringify({
      html: `<h2>Health Budget for Universal Health Coverage</h2>
<p>The proposed health sector budget for FY 2025-26 allocates KSh 180B, a 20% increase, focused on achieving Universal Health Coverage (UHC).</p>
<h3>Key Allocations:</h3>
<ul>
<li><strong>Primary Healthcare:</strong> KSh 65B</li>
<li><strong>Hospital Services:</strong> KSh 55B</li>
<li><strong>Health Insurance Subsidy Program:</strong> KSh 35B</li>
<li><strong>Medical Supplies Authority:</strong> KSh 15B</li>
<li><strong>Health Worker Training:</strong> KSh 10B</li>
</ul>
<h3>UHC Priorities:</h3>
<ul>
<li>Expansion of Linda Mama program</li>
<li>Free healthcare for under-5 children and over-65 elderly</li>
<li>Community health promoter program scale-up</li>
<li>Equipment and infrastructure at Level 2-3 facilities</li>
</ul>
<h3>Expected Impact:</h3>
<p>These allocations are expected to reduce out-of-pocket health expenditure from 30% to 20% of total health spending.</p>`,
      plain: "The proposed health sector budget for FY 2025-26 allocates KSh 180B, a 20% increase, focused on achieving Universal Health Coverage."
    }),
    cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category_id: categories.insights,
    status: "published",
    is_featured: true,
    published_at: "2026-01-05T00:00:00Z",
    reading_time_minutes: 7,
    seo_title: "Health Sector Budget 2025-26: Universal Health Coverage Focus",
    seo_description: "The proposed health sector budget prioritizes Universal Health Coverage with a 20% allocation increase."
  },
];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {},
        },
      }
    );

    // Check authentication - only allow authenticated users to seed
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Login required to seed data" },
        { status: 401 }
      );
    }

    // Insert seed data (upsert to handle re-runs)
    const { data, error } = await supabase
      .from("blogs")
      .upsert(seedData, { onConflict: "slug" })
      .select();

    if (error) {
      console.error("Error seeding data:", error);
      return NextResponse.json(
        { error: "Failed to seed data: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${seedData.length} blog posts!`,
      data 
    });

  } catch (error) {
    console.error("Seed process failed:", error);
    return NextResponse.json(
      { error: "Seed process failed" },
      { status: 500 }
    );
  }
}
