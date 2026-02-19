-- Seed data for Budget Ndio Story - Calendar Dates and Blog/News Entries
-- Run this in Supabase SQL Editor

-- Important: This SQL uses the service role to bypass RLS for seeding
-- Make sure to run as service role or disable RLS temporarily

-- Insert seed data into blogs table
INSERT INTO blogs (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category_id,
  status,
  is_featured,
  published_at,
  reading_time_minutes,
  seo_title,
  seo_description,
  created_at,
  updated_at
) VALUES
(
  'FY 2025-26 County Budget Deadline - March 31, 2026',
  'fy-2025-26-county-budget-deadline-march-2026',
  'County governments must submit their FY 2025-26 budget proposals by March 31, 2026. Learn about the key requirements and timelines.',
  '{"html":"<h2>Important Budget Deadline Approaching</h2><p>County governments have until <strong>March 31, 2026</strong> to submit their FY 2025-26 budget proposals to the Controller of Budget.</p><h3>Key Requirements:</h3><ul><li>Comprehensive revenue projections</li><li>Detailed expenditure estimates by sector</li><li>Debt management plan</li><li>Public participation documentation</li></ul><h3>What This Means for Citizens:</h3><p>This budget will determine funding allocations for critical services including healthcare, education, infrastructure, and water services for the fiscal year starting July 1, 2026.</p><h3>How to Participate:</h3><p>Citizens can engage with their county assemblies during public participation forums held before the budget is finalized.</p>","plain":"Important Budget Deadline Approaching"}',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
  'd9975dda-6195-499b-8f2b-128c6f1c7115', -- County
  'published',
  true,
  '2026-02-15T00:00:00Z',
  5,
  'FY 2025-26 County Budget Deadline - March 31, 2026',
  'Important deadline for county budget submissions. Learn about key requirements and how to participate.',
  NOW(),
  NOW()
),
(
  'National Treasury Budget Review Committee Meetings - February 2026',
  'national-treasury-budget-review-committee-february-2026',
  'The National Treasury''s Budget Review Committee meets throughout February 2026 to analyze sector budget proposals.',
  '{"html":"<h2>National Treasury Budget Review</h2><p>The Budget Review Committee (BRC) convenes in February 2026 to analyze and prioritize budget requests from all government sectors.</p><h3>Key Sectors Under Review:</h3><ul><li>Education - Allocation for free education programs</li><li>Healthcare - Universal Health Coverage funding</li><li>Infrastructure - Roads and public works</li><li>Agriculture - Farmer support programs</li></ul><h3>Expected Outcomes:</h3><p>The committee will submit its recommendations to the Cabinet by end of February.</p>","plain":"The National Treasury Budget Review Committee meets in February 2026."}',
  'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
  '0c5be222-0238-4988-96eb-a8f0875670f4', -- News
  'published',
  false,
  '2026-02-10T00:00:00Z',
  4,
  'National Treasury Budget Review Committee - February 2026',
  'The Budget Review Committee analyzes sector budget proposals for FY 2025-26.',
  NOW(),
  NOW()
),
(
  'Public Participation Forums Schedule - February-March 2026',
  'public-participation-forums-schedule-february-march-2026',
  'Schedule of public participation forums for the FY 2025-26 budget across all 47 counties.',
  '{"html":"<h2>Have Your Say in the Budget</h2><p>Public participation is a constitutional right and critical part of the budget process.</p><h3>National Level:</h3><ul><li>February 20, 2026 - Nairobi County Hall</li><li>February 22, 2026 - Mombasa City Hall</li><li>February 24, 2026 - Kisumu City Hall</li></ul><h3>County Level:</h3><p>Each county assembly will hold at least three public participation forums.</p>","plain":"Schedule of public participation forums for the FY 2025-26 budget."}',
  'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800',
  'b4eb7410-f5f9-497e-80a6-f7d852028385', -- Learn
  'published',
  true,
  '2026-02-08T00:00:00Z',
  6,
  'Public Participation Forums Schedule - February-March 2026',
  'Schedule of public participation forums for the FY 2025-26 budget.',
  NOW(),
  NOW()
),
(
  'FY 2024-25 Budget Implementation Report: Key Outcomes',
  'fy-2024-25-budget-implementation-report-key-outcomes',
  'Analysis of the FY 2024-25 budget implementation - what was achieved, challenges faced, and lessons learned.',
  '{"html":"<h2>FY 2024-25 Budget Implementation Review</h2><p>The government has released the implementation report for FY 2024-25, showing mixed results.</p><h3>Key Achievements:</h3><ul><li><strong>Education:</strong> Free Day Secondary Education received 100% of allocated funds (KSh 42.8B)</li><li><strong>Healthcare:</strong> Linda Mama program covered 1.2M deliveries</li><li><strong>Infrastructure:</strong> 2,500km of roads maintained</li></ul><h3>Challenges:</h3><ul><li>Revenue shortfall of 8.3%</li><li>Delayed disbursements to counties</li><li>Pending bills of KSh 120B</li></ul>","plain":"Analysis of the FY 2024-25 budget implementation."}',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'dd85234c-ccf6-428f-b0ce-ff2339f284ad', -- Budget Reports
  'published',
  true,
  '2026-01-28T00:00:00Z',
  8,
  'FY 2024-25 Budget Implementation Report: Key Outcomes',
  'Analysis of the FY 2024-25 budget implementation - achievements and challenges.',
  NOW(),
  NOW()
),
(
  'Controller of Budget''s Mid-Term Review: Counties Miss Targets',
  'controller-of-budget-mid-term-review-counties-2025',
  'The Controller of Budget''s mid-term review shows most counties missed absorption targets for FY 2024-25.',
  '{"html":"<h2>Mid-Term Budget Absorption Review</h2><p>The Controller of Budget''s mid-term review for FY 2024-25 reveals that only 12 of 47 counties met their budget absorption targets.</p><h3>Key Findings:</h3><ul><li><strong>Average Absorption Rate:</strong> 68% (target was 75%)</li><li><strong>Best Performers:</strong> Nairobi (89%), Nakuru (82%), Kiambu (79%)</li><li><strong>Lowest Performers:</strong> Wajir (42%), Mandera (45%)</li></ul>","plain":"Most counties missed absorption targets according to the Controller of Budget mid-term review."}',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  'e96ea3f1-d1c9-4ba9-9b89-16da8c4f8358', -- Insights
  'published',
  false,
  '2026-01-20T00:00:00Z',
  6,
  'Controller of Budget Mid-Term Review 2025',
  'Most counties missed budget absorption targets according to the Controller of Budget''s mid-term review.',
  NOW(),
  NOW()
),
(
  'Education Sector Budget Allocation Increase for FY 2025-26',
  'education-sector-budget-allocation-increase-fy-2025-26',
  'The Ministry of Education has proposed a 15% increase in education budget allocation for FY 2025-26.',
  '{"html":"<h2>Education Budget 2025-26</h2><p>The proposed budget for the education sector for FY 2025-26 stands at KSh 650B, a 15% increase.</p><h3>Proposed Allocations:</h3><ul><li><strong>Free Day Secondary Education:</strong> KSh 52B</li><li><strong>Technical and Vocational Education:</strong> KSh 18B</li><li><strong>University Education:</strong> KSh 45B</li><li><strong>School Infrastructure:</strong> KSh 25B</li></ul>","plain":"15% increase proposed in education budget allocation for FY 2025-26."}',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  '0c5be222-0238-4988-96eb-a8f0875670f4', -- News
  'published',
  true,
  '2026-01-15T00:00:00Z',
  5,
  'Education Sector Budget FY 2025-26',
  '15% increase proposed in education budget allocation for FY 2025-26.',
  NOW(),
  NOW()
),
(
  'Understanding the Budget Process: A Citizen''s Guide',
  'understanding-budget-process-citizens-guide',
  'A comprehensive guide to understanding Kenya''s budget process and how citizens can participate.',
  '{"html":"<h2>Kenya''s Budget Process Explained</h2><p>The budget process in Kenya follows a constitutional timeline.</p><h3>The Budget Cycle:</h3><ol><li><strong>February:</strong> Budget Review Committee analyzes proposals</li><li><strong>March:</strong> Budget Policy Statement presented</li><li><strong>April:</strong> Sector hearings and public participation</li><li><strong>May:</strong> Budget estimates presented to Parliament</li><li><strong>June:</strong> Parliament debates and passes the Appropriation Bill</li><li><strong>July:</strong> New fiscal year begins</li></ol>","plain":"A comprehensive guide to understanding Kenya''s budget process."}',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
  'b4eb7410-f5f9-497e-80a6-f7d852028385', -- Learn
  'published',
  false,
  '2026-01-10T00:00:00Z',
  10,
  'Understanding the Budget Process: A Citizen''s Guide',
  'Learn about Kenya''s budget process and how you can participate in budget decisions.',
  NOW(),
  NOW()
),
(
  'Health Sector Budget 2025-26: Focus on Universal Health Coverage',
  'health-sector-budget-2025-26-universal-health-coverage',
  'The proposed health sector budget prioritizes Universal Health Coverage with a 20% allocation increase.',
  '{"html":"<h2>Health Budget for Universal Health Coverage</h2><p>The proposed health sector budget for FY 2025-26 allocates KSh 180B, a 20% increase.</p><h3>Key Allocations:</h3><ul><li><strong>Primary Healthcare:</strong> KSh 65B</li><li><strong>Hospital Services:</strong> KSh 55B</li><li><strong>Health Insurance Subsidy Program:</strong> KSh 35B</li></ul><h3>UHC Priorities:</h3><ul><li>Expansion of Linda Mama program</li><li>Free healthcare for under-5 and over-65</li></ul>","plain":"The proposed health sector budget prioritizes Universal Health Coverage with a 20% increase."}',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  'e96ea3f1-d1c9-4ba9-9b89-16da8c4f8358', -- Insights
  'published',
  true,
  '2026-01-05T00:00:00Z',
  7,
  'Health Sector Budget 2025-26: Universal Health Coverage Focus',
  'The proposed health sector budget prioritizes Universal Health Coverage with a 20% allocation increase.',
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  cover_image = EXCLUDED.cover_image,
  category_id = EXCLUDED.category_id,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  published_at = EXCLUDED.published_at,
  reading_time_minutes = EXCLUDED.reading_time_minutes,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  updated_at = NOW();

-- Verify the insert
SELECT id, title, status, published_at FROM blogs ORDER BY published_at DESC;
