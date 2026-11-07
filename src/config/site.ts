import {
  Atom,
  Database,
  Flame,
  Github,
  GitBranch,
  Layers,
  Linkedin,
  Medal,
  Palette,
  Server,
  Target,
  Trophy,
  Twitter,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type Skill = {
  name: string;
  level: number;
  icon: LucideIcon;
};

export type ProjectLink = {
  label: string;
  href: string;
  kind: "external" | "route";
  tone?: "primary" | "muted";
};

export type Project = {
  dateRange: string;
  category: string;
  title: string;
  description: string;
  impact: string;
  tech: string[];
  color: string;
  links: ProjectLink[];
};

export type Achievement = {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
};

export type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  product?: string;
  description: string;
  tech: string[];
  highlights: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  gpa: string;
};

export const SITE = {
  url: "https://msameerali.dev",
  name: "Muhammad Sameer Ali Portfolio",
  defaultTitle: "Muhammad Sameer Ali | Frontend / Full-Stack Developer",
  defaultDescription:
    "Portfolio of Muhammad Sameer Ali, a frontend-focused full-stack developer building responsive web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.",
  ogImage: "/og-image.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  locale: "en_US",
  defaultKeywords: [
    "Muhammad Sameer Ali",
    "full-stack software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript portfolio",
    "FastAPI developer",
    "Laravel developer",
    "MongoDB",
    "PostgreSQL",
    "software engineer portfolio",
  ],
  twitterHandle: "@theUninvited444",
} as const;

const FUNNEL_BASE_URL = "https://portfolio.tail81be07.ts.net";

export const FUNNEL_LINKS = {
  photostream: FUNNEL_BASE_URL,
  samio: `${FUNNEL_BASE_URL}:8443/login`,
  civicAtlas: `${FUNNEL_BASE_URL}:10000`,
} as const;

export const PROFILE = {
  initials: "SA",
  brandMark: "Nexus S",
  brandName: "Sameer Ali",
  fullName: "Muhammad Sameer Ali",
  contactEmail: "khsameer626@gmail.com",
  phone: "+92 335 8181400",
  phoneTel: "tel:+923358181400",
  location: "Peshawar, Pakistan",
  githubUrl: "https://github.com/SameerAli126",
  linkedinUrl: "https://www.linkedin.com/in/sameerali126",
  xUrl: "https://x.com/theUninvited444",
  portfolioUrl: "https://msameerali.dev",
  resumePath: "/muhammad-sameer-ali-cv.pdf",
  hireMeUrl: "https://www.linkedin.com/in/sameerali126",
  roleLine: "Frontend / Full-Stack Developer",
  heroTitleLeading: "Architecting Resilient",
  heroTitleAccent: "Modern Web Systems",
  heroDescription:
    "Frontend-focused full-stack developer building responsive web products with React, Next.js, and TypeScript. At Deepixel, shipping mobile PWA navigation, streaming AI workspaces, and document-editing engines for Invictus.",
  summary:
    "Frontend-focused full-stack developer building responsive web products with React, Next.js and TypeScript. At Deepixel, delivered mobile and Progressive Web App (PWA) navigation, streaming AI report workflows and document-editing fixes for Invictus. Experienced in translating product requirements into usable interfaces, connecting frontend features to APIs, debugging layout and authentication issues, and validating changes with automated tests and production builds. Also works with Python and Node.js on backend features.",
  aboutDeveloper:
    "I am a frontend-focused full-stack developer building responsive web products with React, Next.js, and TypeScript, supported by Python and Node.js backend services. At Deepixel, I deliver core user-facing and workflow features for Invictus, an AI deal intelligence platform. My focus is simple: translate complex product and AI requirements into usable, bulletproof interfaces with rock-solid engineering.",
  aboutDeveloperMindset:
    "I work with a structured engineering process: clarify requirements, design maintainable architecture, implement with clean patterns, and iterate quickly based on user and stakeholder feedback.",
  aboutDeveloperExtra:
    "I handle the full delivery cycle, from product thinking and UI direction to API integration, quality checks, and production deployments. The goal is dependable systems, not just completed tickets.",
  aboutFocusAreas: [
    "Product-minded engineering",
    "Performance and accessibility",
    "Clean API architecture",
    "Reliable deployment workflows",
  ],
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Creative Lab", href: "#creative-lab" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];


export const EXPERIENCES: Experience[] = [
  {
    company: "Deepixel",
    role: "Full-Stack Developer",
    period: "Apr 2026 – Present",
    location: "Remote / Hybrid",
    product: "Invictus — AI Deal Intelligence and Reporting Platform",
    description:
      "Core developer driving frontend architecture, streaming AI report generation, responsive mobile shell, and rich document editing engines.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Tiptap",
      "Laravel",
      "SSE",
      "Playwright",
      "Docker",
    ],
    highlights: [
      "Built a responsive mobile shell with bottom navigation and Progressive Web App (PWA) setup; fixed standalone login persistence and adapted dashboards, report viewers and multi-step forms for mobile and tablet screens.",
      "Implemented an AI report workspace with SSE progress, user clarification prompts and saved deal/document context; added timeout recovery and editable partial drafts while preserving the guided report workflow.",
      "Stabilized Tiptap table editing by fixing stale-state overwrites, table parsing and nested-table insertion; improved report review, validation and export interfaces.",
      "Added automatic display scaling for Windows 125% and 150% settings plus a saved user control, making dense screens easier to use on scaled laptops.",
      "Audited 21 application views across four viewport sizes using Playwright screenshots; added 17 report-flow utility tests and verified changes with TypeScript checks and production builds.",
      "Supported local development with Docker startup scripts, service health checks and troubleshooting of authentication, API configuration and document-processing issues.",
    ],
  },
  {
    company: "Independent Clients & Local Software Houses",
    role: "Full-Stack Software Engineer (Contract)",
    period: "Jan 2023 – Present",
    location: "Remote / Pakistan",
    product: "Client Systems, Enterprise Workflows & Bespoke Web Apps",
    description:
      "Delivering responsive web features, API integrations, and internal workflows for confidential client projects across multiple industries.",
    tech: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Python",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
    ],
    highlights: [
      "Delivered responsive web features, API integrations and internal workflows for confidential client projects, using JavaScript/TypeScript and Python across frontend and backend work.",
      "Architected bespoke dashboards, authentication systems, and database models tailored to client business logic.",
      "Consistently achieved on-time delivery across distributed international client engagements.",
    ],
  },
];

export const EDUCATION: Education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "City University of Science and Information Technology",
  period: "Sep 2021 – Oct 2025",
  location: "Peshawar, Pakistan",
  gpa: "3.51 / 4.00",
};

export const SKILLS: Skill[] = [
  { name: "React.js", level: 96, icon: Atom },
  { name: "TypeScript", level: 94, icon: GitBranch },
  { name: "Next.js", level: 92, icon: Layers },
  { name: "Node.js", level: 88, icon: Server },
  { name: "Tailwind CSS", level: 95, icon: Palette },
  { name: "PostgreSQL & Prisma", level: 89, icon: Database },
  { name: "FastAPI / Python", level: 86, icon: Server },
  { name: "Git / GitHub", level: 92, icon: Github },
];

export const PROJECTS: Project[] = [
  {
    dateRange: "April 2026 – Present",
    category: "AI Deal Intelligence & Reporting",
    title: "Invictus (Deepixel)",
    description:
      "An AI deal intelligence platform featuring streaming SSE report workflows, interactive Tiptap table editors, responsive mobile PWA shell, and automated multi-viewport testing.",
    impact:
      "Enterprise flagship delivered at Deepixel: audited across 21 viewport views with Playwright, custom Windows 125%/150% scaling, and real-time SSE progress recovery.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Tiptap", "Laravel", "SSE", "Playwright"],
    color: "from-blue-600 via-indigo-600 to-purple-600",
    links: [
      { label: "Live Atelier", href: "#experience", kind: "route", tone: "primary" },
      { label: "Experience Details", href: "#experience", kind: "route" },
    ],
  },
  {
    dateRange: "2025 – Present",
    category: "Personal Finance & Operations",
    title: "SAMIO",
    description:
      "A personal finance and life-ops dashboard with email OTP verification, signed sessions, protected API routes, JSON export, and distinct mobile, tablet, and desktop navigation.",
    impact:
      "Featured in CV: Built relational PostgreSQL schemas with Prisma ORM, financial transaction integrity, and administrative CRUD workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    color: "from-blue-500 to-violet-600",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.samio, kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/SAMIO", kind: "external" },
      { label: "Details", href: "/projects/samio", kind: "route" },
    ],
  },
  {
    dateRange: "March 2025 – July 2025",
    category: "Cloud Media Infrastructure",
    title: "PhotoStream / SnapCloud",
    description:
      "A cloud-native photo-sharing platform featuring two frontend experiences backed by a shared FastAPI service, JWT authentication, and role-based access control.",
    impact:
      "Featured in CV: Handled photo uploads, search, and social interactions with Cloudinary media delivery and MongoDB Atlas metadata persistence.",
    tech: ["React", "TypeScript", "Vite", "FastAPI", "MongoDB Atlas", "Cloudinary"],
    color: "from-emerald-500 to-teal-500",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.photostream, kind: "external", tone: "primary" },
      { label: "PhotoStream Code", href: "https://github.com/SameerAli126/PhotoStream", kind: "external" },
      { label: "SnapCloud Code", href: "https://github.com/SameerAli126/snapcloud", kind: "external" },
      { label: "Details", href: "/projects/photostream-snapcloud", kind: "route" },
    ],
  },
  {
    dateRange: "October 2023 – September 2024",
    category: "Fintech & Market Dashboards",
    title: "OptiTrade 3.0",
    description:
      "A market and portfolio dashboard with stock-data API integrations, watchlists, portfolio monitoring, and trading interfaces with JWT authorization.",
    impact:
      "Featured in CV: Migrated a React frontend to Next.js, integrating stock APIs into responsive market dashboards with sub-15ms calculations.",
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "TanStack Query", "JWT"],
    color: "from-blue-600 to-indigo-600",
    links: [
      { label: "Live Demo", href: "https://opti-trade-3-0.vercel.app/", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/OptiTrade-3.0", kind: "external" },
      { label: "Details", href: "/projects/optitrade", kind: "route" },
    ],
  },
  {
    dateRange: "March 2024 – August 2024",
    category: "AI-Assisted Business Tools",
    title: "InvoiceGen Pro",
    description:
      "An invoicing platform with SSR-ready Next.js architecture, AI-assisted invoice creation, chatbot support, client management, PDF export, and analytics.",
    impact:
      "Integrated Gemini AI for automated invoice drafting, client business card extraction, and payment processing.",
    tech: ["Next.js 15", "Gemini AI", "MongoDB", "Stripe"],
    color: "from-violet-500 to-cyan-500",
    links: [
      { label: "Live Demo", href: "https://invoicegen-pro.netlify.app/", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/invoicegen-pro", kind: "external" },
      { label: "Details", href: "/projects/invoicegen-pro", kind: "route" },
    ],
  },
  {
    dateRange: "December 2025 – March 2026",
    category: "Public Data & GIS Systems",
    title: "Peshawar Civic GIS Atlas",
    description:
      "A Laravel-based civic GIS with public facility discovery, dataset ingestion, validation, RBAC, Leaflet mapping, and provenance-aware publishing workflows.",
    impact:
      "Showed range beyond standard SaaS by shipping an open civic data operations platform with genuine ingestion pipelines.",
    tech: ["Laravel", "PHP", "Leaflet", "MariaDB"],
    color: "from-cyan-500 to-emerald-500",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.civicAtlas, kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/PCA", kind: "external" },
      { label: "Details", href: "/projects/peshawar-civic-gis-atlas", kind: "route" },
    ],
  },
  {
    dateRange: "February 2023 – February 2024",
    category: "Gamified Language Learning",
    title: "WordWanderer",
    description:
      "A backend-driven language learning platform with lessons, progress tracking, achievements, daily quests, streaks, hearts, gems, and power-up systems.",
    impact:
      "Engineered comprehensive gamification progression logic, spaced repetition algorithms, and retention loops.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "MongoDB"],
    color: "from-cyan-500 to-blue-600",
    links: [
      { label: "Live Demo", href: "https://wordwanderer.vercel.app", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/WordWanderer", kind: "external" },
      { label: "Details", href: "/projects/wordwanderer", kind: "route" },
    ],
  },
  {
    dateRange: "November 2025 – January 2026",
    category: "Automotive Interactive 3D",
    title: "Wheel on Reels",
    description:
      "A high-impact vehicle showcase application built with Next.js and fluid interactive presentation layers, curated from GitHub.",
    impact:
      "Demonstrated creative art direction, fluid micro-interactions, and refined performance-first automotive visual UI.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-amber-500 to-rose-500",
    links: [
      { label: "Interactive Aero Lab", href: "#creative-lab", kind: "route", tone: "primary" },
      { label: "GitHub Code", href: "https://github.com/SameerAli126/wheel_on_reels", kind: "external" },
    ],
  },
  {
    dateRange: "August 2024 – October 2024",
    category: "3D Animation & Creative Tech",
    title: "Iphone3D",
    description:
      "An immersive 3D hardware showcase website utilizing GSAP 3D transformation matrices, smooth scrub animations, and fluid camera transitions.",
    impact:
      "Award-inspired creative development demonstrating fluid spatial 3D animations and browser canvas optimization.",
    tech: ["JavaScript", "GSAP", "Three.js / Canvas", "HTML5/CSS3"],
    color: "from-purple-500 to-pink-500",
    links: [
      { label: "3D Hardware Matrix", href: "#creative-lab", kind: "route", tone: "primary" },
      { label: "GitHub Code", href: "https://github.com/SameerAli126/Iphone3D", kind: "external" },
    ],
  },

];

export const ACHIEVEMENTS: Achievement[] = [
  { icon: Trophy, label: "Projects Shipped", value: "12+", color: "text-amber-400" },
  { icon: Medal, label: "Years Experience", value: "3+", color: "text-blue-400" },
  { icon: Target, label: "Client Satisfaction", value: "95%", color: "text-cyan-400" },
  { icon: Flame, label: "Active Learning", value: "Daily", color: "text-emerald-400" },
];

export const ENGINEERING_MILESTONES = [
  {
    title: "Invictus — Deepixel",
    role: "Full-Stack Developer",
    outcome: "Enterprise AI Platform",
    stack: "React • TypeScript • Tiptap • Laravel • SSE",
    status: "Live in Production",
    liveUrl: "#experience",
  },
  {
    title: "OptiTrade 3.0",
    role: "Full-Stack Engineer",
    outcome: "Production Release",
    stack: "Next.js 15 • TypeScript • JWT Auth",
    status: "Deployed",
    liveUrl: "https://opti-trade-3-0.vercel.app/",
  },
  {
    title: "WordWanderer",
    role: "Full-Stack Engineer",
    outcome: "Gamified Product Loop",
    stack: "Next.js 14 • Zustand • MongoDB",
    status: "Deployed",
    liveUrl: "https://wordwanderer.vercel.app",
  },
  {
    title: "InvoiceGen Pro",
    role: "AI & Full-Stack Engineer",
    outcome: "AI Workflow Integration",
    stack: "Next.js 15 • Gemini 2.0 Flash • Stripe",
    status: "Deployed",
    liveUrl: "https://invoicegen-pro.netlify.app/",
  },
  {
    title: "PhotoStream / SnapCloud",
    role: "Backend & Systems Architect",
    outcome: "Dual-Client Cloud Architecture",
    stack: "FastAPI • React • MongoDB Atlas",
    status: "Shipped",
    liveUrl: FUNNEL_LINKS.photostream,
  },
  {
    title: "SAMIO",
    role: "Full-Stack Engineer",
    outcome: "Local-First Life Ops",
    stack: "Next.js • Prisma • PostgreSQL",
    status: "Shipped",
    liveUrl: FUNNEL_LINKS.samio,
  },
  {
    title: "Peshawar Civic GIS Atlas",
    role: "Lead Developer",
    outcome: "Civic Open Data & Mapping",
    stack: "Laravel • Leaflet • MariaDB",
    status: "Shipped",
    liveUrl: FUNNEL_LINKS.civicAtlas,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: PROFILE.githubUrl, label: "GitHub" },
  { icon: Linkedin, href: PROFILE.linkedinUrl, label: "LinkedIn" },
  { icon: Twitter, href: PROFILE.xUrl, label: "X" },
];
