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

// Seed data for news table
const seedNewsData = [
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
<p>This budget will determine funding allocations for critical services including healthcare, education, infrastructure, and water services for the fiscal year starting July 1, 2026.</p>`,
      plain: "Important Budget Deadline Approaching"
    }),
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    category_id: categories.county,
    status: "published",
    is_featured: true,
    published_at: "2026-02-15T00:00:00Z",
    reading_time_minutes: 5,
    source: "Budget Ndio Story",
    source_url: "https://example.com/budget-2026"
  },
  {
    title: "National Treasury Releases FY 2026 Budget Framework",
    slug: "national-treasury-releases-fy-2026-budget-framework",
    excerpt: "The National Treasury has released the comprehensive budget framework for FY 2026, outlining key priorities and allocations.",
    content: JSON.stringify({
      html: `<h2>Budget Framework Overview</h2>
<p>The National Treasury has released the FY 2026 budget framework, focusing on infrastructure development, healthcare improvement, and education sector funding.</p>
<h3>Key Allocations:</h3>
<ul>
<li>Infrastructure: KES 350 billion</li>
<li>Healthcare: KES 280 billion</li>
<li>Education: KES 320 billion</li>
<li>Agriculture: KES 150 billion</li>
</ul>`,
      plain: "National Treasury Budget Framework"
    }),
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
    category_id: categories.news,
    status: "published",
    is_featured: true,
    published_at: "2026-02-10T00:00:00Z",
    reading_time_minutes: 4,
    source: "National Treasury",
    source_url: "https://treasury.go.ke"
  },
  {
    title: "Understanding the New Property Tax Guidelines for 2026",
    slug: "understanding-property-tax-guidelines-2026",
    excerpt: "A comprehensive guide to the new property tax guidelines that will take effect in the 2026 fiscal year.",
    content: JSON.stringify({
      html: `<h2>Property Tax Guidelines 2026</h2>
<p>The government has introduced new property tax guidelines aimed at improving revenue collection at the county level.</p>
<h3>Key Changes:</h3>
<ul>
<li>Updated valuation methods</li>
<li>New exemption categories</li>
<li>Online payment systems</li>
</ul>`,
      plain: "Property Tax Guidelines"
    }),
    cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    category_id: categories.news,
    status: "published",
    published_at: "2026-02-08T00:00:00Z",
    reading_time_minutes: 6,
  },
  {
    title: "County Budgets: A Deep Dive into Healthcare Spending",
    slug: "county-budgets-healthcare-spending-2026",
    excerpt: "Analysis of healthcare budget allocations across different counties and what it means for citizens.",
    content: JSON.stringify({
      html: `<h2>Healthcare Spending Analysis</h2>
<p>This report analyzes healthcare budget allocations across Kenya's counties for FY 2025-26.</p>`,
      plain: "Healthcare Spending Analysis"
    }),
    cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    category_id: categories.county,
    status: "published",
    published_at: "2026-02-05T00:00:00Z",
    reading_time_minutes: 8,
  },
  {
    title: "Public Participation: How Your Voice Shapes the Budget",
    slug: "public-participation-budget-process",
    excerpt: "Learn how citizens can actively participate in the budget-making process at county and national levels.",
    content: JSON.stringify({
      html: `<h2>Your Voice in the Budget</h2>
<p>Public participation is a critical part of Kenya's budget process. Here's how you can get involved.</p>`,
      plain: "Public Participation Guide"
    }),
    cover_image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
    category_id: categories.insights,
    status: "published",
    published_at: "2026-02-01T00:00:00Z",
    reading_time_minutes: 5,
  },
  {
    title: "Education Sector Budget: What's Changed for 2026",
    slug: "education-sector-budget-2026-changes",
    excerpt: "Key changes in education funding and what they mean for schools, teachers, and students.",
    content: JSON.stringify({
      html: `<h2>Education Budget 2026</h2>
<p>The education sector continues to receive significant funding in the 2026 budget.</p>`,
      plain: "Education Budget Analysis"
    }),
    cover_image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    category_id: categories.news,
    status: "published",
    published_at: "2026-01-28T00:00:00Z",
    reading_time_minutes: 7,
  },
];

/**
 * POST /api/seed/news
 * Seed news data (requires authentication)
 */
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

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Login required to seed data" },
        { status: 401 }
      );
    }

    // Insert seed data (upsert to handle re-runs)
    const { data, error } = await supabase
      .from("news")
      .upsert(seedNewsData, { onConflict: "slug" })
      .select();

    if (error) {
      console.error("Error seeding news:", error);
      return NextResponse.json(
        { error: "Failed to seed news: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${seedNewsData.length} news articles`,
      data 
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
