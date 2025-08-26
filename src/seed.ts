import { getPayload } from "payload"
import config from "@payload-config"
import { stripe } from "./lib/stripe";
const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
  {
  name: "Clothing",
  color: "#A3D2CA",
  slug: "clothing",
  subcategories: [
    { name: "Men's Wear", slug: "mens-wear" },
    { name: "Women's Wear", slug: "womens-wear" },
    { name: "Kids & Babies", slug: "kids-babies" },
    { name: "Footwear", slug: "footwear" },
    { name: "Accessories", slug: "accessories" },
    { name: "Ethnic & Traditional", slug: "ethnic-traditional" },
    { name: "Casual & Streetwear", slug: "casual-streetwear" },
    { name: "Formal & Office Wear", slug: "formal-office-wear" },
    { name: "Sports & Activewear", slug: "sports-activewear" },
    { name: "Winter & Outerwear", slug: "winter-outerwear" },
  ],
}
]


const products = [
  // Business & Money - Accounting
  {
    name: "Complete Small Business Bookkeeping System",
    description: "Professional bookkeeping templates and automated spreadsheets for small businesses. Includes profit & loss templates, expense tracking, invoice templates, and tax preparation checklists.",
    price: 47,
    categorySlug: "accounting",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Complete Small Business Bookkeeping System\n\n## What's Included\n- Monthly P&L template\n- Expense tracking spreadsheet\n- Invoice generator\n- Tax preparation checklist\n- Setup video tutorials\n\n## Getting Started\n1. Download all templates\n2. Watch the setup video\n3. Customize for your business\n4. Start tracking immediately"
  },

  // Fitness & Health - Nutrition
  {
    name: "Plant-Based Meal Planning System",
    description: "Complete plant-based nutrition system with meal plans, shopping lists, prep guides, and nutritional information for healthy living.",
    price: 57,
    categorySlug: "nutrition",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Plant-Based Meal Planning\n\n## Meal Planning Tools\n- 30-day meal plans\n- Grocery shopping lists\n- Meal prep schedules\n- Recipe database (100+ recipes)\n- Nutritional tracking sheets\n\n## Nutrition Education\n- Protein combining guide\n- Vitamin B12 information\n- Iron absorption tips\n- Calcium sources chart"
  },
  {
    name: "Intermittent Fasting Guide & Tracker",
    description: "Comprehensive intermittent fasting program with multiple protocols, tracking tools, and meal planning guides for sustainable weight management.",
    price: 47,
    categorySlug: "nutrition",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Intermittent Fasting Guide\n\n## Fasting Protocols\n- 16:8 method guide\n- 5:2 approach plan\n- Alternate day fasting\n- Extended fasting protocols\n- Beginner adaptation strategies\n\n## Support Tools\n- Fasting tracking sheets\n- Hunger management tips\n- Breaking fast meal plans\n- Progress monitoring system"
  },

  // Fitness & Health - Mental Health
  {
    name: "Anxiety Management & Coping Strategies",
    description: "Evidence-based anxiety management toolkit with coping techniques, breathing exercises, and cognitive restructuring worksheets.",
    price: 67,
    categorySlug: "mental-health",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Anxiety Management Toolkit\n\n## Coping Strategies\n- Breathing technique guides\n- Grounding exercises\n- Cognitive restructuring worksheets\n- Exposure therapy planning\n- Panic attack protocols\n\n## Daily Management\n- Anxiety tracking sheets\n- Trigger identification logs\n- Coping skill reminders\n- Support system contacts"
  },
  {
    name: "Depression Recovery & Wellness Plan",
    description: "Comprehensive depression support toolkit with mood tracking, activity scheduling, and self-care planning resources.",
    price: 77,
    categorySlug: "mental-health",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Depression Recovery Plan\n\n## Recovery Tools\n- Mood tracking charts\n- Activity scheduling templates\n- Behavioral activation plans\n- Self-care checklists\n- Goal setting frameworks\n\n## Support Resources\n- Crisis intervention plans\n- Professional resource directory\n- Support group information\n- Emergency contact templates"
  },

  // Fitness & Health - Yoga
  {
    name: "Beginner Yoga Practice Series",
    description: "Complete beginner yoga program with pose instructions, breathing techniques, and progressive sequences for building flexibility and strength.",
    price: 47,
    categorySlug: "yoga",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Beginner Yoga Series\n\n## Practice Components\n- 20 foundational poses\n- Breathing technique guides\n- 4-week progression program\n- Morning routine sequences\n- Evening relaxation flows\n\n## Learning Resources\n- Pose alignment guides\n- Modification options\n- Safety precautions\n- Equipment recommendations"
  },
  {
    name: "Advanced Yoga Sequences & Philosophy",
    description: "Advanced yoga practice with challenging sequences, meditation practices, and yoga philosophy studies for experienced practitioners.",
    price: 67,
    categorySlug: "yoga",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
  },
  {
    name: "QuickBooks Pro Setup & Training Guide",
    description: "Step-by-step guide to setting up QuickBooks for your business with video tutorials, chart of accounts templates, and best practices for financial management.",
    price: 67,
    categorySlug: "accounting",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# QuickBooks Pro Setup & Training\n\n## Complete Training Package\n- 4-hour video course\n- Chart of accounts templates\n- Monthly reconciliation checklists\n- Customer & vendor setup guides\n\n## Bonus Materials\n- Industry-specific templates\n- Tax category setup\n- Reporting dashboard setup"
  },

  // Business & Money - Entrepreneurship
  {
    name: "Startup Business Plan Template & Guide",
    description: "Professional business plan template used by successful startups. Includes financial projections, market analysis frameworks, and pitch deck templates.",
    price: 97,
    categorySlug: "entrepreneurship",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Startup Business Plan Template\n\n## Complete Package\n- 40-page business plan template\n- Financial projection spreadsheets\n- Market analysis worksheets\n- Pitch deck template\n- Video walkthrough\n\n## Ready-to-Use Sections\n- Executive summary\n- Market opportunity\n- Business model\n- Financial projections\n- Go-to-market strategy"
  },
  {
    name: "MVP Development Roadmap for Entrepreneurs",
    description: "Complete roadmap for building your Minimum Viable Product. Includes validation frameworks, development checklists, and launch strategies with real case studies.",
    price: 127,
    categorySlug: "entrepreneurship",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# MVP Development Roadmap\n\n## Complete Development Framework\n- Idea validation checklist\n- Feature prioritization matrix\n- Development timeline templates\n- User testing protocols\n- Launch strategy playbook\n\n## Real Case Studies\n- 10 successful MVP launches\n- Common pitfalls to avoid\n- Resource allocation guides"
  },

  // Business & Money - Gigs & Side Projects
  {
    name: "Freelancer's Complete Client Acquisition System",
    description: "Proven system to find and secure high-paying freelance clients. Includes proposal templates, pricing strategies, and client management tools.",
    price: 77,
    categorySlug: "gigs-side-projects",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Complete Client Acquisition System\n\n## What You'll Get\n- Email templates for outreach\n- Proposal templates that convert\n- Pricing calculator\n- Client onboarding checklist\n- Contract templates\n\n## Bonus Materials\n- Portfolio optimization guide\n- Testimonial collection system\n- Referral program template"
  },
  {
    name: "Side Hustle Idea Generator & Validation Kit",
    description: "100+ profitable side hustle ideas with validation frameworks. Includes market research templates, profit calculators, and step-by-step launch guides.",
    price: 57,
    categorySlug: "gigs-side-projects",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Side Hustle Idea Generator\n\n## 100+ Validated Ideas\n- Digital services\n- Physical products\n- Online businesses\n- Local services\n- Passive income streams\n\n## Validation Tools\n- Market research templates\n- Competition analysis\n- Profit calculators\n- Launch checklists"
  },

  // Business & Money - Investing
  {
    name: "Stock Market Beginner's Investment Portfolio",
    description: "Complete guide to building your first investment portfolio. Includes risk assessment tools, diversification strategies, and monthly tracking spreadsheets.",
    price: 87,
    categorySlug: "investing",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Stock Market Investment Guide\n\n## Complete Learning Package\n- Risk tolerance assessment\n- Portfolio allocation templates\n- Stock analysis spreadsheets\n- Monthly tracking tools\n- Rebalancing schedules\n\n## Educational Content\n- Investment fundamentals\n- Market analysis basics\n- Common mistakes to avoid"
  },
  {
    name: "Real Estate Investment Analysis Toolkit",
    description: "Professional real estate investment calculator and analysis tools. Includes cash flow projections, ROI calculators, and property comparison spreadsheets.",
    price: 147,
    categorySlug: "investing",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Real Estate Investment Toolkit\n\n## Professional Analysis Tools\n- Cash flow calculator\n- ROI analysis spreadsheet\n- Property comparison matrix\n- Financing options calculator\n- Tax benefit estimator\n\n## Bonus Resources\n- Market research guide\n- Due diligence checklist\n- Negotiation strategies"
  },

  // Business & Money - Management & Leadership
  {
    name: "Team Management Handbook for New Managers",
    description: "Essential guide for first-time managers. Includes performance review templates, team meeting frameworks, and conflict resolution strategies.",
    price: 67,
    categorySlug: "management-leadership",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Team Management Handbook\n\n## Management Essentials\n- One-on-one meeting templates\n- Performance review frameworks\n- Goal setting worksheets\n- Team building activities\n- Feedback delivery scripts\n\n## Leadership Development\n- Communication strategies\n- Conflict resolution guide\n- Decision-making frameworks"
  },
  {
    name: "Remote Team Leadership Playbook",
    description: "Complete guide to leading remote teams effectively. Includes virtual meeting best practices, productivity tracking tools, and team engagement strategies.",
    price: 97,
    categorySlug: "management-leadership",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Remote Team Leadership\n\n## Remote Management Tools\n- Virtual meeting templates\n- Team communication guidelines\n- Productivity tracking systems\n- Employee engagement surveys\n- Performance evaluation forms\n\n## Culture Building\n- Virtual team building activities\n- Recognition programs\n- Onboarding checklists"
  },

  // Business & Money - Marketing & Sales
  {
    name: "Email Marketing Campaign Templates Pack",
    description: "50+ high-converting email templates for every stage of the customer journey. Includes welcome series, promotional campaigns, and re-engagement sequences.",
    price: 77,
    categorySlug: "marketing-sales",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Email Marketing Templates\n\n## 50+ Professional Templates\n- Welcome series (5 emails)\n- Product launch sequence\n- Abandoned cart recovery\n- Re-engagement campaigns\n- Newsletter templates\n\n## Copywriting Guidelines\n- Subject line formulas\n- Call-to-action optimization\n- A/B testing frameworks"
  },
  {
    name: "Social Media Content Calendar & Strategy",
    description: "12-month social media content calendar with post templates, hashtag research tools, and engagement strategies for all major platforms.",
    price: 97,
    categorySlug: "marketing-sales",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Social Media Content Calendar\n\n## Complete Annual Strategy\n- 365-day content calendar\n- Post templates for all platforms\n- Hashtag research spreadsheets\n- Engagement tracking tools\n- Content creation workflows\n\n## Platform-Specific Guides\n- Instagram growth strategies\n- LinkedIn business tactics\n- Twitter engagement tips"
  },

  // Business & Money - Networking, Careers & Jobs
  {
    name: "Professional LinkedIn Optimization Kit",
    description: "Complete LinkedIn profile optimization guide with templates, connection request scripts, and networking strategies to advance your career.",
    price: 47,
    categorySlug: "networking-careers-jobs",
    imageUrl: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# LinkedIn Optimization Kit\n\n## Profile Optimization\n- Headline templates\n- Summary frameworks\n- Experience descriptions\n- Skills optimization\n- Photo guidelines\n\n## Networking Strategies\n- Connection request templates\n- Follow-up message scripts\n- Content sharing calendar\n- Engagement tactics"
  },
  {
    name: "Job Interview Success System",
    description: "Comprehensive interview preparation system with common questions, STAR method frameworks, salary negotiation scripts, and follow-up templates.",
    price: 67,
    categorySlug: "networking-careers-jobs",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Job Interview Success System\n\n## Interview Preparation\n- 100+ common interview questions\n- STAR method worksheets\n- Company research templates\n- Mock interview guides\n- Confidence building exercises\n\n## Negotiation Tools\n- Salary negotiation scripts\n- Benefits evaluation checklist\n- Counter-offer strategies"
  },

  // Business & Money - Personal Finance
  {
    name: "Complete Personal Budget Planner",
    description: "Automated budget spreadsheet with expense tracking, savings goals, and debt payoff calculators. Includes emergency fund planning and investment tracking.",
    price: 37,
    categorySlug: "personal-finance",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Personal Budget Planner\n\n## Complete Financial Management\n- Monthly budget calculator\n- Expense tracking sheets\n- Debt payoff planner\n- Savings goal tracker\n- Investment portfolio tracker\n\n## Financial Planning Tools\n- Emergency fund calculator\n- Retirement planning worksheet\n- Tax planning checklist"
  },
  {
    name: "Debt Freedom Action Plan",
    description: "Step-by-step system to eliminate debt using proven strategies. Includes debt snowball calculator, negotiation scripts, and credit repair guidelines.",
    price: 57,
    categorySlug: "personal-finance",
    imageUrl: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Debt Freedom Action Plan\n\n## Debt Elimination System\n- Debt snowball calculator\n- Payment optimization tool\n- Creditor negotiation scripts\n- Credit score improvement guide\n- Budget restructuring templates\n\n## Success Tracking\n- Progress tracking sheets\n- Milestone celebration plan\n- Motivation maintenance system"
  },

  // Business & Money - Real Estate
  {
    name: "First-Time Home Buyer's Complete Guide",
    description: "Everything you need to buy your first home. Includes mortgage calculator, inspection checklists, and negotiation strategies with legal document templates.",
    price: 87,
    categorySlug: "real-estate",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# First-Time Home Buyer's Guide\n\n## Complete Purchase Process\n- Pre-approval checklist\n- House hunting worksheet\n- Inspection checklists\n- Offer negotiation strategies\n- Closing preparation guide\n\n## Financial Tools\n- Affordability calculator\n- Mortgage comparison tool\n- Closing cost estimator\n- Moving budget planner"
  },
  {
    name: "Property Management Toolkit",
    description: "Professional property management system with tenant screening forms, lease agreements, maintenance tracking, and financial reporting tools.",
    price: 127,
    categorySlug: "real-estate",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Property Management Toolkit\n\n## Complete Management System\n- Tenant screening forms\n- Lease agreement templates\n- Rent collection tracking\n- Maintenance request system\n- Financial reporting tools\n\n## Legal Documents\n- Eviction process guide\n- Security deposit procedures\n- Property inspection forms"
  },

  // Software Development - Web Development
  {
    name: "React Component Library Starter Kit",
    description: "Professional React component library with 50+ reusable components, TypeScript setup, and Storybook documentation. Ready for production use.",
    price: 127,
    categorySlug: "web-development",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# React Component Library\n\n## 50+ Production-Ready Components\n- Form components with validation\n- Navigation & layout components\n- Data display components\n- Feedback & overlay components\n- Utility components\n\n## Development Setup\n- TypeScript configuration\n- Storybook documentation\n- Testing setup with Jest\n- Build and publish scripts"
  },
  {
    name: "Full-Stack E-commerce Template",
    description: "Complete e-commerce solution built with Next.js, Stripe integration, and admin dashboard. Includes user authentication, product management, and order processing.",
    price: 197,
    categorySlug: "web-development",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Full-Stack E-commerce Template\n\n## Complete Solution\n- Next.js 14 with App Router\n- Stripe payment integration\n- User authentication system\n- Admin dashboard\n- Product catalog management\n\n## Features Included\n- Shopping cart functionality\n- Order management system\n- Email notifications\n- SEO optimization\n- Mobile responsive design"
  },

  // Software Development - Mobile Development
  {
    name: "React Native Expo App Template",
    description: "Production-ready React Native app template with navigation, authentication, and backend integration. Includes push notifications and offline storage.",
    price: 147,
    categorySlug: "mobile-development",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# React Native Expo Template\n\n## Complete Mobile App Foundation\n- Authentication flows\n- Navigation setup\n- API integration\n- Push notifications\n- Offline data storage\n\n## Development Tools\n- ESLint & Prettier setup\n- TypeScript configuration\n- Testing environment\n- Build and deployment scripts"
  },
  {
    name: "Flutter UI Kit & Components",
    description: "Beautiful Flutter UI kit with 100+ widgets, animations, and screen templates. Includes dark/light themes and responsive design patterns.",
    price: 97,
    categorySlug: "mobile-development",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Flutter UI Kit\n\n## 100+ Beautiful Widgets\n- Form and input components\n- Navigation components\n- Card and list layouts\n- Animation widgets\n- Chart and graph widgets\n\n## Design System\n- Light and dark themes\n- Consistent color palette\n- Typography system\n- Responsive breakpoints"
  },

  // Software Development - Game Development
  {
    name: "Unity 2D Platformer Game Template",
    description: "Complete 2D platformer game template with character controller, level editor, power-ups, and sound system. Includes level design tools and documentation.",
    price: 167,
    categorySlug: "game-development",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Unity 2D Platformer Template\n\n## Complete Game Foundation\n- Character movement system\n- Physics-based gameplay\n- Enemy AI patterns\n- Power-up system\n- Level progression\n\n## Development Tools\n- Visual level editor\n- Animation system\n- Sound manager\n- Save/load system\n- Performance optimization"
  },
  {
    name: "Godot RPG Game Development Kit",
    description: "Comprehensive RPG game template for Godot engine. Includes inventory system, dialogue trees, combat mechanics, and quest management.",
    price: 187,
    categorySlug: "game-development",
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Godot RPG Development Kit\n\n## RPG Game Systems\n- Turn-based combat system\n- Inventory management\n- Character progression\n- Dialogue system\n- Quest management\n\n## Game Assets\n- Character sprites\n- Environment tiles\n- UI components\n- Sound effects\n- Music tracks"
  },

  // Software Development - Programming Languages
  {
    name: "Python Data Structures & Algorithms Course",
    description: "Complete guide to data structures and algorithms in Python with interactive examples, coding challenges, and interview preparation materials.",
    price: 97,
    categorySlug: "programming-languages",
    imageUrl: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Python DSA Complete Course\n\n## Core Topics Covered\n- Arrays and linked lists\n- Stacks and queues\n- Trees and graphs\n- Sorting algorithms\n- Dynamic programming\n\n## Practice Materials\n- 200+ coding problems\n- Video explanations\n- Interview questions\n- Performance analysis\n- Code templates"
  },
  {
    name: "JavaScript ES6+ Modern Development Guide",
    description: "Master modern JavaScript with ES6+ features, async programming, and best practices. Includes project templates and code examples.",
    price: 77,
    categorySlug: "programming-languages",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Modern JavaScript Guide\n\n## ES6+ Features\n- Arrow functions & destructuring\n- Modules and classes\n- Async/await patterns\n- Promise handling\n- Template literals\n\n## Project Examples\n- API integration projects\n- DOM manipulation exercises\n- Functional programming examples\n- Error handling patterns"
  },

  // Software Development - DevOps
  {
    name: "Docker & Kubernetes Deployment Templates",
    description: "Production-ready Docker containers and Kubernetes manifests for common applications. Includes CI/CD pipeline configurations and monitoring setup.",
    price: 147,
    categorySlug: "devops",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Docker & Kubernetes Templates\n\n## Container Templates\n- Multi-stage Dockerfiles\n- Database containers\n- Web application setups\n- Load balancer configurations\n- Security best practices\n\n## Kubernetes Resources\n- Deployment manifests\n- Service configurations\n- Ingress controllers\n- ConfigMaps and Secrets\n- Monitoring stack"
  },
  {
    name: "AWS Infrastructure as Code Templates",
    description: "Complete Terraform and CloudFormation templates for common AWS architectures. Includes VPC setup, auto-scaling, and serverless configurations.",
    price: 167,
    categorySlug: "devops",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# AWS Infrastructure Templates\n\n## Terraform Modules\n- VPC and networking\n- EC2 auto-scaling groups\n- RDS database setups\n- Lambda functions\n- S3 and CloudFront\n\n## CloudFormation Stacks\n- Complete application stacks\n- Security group templates\n- IAM roles and policies\n- Monitoring and alerting"
  },

  // Writing & Publishing - Fiction
  {
    name: "Novel Writing Blueprint & Character Development Kit",
    description: "Complete novel writing system with plot structures, character development worksheets, world-building templates, and writing schedule planners.",
    price: 67,
    categorySlug: "fiction",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Novel Writing Blueprint\n\n## Story Development Tools\n- Three-act structure templates\n- Character development worksheets\n- Plot outline frameworks\n- World-building guides\n- Dialogue writing tips\n\n## Writing Resources\n- Daily writing trackers\n- Scene planning sheets\n- Revision checklists\n- Publishing preparation guide"
  },
  {
    name: "Short Story Collection & Writing Prompts",
    description: "500 creative writing prompts with story structure templates, genre-specific guides, and submission tracking tools for literary magazines.",
    price: 47,
    categorySlug: "fiction",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Short Story Writing Kit\n\n## Writing Prompts\n- 500 unique story starters\n- Genre-specific prompts\n- Character situation prompts\n- Setting-based prompts\n- Dialogue starters\n\n## Publishing Tools\n- Literary magazine database\n- Submission tracker\n- Formatting guidelines\n- Cover letter templates"
  },

  // Writing & Publishing - Non-Fiction
  {
    name: "Non-Fiction Book Proposal Template & Guide",
    description: "Professional book proposal template with market research worksheets, chapter outlines, and publisher submission guidelines.",
    price: 87,
    categorySlug: "non-fiction",
    imageUrl: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Non-Fiction Book Proposal\n\n## Proposal Components\n- Hook and overview\n- Market analysis template\n- Chapter-by-chapter outline\n- Author platform building\n- Marketing plan template\n\n## Research Tools\n- Competitive analysis worksheet\n- Target audience profiling\n- Publisher research database\n- Query letter templates"
  },
  {
    name: "Memoir Writing & Life Story Guide",
    description: "Complete system for writing your life story with memory prompts, timeline templates, narrative structure guides, and publishing options.",
    price: 77,
    categorySlug: "non-fiction",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Memoir Writing Guide\n\n## Story Development\n- Memory trigger prompts\n- Timeline creation tools\n- Theme identification worksheets\n- Narrative arc planning\n- Scene reconstruction guides\n\n## Writing Support\n- Chapter structure templates\n- Dialogue recreation tips\n- Photo integration guide\n- Family interview scripts"
  },

  // Writing & Publishing - Blogging
  {
    name: "Blog Content Calendar & SEO Strategy",
    description: "12-month blog content calendar with keyword research tools, SEO optimization guides, and content creation templates for consistent publishing.",
    price: 57,
    categorySlug: "blogging",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Blog Content Strategy\n\n## Content Planning\n- 365-day content calendar\n- Topic research templates\n- Editorial workflow system\n- Content repurposing guide\n- Publishing schedule tracker\n\n## SEO Optimization\n- Keyword research tools\n- Meta description templates\n- Internal linking strategy\n- Image optimization guide"
  },
  {
    name: "Blog Monetization Toolkit",
    description: "Complete guide to monetizing your blog with affiliate marketing templates, sponsored content guidelines, and product creation strategies.",
    price: 97,
    categorySlug: "blogging",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Blog Monetization Guide\n\n## Revenue Streams\n- Affiliate marketing setup\n- Sponsored content templates\n- Digital product creation\n- Email list monetization\n- Course creation framework\n\n## Business Tools\n- Rate card templates\n- Media kit creation\n- Analytics tracking sheets\n- Tax preparation guides"
  },

  // Writing & Publishing - Copywriting
  {
    name: "Sales Copy Templates & Conversion Framework",
    description: "High-converting sales copy templates for landing pages, email campaigns, and product descriptions. Includes psychology-based copywriting formulas.",
    price: 127,
    categorySlug: "copywriting",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Sales Copy Templates\n\n## Conversion Templates\n- Landing page copy frameworks\n- Email sequence templates\n- Product description formulas\n- Social media ad copy\n- Video sales script outlines\n\n## Copywriting Techniques\n- AIDA framework applications\n- Pain point identification\n- Benefit-focused writing\n- Urgency and scarcity tactics"
  },
  {
    name: "Direct Response Marketing Copy Collection",
    description: "Proven direct response copy templates with A/B testing frameworks, headline formulas, and call-to-action optimization strategies.",
    price: 147,
    categorySlug: "copywriting",
    imageUrl: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Direct Response Copy Collection\n\n## Marketing Materials\n- Long-form sales letters\n- Direct mail templates\n- Webinar registration pages\n- Email marketing sequences\n- Print advertisement layouts\n\n## Testing & Optimization\n- A/B test planning sheets\n- Conversion tracking tools\n- Response rate calculators\n- ROI measurement guides"
  },

  // Writing & Publishing - Self-Publishing
  {
    name: "Amazon KDP Publishing Success Kit",
    description: "Complete guide to self-publishing on Amazon KDP with formatting templates, cover design tools, and marketing strategies for book launches.",
    price: 97,
    categorySlug: "self-publishing",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Amazon KDP Success Kit\n\n## Publishing Tools\n- Manuscript formatting templates\n- Cover design guidelines\n- Keyword research tools\n- Category selection guide\n- Pricing strategy calculator\n\n## Marketing Resources\n- Book launch timeline\n- Review generation system\n- Social media promotion\n- Amazon advertising setup"
  },
  {
    name: "Multi-Platform Publishing Strategy",
    description: "Comprehensive guide to publishing across multiple platforms including KDP, IngramSpark, and direct sales with distribution and marketing strategies.",
    price: 127,
    categorySlug: "self-publishing",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Multi-Platform Publishing\n\n## Platform Strategies\n- Amazon KDP optimization\n- IngramSpark setup guide\n- Direct sales systems\n- Library distribution\n- International markets\n\n## Business Development\n- Author platform building\n- Email list growth\n- Speaking engagement guide\n- Bulk sales strategies"
  },

  // Education - Online Courses
  {
    name: "Course Creation Blueprint & Templates",
    description: "Complete system for creating and selling online courses with curriculum planning, video production guides, and student engagement strategies.",
    price: 147,
    categorySlug: "online-courses",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Course Creation Blueprint\n\n## Course Development\n- Learning objectives templates\n- Module planning worksheets\n- Video script templates\n- Quiz and assignment creation\n- Student progress tracking\n\n## Technical Setup\n- Video production guide\n- Platform comparison chart\n- Payment processing setup\n- Student onboarding system"
  },
  {
    name: "Educational Webinar Series Template",
    description: "Professional webinar planning system with presentation templates, engagement strategies, and follow-up sequences for educational content delivery.",
    price: 87,
    categorySlug: "online-courses",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Webinar Series Template\n\n## Webinar Planning\n- Topic research frameworks\n- Presentation slide templates\n- Interactive activity guides\n- Q&A management system\n- Technical setup checklist\n\n## Audience Engagement\n- Registration page templates\n- Email reminder sequences\n- Follow-up campaigns\n- Resource sharing system"
  },

  // Education - Tutoring
  {
    name: "Online Tutoring Business Startup Kit",
    description: "Complete guide to starting an online tutoring business with session planning templates, pricing strategies, and student management systems.",
    price: 77,
    categorySlug: "tutoring",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Online Tutoring Business Kit\n\n## Business Setup\n- Service pricing calculator\n- Client onboarding forms\n- Session scheduling system\n- Payment processing setup\n- Marketing materials\n\n## Teaching Resources\n- Lesson planning templates\n- Progress tracking sheets\n- Assessment tools\n- Parent communication guides"
  },
  {
    name: "Math Tutoring Resource Library",
    description: "Comprehensive math tutoring materials covering algebra through calculus with practice problems, visual aids, and step-by-step solution guides.",
    price: 97,
    categorySlug: "tutoring",
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Math Tutoring Resources\n\n## Subject Coverage\n- Pre-algebra fundamentals\n- Algebra I & II materials\n- Geometry proofs and problems\n- Trigonometry concepts\n- Calculus introduction\n\n## Teaching Tools\n- Visual learning aids\n- Practice problem sets\n- Solution step breakdowns\n- Common mistake guides"
  },

  // Education - Test Preparation
  {
    name: "SAT Prep Complete Study System",
    description: "Comprehensive SAT preparation with practice tests, study schedules, and strategy guides for math, reading, and writing sections.",
    price: 127,
    categorySlug: "test-preparation",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1606205721526-5b28d4cf43ad?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# SAT Prep Study System\n\n## Complete Test Preparation\n- 8 full-length practice tests\n- Section-specific strategies\n- Time management techniques\n- Score improvement tracking\n- Test day preparation guide\n\n## Study Materials\n- 12-week study schedule\n- Vocabulary building system\n- Math formula reference\n- Essay writing templates"
  },
  {
    name: "Professional Certification Exam Prep",
    description: "Study guides and practice materials for popular professional certifications including PMP, CISSP, and AWS with exam strategies and time management.",
    price: 147,
    categorySlug: "test-preparation",
    imageUrl: "https://images.unsplash.com/photo-1606205721526-5b28d4cf43ad?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Professional Certification Prep\n\n## Certification Coverage\n- PMP project management\n- CISSP cybersecurity\n- AWS cloud practitioner\n- Google Analytics IQ\n- HubSpot certifications\n\n## Exam Preparation\n- Study timeline templates\n- Practice question banks\n- Memory retention techniques\n- Exam day strategies"
  },

  // Education - Language Learning
  {
    name: "Spanish Conversation Practice System",
    description: "Interactive Spanish learning system with conversation starters, pronunciation guides, and cultural context lessons for practical fluency.",
    price: 67,
    categorySlug: "language-learning",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Spanish Conversation System\n\n## Learning Materials\n- 500 conversation starters\n- Pronunciation audio guides\n- Grammar quick reference\n- Cultural context lessons\n- Daily practice exercises\n\n## Skill Development\n- Speaking confidence building\n- Listening comprehension\n- Vocabulary expansion\n- Real-world scenarios"
  },
  {
    name: "Language Exchange Partner Finding Kit",
    description: "Complete system for finding and working with language exchange partners including conversation guides, cultural activities, and progress tracking tools.",
    price: 47,
    categorySlug: "language-learning",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Language Exchange Kit\n\n## Partner Finding\n- Platform comparison guide\n- Profile optimization tips\n- Safety guidelines\n- Communication setup\n- Goal setting frameworks\n\n## Practice Resources\n- Structured conversation topics\n- Cultural exchange activities\n- Progress tracking sheets\n- Session planning templates"
  },

  // Self Improvement - Productivity
  {
    name: "Ultimate Productivity Planner System",
    description: "Comprehensive productivity system with time-blocking templates, habit trackers, and goal-setting frameworks for maximum efficiency.",
    price: 47,
    categorySlug: "productivity",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Ultimate Productivity System\n\n## Planning Tools\n- Daily time-blocking templates\n- Weekly goal setting sheets\n- Monthly review frameworks\n- Project planning worksheets\n- Priority matrix templates\n\n## Habit Building\n- 30/60/90-day habit trackers\n- Morning routine templates\n- Evening reflection guides\n- Productivity metrics dashboard"
  },
  {
    name: "Digital Minimalism & Focus Guide",
    description: "Complete guide to digital decluttering with app audit tools, distraction elimination strategies, and focus enhancement techniques.",
    price: 57,
    categorySlug: "productivity",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=800&fit=crop",
    refundPolicy: "14-day",
    content: "# Digital Minimalism Guide\n\n## Digital Decluttering\n- App audit worksheets\n- Social media detox plans\n- Email organization system\n- File management templates\n- Digital habit tracking\n\n## Focus Enhancement\n- Deep work scheduling\n- Distraction elimination checklist\n- Mindful technology use\n- Attention restoration techniques"
  },

  // Self Improvement - Personal Development
  {
    name: "Life Coaching Self-Assessment Toolkit",
    description: "Professional-grade self-assessment tools for personal development with values clarification, strengths identification, and goal alignment frameworks.",
    price: 77,
    categorySlug: "personal-development",
    imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Life Coaching Toolkit\n\n## Self-Assessment Tools\n- Values clarification exercises\n- Strengths identification tests\n- Life wheel evaluation\n- Goal alignment worksheets\n- Personal vision creation\n\n## Development Planning\n- 90-day action plans\n- Progress tracking systems\n- Obstacle identification\n- Support system mapping"
  },
  {
    name: "Confidence Building & Self-Esteem Workbook",
    description: "Comprehensive workbook with exercises and strategies to build confidence, overcome limiting beliefs, and develop a positive self-image.",
    price: 67,
    categorySlug: "personal-development",
    imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Confidence Building Workbook\n\n## Core Exercises\n- Limiting belief identification\n- Confidence-building activities\n- Self-talk transformation\n- Fear facing frameworks\n- Success story documentation\n\n## Daily Practices\n- Morning affirmation routines\n- Evening reflection prompts\n- Comfort zone expansion\n- Achievement celebration system"
  },

  // Self Improvement - Mindfulness
  {
    name: "Meditation & Mindfulness Practice Guide",
    description: "Complete mindfulness program with guided meditations, breathing exercises, and stress reduction techniques for daily practice.",
    price: 57,
    categorySlug: "mindfulness",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Meditation & Mindfulness Guide\n\n## Practice Components\n- 30 guided meditation scripts\n- Breathing exercise collection\n- Body scan techniques\n- Walking meditation guides\n- Stress reduction protocols\n\n## Program Structure\n- 8-week beginner program\n- Daily practice schedules\n- Progress tracking sheets\n- Mindfulness reminder system"
  },
  {
    name: "Stress Management & Emotional Regulation Toolkit",
    description: "Evidence-based stress management techniques with emotion regulation strategies, coping mechanisms, and resilience building exercises.",
    price: 67,
    categorySlug: "mindfulness",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Stress Management Toolkit\n\n## Stress Management\n- Trigger identification worksheets\n- Coping strategy database\n- Quick relief techniques\n- Long-term stress reduction\n- Emergency response protocols\n\n## Emotional Regulation\n- Feeling identification guides\n- Emotional processing techniques\n- Resilience building exercises\n- Support system activation"
  },

  // Self Improvement - Career Growth
  {
    name: "Career Pivot Planning & Strategy Guide",
    description: "Complete career transition toolkit with skills assessment, industry research templates, and networking strategies for successful career pivots.",
    price: 97,
    categorySlug: "career-growth",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Career Pivot Strategy\n\n## Transition Planning\n- Skills gap analysis\n- Industry research templates\n- Financial transition planning\n- Timeline development\n- Risk assessment tools\n\n## Implementation Tools\n- Networking strategy guides\n- Personal branding toolkit\n- Portfolio development\n- Interview preparation\n- Salary negotiation scripts"
  },
  {
    name: "Leadership Development Program",
    description: "Comprehensive leadership training materials with communication frameworks, team building exercises, and performance management tools.",
    price: 127,
    categorySlug: "career-growth",
    imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Leadership Development Program\n\n## Leadership Skills\n- Communication frameworks\n- Decision-making processes\n- Conflict resolution strategies\n- Team motivation techniques\n- Performance coaching guides\n\n## Management Tools\n- Meeting facilitation guides\n- Project management templates\n- Employee development plans\n- Feedback delivery systems"
  },

  // Continue with remaining categories...
  // Fitness & Health - Workout Plans
  {
    name: "Home Gym Workout Program",
    description: "Complete home workout system with equipment recommendations, progressive training plans, and nutrition guidance for all fitness levels.",
    price: 67,
    categorySlug: "workout-plans",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Home Gym Workout Program\n\n## Training Plans\n- Beginner 4-week program\n- Intermediate 8-week program\n- Advanced 12-week program\n- Equipment-free alternatives\n- Progression tracking sheets\n\n## Support Materials\n- Exercise demonstration videos\n- Form correction guides\n- Injury prevention tips\n- Equipment buying guide"
  },
  {
    name: "Marathon Training & Nutrition Plan",
    description: "Complete marathon preparation system with training schedules, nutrition planning, injury prevention, and race day strategies.",
    price: 87,
    categorySlug: "workout-plans",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    coverUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
    refundPolicy: "30-day",
    content: "# Marathon Training Plan\n\n## Training Components\n- 16-week training schedule\n- Weekly mileage progression\n- Cross-training activities\n- Recovery protocols\n- Taper strategies\n\n## Performance Optimization\n- Nutrition timing guides\n- Hydration strategies\n- Race day preparation\n- Mental preparation techniques"
  }
]

const seed = async () => {
  const payload = await getPayload({ config });

  const adminAccount=await stripe.accounts.create({});

  //Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    },
  })

  //Create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "admin",
      roles: ["super-admin"],
      username: "admin",
      tenants:[
        {
          tenant: adminTenant.id,
        }
      ]
    },
  });

  for (const category of categories) {
    const existingCategory = await payload.find({
      collection: "categories",
      where: { slug: { equals: category.slug } },
    });

    let createdCategory;
    if (existingCategory.totalDocs === 0) {
      createdCategory = await payload.create({
        collection: "categories",
        data: {
          name: category.name,
          slug: category.slug,
          color: category.color,
          parent: null,
        },
      });
    } else {
      createdCategory = existingCategory.docs[0];
    }

    for (const subCategory of category.subcategories || []) {
      const exists = await payload.find({
        collection: "categories",
        where: { slug: { equals: subCategory.slug } },
      });

      if (exists.totalDocs === 0 && createdCategory) {
        await payload.create({
          collection: "categories",
          data: {
            name: subCategory.name,
            slug: subCategory.slug,
            parent: createdCategory.id,
          },
        });
      }
    }
  }
};

await seed();
process.exit(0);
