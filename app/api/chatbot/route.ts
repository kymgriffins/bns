import { NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

// Support desk responses by category
const supportResponses: Record<string, Record<string, string>> = {
  general: {
    greeting: "Hello! Welcome to BudgetNdioStory Support Desk. I'm here to help you with any questions about our platform, budget data, or general inquiries. How can I assist you today?",
    help: "I can help you with:\n\n📊 **Budget Information** - Understanding Kenya's national budget\n🔍 **Data Access** - Finding specific budget data\n📑 **Reports** - Downloading and interpreting reports\n📍 **County Data** - Exploring county-level information\n❓ **General Questions** - Any other questions\n\nWhat would you like to know more about?",
    budget_overview: "Kenya's national budget is prepared annually by the National Treasury and presented to Parliament. The current budget covers:\n\n• **Recurrent Expenditure** - Salaries, operations\n• **Development Expenditure** - Infrastructure projects\n• **County Allocation** - Funds to 47 counties\n\nWould you like more details on any specific area?",
    reports: "We offer various reports:\n\n• Annual budget statements\n• County budget analyses\n• Sector performance reports\n• Monthly expenditure trackers\n\nCheck the Reports section for downloads!",
    default: "That's a great question! I'm here to help you with BudgetNdioStory. Try asking about:\n\n• Budget overview and data\n• How to access reports\n• County information\n• Platform features\n\nWhat would you like to explore?",
  },
  technical: {
    greeting: "Hello! I'm here to help with any technical issues you might be experiencing with BudgetNdioStory. Please describe the problem you're facing.",
    help: "I can help with:\n\n🐛 **Bug Reports** - Report errors or glitches\n📱 **Mobile Issues** - Problems accessing on mobile\n🔐 **Login Issues** - Account access problems\n⚡ **Performance** - Slow loading or errors\n📊 **Data Issues** - Missing or incorrect data\n\nPlease describe your issue in detail.",
    login: "Having trouble logging in? Here are some solutions:\n\n1. **Reset Password** - Use the forgot password link\n2. **Clear Cache** - Clear browser cookies and cache\n3. **Check Email** - Make sure you're using the correct email\n4. **Browser** - Try a different browser\n\nIf the issue persists, please submit a support ticket.",
    performance: "Experiencing slow performance? Try these steps:\n\n1. **Refresh the page** - Clear any stuck processes\n2. **Clear cache** - Remove stored data\n3. **Check internet** - Ensure stable connection\n4. **Disable extensions** - Some browser extensions can interfere\n\nIf problems continue, please submit a technical support ticket.",
    default: "I'm sorry to hear you're experiencing technical issues. To help you better, please include:\n\n• What browser/device you're using\n• What steps led to the issue\n• Any error messages you see\n\nYou can also submit a support ticket for more detailed assistance.",
  },
  billing: {
    greeting: "Hello! Welcome to BudgetNdioStory Billing Support. I'm here to help with payment-related questions and issues.",
    help: "I can assist with:\n\n💳 **Payment Methods** - Available payment options\n💰 **Pricing** - Subscription plans and fees\n🧾 **Invoices** - Billing statements and receipts\n🔄 **Refunds** - Refund requests and policies\n📊 **Usage** - Understanding your billing\n\nHow can I help you today?",
    payment: "We accept the following payment methods:\n\n• **M-Pesa** - Mobile money (Kenya)\n• **Credit/Debit Cards** - Visa, Mastercard\n• **Bank Transfer** - Direct bank payments\n• **PayPal** - International payments\n\nFor any payment issues, please contact our billing team.",
    refund: "Our refund policy:\n\n• Refund requests are processed within 5-7 business days\n• Original payment method will be used for refund\n• Partial refunds may apply for partial subscriptions\n\nTo request a refund, please submit a billing support ticket with your transaction details.",
    pricing: "BudgetNdioStory offers flexible pricing plans:\n\n• **Free Tier** - Basic budget data access\n• **Pro Tier** - Advanced analytics & reports\n• **Enterprise** - Custom solutions for organizations\n\nVisit our pricing page for more details or contact sales.",
    default: "For billing inquiries, please provide more details about your question. You can also:\n\n• Submit a billing support ticket\n• Email billing@BudgetNdioStory.ke\n• Call our billing hotline\n\nWhat would you like to know more about?",
  },
  feedback: {
    greeting: "Thank you for reaching out to BudgetNdioStory Feedback! We value your input and are constantly working to improve our platform.",
    help: "I'd love to hear your feedback on:\n\n💡 **Suggestions** - Ideas for new features\n⭐ **Reviews** - Rate your experience\n🐛 **Issues** - Report problems you've encountered\n💬 **General Feedback** - Any thoughts or comments\n\nPlease share what's on your mind!",
    suggestion: "That's a great suggestion! We appreciate you taking the time to share ideas. Your suggestion will be reviewed by our product team.\n\nTo ensure your suggestion is properly recorded, please submit it through the Feedback form or email us directly at feedback@BudgetNdioStory.ke",
    default: "Thank you for your feedback! We're always looking to improve BudgetNdioStory. Please share more details about:\n\n• What you liked or didn't like\n• Any specific features\n• Suggestions for improvement\n\nYour input helps us serve you better!",
  },
}

// Keywords to match for responses
const keywordMap: Record<string, { keywords: string[]; category: string }> = {
  greeting: { keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "hi there"], category: "all" },
  help: { keywords: ["help", "what can you do", "assist", "support", "what do you know", "options"], category: "all" },
  login: { keywords: ["login", "sign in", "password", "can't access", "account", "authentication"], category: "technical" },
  payment: { keywords: ["payment", "pay", "m-pesa", "card", "credit", "bank transfer"], category: "billing" },
  pricing: { keywords: ["price", "pricing", "cost", "fee", "subscription", "plan", "charges"], category: "billing" },
  refund: { keywords: ["refund", "money back", "reimbursement"], category: "billing" },
  budget_overview: { keywords: ["budget overview", "national budget", "how does budget work", "budget explained", "budget process"], category: "general" },
  reports: { keywords: ["report", "reports", "download", "documents", "statements"], category: "general" },
  performance: { keywords: ["slow", "loading", "error", "crash", "not working", "bug", "issue"], category: "technical" },
  suggestion: { keywords: ["suggest", "idea", "feature", "would be nice", "should have"], category: "feedback" },
}

function findBestResponse(userMessage: string, category?: string): string {
  const lowerMessage = userMessage.toLowerCase()
  
  // Determine which category to use
  let targetCategory = category || "general"
  
  // Check for category-specific keyword matches
  for (const [responseKey, config] of Object.entries(keywordMap)) {
    for (const keyword of config.keywords) {
      if (lowerMessage.includes(keyword)) {
        targetCategory = config.category === "all" ? (category || "general") : config.category
        const categoryResponses = supportResponses[targetCategory]
        if (categoryResponses && categoryResponses[responseKey]) {
          return categoryResponses[responseKey]
        }
      }
    }
  }
  
  // Use default response for the category
  const categoryResponses = supportResponses[targetCategory]
  if (categoryResponses) {
    return categoryResponses.default || supportResponses.general.default
  }
  
  return supportResponses.general.default
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, category } = body as { messages: ChatMessage[]; category?: string }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      )
    }

    // Get the last user message
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user")

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      )
    }

    // Check for OpenAI API key for advanced AI responses
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (openaiApiKey) {
      try {
        // AI assistant system prompts – budget-first, then support
        let systemPrompt = `You are the AI assistant for Budget Ndio Story, a Kenya budget transparency platform. Your main job is to help users understand Kenya's national and county budgets, the budget cycle, BPS (Budget Policy Statement), and where to find reports and briefs on the site. Be friendly, concise, and use plain language. When users ask about budget topics, explain clearly and point them to relevant sections (Reports, Learn, Insights). For platform questions (how to use the site, where to subscribe, donate), give direct, actionable answers. Keep replies focused and under 4 short paragraphs.`
        
        if (category === "technical") {
          systemPrompt = `You are Budget Ndio Story's AI technical support. Help users fix login issues, loading problems, and bugs. Suggest clear steps (e.g. clear cache, try another browser) and recommend submitting a ticket if needed. Be patient and concise.`
        } else if (category === "billing") {
          systemPrompt = `You are Budget Ndio Story's AI billing assistant. Answer questions about donations, M-Pesa, cards, and refunds. Point users to the Donate page and suggest submitting a ticket for payment issues. Be professional and brief.`
        } else if (category === "feedback") {
          systemPrompt = `You are Budget Ndio Story's feedback AI. Thank users for feedback and suggestions. Encourage them to share more and mention they can email or submit a ticket for longer feedback.`
        }

        const openaiResponse = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                ...messages.slice(-6),
              ],
              max_tokens: 300,
              temperature: 0.7,
            }),
          }
        )

        if (openaiResponse.ok) {
          const data = await openaiResponse.json()
          const assistantMessage =
            data.choices[0]?.message?.content ||
            findBestResponse(lastUserMessage.content, category)

          return NextResponse.json({ message: assistantMessage })
        }
      } catch (openaiError) {
        console.error("OpenAI API error:", openaiError)
      }
    }

    // Use keyword-based responses as fallback
    const response = findBestResponse(lastUserMessage.content, category)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Support Desk error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
