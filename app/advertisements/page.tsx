import { Metadata } from "next";
import { 
  Megaphone, 
  Calendar, 
  Globe, 
  Award, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/shadcn-space/animations/marquee";

export const metadata: Metadata = {
  title: "Advertisements & Sponsorships - Budget Ndio Story",
  description: "Advertise with Budget Ndio Story. Reach engaged citizens across 47+ countries with budget transparency content.",
};

// Current advertised sponsors
const currentSponsors = [
  {
    name: "World Bank Kenya",
    tagline: "Building a Better Kenya",
    type: "Campaign Sponsor",
    category: "Development",
    logo: "WB",
    color: "blue"
  },
  {
    name: "USAID Kenya",
    tagline: "Partnership for Prosperity",
    type: "Program Sponsor",
    category: "Development",
    logo: "USAID",
    color: "red"
  },
  {
    name: "Kenya Government - Ministry of Finance",
    tagline: "Public Finance for Development",
    type: "Government Partner",
    category: "Government",
    logo: "GOK",
    color: "green"
  },
  {
    name: "EU Delegation to Kenya",
    tagline: "Team Europe for Kenya",
    type: "Development Partner",
    category: "International",
    logo: "EU",
    color: "blue"
  },
  {
    name: "UNDP Kenya",
    tagline: "Future-Ready Kenya",
    type: "Program Sponsor",
    category: "Development",
    logo: "UNDP",
    color: "teal"
  }
];

// Advertisement packages
const advertisementPackages = [
  {
    name: "Banner Package",
    description: "Display advertisements on our website pages",
    price: "$500 - $2,000/month",
    features: [
      "Leaderboard banners (728x90)",
      "Medium rectangle (300x250)",
      "Mobile-responsive design",
      "Monthly performance report",
      "Targeted placement options"
    ],
    popular: false
  },
  {
    name: "Content Sponsorship",
    description: "Sponsor specific content or newsletter editions",
    price: "$1,500 - $5,000/campaign",
    features: [
      "Sponsored article inclusion",
      "Logo on featured content",
      "Newsletter feature (50K+ subscribers)",
      "Social media shoutout",
      "Dedicated landing page"
    ],
    popular: true
  },
  {
    name: "Event Partnership",
    description: "Associate your brand with our events",
    price: "$3,000 - $10,000/event",
    features: [
      "Co-branded event materials",
      "Speaking opportunity",
      "Exhibition booth",
      "Delegate list access",
      "Post-event reporting"
    ],
    popular: false
  },
  {
    name: "Annual Partnership",
    description: "Year-long strategic partnership",
    price: "$25,000 - $100,000/year",
    features: [
      "All advertising packages included",
      "Priority placement",
      "Custom reporting dashboard",
      "Dedicated account manager",
      "Board advisory invitation"
    ],
    popular: false
  }
];

// Upcoming campaigns
const upcomingCampaigns = [
  {
    name: "FY 2026 Budget Season",
    startDate: "June 2026",
    description: "Kenya's annual budget reading coverage and analysis",
    expectedReach: "500,000+ pageviews",
    status: "Open"
  },
  {
    name: "Youth Civic Engagement Month",
    startDate: "July 2026",
    description: "Youth-focused civic education and participation campaign",
    expectedReach: "200,000+ engaged youth",
    status: "Open"
  },
  {
    name: "County Budget Tracker Launch",
    startDate: "September 2026",
    description: "New tool launch for tracking county-level budgets",
    expectedReach: "100,000+ users",
    status: "Coming Soon"
  }
];

const audienceStats = [
  { value: "50,000+", label: "Monthly Unique Visitors", icon: Users },
  { value: "150,000+", label: "Monthly Page Views", icon: Globe },
  { value: "12,000+", label: "Newsletter Subscribers", icon: Megaphone },
  { value: "47+", label: "Countries Reached", icon: TrendingUp }
];

const guidelines = [
  "All advertisements must align with our mission of budget transparency",
  "No political advertising or partisan content",
  "No advertising for harmful products (tobacco, alcohol, etc.)",
  "All sponsored content must be clearly disclosed",
  "We reserve the right to reject any advertisement"
];

export default function AdvertisementsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-blue/5" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6">
              <Megaphone className="h-4 w-4" />
              Advertise With Us
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Reach Engaged Citizens Worldwide
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our audience of budget-conscious citizens, policymakers, 
              journalists, and civil society leaders across 47+ countries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 bg-amber-600 hover:bg-amber-700">
                Advertise Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="#packages">
                  View Packages
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {audienceStats.map((stat, index) => (
              <Card key={index} className="bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors Marquee */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
            <Award className="h-6 w-6" />
            Our Current Sponsors & Partners
          </h2>
        </div>
        <Marquee pauseOnHover className="py-4" duration="25s" reverse>
          {currentSponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="mx-8 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4"
            >
              <div className={`h-12 w-12 rounded-lg bg-white flex items-center justify-center ${
                sponsor.color === 'blue' ? 'text-blue-600' :
                sponsor.color === 'red' ? 'text-red-600' :
                sponsor.color === 'green' ? 'text-green-600' :
                'text-teal-600'
              }`}>
                <span className="text-xs font-bold">{sponsor.logo}</span>
              </div>
              <div className="text-white">
                <p className="font-semibold">{sponsor.name}</p>
                <p className="text-sm text-white/80">{sponsor.tagline}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Advertisement Packages */}
      <section id="packages" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advertisement Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible options to reach our engaged audience. All packages include detailed 
              performance metrics and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advertisementPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-amber-500 border-2 shadow-lg' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600 mb-4">{pkg.price}</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Upcoming Campaigns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Campaign Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sponsor our high-impact campaigns and connect with audiences during key moments 
              in Kenya's budget cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingCampaigns.map((campaign, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant={campaign.status === "Open" ? "default" : "secondary"}>
                      {campaign.status === "Open" ? "Open" : "Coming Soon"}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {campaign.startDate}
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{campaign.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{campaign.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-amber-600" />
                    <span className="font-medium">Expected Reach:</span>
                    <span>{campaign.expectedReach}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-amber-600" />
                Advertising Guidelines
              </CardTitle>
              <CardDescription>
                All advertisements on Budget Ndio Story must adhere to our standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5" />
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-6" />
              <p className="text-sm text-muted-foreground">
                <Clock className="h-4 w-4 inline mr-1" />
                Advertisement review typically takes 2-3 business days. Contact us for 
                custom packages or long-term partnerships.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Reach Our Global Audience?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Get in touch to discuss custom advertising solutions tailored to your 
            organization's goals and budget.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 bg-white text-amber-600 hover:bg-amber-50">
              Request Media Kit
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/10" asChild>
              <a href="mailto:advertising@budgetndiostory.org">
                Contact Sales
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
