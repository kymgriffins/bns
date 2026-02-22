import { Metadata } from "next";
import { useRef } from "react";
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
import { motion, useInView } from "framer-motion";

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
    image: "/senmedia.png",
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
  const regionalHubsRef = useRef<HTMLElement>(null);
  const strategicPartnersRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  
  const regionalInView = useInView(regionalHubsRef, { once: true, amount: 0.2 });
  const strategicInView = useInView(strategicPartnersRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });

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
      <section ref={regionalHubsRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={regionalInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Global Presence</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                With regional hubs across four continents, we're bringing budget transparency 
                to communities worldwide.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalHubs.map((hub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={regionalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="relative">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">{hub.flag}</div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">{hub.city}</CardTitle>
                    <CardDescription className="font-medium">{hub.country}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <Badge variant="outline" className="mb-2 group-hover:border-blue-300 group-hover:text-blue-600 transition-colors duration-300">{hub.region}</Badge>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{hub.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Current Partners */}
      <section ref={strategicPartnersRef} id="current-partners" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={strategicInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Strategic Partners</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We work with leading organizations across technology, civil society, 
                and academia to advance our mission.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={strategicInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="flex flex-row items-center gap-4 relative">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors duration-300">{partner.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        {partner.type} • {partner.region}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">{partner.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 group-hover:border-blue-300 transition-all duration-300"
                    >
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section ref={benefitsRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join a global movement and unlock exclusive benefits for your organization.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="pt-8 relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300"
                    >
                      <benefit.icon className="h-7 w-7 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
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
