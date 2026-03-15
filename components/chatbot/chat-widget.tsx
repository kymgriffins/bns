"use client";

import * as React from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  SendHorizontal,
  CheckCircle2,
  Ticket,
  Bug,
  DollarSign,
  MessageSquare,
  Shield,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface TicketType {
  id: string;
  subject: string;
  category: string;
  status: "pending" | "resolved" | "closed";
  createdAt: Date;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const supportCategories = [
  { id: "general", label: "General", icon: HelpCircle },
  { id: "technical", label: "Technical", icon: Bug },
  { id: "billing", label: "Billing", icon: DollarSign },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
];

const aiQuickPrompts = [
  { label: "What is BPS 2026?", query: "What is BPS 2026 and why does it matter?" },
  { label: "Find county reports", query: "Where can I find county budget reports?" },
  { label: "Budget cycle explained", query: "Explain Kenya's budget cycle in simple terms." },
  { label: "How to use reports", query: "How do I use the simplified budget reports on this site?" },
];

const faqItems: FAQ[] = [
  { question: "How do I track budget spending?", answer: "Visit our Insights page or the tracker to see detailed expenditure reports.", category: "general" },
  { question: "How can I access detailed reports?", answer: "Go to Reports for annual statements, county analyses, and sector reports.", category: "general" },
  { question: "The website is not loading properly", answer: "Try clearing cache and cookies, or use a different browser. You can also submit a ticket.", category: "technical" },
  { question: "How do I submit a support ticket?", answer: "Use the 'Submit ticket' tab in this chat. We typically reply within 24–48 hours.", category: "general" },
  { question: "What payment methods do you accept?", answer: "We accept M-Pesa, cards (Visa, Mastercard), and bank transfer. See Donate for details.", category: "billing" },
  { question: "How do I submit feedback?", answer: "Choose the Feedback category or email us. We use it to improve the platform.", category: "feedback" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm your **AI assistant** for Budget Ndio Story. I can help you understand Kenya's budget, find reports, and answer questions about the platform.\n\nAsk anything—e.g. \"What is BPS?\", \"Where are county briefs?\", or pick a suggestion below.",
    timestamp: new Date(),
  },
];

function renderMessageContent(text: string) {
  return text.split(/\n/).map((line, i) => {
    const parts: React.ReactNode[] = [];
    let rest = line;
    while (rest.length > 0) {
      const boldMatch = rest.match(/\*\*([^*]+)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(rest.slice(0, boldMatch.index));
        }
        parts.push(<strong key={`b-${i}-${parts.length}`} className="font-semibold">{boldMatch[1]}</strong>);
        rest = rest.slice(boldMatch.index + boldMatch[0].length);
      } else {
        parts.push(rest);
        break;
      }
    }
    return <p key={i}>{parts}</p>;
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [view, setView] = React.useState<"chat" | "tickets" | "faq">("chat");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [ticketForm, setTicketForm] = React.useState({ subject: "", description: "", email: "" });
  const [submittedTicket, setSubmittedTicket] = React.useState<TicketType | null>(null);
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null);
  const [tickets, setTickets] = React.useState<TicketType[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  React.useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleQuickPrompt = (query: string) => {
    setInput(query);
  };

  const handleCategorySelect = (categoryId: string) => {
    const cat = supportCategories.find((c) => c.id === categoryId);
    if (!cat) return;
    setSelectedCategory(categoryId);
    const systemMessage: Message = {
      id: Date.now().toString(),
      role: "system",
      content: `You're in **${cat.label}**. Describe your question or issue below, or submit a ticket for follow-up.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  };

  const handleSubmitTicket = async () => {
    if (!ticketForm.subject || !ticketForm.description || !ticketForm.email) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const newTicket: TicketType = {
      id: `TKT-${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
      subject: ticketForm.subject,
      category: selectedCategory || "general",
      status: "pending",
      createdAt: new Date(),
    };
    setTickets((prev) => [...prev, newTicket]);
    setSubmittedTicket(newTicket);
    setTicketForm({ subject: "", description: "", email: "" });
    setIsLoading(false);
    const confirmMessage: Message = {
      id: Date.now().toString(),
      role: "system",
      content: `Ticket **${newTicket.id}** created. We'll reply to ${ticketForm.email} within 24–48 hours.`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({ role: m.role, content: m.content })),
          category: selectedCategory,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Something went wrong. Please try again or submit a ticket.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (categoryId: string) =>
    supportCategories.find((c) => c.id === categoryId)?.icon ?? HelpCircle;

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-[0.98]",
          isOpen
            ? "bg-muted-foreground text-muted"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </Button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[min(420px,calc(100vw-2rem))] transition-all duration-200 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl max-h-[min(75vh,600px)]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground">Budget Ndio Story</h3>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  AI
                </span>
                Assistant · Ask about budget & reports
              </p>
            </div>
            <div className="relative group">
              <button
                type="button"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Privacy"
              >
                <Shield className="h-4 w-4" />
              </button>
              <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card p-3 text-xs shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <p className="font-medium text-foreground">Privacy</p>
                <p className="mt-1 text-muted-foreground">
                  AI uses public budget data. We don’t store or share your chats.{" "}
                  <a href="/privacy" className="text-primary hover:underline">Learn more</a>
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border bg-muted/20">
            {[
              { id: "chat" as const, label: "Chat", icon: MessageCircle },
              { id: "faq" as const, label: "FAQ", icon: HelpCircle },
              { id: "tickets" as const, label: "Ticket", icon: Ticket },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 py-3 text-xs font-medium transition-colors",
                  view === id
                    ? "border-b-2 border-primary text-primary bg-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {view === "chat" && (
              <>
                {messages.length <= 2 && !selectedCategory && (
                  <div className="border-b border-border bg-muted/20 p-4">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Choose a category (optional)</p>
                    <div className="flex flex-wrap gap-2">
                      {supportCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategorySelect(cat.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          <cat.icon className="h-3.5 w-3.5" />
                          {cat.label}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-xs font-medium text-muted-foreground">Or try a quick question</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {aiQuickPrompts.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleQuickPrompt(p.query)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                        >
                          <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-2",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 shrink-0 rounded-full flex items-center justify-center",
                          msg.role === "user" && "bg-primary text-primary-foreground",
                          msg.role === "assistant" && "bg-primary/15 text-primary",
                          msg.role === "system" && "bg-muted text-muted-foreground"
                        )}
                      >
                        {msg.role === "user" ? (
                          <span className="text-[10px] font-medium">You</span>
                        ) : msg.role === "assistant" ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          <HelpCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed",
                          msg.role === "user" &&
                            "bg-primary text-primary-foreground rounded-br-md",
                          msg.role === "assistant" &&
                            "bg-muted/60 text-foreground border border-border rounded-bl-md",
                          msg.role === "system" &&
                            "bg-muted/40 text-muted-foreground border border-border rounded-bl-md"
                        )}
                      >
                        <div className="whitespace-pre-line">
                          {msg.role === "assistant" || msg.role === "system"
                            ? renderMessageContent(msg.content)
                            : msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="rounded-2xl rounded-bl-md bg-muted/60 border border-border px-4 py-2.5">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "120ms" }} />
                          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "240ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={selectedCategory ? "Describe your issue..." : "Ask about budget, reports, or the site..."}
                      className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="h-10 w-10 shrink-0 rounded-full"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </>
            )}

            {view === "faq" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {faqItems.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                      className="w-full flex items-center justify-between p-3 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {faq.question}
                      {expandedFAQ === i ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
                    </button>
                    {expandedFAQ === i && (
                      <div className="px-3 pb-3">
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {view === "tickets" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!submittedTicket ? (
                  <>
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Ticket className="h-4 w-4" />
                      Submit a ticket
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                        <select
                          value={selectedCategory || ""}
                          onChange={(e) => setSelectedCategory(e.target.value || null)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        >
                          <option value="">Select...</option>
                          {supportCategories.map((c) => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
                        <input
                          type="text"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm((p) => ({ ...p, subject: e.target.value }))}
                          placeholder="Brief description"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                        <textarea
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm((p) => ({ ...p, description: e.target.value }))}
                          placeholder="Details..."
                          rows={3}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                        <input
                          type="email"
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm((p) => ({ ...p, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <Button
                        onClick={handleSubmitTicket}
                        disabled={!ticketForm.subject || !ticketForm.description || !ticketForm.email || isLoading}
                        className="w-full rounded-full"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <SendHorizontal className="h-4 w-4 mr-2" />}
                        Submit
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Or email{" "}
                      <a href="mailto:info@budgetndiostory.org" className="text-primary hover:underline">
                        info@budgetndiostory.org
                      </a>
                    </p>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">Ticket submitted</p>
                    <p className="text-sm text-muted-foreground mt-1">{submittedTicket.id}</p>
                    <Button variant="outline" className="mt-4 rounded-full" onClick={() => setSubmittedTicket(null)}>
                      Submit another
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
