"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  ChevronUp,
  Trophy,
  Target,
  TrendingUp,
  AlertTriangle,
  Building2,
  Heart,
  Home,
  Sprout,
  Briefcase,
  Palette,
  Play,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ModuleOnePage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const lessons = [
    {
      title: "What is the BPS?",
      content: `Forget the complicated name. The BPS is simply the government answering three questions out loud:

•Where are we now? (How's the economy doing?)
•Where do we want to go? (What are our big goals?)
•How much cash will we need for the trip? (And how will we get it?)

It's tabled in Parliament every year by February 15th—think of it as the government submitting its term paper before the final exam (which is the actual budget in April).

🇰🇪 Kenya Context: BPS is the parent of the County Fiscal Strategy Paper (CFSP). Whatever the BPS prioritizes at the national level? That's what your county government has to align with when planning your local markets, health centers, and roads.

Think of the BPS as the roadmap before a long journey. The detailed budget in April is the actual trip. This document? It's the plan. And just like your maps app, it updates every year based on new traffic or in this case, new economic data.

In summary BPS undertakes:
•The check-up of our economy
•Unveils government priorities
•Reveals revenue & borrowing plan
•Sets budget ceilings for ministries, parliament, the judiciary and other govt departments`
    },
    {
      title: "The 5 Core Chapters of a BPS",
      content: `Every BPS contains five key sections that tell the complete story of where Kenya is headed:

1. Vision – Development Agenda
   Where the government wants to take the country in the long term

2. Reality – Economic Outlook
   An honest assessment of how the economy is performing right now

3. Numbers – Government Spending & Revenue
   How much money is coming in and where it's going

4. Counties – Devolution Allocation
   How much money goes to each county for local development

5. Risks – Debt & Climate
   What could go wrong and how the government plans to handle challenges

These five chapters work together like a complete story - from vision to reality, through the numbers, to the counties, and finally addressing the risks.`
    },
    {
      title: "Strategic Priorities for 2026",
      content: `The government has identified five key areas where they'll focus resources in 2026:

🌽 Agriculture
Irrigation, crop diversification, improved agricultural value chain

💼 MSMEs (Small Business)
Hustler Fund expansion, strengthened NYOTA fund, business hubs in all 47 counties

🏥 Healthcare
Target: 35 million Kenyans covered by Universal Health Coverage plus SHA

🏠 Housing
Jobs in construction + affordable loans

📱 Digital & Creative Sectors
Fibre internet + backing film, music, fashion, etc.

Infrastructure & Enablers:
• More roads, railways, increase power connectivity, gas exploration
• The National Infrastructure Fund
• Sovereign Wealth Fund

These are the government's five open tabs. If you're a farmer, a small business owner, an artist, this is where your opportunities live. Each pillar comes with actual money attached.`
    },
    {
      title: "Key Budget Numbers",
      content: `Here's what you need to know about the 2026/27 budget numbers:

💰 Spending: KES 4.74 Trillion
   Total money the government plans to spend

📈 Revenue: KES 3.59 Trillion
   Money expected to collect from taxes and other sources

📉 Deficit: KES 1.15 Trillion
   The gap between spending and revenue - this must be filled through borrowing

⚠️ Debt Interest: ~KES 1.2 Trillion
   Pre-committed funds that can't go to roads, teachers, or healthcare!

This is "mature budgeting" - the government is literally listing what could go wrong. Drought. Debt. Drama. Why does this matter? Because when you know the risks, you can spot them early and ask the right questions before crisis hits.`
    },
    {
      title: "Potential Risks",
      content: `The BPS openly discusses what could go wrong. Here's what to watch:

🌤️ Climate Shocks
Drought/floods cost unplanned money - when disasters hit, the government must find emergency funds

📉 Revenue Gaps
If businesses struggle, taxes drop - less money means less spending on services

💳 Debt Pressure
If shilling weakens, debt gets expensive - Kenya borrows in foreign currency, so exchange rate changes matter

🏛️ Devolution Drama
Counties' unpaid bills pile up - sometimes counties spend more than they receive

Understanding these risks helps you become an informed citizen who can:
• Hold the government accountable
• Plan for your own resilience
• Participate meaningfully in public discussions`
    },
    {
      title: "Counties & Devolution",
      content: `Here's how the budget affects your county:

🏛️ Counties: KES 420 Billion
Total allocation to all 47 counties

🏥 Community Health: Ksh 3.24 Billion
For community health workers and primary healthcare

🏭 Industrial Parks: KES 3.25 Billion
For creating jobs and business opportunities

⚖️ Equalisation Fund: KES 9.6 Billion
For developing marginalized areas

🇰🇪 Kenya Context: Whatever the BPS prioritizes at the national level? That's what your county government has to align with when planning your local markets, health centers, and roads.

Your county's budget must align with BPS priorities. This means if the BPS says "agriculture transformation," your county should be investing in farming programs, irrigation, and farmer support.`
    }
  ];

  const quizQuestions = [
    {
      question: "1. The BPS is best described as:",
      options: [
        { value: "A", label: "The final, detailed list of every government project." },
        { value: "B", label: "The government's strategic roadmap setting priorities and spending limits." },
        { value: "C", label: "A tax collection manual." }
      ],
      correct: "B"
    },
    {
      question: "2. If the BPS prioritizes 'Agricultural Transformation,' what should you expect to see in your county?",
      options: [
        { value: "A", label: "More police officers." },
        { value: "B", label: "Potential investments in irrigation, fertilizer subsidies, or livestock programs." },
        { value: "C", label: "Construction of a new stadium." }
      ],
      correct: "B"
    },
    {
      question: "3. In FY 2026/27, the government projects a spending gap of Ksh 1.15 trillion. This is called the:",
      options: [
        { value: "A", label: "Surplus" },
        { value: "B", label: "Emergency Fund" },
        { value: "C", label: "Fiscal Deficit" }
      ],
      correct: "C"
    },
    {
      question: "4. True or False: The BPS includes a section that openly discusses risks like drought or revenue shortfalls.",
      options: [
        { value: "true", label: "True" },
        { value: "false", label: "False" }
      ],
      correct: "true"
    }
  ];

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correct++;
    });
    return correct;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const markLessonComplete = () => {
    setCompletedLessons(prev => new Set([...prev, currentLesson]));
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const progress = (completedLessons.size / lessons.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white">
              Module 001
            </Badge>
            <Badge variant="outline" className="border-white/40 text-white">
              10 Minutes
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            The Budget Policy Statement (BPS) 2026
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Understanding how public money is planned, spent, and monitored.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/30" />
            </div>
            <Trophy className="h-8 w-8 text-yellow-300" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="learn" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="action">Take Action</TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            {/* Lesson Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {lessons.map((lesson, idx) => (
                <Button
                  key={idx}
                  variant={currentLesson === idx ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentLesson(idx)}
                  className="gap-2"
                >
                  {completedLessons.has(idx) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  {idx + 1}
                </Button>
              ))}
            </div>

            {/* Current Lesson */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {currentLesson + 1}
                    </span>
                    {lessons[currentLesson].title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markLessonComplete}
                    disabled={completedLessons.has(currentLesson)}
                  >
                    {completedLessons.has(currentLesson) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="prose prose-sm max-w-none whitespace-pre-line">
                    {lessons[currentLesson].content}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
              >
                <ChevronUp className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => {
                  markLessonComplete();
                  if (currentLesson === lessons.length - 1) {
                    setShowResults(true);
                  }
                }}
              >
                {currentLesson === lessons.length - 1 ? "Finish Module" : "Next Lesson"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  Knowledge Check
                </CardTitle>
                <p className="text-muted-foreground">
                  Test your understanding of the BPS 2026
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-4">
                    <p className="font-semibold text-lg">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleQuizAnswer(qIdx, opt.value)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            quizAnswers[qIdx] === opt.value
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <span className="font-bold mr-3">{opt.value})</span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {showResults && (
                      <div className={`p-3 rounded-lg ${
                        quizAnswers[qIdx] === q.correct 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {quizAnswers[qIdx] === q.correct ? "✓ Correct!" : `✗ Incorrect. The answer is ${q.correct}`}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-6 border-t">
                  <Button 
                    onClick={() => setShowResults(true)} 
                    className="w-full"
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    Submit Answers
                  </Button>
                  
                  {showResults && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl text-center">
                      <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">
                        You scored {calculateScore()} out of {quizQuestions.length}!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {calculateScore() === quizQuestions.length 
                          ? "Perfect! You're a budget expert! 🏆"
                          : calculateScore() >= quizQuestions.length / 2 
                            ? "Great job! Keep learning!"
                            : "Review the lessons and try again!"}
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={() => {
                          setQuizAnswers({});
                          setShowResults(false);
                        }}>
                          Retry Quiz
                        </Button>
                        <Button asChild>
                          <Link href="/take-action">
                            Take Action <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Take Action Tab */}
          <TabsContent value="action" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Track Budgets */}
              <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Track the Numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Check if the projects in your area match BPS priorities. Use our budget tracking tools to monitor where money is actually going.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/tracker">
                      Go to Tracker <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Use Your Voice */}
              <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Use Your Voice</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Show up to public participation informed. Learn when and how to make your voice heard in budget decisions.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/take-action">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Monetize Talent */}
              <Card className="border-2 border-primary/20 hover:border-primary transition-colors md:col-span-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Monetize Your Talent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Creative economy = your next opportunity. The BPS 2026 prioritizes Digital & Creative Sectors with fibre internet and backing for film, music, fashion, and more.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/insights">
                      Explore Opportunities <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardContent className="pt-8 pb-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for Module 2?</h3>
                <p className="mb-6 opacity-90">
                  Continue your budget literacy journey with our next module on the Budget Cycle.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  asChild
                >
                  <Link href="/learn">
                    Back to Learning Center <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
