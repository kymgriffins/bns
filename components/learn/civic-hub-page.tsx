"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  Download,
  Star,
  ChevronRight,
  MapPin,
  Video,
  PieChart,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  Lock,
  ChevronLeft,
  BarChart3,
  Landmark,
  HandHeart,
  Lightbulb,
  X,
  ExternalLink,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Teacher config based on civic hub spec
interface TeacherConfig {
  name: string;
  role: string;
  avatar: string;
  accentColor: string;
  signature: string;
  signoffLine: string;
  tone: string;
}

// Module steps
interface ModuleStep {
  id: string;
  title: string;
  type: "intro" | "lesson" | "quiz" | "cta";
}

// Module/Course data structure
interface Module {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome: string;
  lessons: number;
  duration: string;
  category: "Budget Basics" | "National" | "County" | "Oversight" | "Action";
  color: string;
  icon: React.ElementType;
  enrolled?: number;
  isNew?: boolean;
  teacher: TeacherConfig;
  progress?: number;
  status?: "new" | "in-progress" | "done";
  locked?: boolean;
  steps: ModuleStep[];
}

// Animation variants - Spring physics from civic hub spec
const fadeSlideIn = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const teacherBubble = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { delay: 0.15, type: "spring", stiffness: 260, damping: 22 } },
};

const quizPop = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 24 } },
};

const ctaReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
};

// Teacher personas
const teachers: Record<string, TeacherConfig> = {
  "dr-amara": {
    name: "Millicent Makini",
    role: "Head of Data & Analytics",
    avatar: "👩🏾‍🏫",
    accentColor: "#F5C842",
    signature: "Here's what I've seen in the data...",
    signoffLine: "You've got the foundation — now go make it count.",
    tone: "warm-mentor",
  },
  "marcus-cole": {
    name: "Marcus Cole",
    role: "Senior Communications Lead",
    avatar: "👨🏽‍💼",
    accentColor: "#a78bfa",
    signature: "Here's the thing...",
    signoffLine: "Your voice matters. Use it.",
    tone: "storyteller",
  },
  "yuki-tanaka": {
    name: "Yuki Tanaka",
    role: "Remote Leadership Coach",
    avatar: "👩🏻‍💻",
    accentColor: "#3ecfb2",
    signature: "The research is clear...",
    signoffLine: "You've earned this. Keep going.",
    tone: "calm-authority",
  },
};

// Full 15-module curriculum
const modules: Module[] = [
  {
    number: "01",
    id: "budget-101",
    title: "Budget 101",
    description: "Money in & out, national vs county, the budget cycle, and where you show up.",
    outcome: "After this, you can read any budget chart in 30 seconds.",
    lessons: 5,
    duration: "18 min",
    category: "Budget Basics",
    color: "bg-amber-500",
    icon: GraduationCap,
    enrolled: 2500,
    isNew: true,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: false,
    steps: [
      { id: "intro-1", title: "Welcome to Budget 101", type: "intro" },
      { id: "lesson-1", title: "Money In & Out", type: "lesson" },
      { id: "quiz-1", title: "Test Your Knowledge", type: "quiz" },
      { id: "lesson-2", title: "National vs County", type: "lesson" },
      { id: "cta-1", title: "Your Action Step", type: "cta" },
    ],
  },
  {
    number: "02",
    id: "bps-2026",
    title: "BPS 2026 Explained",
    description: "The Budget Policy Statement 2026 - how public money is planned and monitored.",
    outcome: "You'll understand exactly where the government plans to spend.",
    lessons: 6,
    duration: "22 min",
    category: "National",
    color: "bg-blue-500",
    icon: BookOpen,
    enrolled: 1800,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: false,
    steps: [
      { id: "intro-bps", title: "What is the BPS?", type: "intro" },
      { id: "lesson-bps-1", title: "Revenue Projections", type: "lesson" },
      { id: "quiz-bps-1", title: "Revenue Quiz", type: "quiz" },
      { id: "lesson-bps-2", title: "Expenditure Priorities", type: "lesson" },
      { id: "cta-bps", title: "Track the Numbers", type: "cta" },
    ],
  },
  {
    number: "03",
    id: "budget-cycle",
    title: "The Budget Cycle",
    description: "Learn the stages of Kenya's budget process from planning to implementation.",
    outcome: "Know exactly when and how to make your voice heard.",
    lessons: 5,
    duration: "15 min",
    category: "Budget Basics",
    color: "bg-emerald-500",
    icon: TrendingUp,
    enrolled: 1200,
    teacher: teachers["marcus-cole"],
    progress: 0,
    status: "new",
    locked: false,
    steps: [
      { id: "intro-cycle", title: "Why the Cycle Matters", type: "intro" },
      { id: "lesson-cycle-1", title: "Planning Phase", type: "lesson" },
      { id: "lesson-cycle-2", title: "Approval Phase", type: "lesson" },
      { id: "quiz-cycle", title: "Cycle Quiz", type: "quiz" },
      { id: "cta-cycle", title: "Your Timeline", type: "cta" },
    ],
  },
  {
    number: "04",
    id: "roles-responsibilities",
    title: "Who Does What",
    description: "Who does what in Kenya's budget process at national and county levels.",
    outcome: "Know exactly who to contact about your community's budget.",
    lessons: 5,
    duration: "12 min",
    category: "Oversight",
    color: "bg-purple-500",
    icon: Users,
    enrolled: 950,
    teacher: teachers["yuki-tanaka"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [
      { id: "intro-roles", title: "Meet the Players", type: "intro" },
      { id: "lesson-roles-1", title: "National Level", type: "lesson" },
      { id: "lesson-roles-2", title: "County Level", type: "lesson" },
      { id: "quiz-roles", title: "Roles Quiz", type: "quiz" },
      { id: "cta-roles", title: "Your Representatives", type: "cta" },
    ],
  },
  {
    number: "05",
    id: "county-budgets",
    title: "County Budget Deep Dive",
    description: "Understand how county governments allocate and spend your tax shillings.",
    outcome: "Track how your county spends your money.",
    lessons: 8,
    duration: "25 min",
    category: "County",
    color: "bg-red-500",
    icon: Target,
    enrolled: 720,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [
      { id: "intro-county", title: "County Budgets 101", type: "intro" },
      { id: "lesson-county-1", title: "Revenue Sources", type: "lesson" },
      { id: "lesson-county-2", title: "Spending Priorities", type: "lesson" },
      { id: "quiz-county", title: "County Quiz", type: "quiz" },
      { id: "cta-county", title: "Track Your County", type: "cta" },
    ],
  },
  {
    number: "06",
    id: "memo-writing",
    title: "How to Write a Budget Memo",
    description: "Learn to write effective public participation memos that get read.",
    outcome: "Write a memo that decision-makers actually respond to.",
    lessons: 4,
    duration: "15 min",
    category: "Action",
    color: "bg-cyan-500",
    icon: FileText,
    enrolled: 650,
    teacher: teachers["marcus-cole"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [
      { id: "intro-memo", title: "Why Memos Matter", type: "intro" },
      { id: "lesson-memo-1", title: "Structuring Your Memo", type: "lesson" },
      { id: "lesson-memo-2", title: "Making It Persuasive", type: "lesson" },
      { id: "quiz-memo", title: "Memo Quiz", type: "quiz" },
      { id: "cta-memo", title: "Write Your Memo", type: "cta" },
    ],
  },
  {
    number: "07",
    id: "public-participation",
    title: "Public Participation Guide",
    description: "How to effectively participate in budget hearings and consultations.",
    outcome: "Speak up with confidence at any public forum.",
    lessons: 5,
    duration: "18 min",
    category: "Action",
    color: "bg-green-500",
    icon: HandHeart,
    enrolled: 520,
    teacher: teachers["marcus-cole"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "08",
    id: "finance-bill",
    title: "Understanding the Finance Bill",
    description: "Break down the annual Finance Bill and its implications.",
    outcome: "Understand how laws affect your wallet.",
    lessons: 6,
    duration: "20 min",
    category: "National",
    color: "bg-indigo-500",
    icon: BarChart3,
    enrolled: 480,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "09",
    id: "county-assembly",
    title: "County Assembly Oversight",
    description: "How county assemblies monitor budget implementation.",
    outcome: "Hold your MCAs accountable.",
    lessons: 4,
    duration: "14 min",
    category: "Oversight",
    color: "bg-violet-500",
    icon: Landmark,
    enrolled: 380,
    teacher: teachers["yuki-tanaka"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "10",
    id: "audit-reports",
    title: "Reading Audit Reports",
    description: "How to read and use Controller of Budget reports.",
    outcome: "Find waste and fraud in public spending.",
    lessons: 5,
    duration: "16 min",
    category: "Oversight",
    color: "bg-slate-500",
    icon: FileText,
    enrolled: 320,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "11",
    id: "citizen-budget",
    title: "Citizen Budget Simplified",
    description: "Making sense of the citizen's version of the budget.",
    outcome: "Read the budget without needing an economics degree.",
    lessons: 3,
    duration: "10 min",
    category: "Budget Basics",
    color: "bg-teal-500",
    icon: BookOpen,
    enrolled: 410,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "12",
    id: "health-budget",
    title: "Health Sector Budget",
    description: "Where healthcare funding goes and how to track it.",
    outcome: "Ensure your hospital gets its fair share.",
    lessons: 5,
    duration: "17 min",
    category: "County",
    color: "bg-rose-500",
    icon: Target,
    enrolled: 290,
    teacher: teachers["yuki-tanaka"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "13",
    id: "education-budget",
    title: "Education Sector Budget",
    description: "Tracking education funding from nursery to university.",
    outcome: "Know where to advocate for schools.",
    lessons: 5,
    duration: "16 min",
    category: "County",
    color: "bg-orange-500",
    icon: GraduationCap,
    enrolled: 350,
    teacher: teachers["marcus-cole"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "14",
    id: "infrastructure-budget",
    title: "Infrastructure & Roads",
    description: "How road and infrastructure projects are funded.",
    outcome: "Track road projects in your area.",
    lessons: 4,
    duration: "13 min",
    category: "County",
    color: "bg-yellow-600",
    icon: TrendingUp,
    enrolled: 220,
    teacher: teachers["dr-amara"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
  {
    number: "15",
    id: "champion",
    title: "Budget Champion Masterclass",
    description: "Putting it all together - become a community budget expert.",
    outcome: "Lead budget education in your community.",
    lessons: 8,
    duration: "45 min",
    category: "Action",
    color: "bg-primary",
    icon: Award,
    enrolled: 150,
    isNew: true,
    teacher: teachers["marcus-cole"],
    progress: 0,
    status: "new",
    locked: true,
    steps: [],
  },
];

const categories = ["All", "Budget Basics", "National", "County", "Oversight", "Action"];

// Confetti component
const Confetti = () => {
  const colors = ["#F5C842", "#a78bfa", "#3ecfb2", "#F5C842", "#2F4494"];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 400 - 200,
            y: -20,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: 400,
            rotate: Math.random() * 720 - 360,
            scale: 1,
            x: Math.random() * 400 - 200,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.3,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: 0,
            width: 8,
            height: 8,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
};

export function CivicHubPage() {
  const [mounted, setMounted] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [showResumeToast, setShowResumeToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastModule, setLastModule] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check for returning user
    const saved = localStorage.getItem("civic-hub-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedModules(parsed.completed || []);
        if (parsed.lastModule) {
          setIsReturningUser(true);
          setLastModule(parsed.lastModule);
          setShowResumeToast(true);
        }
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Auto-hide resume toast
  useEffect(() => {
    if (showResumeToast) {
      const timer = setTimeout(() => setShowResumeToast(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [showResumeToast]);

  const filteredModules = activeCategory === "All"
    ? modules
    : modules.filter(m => m.category === activeCategory);

  const completedCount = completedModules.length;
  const totalModules = modules.length;

  // Get first 3 modules for starter pathway
  const starterModules = modules.slice(0, 3);

  const getStepIcon = (type: string) => {
    switch (type) {
      case "intro": return Play;
      case "lesson": return BookOpen;
      case "quiz": return Lightbulb;
      case "cta": return HandHeart;
      default: return BookOpen;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background animate-pulse">
        <div className="container mx-auto px-4 py-20">
          <div className="h-96 bg-muted rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti celebration */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume toast - from civic hub spec */}
      <AnimatePresence>
        {showResumeToast && lastModule && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -20 }}
            className="fixed bottom-6 right-6 z-50 rounded-xl border-2 border-primary bg-card p-4 shadow-xl max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div 
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
                style={{ 
                  boxShadow: `0 0 0 2px #F5C84240` 
                }}
              >
                👩🏾‍🏫
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Welcome back!</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You left off on Module {modules.find(m => m.id === lastModule)?.number}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="rounded-full text-xs">
                    Resume
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full text-xs"
                    onClick={() => setShowResumeToast(false)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
              <button 
                onClick={() => setShowResumeToast(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -left-32 bottom-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <AnimatePresence mode="wait">
            {!isReturningUser ? (
              <motion.div
                key="hero-new"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                {/* Trust signals badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-3 mb-8"
                >
                  <Badge variant="secondary" className="rounded-full px-4 py-1">
                    <span className="mr-2">◆</span>
                    47 counties tracked
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-4 py-1">
                    <span className="mr-2">◆</span>
                    15 modules
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-4 py-1">
                    <span className="mr-2">◆</span>
                    Youth-first language
                  </Badge>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } }
                  }}
                  initial="hidden"
                  animate="show"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mb-6"
                >
                  {["Understand Kenya's budget.", "Become the voice", "in the room."].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8"
                >
                  Interactive lessons designed for young Kenyans. No jargon, just the facts you need to make your voice heard.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button asChild size="lg" className="rounded-full text-lg px-8 h-14">
                    <Link href={`/learn/${starterModules[0].id}`}>
                      Start Learning
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    No account needed to start
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="hero-returning"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Badge variant="secondary" className="rounded-full px-4 py-1 mb-6">
                  Welcome back
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Continue Your Journey
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {completedCount > 0 
                    ? `You've completed ${completedCount} of ${totalModules} modules. Keep going!`
                    : "Pick up where you left off."
                  }
                </p>
                <Button asChild size="lg" className="rounded-full text-lg px-8 h-14">
                  <Link href={`/learn/${lastModule || starterModules[0].id}`}>
                    Resume Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Start Here Pathway - First time only */}
      {!isReturningUser && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
            >
              Start Here
            </motion.h2>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-3"
            >
              {starterModules.map((module, idx) => (
                <motion.div
                  key={module.id}
                  variants={fadeSlideIn}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card cursor-pointer"
                  onClick={() => setSelectedModule(module)}
                >
                  {/* Gold accent strip */}
                  <div className={cn("absolute left-0 top-0 right-0 h-1", module.color)} />
                  
                  <div className="p-6 pt-8">
                    {/* Module number pill */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="rounded-full bg-primary text-primary-foreground">
                        Module {module.number}
                      </Badge>
                      {module.isNew && (
                        <Badge variant="outline" className="rounded-full text-xs">
                          New
                        </Badge>
                      )}
                    </div>

                    {/* Teacher */}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                        style={{ 
                          boxShadow: `0 0 0 2px ${module.teacher.accentColor}40, 0 0 15px ${module.teacher.accentColor}20` 
                        }}
                      >
                        {module.teacher.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{module.teacher.name}</p>
                        <p className="text-xs text-muted-foreground">{module.lessons} lessons · {module.duration}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

                    {/* Outcome */}
                    <div className="rounded-lg bg-primary/5 p-3 mb-4">
                      <p className="text-xs font-medium text-primary">
                        → {module.outcome}
                      </p>
                    </div>

                    {/* Start button */}
                    <Button className="w-full rounded-full group-hover:bg-primary">
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Full Module Grid with Filtering */}
      <section id="modules" className="py-16">
        <div className="container mx-auto px-4">
          {/* Sticky progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="sticky top-20 z-30 -mx-4 px-4 py-3 bg-background/80 backdrop-blur-lg border-b mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="font-medium">
                  {completedCount} of {totalModules} modules completed
                </p>
                {completedCount < modules.length && (
                  <p className="text-sm text-muted-foreground">
                    Your next: <span className="text-primary font-medium">Module {modules[completedCount]?.number}</span>
                  </p>
                )}
              </div>
              
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / totalModules) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            </div>
          </motion.div>

          {/* Module cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredModules.map((module) => (
              <motion.div
                key={module.id}
                variants={fadeSlideIn}
                whileHover={!module.locked ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } } : {}}
                onHoverStart={() => !module.locked && setHoveredModule(module.id)}
                onHoverEnd={() => setHoveredModule(null)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border bg-card transition-all",
                  module.locked 
                    ? "border-border/50 opacity-75" 
                    : "border-border hover:border-primary/50 cursor-pointer"
                )}
                onClick={() => !module.locked && setSelectedModule(module)}
              >
                {/* Category color strip */}
                <div className={cn("absolute left-0 top-0 bottom-0 w-1", module.color)} />

                <div className="p-6 pl-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className="rounded-full bg-primary text-primary-foreground">
                        {module.number}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {module.category}
                      </Badge>
                    </div>
                    {module.locked && (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                    {module.status === "done" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  {/* Teacher */}
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg"
                      style={{ 
                        boxShadow: `0 0 0 2px ${module.teacher.accentColor}30` 
                      }}
                    >
                      {module.teacher.avatar}
                    </div>
                    <span className="text-sm text-muted-foreground">{module.teacher.name}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{module.description}</p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {module.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {module.progress !== undefined && module.progress > 0 && (
                    <div className="mb-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <Button 
                    className="w-full rounded-full" 
                    variant={module.locked ? "outline" : "default"}
                    disabled={module.locked}
                  >
                    {module.locked ? (
                      <>Unlock after Module {parseInt(module.number) - 1}</>
                    ) : module.status === "done" ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Done
                      </>
                    ) : module.status === "in-progress" ? (
                      <>
                        Resume
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Start
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Hover preview - expanded card */}
                <AnimatePresence>
                  {hoveredModule === module.id && !module.locked && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="border-t border-border bg-muted/30 overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          What's Inside
                        </p>
                        {module.steps.slice(0, 3).map((step, idx) => {
                          const StepIcon = getStepIcon(step.type);
                          return (
                            <div key={step.id} className="flex items-center gap-2 text-sm">
                              <StepIcon className="h-3 w-3 text-primary" />
                              <span>{step.title}</span>
                              {step.type === "quiz" && (
                                <Badge variant="outline" className="text-xs ml-auto">Quiz</Badge>
                              )}
                            </div>
                          );
                        })}
                        {module.steps.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            + {module.steps.length - 3} more
                          </p>
                        )}
                        <p className="text-xs italic text-muted-foreground pt-2 border-t">
                          "{module.teacher.signature}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Module Preview Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-primary text-primary-foreground">
                    Module {selectedModule.number}
                  </Badge>
                  <Badge variant="secondary">{selectedModule.category}</Badge>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Teacher */}
                <motion.div
                  variants={teacherBubble}
                  initial="hidden"
                  animate="show"
                  className="flex items-start gap-4 rounded-xl border border-border bg-muted/50 p-4"
                >
                  <div 
                    className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                    style={{ 
                      boxShadow: `0 0 0 2px ${selectedModule.teacher.accentColor}40, 0 0 20px ${selectedModule.teacher.accentColor}20` 
                    }}
                  >
                    {selectedModule.teacher.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{selectedModule.teacher.name}</span>
                      <Badge variant="secondary" className="text-xs">{selectedModule.teacher.tone}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedModule.teacher.role}</p>
                    <p className="mt-2 text-sm italic text-muted-foreground">
                      "{selectedModule.teacher.signature}"
                    </p>
                  </div>
                </motion.div>

                {/* Title & description */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedModule.title}</h2>
                  <p className="text-muted-foreground">{selectedModule.description}</p>
                </div>

                {/* Outcome */}
                <div className="rounded-xl bg-primary/10 p-4">
                  <p className="text-sm font-medium text-primary">
                    → {selectedModule.outcome}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {selectedModule.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedModule.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {selectedModule.enrolled?.toLocaleString()}+ enrolled
                  </span>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Course Steps</h4>
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {selectedModule.steps.map((step, idx) => {
                      const StepIcon = getStepIcon(step.type);
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <span className="flex-1 text-sm font-medium">{step.title}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {step.type}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button asChild className="flex-1 rounded-full" size="lg">
                    <Link href={`/learn/${selectedModule.id}`}>
                      Start Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => setSelectedModule(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestones Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
          >
            Your Progress
          </motion.h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { count: 3, label: "Unlock County Filters", achieved: completedCount >= 3, icon: MapPin },
              { count: 5, label: "Budget Literate Badge", achieved: completedCount >= 5, icon: Award },
              { count: 8, label: "Budget Tracker Access", achieved: completedCount >= 8, icon: BarChart3 },
              { count: 15, label: "Budget Champion", achieved: completedCount >= 15, icon: Star },
            ].map((milestone, idx) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "rounded-xl border p-4 text-center transition-all",
                  milestone.achieved 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card opacity-60"
                )}
              >
                <div className={cn(
                  "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full",
                  milestone.achieved ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {milestone.achieved ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-medium">{milestone.count}</span>
                  )}
                </div>
                <p className="text-sm font-medium">{milestone.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {milestone.count} modules
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of young Kenyans who are understanding their budget and making their voices heard.
            </p>
            <Button asChild size="lg" className="rounded-full text-lg px-8">
              <Link href="/learn/budget-101">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
