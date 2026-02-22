"use client"

import * as React from "react"
import { 
  MessageCircle, X, Send, Loader2, HelpCircle, Mail, Phone, 
  FileText, ChevronDown, ChevronUp, SendHorizontal, Clock,
  AlertCircle, CheckCircle2, Ticket, Zap, Bug, DollarSign,
  MessageSquare, ExternalLink, Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface Ticket {
  id: string
  subject: string
  category: string
  status: "pending" | "resolved" | "closed"
  createdAt: Date
}

interface FAQ {
  question: string
  answer: string
  category: string
}

// Support categories
const supportCategories = [
  { id: "general", label: "General Inquiry", icon: HelpCircle, color: "text-blue-500" },
  { id: "technical", label: "Technical Support", icon: Bug, color: "text-orange-500" },
  { id: "billing", label: "Billing & Payments", icon: DollarSign, color: "text-green-500" },
  { id: "feedback", label: "Feedback", icon: MessageSquare, color: "text-purple-500" },
]

// FAQ items
const faqItems: FAQ[] = [
  { 
    question: "How do I track budget spending?", 
    answer: "You can track spending by visiting our Insights page or using the tracker feature. Navigate to the tracker section to see detailed expenditure reports.",
    category: "general"
  },
  { 
    question: "How can I access detailed reports?", 
    answer: "Visit our Reports section to download annual budget statements, county analyses, and sector performance reports. Most reports are available in PDF format.",
    category: "general"
  },
  { 
    question: "The website is not loading properly", 
    answer: "Try clearing your browser cache and cookies, then refresh the page. If the issue persists, try using a different browser or contact technical support.",
    category: "technical"
  },
  { 
    
    question: "How do I submit a support ticket?",
    answer: "You can submit a support ticket by clicking the 'Submit Ticket' button in this chat. Fill in your issue details and our team will respond within 24-48 hours.",
    category: "general"
  },
  { 
    question: "How do I report a bug?", 
    answer: "Click on 'Technical Support' category and describe the issue you're experiencing. Include any error messages or steps to reproduce the problem.",
    category: "technical"
  },
  { 
    question: "What payment methods are accepted?",
    answer: "We accept M-Pesa, credit/debit cards (Visa, Mastercard), and bank transfers. For bulk payments, please contact our billing team.",
    category: "billing"
  },
  { 
    question: "How can I request a refund?",
    answer: "To request a refund, please submit a billing support ticket with your transaction details. Our billing team will review your request within 5-7 business days.",
    category: "billing"
  },
  { 
    question: "How do I submit feedback?",
    answer: "We value your feedback! Click on the 'Feedback' category to share your suggestions, report issues, or tell us about your experience using our platform.",
    category: "feedback"
  },
]

// Initial greeting
const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Welcome to **BudgetNdioStory Support Desk**! 👋\n\nI'm here to help you with any questions or issues you may have. How can I assist you today?\n\n💡 I use AI trained on public budget documents. Your conversations help us improve but aren't shared with third parties.",
    timestamp: new Date(),
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [view, setView] = React.useState<"chat" | "tickets" | "faq">("chat")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [ticketForm, setTicketForm] = React.useState({ subject: "", description: "", email: "" })
  const [submittedTicket, setSubmittedTicket] = React.useState<Ticket | null>(null)
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null)
  const [tickets, setTickets] = React.useState<Ticket[]>([])
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleCategorySelect = (categoryId: string) => {
    const category = supportCategories.find(c => c.id === categoryId)
    if (category) {
      setSelectedCategory(categoryId)
      
      const systemMessage: Message = {
        id: Date.now().toString(),
        role: "system",
        content: `You've selected **${category.label}**. Please describe your issue or question below, or submit a ticket for more detailed assistance.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, systemMessage])
    }
  }

  const handleSubmitTicket = async () => {
    if (!ticketForm.subject || !ticketForm.description || !ticketForm.email) return
    
    setIsLoading(true)
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newTicket: Ticket = {
      id: `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      subject: ticketForm.subject,
      category: selectedCategory || "general",
      status: "pending",
      createdAt: new Date(),
    }
    
    setTickets(prev => [...prev, newTicket])
    setSubmittedTicket(newTicket)
    setTicketForm({ subject: "", description: "", email: "" })
    setIsLoading(false)
    
    const confirmMessage: Message = {
      id: Date.now().toString(),
      role: "system",
      content: `✅ **Ticket Submitted Successfully!**\n\nYour ticket **${newTicket.id}** has been created.\n\n📧 Confirmation sent to: ${ticketForm.email}\n📋 Subject: ${ticketForm.subject}\n⏰ Response time: 24-48 hours\n\nYou can check your ticket status in the "My Tickets" section.`,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, confirmMessage])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          category: selectedCategory,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Oops! Something went wrong. Please try again or submit a support ticket.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "pending": return "text-yellow-500"
      case "resolved": return "text-green-500"
      case "closed": return "text-gray-500"
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = supportCategories.find(c => c.id === categoryId)
    return category?.icon || HelpCircle
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon-lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
            isOpen 
              ? "bg-zinc-600 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600" 
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 animate-pulse"
          )}
          aria-label={isOpen ? "Close Support Desk" : "Open Support Desk"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <span className="text-lg font-bold">?</span>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] transition-all duration-300 ease-out",
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="bg-background rounded-2xl shadow-2xl border border-border/60 overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 px-4 py-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <span className="text-lg font-bold text-white">?</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-base">Support Desk</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online • Typically replies in minutes
              </p>
            </div>
            {/* Data Transparency Info */}
            <div className="relative group">
              <button 
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Data privacy information"
              >
                <Shield className="h-4 w-4 text-white" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-background rounded-lg shadow-xl border border-border/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <p className="text-xs font-medium text-foreground mb-1">Data Privacy</p>
                <p className="text-xs text-muted-foreground">
                  This chat uses AI trained on public budget documents. We don't store or share your personal information. 
                  <a href="/privacy" className="text-primary hover:underline">Learn more</a>
                </p>
              </div>
            </div>
            {/* View Switcher */}
            <div className="flex gap-1">
              <button
                onClick={() => setView("chat")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  view === "chat" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                title="Chat"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("tickets")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  view === "tickets" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                title="My Tickets"
              >
                <Ticket className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("faq")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  view === "faq" ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                title="FAQ"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {view === "chat" && (
              <>
                {/* Support Categories */}
                {messages.length <= 2 && !selectedCategory && (
                  <div className="p-4 border-b bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background">
                    <p className="text-sm font-medium text-foreground mb-3">Select a category:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {supportCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.id)}
                          className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-zinc-800 border border-border hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left"
                        >
                          <div className={cn("p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50", category.color)}>
                            <category.icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium">{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Category Banner */}
                {selectedCategory && messages.length > 2 && (
                  <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const CatIcon = getCategoryIcon(selectedCategory)
                        const cat = supportCategories.find(c => c.id === selectedCategory)
                        return <CatIcon className={cn("w-4 h-4", cat?.color)} />
                      })()}
                      <span className="text-sm font-medium">{supportCategories.find(c => c.id === selectedCategory)?.label}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px] min-h-[200px] bg-zinc-50/50 dark:bg-zinc-900/50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2",
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                          message.role === "user"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : message.role === "system"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700"
                        )}
                      >
                        {message.role === "user" ? (
                          <span className="text-xs font-medium text-blue-700 dark:text-blue-400">You</span>
                        ) : message.role === "system" ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        ) : (
                          <span className="text-sm font-bold text-white">?</span>
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 max-w-[85%] text-sm leading-relaxed shadow-sm whitespace-pre-line",
                          message.role === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : message.role === "system"
                            ? "bg-yellow-50 dark:bg-yellow-950/30 text-foreground dark:text-zinc-100 rounded-bl-sm border border-yellow-200 dark:border-yellow-800"
                            : "bg-white dark:bg-zinc-800 text-foreground dark:text-zinc-100 rounded-bl-sm border border-border/50"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">?</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-2.5 border border-border/50">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length > 2 && !isLoading && (
                  <div className="px-4 py-2 border-t bg-zinc-50/50 dark:bg-zinc-900/50 flex gap-2">
                    <button
                      onClick={() => setView("faq")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-zinc-800 border border-border hover:border-blue-500 transition-all"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      View FAQ
                    </button>
                    <button
                      onClick={() => setView("tickets")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-zinc-800 border border-border hover:border-blue-500 transition-all"
                    >
                      <Ticket className="w-3.5 h-3.5 text-blue-500" />
                      Submit Ticket
                    </button>
                  </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="p-3 border-t bg-card">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={selectedCategory ? "Describe your issue..." : "Type your message..."}
                      className="flex-1 h-10 px-4 rounded-full border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}

            {view === "tickets" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px]">
                {/* Submit Ticket Form */}
                {!submittedTicket ? (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      Submit a Support Ticket
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                        <select 
                          value={selectedCategory || ""}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          <option value="">Select category...</option>
                          {supportCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
                        <input
                          type="text"
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Brief description of your issue"
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
                        <textarea
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Please provide details about your issue..."
                          rows={4}
                          className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1 block">Email Address</label>
                        <input
                          type="email"
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>
                      <Button
                        onClick={handleSubmitTicket}
                        disabled={!ticketForm.subject || !ticketForm.description || !ticketForm.email || isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <SendHorizontal className="w-4 h-4 mr-2" />
                        )}
                        Submit Ticket
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-foreground">Ticket Submitted!</h4>
                      <p className="text-sm text-muted-foreground mt-1">Reference: {submittedTicket.id}</p>
                    </div>
                    <Button
                      onClick={() => setSubmittedTicket(null)}
                      variant="outline"
                      className="w-full"
                    >
                      Submit Another Ticket
                    </Button>
                  </div>
                )}

                {/* Contact Info */}
                <div className="pt-4 border-t space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Other ways to reach us:</p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      Email
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 text-xs font-medium hover:bg-green-100 dark:hover:bg-green-950/50 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === "faq" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[450px]">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Frequently Asked Questions
                </h4>
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden bg-white dark:bg-zinc-800"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                    >
                      <span className="text-sm font-medium pr-4">{faq.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-3 pb-3">
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Avg. response: 5 min
            </span>
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              View all resources
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
