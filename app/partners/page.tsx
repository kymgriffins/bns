import { Metadata } from "next";
import { 
  Globe, 
  Award, 
  Handshake, 
  MapPin, 
  ArrowRight, 
  Users,
  TrendingUp,
  Building2,
  Calendar,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/shadcn-space/animations/marquee";

export const metadata: Metadata = {
  title: "Global Partners Network - Budget Ndio Story",
  description: "Join our global network of partners working together for budget transparency and civic empowerment worldwide.",
};

// Partner data
const premierPartners = [
  {
    name: "The Continental Pot",
    image: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
    type: "Media Partner",
    region: "Africa",
    description: "Leading African media platform covering continental stories",
    website: "https://continentalpot.africa"
  },
  {
    name: "Colour Twist Media",
    image: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
    type: "Media Partner",
    region: "East Africa",
    description: "Creative media solutions for East African audiences",
    website: "https://colortwistmedia.co.ke"
  },
  {
    name: "Sen Media & Events",
    image: "https://senmedia-events.co.ke/wp-content/uploads/2023/09/logo_result.webp",
    type: "Event Partner",
    region: "Kenya",
    description: "Professional event management and media services",
    website: "https://senmedia-events.co.ke"
  }
];

const strategicPartners = [
  {
    name: "Open Government Partnership",
    type: "Technology Partner",
    region: "Global",
    description: "Global initiative for open government reform",
    logo: "OGP"
  },
  {
    name: "International Budget Partnership",
    type: "Research Partner",
    region: "Global",
    description: "Advancing budget transparency and accountability",
    logo: "IBP"
  },
  {
    name: "Transparency International",
    type: "Civil Society Partner",
    region: "Global",
    description: "Global anti-corruption coalition",
    logo: "TI"
  },
  {
    name: "African Centre for Public Policy",
    type: "Think Tank",
    region: "Africa",
    description: "Policy research and advocacy in Africa",
    logo: "ACPP"
  },
  {
    name: "Youth in Governance Network",
    type: "Civil Society Partner",
    region: "Africa",
    description: "Empowering youth participation in governance",
    logo: "YIGN"
  }
];

const regionalHubs = [
  {
    city: "Nairobi",
    country: "Kenya",
    region: "Africa",
    role: "Regional Headquarters",
    flag: "🇰🇪"
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    role: "Regional Hub",
    flag: "🇸🇬"
  },
  {
    city: "Brussels",
    country: "Belgium",
    region: "Europe",
    role: "EU Affairs Office",
    flag: "🇧🇪"
  },
  {
    city: "Washington D.C.",
    country: "USA",
    region: "Americas",
    role: "Americas Desk",
    flag: "🇺🇸"
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access our network of 47+ countries and expand your organization's international presence"
  },
  {
    icon: Users,
    title: "Civic Impact",
    description: "Join 15,000+ citizens engaged in budget transparency and democratic participation"
  },
  {
    icon: TrendingUp,
    title: "Capacity Building",
    description: "Access training programs, resources, and expertise from our global team"
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Get featured in our reports, events, and communications as an official partner"
  }
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-blue-950/30 dark:via-background dark:to-teal-950/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              Global Network
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Our Global Partners Network
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Building a worldwide movement for budget transparency, civic empowerment, 
              and democratic accountability—together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700">
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="#current-partners">
                  View Current Partners
                </a>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: "47+", label: "Countries", icon: Globe },
              { value: "200+", label: "Partner Organizations", icon: Handshake },
              { value: "15K+", label: "Citizens Engaged", icon: Users },
              { value: "120+", label: "Programs Delivered", icon: TrendingUp }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premier Partners Marquee */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-bold text-white text-center">Our Premier Partners</h2>
        </div>
        <Marquee pauseOnHover className="py-4" duration="25s">
          {premierPartners.map((partner, index) => (
            <div 
              key={index} 
              className="mx-8 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4"
            >
              <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">{partner.name.substring(0, 2)}</span>
              </div>
              <div className="text-white">
                <p className="font-semibold">{partner.name}</p>
                <p className="text-sm text-white/80">{partner.type}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Regional Hubs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              With regional hubs across four continents, we're bringing budget transparency 
              to communities worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalHubs.map((hub, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{hub.flag}</div>
                  <CardTitle className="text-lg">{hub.city}</CardTitle>
                  <CardDescription>{hub.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2">{hub.region}</Badge>
                  <p className="text-sm text-muted-foreground">{hub.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Current Partners */}
      <section id="current-partners" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strategic Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with leading organizations across technology, civil society, 
              and academia to advance our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicPartners.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {partner.type} • {partner.region}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{partner.description}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30">
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a global movement and unlock exclusive benefits for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join Our Global Network?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're a media outlet, civil society organization, academic institution, 
            or corporation—we'd love to explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 bg-white text-blue-600 hover:bg-blue-50">
              Apply for Partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/10" asChild>
              <a href="mailto:partnerships@budgetndiostory.org">
                Contact Us
              </a>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-blue-100">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Next partnership review: March 15, 2026</span>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Our Partnership Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <span className="text-sm">Independence and non-partisanship in budget analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <span className="text-sm">Transparency in funding and partnerships</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <span className="text-sm">Evidence-based, non-advocacy approach</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-1" />
                <span className="text-sm">Open data and knowledge sharing</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
