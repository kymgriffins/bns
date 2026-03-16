import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Screen data from public/htmlmd directory with extracted text content
const screens = [
  {
    id: "home",
    title: "Home",
    subtitle: "Follow the Budget",
    description: "Main landing page with hero section, quick actions, and budget overview",
    path: "/home:_follow_the_budget",
    category: "Core",
    icon: "home",
    color: "bg-green-500",
    hero: {
      heading: "Follow the Budget. Find the Story.",
      subtitle: "Turning complex Kenyan government budgets into clear, actionable insights for every citizen.",
      cta: "VIEW LATEST REPORT",
      secondaryCta: "TAKE ACTION",
    },
    quickLinks: [
      { title: "Budget Basics", description: "Learn how the money flows." },
      { title: "Budget Calendar", description: "Key dates for oversight." },
    ],
    latestSection: {
      badge: "Live Tracking",
      tabs: ["Stories", "Videos", "Updates"],
      featuredStory: "The Nairobi Health Fund: Where did the 2 Billion go?",
    },
    navigation: ["Home", "Budgets", "Voice", "Profile"],
  },
  {
    id: "budget-insights",
    title: "Budget Insights",
    subtitle: "Sector Analysis",
    description: "National, county, and sector budget analysis with participation tracking",
    path: "/budget_insights:_sector_analysis",
    category: "Analytics",
    icon: "analytics",
    color: "bg-blue-500",
    hero: {
      heading: "Budget Insights",
    },
    tabs: ["National", "County", "Sector"],
    sections: [
      { title: "Youth Lens", description: "Budgets through young eyes" },
    ],
    sectors: [
      { name: "Health & UHC", percentage: 68, points: "12 Participation Pts" },
    ],
    navigation: ["Home", "Insights", "Debate", "Account"],
  },
  {
    id: "budget-reports",
    title: "Budget Reports",
    subtitle: "Simplified Briefs",
    description: "Searchable budget report cards with finance bills and county estimates",
    path: "/budget_reports:_simplified_briefs",
    category: "Documents",
    icon: "description",
    color: "bg-purple-500",
    hero: {
      heading: "Simplified Reports",
      subtitle: "The budget, minus the jargon. 🇰🇪",
    },
    search: "Search by county or keyword...",
    filters: ["All", "Finance Bill", "County Estimates", "Policy Statement"],
    metadata: ["Year: 2024", "Sector: All"],
    navigation: ["Home", "Reports", "Calendar", "Profile"],
  },
  {
    id: "budget-tracker",
    title: "Budget Tracker",
    subtitle: "Delivery Tracking",
    description: "Project delivery tracking with progress indicators and evidence submission",
    path: "/budget_tracker:_delivery_tracking",
    category: "Tracking",
    icon: "track_changes",
    color: "bg-orange-500",
    hero: {
      heading: "Track delivery, not promises.",
    },
    categories: ["All Sectors", "Youth Livelihoods"],
    projects: [
      { 
        category: "Youth Livelihoods", 
        title: "Youth Fund Distribution", 
        status: "ON TRACK",
        progress: { allocated: true, released: true, delivered: false },
        evidence: "M-Pesa disbursement confirmed by 500+ recipients in Nairobi County."
      },
    ],
    navigation: ["Home", "Track", "Add", "Debate", "Profile"],
  },
  {
    id: "learn",
    title: "Learn",
    subtitle: "Budget 101 Basics",
    description: "Educational modules on understanding Kenyan budgets and the budget cycle",
    path: "/civic-hub:_budget_101_basics",
    category: "Education",
    icon: "school",
    color: "bg-teal-500",
    hero: {
      heading: "Budget 101",
      subtitle: "Understand where your money goes.",
      cta: "START LEARNING",
    },
    progress: "35%",
    modules: [
      { title: "The Basics", status: "completed", duration: "4:20 MINS" },
      { title: "The Budget Cycle", status: "active", stages: ["Formulation", "Approval", "Implementation"] },
      { title: "Reading Tables", status: "locked" },
    ],
    navigation: ["Home", "Learn", "Tracker", "Profile"],
  },
  {
    id: "news",
    title: "News",
    subtitle: "Stories & Updates",
    description: "News feed with investigative stories, videos, and public participation updates",
    path: "/news:_stories_&_updates",
    category: "Content",
    icon: "newspaper",
    color: "bg-red-500",
    hero: {
      heading: "Stories & Updates",
    },
    tabs: ["Stories", "Videos", "Updates"],
    featuredStory: {
      type: "breaking",
      category: "Investigations",
      title: "The 500M Road to Nowhere: Where did the Nakuru infrastructure fund go?",
      readTime: "8 min read",
      time: "2h ago",
    },
    videos: [
      { title: "Finance Bill 2024: What it means for your pocket", views: "12.4k" },
    ],
    updates: [
      { 
        type: "Public Participation",
        title: "Mombasa County Budget Estimates Review",
        date: { month: "Oct", day: 12 },
        actions: ["Add to Calendar", "Download Draft"]
      },
    ],
    navigation: ["Home", "News", "Debate", "Profile"],
  },
  {
    id: "take-action",
    title: "Take Action",
    subtitle: "Youth Participation",
    description: "Action pathways for youth engagement and county chapter initiation",
    path: "/take_action:_youth_participation",
    category: "Engagement",
    icon: "volunteer_activism",
    color: "bg-pink-500",
    hero: {
      heading: "Make Your Voice Count",
      subtitle: "Turn awareness into action.",
    },
    actions: [
      { title: "Start a County Chapter", icon: "rocket_launch" },
      { title: "Join a Campaign", icon: "campaign" },
      { title: "Submit Evidence", icon: "fact_check" },
      { title: "Attend a Hearing", icon: "groups" },
    ],
    cta: "Start a County Chapter",
    navigation: ["Home", "Action", "Community", "Profile"],
  },
  {
    id: "about",
    title: "About",
    subtitle: "Mission & Partners",
    description: "Mission statement, partner information, and email subscription",
    path: "/about:_mission_&_partners",
    category: "Info",
    icon: "info",
    color: "bg-indigo-500",
    hero: {
      heading: "About Budget Ndio Story",
      subtitle: "Making Kenyan budgets accessible to everyone.",
    },
    mission: "We believe every Kenyan has the right to understand how their money is being spent.",
    partners: ["National Treasury", "ICJ Kenya", "Youth Organizations", "County Governments"],
    subscribe: {
      placeholder: "Email address",
      cta: "Subscribe",
    },
    navigation: ["Home", "About", "Contact", "Profile"],
  },
];

export default function DesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#112117] via-[#0a130e] to-[#1a2e22] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#112117]/80 backdrop-blur-md border-b border-[#30e87a]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#30e87a] rounded-lg flex items-center justify-center">
              <span className="material-icons text-[#112117]">design_services</span>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Design System</h1>
              <p className="text-xs text-[#30e87a]/60">Budget Ndio Story</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-[#30e87a]/30 text-[#30e87a]">
              {screens.length} Screens
            </Badge>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                <span className="material-icons text-sm mr-1">arrow_back</span>
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Design System Info */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/5 border-[#30e87a]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#30e87a]">Primary Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#30e87a]"></div>
                  <div>
                    <p className="font-mono text-sm">#30e87a</p>
                    <p className="text-xs text-white/50">Green</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-[#30e87a]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#30e87a]">Background Dark</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#112117] border border-white/10"></div>
                  <div>
                    <p className="font-mono text-sm">#112117</p>
                    <p className="text-xs text-white/50">Dark Green</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-[#30e87a]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#30e87a]">Background Light</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#f6f8f7]"></div>
                  <div>
                    <p className="font-mono text-sm">#f6f8f7</p>
                    <p className="text-xs text-white/50">Light Gray</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-[#30e87a]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#30e87a]">Font Family</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="material-icons text-[#30e87a]">text_fields</span>
                  </div>
                  <div>
                    <p className="font-mono text-sm">Manrope</p>
                    <p className="text-xs text-white/50">Display Font</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Screens Gallery */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Screen Gallery</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#30e87a]/30 to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {screens.map((screen) => (
              <Card 
                key={screen.id} 
                className="group bg-white/5 border-[#30e87a]/10 hover:border-[#30e87a]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Screen Preview */}
                <div className="relative aspect-[9/19] bg-[#0a130e] overflow-hidden">
                  <Image
                    src={`${screen.path}/screen.png`}
                    alt={screen.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a130e] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${screen.color} text-white text-[10px] font-bold`}>
                      {screen.category}
                    </Badge>
                  </div>

                  {/* Screen Number */}
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
                      {screens.indexOf(screen) + 1}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{screen.title}</CardTitle>
                      <CardDescription className="text-[#30e87a]/70">
                        {screen.subtitle}
                      </CardDescription>
                    </div>
                    <div className={`w-8 h-8 rounded-lg ${screen.color}/20 flex items-center justify-center`}>
                      <span className={`material-icons text-sm ${screen.color.replace('bg-', 'text-')}`}>
                        {screen.icon}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">
                    {screen.description}
                  </p>
                  
                  {/* Extracted Text Data */}
                  <div className="space-y-3 mb-4">
                    {/* Hero Text */}
                    {screen.hero?.heading && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-[#30e87a]/60 uppercase tracking-wider mb-1">Hero Heading</p>
                        <p className="text-sm font-semibold text-white/90 line-clamp-2">{screen.hero.heading}</p>
                        {screen.hero?.subtitle && (
                          <p className="text-xs text-white/50 mt-1 line-clamp-1">{screen.hero.subtitle}</p>
                        )}
                      </div>
                    )}

                    {/* Tabs/Sections */}
                    {screen.tabs && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-[#30e87a]/60 uppercase tracking-wider mb-2">Tabs</p>
                        <div className="flex flex-wrap gap-1">
                          {screen.tabs.map((tab: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-[10px] border-white/20 text-white/70">
                              {tab}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    {screen.navigation && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-[#30e87a]/60 uppercase tracking-wider mb-2">Navigation</p>
                        <div className="flex flex-wrap gap-1">
                          {screen.navigation.map((nav: string, i: number) => (
                            <Badge key={i} className="text-[10px] bg-[#30e87a]/20 text-[#30e87a]">
                              {nav}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Featured Story */}
                    {screen.featuredStory && typeof screen.featuredStory === 'object' && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-[#30e87a]/60 uppercase tracking-wider mb-2">Featured Content</p>
                        <p className="text-xs font-semibold text-white/90 line-clamp-2">{screen.featuredStory.title}</p>
                        <p className="text-[10px] text-white/50 mt-1">{screen.featuredStory.readTime || screen.featuredStory.time}</p>
                      </div>
                    )}

                    {/* Progress/Status */}
                    {screen.progress && (
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[10px] text-[#30e87a]/60 uppercase tracking-wider mb-1">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#30e87a]" 
                              style={{ width: screen.progress }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-[#30e87a]">{screen.progress}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#30e87a] text-[#112117] hover:bg-[#30e87a]/90 font-semibold"
                      asChild
                    >
                      <a href={`${screen.path}/code.html`} target="_blank" rel="noopener noreferrer">
                        <span className="material-icons text-sm mr-1">code</span>
                        View Code
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#30e87a]/30 text-[#30e87a] hover:bg-[#30e87a]/10"
                      asChild
                    >
                      <a href={`${screen.path}/code.html`} target="_blank" rel="noopener noreferrer">
                        <span className="material-icons text-sm">open_in_new</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Source Info */}
        <section className="mt-12 pt-8 border-t border-[#30e87a]/10">
          <Card className="bg-[#30e87a]/5 border-[#30e87a]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#30e87a]">
                <span className="material-icons">source</span>
                Data Source
              </CardTitle>
              <CardDescription className="text-white/60">
                All designs are sourced from public HTML files with embedded data structures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#30e87a]/20 flex items-center justify-center">
                    <span className="material-icons text-[#30e87a]">folder</span>
                  </div>
                  <div>
                    <p className="font-semibold">8 HTML Files</p>
                    <p className="text-xs text-white/50">Mobile-first designs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#30e87a]/20 flex items-center justify-center">
                    <span className="material-icons text-[#30e87a]">image</span>
                  </div>
                  <div>
                    <p className="font-semibold">8 Preview Images</p>
                    <p className="text-xs text-white/50">Screen captures</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#30e87a]/20 flex items-center justify-center">
                    <span className="material-icons text-[#30e87a]">palette</span>
                  </div>
                  <div>
                    <p className="font-semibold">Tailwind CSS</p>
                    <p className="text-xs text-white/50">Dark mode support</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
