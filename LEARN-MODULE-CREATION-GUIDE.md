# Learn Module System - Client Module Creation Guide

## 🎯 Quick Start

### For Clients: Creating Your First Module

#### Step 1: Access the Module Creator
1. Navigate to **`/learn/create`**
2. Or from `/learn` hub, look for "Create Module" link

#### Step 2: Fill in the Form

**Basic Information:**
- **Module ID**: Unique identifier (e.g., `finance-bill-2024`)
  - Use lowercase, hyphens only
  - Must be unique across system
- **Module Number**: Sequential (e.g., 003, 004)
- **Title**: Clear, descriptive title
- **Description**: One-sentence summary
- **Category**: Choose from Budget Basics, Advanced, Policy, Fiscal, General

**Instructor Section:**
- **Name**: Your full name
- **Role**: Your professional title
- **Avatar**: Single emoji (👤👩‍💼👨‍💻 etc)

**Colors:**
- **Primary Color**: Main module color (hex code or color picker)
- **Secondary Color**: Accent color

**Basic Level Content:**
- **Title**: "Simple Introduction" or similar
- **Description**: What beginners will learn
- **Duration**: Estimated time (e.g., "10 min")
- **Slide Count**: Number of slides in basic version

#### Step 3: Prepare Your Slide Content

Create a new directory:
```
/app/learn/data/modules/{your-module-id}/
├── metadata.json           # (Auto-created by form)
├── slides-basic.json       # You create this
└── slides-advanced.json    # Optional
```

#### Step 4: Create `slides-basic.json`

Open your text editor and create this structure:

```json
{
  "id": "your-module-id-basic",
  "moduleId": "your-module-id",
  "level": "basic",
  "title": "Your Module Title (Basic)",
  "slides": [
    {
      "id": "cover",
      "type": "cover",
      "bg": "bg-red",
      "orbA": "rgba(229,62,62,.5)",
      "orbB": "rgba(245,200,66,.3)",
      "content": {
        "tag": "Module 003 · Your Category",
        "title": "Your\nModule\n*Title* Here",
        "sub": "Short subtitle explaining what this is about.",
        "promise": "In the next 10 minutes, you'll understand X, Y, and Z."
      }
    },
    {
      "id": "concept-1",
      "type": "concept",
      "bg": "bg-dark",
      "orbA": "rgba(245,200,66,.3)",
      "orbB": "rgba(56,178,172,.2)",
      "content": {
        "tag": "What is This Concept?",
        "tagBg": "rgba(245,200,66,.15)",
        "tagColor": "#F5C842",
        "question": "This is the main *question*\nYou want to answer",
        "bullets": [
          {
            "dot": "#F5C842",
            "text": "<strong>First Point:</strong> Explanation of the first key idea"
          },
          {
            "dot": "#38B2AC",
            "text": "<strong>Second Point:</strong> Another important concept"
          },
          {
            "dot": "#9F7AEA",
            "text": "<strong>Third Point:</strong> The final key takeaway"
          }
        ],
        "badge": "🇰🇪 Kenya Context: How this applies to Kenya specifically."
      }
    },
    {
      "id": "quiz-1",
      "type": "quiz",
      "bg": "bg-purple",
      "quizIdx": 0,
      "content": {
        "question": "What is the main idea we just learned?",
        "options": [
          { "letter": "A", "text": "Option one" },
          { "letter": "B", "text": "Correct answer" },
          { "letter": "C", "text": "Option three" }
        ],
        "correct": 1,
        "feedback": {
          "correct": "✓ Exactly! You got it right.",
          "wrong": "Try again. Think about what we discussed..."
        }
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "bg": "bg-gold",
      "orbA": "rgba(245,200,66,.5)",
      "orbB": "rgba(56,178,172,.2)",
      "content": {
        "title": "You finished\n*Module 003*",
        "sub": "Great job! You now understand X. What's next?",
        "actions": [
          {
            "icon": "📚",
            "style": "cta-btn-primary",
            "title": "Learn More",
            "sub": "Dive deeper into this topic",
            "onclickMsg": "Opening resource..."
          }
        ]
      }
    }
  ]
}
```

---

## 📝 Slide Types Guide

### 1. **Cover** - Module Introduction
```json
{
  "type": "cover",
  "bg": "bg-red",
  "content": {
    "tag": "Module 003 · Category",
    "title": "Line One\nLine Two\n*Emphasized*",
    "sub": "Subtitle",
    "promise": "What they'll learn..."
  }
}
```

### 2. **Concept** - Teaching Slide
```json
{
  "type": "concept",
  "bg": "bg-dark",
  "content": {
    "tag": "The Big Idea",
    "tagBg": "rgba(255,0,0,0.15)",
    "tagColor": "#FF0000",
    "question": "Main *question* to answer",
    "bullets": [
      { "dot": "#COLOR1", "text": "<strong>Bold</strong> text supported" },
      { "dot": "#COLOR2", "text": "Another point" }
    ],
    "badge": "🇰🇪 Optional Kenya context"
  }
}
```

### 3. **Quiz** - Knowledge Check
```json
{
  "type": "quiz",
  "quizIdx": 0,
  "bg": "bg-purple",
  "content": {
    "question": "Question text?",
    "options": [
      { "letter": "A", "text": "First option" },
      { "letter": "B", "text": "Correct option" }
    ],
    "correct": 1,
    "feedback": {
      "correct": "Well done!",
      "wrong": "Not quite..."
    }
  }
}
```

### 4. **Snapshot** - Data Display
```json
{
  "type": "snapshot",
  "bg": "bg-dark",
  "content": {
    "headline": "The Numbers",
    "tiles1": [
      { "icon": "📊", "val": "1.5M", "label": "People reached" },
      { "icon": "💰", "val": "KES 500B", "label": "Budget" }
    ]
  }
}
```

### 5. **Pillars** - 5-Item Showcase
```json
{
  "type": "pillars",
  "bg": "bg-green",
  "content": {
    "headline": "The 5 Key Areas",
    "sub": "Here's what we focus on",
    "pillars": [
      {
        "emoji": "🌾",
        "title": "Agriculture",
        "desc": "Description...",
        "money": "KES 100B"
      }
    ]
  }
}
```

### 6. **Risks** - Challenge List
```json
{
  "type": "risks",
  "bg": "bg-red",
  "content": {
    "headline": "Challenges Ahead",
    "sub": "What could go wrong",
    "risks": [
      { "icon": "⚠️", "title": "Risk Name", "text": "Description" }
    ],
    "quote": "Important *quote* to remember"
  }
}
```

### 7. **CTA** - Call to Action / Completion
```json
{
  "type": "cta",
  "bg": "bg-gold",
  "content": {
    "title": "You finished\n*Module 003*",
    "sub": "Next steps...",
    "actions": [
      {
        "icon": "🔍",
        "style": "cta-btn-primary",
        "title": "Take Action",
        "sub": "Do something",
        "onclickMsg": "Action message..."
      }
    ]
  }
}
```

---

## 🎨 Background Colors

Use these for the `bg` field:
- `bg-red` - Red theme
- `bg-gold` / `bg-yellow` - Gold/Yellow theme
- `bg-teal` - Teal theme
- `bg-green` - Green theme
- `bg-purple` - Purple theme
- `bg-dark` - Dark theme

---

## 🎯 Hex Colors for Dots/Accents

Common colors:
- `#E53E3E` - Red
- `#F5C842` - Gold
- `#38B2AC` - Teal
- `#9F7AEA` - Purple
- `#72B96F` - Green

---

## ✅ Module Checklist

Before submitting your module:

- [ ] Module ID is unique and lowercase
- [ ] Title is clear and engaging
- [ ] Description is one sentence
- [ ] 8-12 slides for basic level
- [ ] Cover slide included
- [ ] At least 2 concept slides
- [ ] At least 1-2 quiz questions
- [ ] CTA slide at the end
- [ ] All JSON is valid (test with [jsonlint.com](https://jsonlint.com))
- [ ] All images/emojis work on mobile
- [ ] Tested in both light and dark mode

---

## 🧪 Testing Your Module

1. **Place files** in `/app/learn/data/modules/{your-id}/`
2. **Restart** the dev server
3. **Visit** `/learn` hub
4. **Look for** your module
5. **Test** all slides and quizzes
6. **Check** mobile responsiveness

---

## 🚀 Deployment

Once tested:
1. Commit slide files to git
2. Module auto-appears in production
3. No additional deployment needed!

---

## ❓ FAQ

**Q: Can I have more than 2 levels?**
A: Currently basic & advanced. Future versions may support multiple levels.

**Q: Can I add video?**
A: Not yet, but it's planned for the next release.

**Q: How do I update my module?**
A: Update the JSON files and push to git. Changes appear in ~5 minutes.

**Q: Can students download modules?**
A: Not yet. Mobile app support coming Q2 2026.

**Q: What if my module has thousands of slides?**
A: Split into multiple modules for better UX. Each module should be 8-25 slides.

---

## 📞 Support

Having issues? 
1. Check this guide first
2. Validate your JSON at [jsonlint.com](https://jsonlint.com)
3. Review the example modules in `/app/learn/data/modules/bps-2026/`
4. Open an issue with your module ID and error details

---

**Last Updated**: March 20, 2026
**Version**: 1.0
