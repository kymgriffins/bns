"use client";

import { useState, useEffect } from "react";
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
  ChevronLeft,
  BarChart3,
  Landmark,
  HandHeart,
  Lightbulb,
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
  tone: string;
}

// Course data structure with teacher config
export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  category: "Foundation" | "Skills" | "Engagement" | "Accountability";
  color: string;
  icon: React.ElementType;
  enrolled?: number;
  isFeatured?: boolean;
  teacher: TeacherConfig;
  progress?: number;
  steps: {
    id: string;
    title: string;
    type: "intro" | "lesson" | "quiz" | "cta";
  }[];
}

// Calendar event structure
interface CalendarEvent {
  month: string;
  event: string;
  phase: string;
  phaseColor: string;
}

// Budget clinic structure
interface BudgetClinic {
  id: string;
  title: string;
  topic: string;
  date: string;
  time: string;
  host: string;
  spotsLeft: number;
  totalSpots: number;
}

// Toolkit structure
interface Toolkit {
  id: string;
  title: string;
  description: string;
  format: string;
  fileSize: string;
  downloads: number;
  icon: React.ElementType;
  color: string;
}

// Stats structure
interface Stat {
  value: string;
  label: string;
  icon: React.ElementType;
}

// Testimonial structure
interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote: string;
  rating: number;
}

// Teacher personas based on civic hub spec
const teachers: Record<string, TeacherConfig> = {
  "dr-amara": {
    name: "Millicent Makini",
    role: "Head of Data & Analytics",
    avatar: "👩🏾‍🏫",
    accentColor: "#F5C842",
    signature: "Here's what I've seen in the data...",
    tone: "warm-mentor",
  },
  "marcus-cole": {
    name: "Marcus Cole",
    role: "Senior Communications Lead",
    avatar: "👨🏽‍💼",
    accentColor: "#a78bfa",
    signature: "Here's the thing...",
    tone: "storyteller",
  },
  "yuki-tanaka": {
    name: "Yuki Tanaka",
    role: "Remote Leadership Coach",
    avatar: "👩🏻‍💻",
    accentColor: "#3ecfb2",
    signature: "The research is clear...",
    tone: "calm-authority",
  },
};

// Sample data with teacher configs and steps
const courses: Course[] = [
  {
    id: "budget-101",
    title: "Budget 101 (Interactive)",
    description: "Start here. Money in & out, national vs county, the budget cycle, and where you show up. Interactive sliders, timelines, and scenarios.",
    lessons: 4,
    duration: "12 min",
    category: "Foundation",
    color: "bg-blue-500",
    icon: GraduationCap,
    enrolled: 2500,
    isFeatured: true,
    teacher: teachers["dr-amara"],
    progress: 35,
    steps: [
      { id: "intro-1", title: "Welcome to Budget 101", type: "intro" },
      { id: "lesson-1", title: "Money In & Out", type: "lesson" },
      { id: "quiz-1", title: "Test Your Knowledge", type: "quiz" },
      { id: "lesson-2", title: "National vs County", type: "lesson" },
      { id: "quiz-2", title: "Quiz: Levels of Government", type: "quiz" },
      { id: "lesson-3", title: "Budget Cycle", type: "lesson" },
      { id: "quiz-3", title: "Quiz: Cycle Stages", type: "quiz" },
      { id: "cta-1", title: "Where You Show Up", type: "cta" },
    ],
  },
  {
    id: "bps-2026",
    title: "Module 001: BPS 2026",
    description: "The Budget Policy Statement 2026 - Understand how public money is planned, spent, and monitored.",
    lessons: 6,
    duration: "15 min",
    category: "Foundation",
    color: "bg-primary",
    icon: BookOpen,
    enrolled: 1800,
    teacher: teachers["dr-amara"],
    steps: [
      { id: "intro-bps", title: "Introduction to BPS", type: "intro" },
      { id: "lesson-bps-1", title: "What is BPS?", type: "lesson" },
      { id: "quiz-bps-1", title: "BPS Quiz", type: "quiz" },
      { id: "lesson-bps-2", title: "2026 Highlights", type: "lesson" },
      { id: "cta-bps", title: "Your Action Step", type: "cta" },
    ],
  },
  {
    id: "budget-cycle",
    title: "Module 002: Budget Cycle",
    description: "Learn the stages of Kenya's budget process from planning to implementation.",
    lessons: 5,
    duration: "12 min",
    category: "Skills",
    color: "bg-emerald-500",
    icon: TrendingUp,
    enrolled: 1200,
    teacher: teachers["marcus-cole"],
    steps: [
      { id: "intro-cycle", title: "Cycle Overview", type: "intro" },
      { id: "lesson-cycle-1", title: "Planning Phase", type: "lesson" },
      { id: "lesson-cycle-2", title: "Approval Phase", type: "lesson" },
      { id: "quiz-cycle", title: "Cycle Quiz", type: "quiz" },
      { id: "cta-cycle", title: "Track the Cycle", type: "cta" },
    ],
  },
  {
    id: "roles-responsibilities",
    title: "Module 003: Roles & Responsibilities",
    description: "Who does what in Kenya's budget process at national and county levels.",
    lessons: 5,
    duration: "10 min",
    category: "Engagement",
    color: "bg-amber-500",
    icon: Users,
    enrolled: 950,
    teacher: teachers["yuki-tanaka"],
    steps: [
      { id: "intro-roles", title: "Meet the Players", type: "intro" },
      { id: "lesson-roles-1", title: "National Level", type: "lesson" },
      { id: "lesson-roles-2", title: "County Level", type: "lesson" },
      { id: "quiz-roles", title: "Roles Quiz", type: "quiz" },
      { id: "cta-roles", title: "Your Representatives", type: "cta" },
    ],
  },
  {
    id: "county-budgets",
    title: "County Budget Deep Dive",
    description: "Understand how county governments allocate and spend your tax shillings.",
    lessons: 8,
    duration: "20 min",
    category: "Accountability",
    color: "bg-red-500",
    icon: Target,
    enrolled: 720,
    teacher: teachers["dr-amara"],
    steps: [
      { id: "intro-county", title: "County Budgets 101", type: "intro" },
      { id: "lesson-county-1", title: "Revenue Sources", type: "lesson" },
      { id: "lesson-county-2", title: "Spending Priorities", type: "lesson" },
      { id: "quiz-county", title: "County Quiz", type: "quiz" },
      { id: "cta-county", title: "Track Your County", type: "cta" },
    ],
  },
  {
    id: "memo-writing",
    title: "How to Write a Budget Memo",
    description: "Learn to write effective public participation memos that decision-makers actually read.",
    lessons: 4,
    duration: "15 min",
    category: "Skills",
    color: "bg-purple-500",
    icon: FileText,
    enrolled: 650,
    teacher: teachers["marcus-cole"],
    steps: [
      { id: "intro-memo", title: "Why Memos Matter", type: "intro" },
      { id: "lesson-memo-1", title: "Structuring Your Memo", type: "lesson" },
      { id: "lesson-memo-2", title: "Making It Persuasive", type: "lesson" },
      { id: "quiz-memo", title: "Memo Quiz", type: "quiz" },
      { id: "cta-memo", title: "Write Your Memo", type: "cta" },
    ],
  },
];

const categories = ["All", "Foundation", "Skills", "Engagement", "Accountability"];

const calendarEvents: CalendarEvent[] = [
  { month: "Jan", event: "BPS Release", phase: "planning", phaseColor: "bg-blue-500" },
  { month: "Feb", event: "Public Hearings", phase: "participation", phaseColor: "bg-green-500" },
  { month: "Mar", event: "CountyAllocations", phase: "review", phaseColor: "bg-yellow-500" },
  { month: "Apr", event: "Budget Debate", phase: "debate", phaseColor: "bg-orange-500" },
  { month: "May", event: "National Assembly", phase: "approval", phaseColor: "bg-green-500" },
  { month: "Jun", event: "FY Implementation", phase: "implementation", phaseColor: "bg-green-500" },
  { month: "Jul", event: "Q1 Review", phase: "accountability", phaseColor: "bg-red-500" },
  { month: "Aug", event: "Mid-Year Review", phase: "review", phaseColor: "bg-yellow-500" },
  { month: "Sep", event: "Supplementary I", phase: "planning", phaseColor: "bg-blue-500" },
  { month: "Oct", event: "Q3 Reports", phase: "accountability", phaseColor: "bg-red-500" },
  { month: "Nov", event: "BPS Preparation", phase: "planning", phaseColor: "bg-blue-500" },
  { month: "Dec", event: "Year End", phase: "announcement", phaseColor: "bg-purple-500" },
];

const budgetClinics: BudgetClinic[] = [
  {
    id: "clinic-1",
    title: "Youth Budget Lab",
    topic: "Understanding the National Budget",
    date: "March 20, 2026",
    time: "2:00 PM - 4:00 PM",
    host: "Millicent Makini",
    spotsLeft: 8,
    totalSpots: 50,
  },
  {
    id: "clinic-2",
    title: "County Budget Workshop",
    topic: "Nairobi County Budget Analysis",
    date: "March 25, 2026",
    time: "10:00 AM - 12:00 PM",
    host: "Budget Team",
    spotsLeft: 15,
    totalSpots: 40,
  },
  {
    id: "clinic-3",
    title: "Public Participation 101",
    topic: "How to Submit Effective Memos",
    date: "April 5, 2026",
    time: "3:00 PM - 5:00 PM",
    host: "Civic Engagement Lead",
    spotsLeft: 3,
    totalSpots: 30,
  },
];

const toolkits: Toolkit[] = [
  {
    id: "toolkit-1",
    title: "Budget Basics Toolkit",
    description: "Everything you need to understand Kenya's budget in simple terms.",
    format: "PDF",
    fileSize: "2.4 MB",
    downloads: 1250,
    icon: BookOpen,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "toolkit-2",
    title: "Public Participation Guide",
    description: "Step-by-step guide to engaging with budget processes.",
    format: "PDF",
    fileSize: "1.8 MB",
    downloads: 890,
    icon: Users,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: "toolkit-3",
    title: "Memo Writing Template",
    description: "Templates and examples for writing effective budget memos.",
    format: "PDF",
    fileSize: "950 KB",
    downloads: 2100,
    icon: FileText,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "toolkit-4",
    title: "County Budget Tracker",
    description: "Track and compare county budget allocations over time.",
    format: "PDF",
    fileSize: "3.2 MB",
    downloads: 650,
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
];

const stats: Stat[] = [
  { value: "15,000+", label: "Youth Engaged", icon: Users },
  { value: "50+", label: "Budget Memos Submitted", icon: FileText },
  { value: "120+", label: "Counties Covered", icon: MapPin },
  { value: "25,000+", label: "Module Completions", icon: Award },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Amina Ochieng",
    role: "University Student, Nairobi",
    quote: "I never understood budgets until I took these modules. Now I can explain Kenya's budget cycle to my friends in under 2 minutes!",
    rating: 5,
  },
  {
    id: "2",
    name: "David Mwangi",
    role: "Community Activist, Mombasa",
    quote: "The budget clinic helped me submit a memo to my county assembly. They actually responded!",
    rating: 5,
  },
  {
    id: "3",
    name: "Faith Atieno",
    role: "Content Creator",
    quote: "The creator track gave me tips to make budget content that actually performs well on social media.",
    rating: 4,
  },
];

// Animation variants with spring physics based on civic hub spec
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

const cardHover = {
  rest: { y: 0, borderColor: "var(--color-border)" },
  hover: { y: -4, borderColor: "var(--primary)", transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: "spring", stiffness: 300, damping: 28 },
};

export function LearnPageRedesign() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load progress from localStorage (civic hub spec: progress persistence)
    const saved = localStorage.getItem("learn-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedModules(parsed.completed || []);
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  const filteredCourses = activeCategory === "All"
    ? courses
    : courses.filter(course => course.category === activeCategory);

  const featuredCourse = courses.find(course => course.isFeatured) || courses[0];

  const isCourseCompleted = (courseId: string) => completedModules.includes(courseId);

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
      {/* Featured Course Spotlight */}
      <section id="featured-course" className="relative overflow-hidden bg-primary/5 dark:bg-primary/10 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute -right-32 top-1/2 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: Course Details with Teacher */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 28 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Most Popular
                </span>
                <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {featuredCourse.duration}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {featuredCourse.title}
              </h1>
              
              <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                {featuredCourse.description}
              </p>

              {/* Teacher Card - based on civic hub spec */}
              <motion.div
                variants={teacherBubble}
                initial="hidden"
                animate="show"
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div 
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl"
                  style={{ 
                    boxShadow: `0 0 0 2px ${featuredCourse.teacher.accentColor}40, 0 0 20px ${featuredCourse.teacher.accentColor}20` 
                  }}
                >
                  {featuredCourse.teacher.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{featuredCourse.teacher.name}</span>
                    <Badge variant="secondary" className="text-xs">{featuredCourse.teacher.tone}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{featuredCourse.teacher.role}</p>
                  <p className="mt-2 text-sm italic text-muted-foreground">
                    "{featuredCourse.teacher.signature}"
                  </p>
                </div>
              </motion.div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                      style={{
                        backgroundColor: `hsl(${i * 40}, 70%, 60%)`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{featuredCourse.enrolled?.toLocaleString()}+</span> enrolled
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="rounded-full">
                  <Link href={`/learn/${featuredCourse.id}`}>
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="#courses">
                    View Curriculum
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            {/* Right: Preview Card with Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 300, damping: 28 }}
            >
              <div className="rounded-2xl border border-border bg-card/50 p-6 shadow-2xl backdrop-blur-sm">
                {/* Video Preview Area */}
                <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedCourse(featuredCourse)}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-lg transition-transform hover:scale-105 hover:bg-primary"
                    >
                      <Play className="ml-1 h-6 w-6 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                    Preview
                  </div>
                  {/* Progress bar */}
                  {featuredCourse.progress !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${featuredCourse.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Lesson Steps Preview */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What's Inside
                  </p>
                  <div className="max-h-48 space-y-2 overflow-y-auto">
                    {featuredCourse.steps.slice(0, 6).map((step, idx) => {
                      const StepIcon = getStepIcon(step.type);
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <StepIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium truncate block">{step.title}</span>
                            <span className="text-xs text-muted-foreground capitalize">{step.type}</span>
                          </div>
                          {step.type === "quiz" && (
                            <Badge variant="outline" className="text-xs">Quiz</Badge>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                  {featuredCourse.steps.length > 6 && (
                    <p className="text-xs text-muted-foreground">
                      +{featuredCourse.steps.length - 6} more steps
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Courses Grid with Filtering */}
      <section id="courses" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              All Courses
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Filter by category to find the learning path that fits your goals
            </p>
          </motion.div>
          
          {/* Filter Buttons */}
          <motion.div
            {...staggerContainer}
            className="mb-8 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Course Cards Grid with hover animations */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeSlideIn}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
              >
                {/* Category Color Stripe */}
                <div
                  className={cn("absolute left-0 top-0 bottom-0 w-1", course.color)}
                />
                
                <div className="p-5 pl-7">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", course.color + "/10", "text-foreground")}>
                        <course.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    {isCourseCompleted(course.id) && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                    {course.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  
                  {/* Meta */}
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </span>
                  </div>
                  
                  {/* Hover CTA */}
                  <Button
                    asChild
                    className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-all group-hover:opacity-100"
                  >
                    <Link href={`/learn/${course.id}`}>
                      {isCourseCompleted(course.id) ? "Review" : "Start Learning"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calendar & Events */}
      <section id="calendar" className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Budget Calendar & Events
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Stay on top of Kenya's budget cycle and upcoming engagement opportunities
            </p>
          </motion.div>
          
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Budget Calendar */}
            <motion.div
              {...fadeInUp}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-6 text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                2026 Budget Calendar
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {calendarEvents.map((event, index) => (
                  <motion.div
                    key={event.month}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-lg border border-border bg-background p-3 text-center"
                  >
                    <p className="text-xs font-semibold text-foreground">{event.month}</p>
                    <p className="my-1 text-[10px] text-muted-foreground">{event.event}</p>
                    <span className={cn("inline-block h-1.5 w-full rounded-full", event.phaseColor)} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Planning
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" /> Review
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> Participation
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> Accountability
                </span>
              </div>
            </motion.div>
            
            {/* Budget Clinics */}
            <motion.div
              {...fadeInUp}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Upcoming Budget Clinics
              </h3>
              {budgetClinics.map((clinic, index) => (
                <motion.div
                  key={clinic.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{clinic.title}</h4>
                      <p className="text-sm text-muted-foreground">{clinic.topic}</p>
                    </div>
                    {clinic.spotsLeft < 20 && (
                      <Badge variant="destructive" className="text-xs">
                        {clinic.spotsLeft} spots left
                      </Badge>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {clinic.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {clinic.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {clinic.host}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${((clinic.totalSpots - clinic.spotsLeft) / clinic.totalSpots) * 100}%` }}
                      />
                    </div>
                    <Button asChild size="sm" className="w-full rounded-full">
                      <Link href="/take-action">
                        Register Now
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Downloadable Toolkits */}
      <section id="toolkits" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Downloadable Toolkits
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Resources to help you understand and engage with Kenya's budget
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {toolkits.map((toolkit) => (
              <motion.div
                key={toolkit.id}
                variants={fadeInUp}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", toolkit.color)}>
                    <toolkit.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {toolkit.format}
                  </Badge>
                </div>
                <h3 className="mb-2 font-semibold transition-colors group-hover:text-primary">
                  {toolkit.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {toolkit.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{toolkit.fileSize}</span>
                  <span>{toolkit.downloads.toLocaleString()} downloads</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full rounded-full"
                >
                  <Link href="#">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="stats" className="bg-primary/5 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Our Impact
            </h2>
            <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
              Together we're making budget transparency a reality in Kenya
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-4xl font-bold text-foreground"
                >
                  {stat.value}
                </motion.p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What Learners Say
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Join thousands of young Kenyans who are now budget literate
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 dark:bg-primary/10 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeInUp}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ready to Become Budget Smart?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start your journey to understanding Kenya's budget today. 
              It's free, interactive, and designed for young Kenyans.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/learn/budget-101">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/subscribe">
                  Subscribe for Updates
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Preview Modal - based on civic hub spec */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                    style={{ 
                      boxShadow: `0 0 0 2px ${selectedCourse.teacher.accentColor}40` 
                    }}
                  >
                    {selectedCourse.teacher.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedCourse.title}</h3>
                    <p className="text-xs text-muted-foreground">{selectedCourse.teacher.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Course Info */}
                <div className="space-y-2">
                  <p className="text-muted-foreground">{selectedCourse.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {selectedCourse.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedCourse.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedCourse.enrolled?.toLocaleString()}+ enrolled
                    </span>
                  </div>
                </div>

                {/* Teacher Intro */}
                <div className="rounded-xl border border-border bg-muted/50 p-4">
                  <p className="text-sm italic text-muted-foreground">
                    "{selectedCourse.teacher.signature}"
                  </p>
                </div>

                {/* Steps Overview */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Course Steps</h4>
                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {selectedCourse.steps.map((step, idx) => {
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button asChild className="flex-1 rounded-full" size="lg">
                    <Link href={`/learn/${selectedCourse.id}`}>
                      Start Course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => setSelectedCourse(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
