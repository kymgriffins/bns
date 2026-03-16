"use client";

import { useRef, useState, useEffect } from "react";
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
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Verified,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { motion, useInView } from "framer-motion";

// Premier Partners with actual images
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
  },
  {
    name: "Budget Nairobi",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
    type: "Strategic Partner",
    region: "Kenya",
    description: "Budget transparency initiative in Kenya",
    website: "#"
  }
];

// Strategic Partners - with minimalistic logo placeholders
const strategicPartners = [
  {
    name: "Open Government Partnership",
    type: "Technology Partner",
    region: "Global",
    description: "Global initiative for open government reform and transparency",
    logo: "OGP",
    initials: "OGP",
    color: "from-emerald-600 to-emerald-800"
  },
  {
    name: "International Budget Partnership",
    type: "Research Partner",
    region: "Global",
    description: "Advancing budget transparency and accountability worldwide",
    logo: "IBP",
    initials: "IBP",
    color: "from-slate-700 to-slate-900"
  },
  {
    name: "Transparency International",
    type: "Civil Society Partner",
    region: "Global",
    description: "Global anti-corruption coalition since 1993",
    logo: "TI",
    initials: "TI",
    color: "from-red-600 to-red-800"
  },
  {
    name: "African Centre for Public Policy",
    type: "Think Tank",
    region: "Africa",
    description: "Policy research and advocacy across the African continent",
    logo: "ACPP",
    initials: "ACPP",
    color: "from-amber-600 to-amber-800"
  },
  {
    name: "Youth in Governance Network",
    type: "Civil Society Partner",
    region: "Africa",
    description: "Empowering youth participation in governance and democracy",
    logo: "YIGN",
    initials: "YIGN",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    name: "Global Initiative for Budget Transparency",
    type: "Research Partner",
    region: "International",
    description: "Promoting open budgets for stronger democracies",
    logo: "GIBT",
    initials: "GIBT",
    color: "from-teal-600 to-teal-800"
  }
];

// Partner logos for marquee - minimalist versions
const marqueeLogos = [
  { name: "OGP", initials: "OGP", color: "bg-emerald-700" },
  { name: "IBP", initials: "IBP", color: "bg-slate-800" },
  { name: "TI", initials: "TI", color: "bg-red-700" },
  { name: "ACPP", initials: "ACPP", color: "bg-amber-700" },
  { name: "YIGN", initials: "YIGN", color: "bg-indigo-700" },
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

// Minimalistic Logo Component
function PartnerLogo({ initials, color, size = "lg" }: { initials: string; color: string; size?: "sm" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "h-10 w-10 text-xs",
    lg: "h-14 w-14 text-sm",
    xl: "h-20 w-20 text-base"
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
      <span className="font-bold text-white tracking-tight">{initials}</span>
    </div>
  );
}

// Floating Particles Background
function PartnerParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: 20 + Math.random() * 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.id % 4 === 0 ? '#f5c842' : p.id % 4 === 1 ? '#3ecfb2' : p.id % 4 === 2 ? '#ff7b5c' : '#8b5cf6',
            animation: `floatParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Partner Verification Badge Component
function VerificationBadge({ level }: { level: 'verified' | 'trusted' | 'official' }) {
  const config = {
    verified: { icon: Verified, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', label: 'Verified Partner' },
    trusted: { icon: Shield, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', label: 'Trusted Partner' },
    official: { icon: Award, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30', label: 'Official Partner' },
  };
  const { icon: Icon, color, bg, label } = config[level];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export default function PartnersPage() {
  const regionalHubsRef = useRef<HTMLElement>(null);
  const strategicPartnersRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  
  const regionalInView = useInView(regionalHubsRef, { once: true, amount: 0.2 });
  const strategicInView = useInView(strategicPartnersRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <style jsx global>{`
        @keyframes floatParticle {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
      `}</style>
      <PartnerParticles />
      {/* Hero Section - Minimalistic */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-950 dark:via-background dark:to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium mb-8">
                <Globe className="h-4 w-4" />
                Global Network
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
                Our Partners
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Building a worldwide movement for budget transparency, civic empowerment, 
                and democratic accountability—together.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 bg-foreground hover:bg-foreground/90">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-300" asChild>
                  <a href="#current-partners">
                    View Partners
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Stats - Clean cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { value: "47+", label: "Countries", icon: Globe },
              { value: "200+", label: "Partners", icon: Handshake },
              { value: "15K+", label: "Citizens", icon: Users },
              { value: "120+", label: "Programs", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="h-6 w-6 mx-auto mb-3 text-slate-600 dark:text-slate-400" />
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Marquee - Minimalistic dark strip */}
      <section className="py-8 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest text-center">Trusted by leading organizations</p>
        </div>
        <Marquee pauseOnHover className="py-2" duration="30s">
          {marqueeLogos.map((logo, index) => (
            <div 
              key={index} 
              className="mx-6 flex items-center gap-3"
            >
              <div className={`h-10 w-10 rounded-md ${logo.color} flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{logo.initials}</span>
              </div>
              <span className="text-slate-400 font-medium text-sm">{logo.name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Premier Partners Section with Images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold mb-3">Premier Partners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our premier partners represent leading media organizations and strategic allies in our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premierPartners.map((partner, index) => (
              <motion.a
                key={index}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  {/* Partner Logo/Image */}
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden">
                    {partner.image ? (
                      <img 
                        src={partner.image} 
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <PartnerLogo initials={partner.name.substring(0, 2).toUpperCase()} color="from-slate-600 to-slate-800" />
                    )}
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">{partner.type}</Badge>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-green-600 transition-colors">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.region}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Hubs - Clean grid */}
      <section ref={regionalHubsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={regionalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold mb-3">Global Presence</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Regional hubs across four continents bringing budget transparency to communities worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionalHubs.map((hub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={regionalInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{hub.flag}</span>
                      <div>
                        <CardTitle className="text-lg">{hub.city}</CardTitle>
                        <CardDescription className="text-sm">{hub.country}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{hub.region}</Badge>
                      <span className="text-xs text-muted-foreground">{hub.role}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Strategic Partners - With Logos */}
      <section ref={strategicPartnersRef} id="current-partners" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={strategicInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold mb-3">Strategic Partners</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We work with leading organizations across technology, civil society, 
              and academia to advance our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={strategicInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="flex flex-row items-start gap-4 pb-3">
                    {/* Minimalist Logo Box */}
                    <PartnerLogo 
                      initials={partner.initials} 
                      color={partner.color}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base font-semibold leading-tight group-hover:text-green-600 transition-colors">
                        {partner.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1 text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {partner.type}
                        </span>
                        <span>•</span>
                        <span>{partner.region}</span>
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {partner.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-between hover:bg-slate-100 dark:hover:bg-slate-800 group-hover:text-green-600 transition-colors"
                    >
                      Learn more
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits - Minimalistic */}
      <section ref={benefitsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold mb-3">Why Partner With Us?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join a global movement and unlock exclusive benefits for your organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-8 text-center">
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors duration-300">
                      <benefit.icon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-green-600 transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalistic dark */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Ready to collaborate?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Whether you're a media outlet, civil society organization, academic institution, 
            or corporation—we'd love to explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-100">
              Apply for Partnership
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-slate-600 text-white hover:bg-slate-800" asChild>
              <a href="mailto:partnerships@budgetndiostory.org">
                Contact Us
              </a>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Next partnership review: March 15, 2026</span>
          </div>
        </div>
      </section>

      {/* Footer Info - Minimalistic */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Our Partnership Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Independence and non-partisanship in budget analysis",
                  "Transparency in funding and partnerships",
                  "Evidence-based, non-advocacy approach",
                  "Open data and knowledge sharing"
                ].map((principle, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
