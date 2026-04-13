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

export type TournamentResult = {
  event: string;
  placement: string;
  character: string;
  result: "W" | "L";
};

export type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};

export const SITE = {
  url: "https://msameerali.dev",
  name: "Muhammad Sameer Ali Portfolio",
  defaultTitle: "Muhammad Sameer Ali | Full-Stack Software Engineer",
  defaultDescription:
    "Portfolio of Muhammad Sameer Ali, a full-stack software engineer building fast, scalable web products across React, Next.js, FastAPI, Laravel, MongoDB, and PostgreSQL.",
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
  initials: "MSA",
  fullName: "Muhammad Sameer Ali",
  contactEmail: "khsameer626@gmail.com",
  githubUrl: "https://github.com/SameerAli126",
  linkedinUrl: "https://www.linkedin.com/in/sameerali126",
  xUrl: "https://x.com/theUninvited444",
  resumePath: "/muhammad-sameer-ali-cv.pdf",
  hireMeUrl: "https://www.linkedin.com/in/sameerali126",
  roleLine: "Full-Stack Software Engineer",
  heroTitleLeading: "Unleash The",
  heroTitleAccent: "Power of Code",
  heroDescription:
    "I design and build fast, scalable web products with strong UX, clean systems, and production-minded engineering standards.",
  aboutDeveloper:
    "I am a full-stack software engineer building modern products with React, Next.js, Node.js, TypeScript, FastAPI, Laravel, MongoDB, PostgreSQL, and Tailwind CSS. My focus is simple: ship software that solves real business problems and still feels great to use.",
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
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Highlights", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "React.js", level: 95, icon: Atom },
  { name: "Node.js", level: 88, icon: Server },
  { name: "Next.js", level: 85, icon: Layers },
  { name: "TypeScript", level: 90, icon: GitBranch },
  { name: "MongoDB", level: 82, icon: Database },
  { name: "Tailwind CSS", level: 92, icon: Palette },
  { name: "Express.js", level: 87, icon: Server },
  { name: "Git / GitHub", level: 88, icon: Github },
];

export const PROJECTS: Project[] = [
  {
    dateRange: "February 2023 - February 2024",
    category: "Gamified Language Learning",
    title: "WordWanderer",
    description:
      "A backend-driven language learning platform with lessons, progress tracking, achievements, daily quests, streaks, hearts, gems, and power-up systems.",
    impact:
      "Built the first serious product loop in the portfolio, combining education, progression logic, and retention systems into one app.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "MongoDB"],
    color: "from-energy-orange to-energy-gold",
    links: [
      { label: "Live Demo", href: "https://wordwanderer.vercel.app", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/WordWanderer", kind: "external" },
      { label: "Details", href: "/projects/wordwanderer", kind: "route" },
    ],
  },
  {
    dateRange: "October 2023 - September 2024",
    category: "Fintech and Trading UX",
    title: "OptiTrade 3.0",
    description:
      "A stock trading platform with portfolio monitoring, screeners, financial news, watchlists, JWT auth, and performance-focused market dashboards.",
    impact:
      "Expanded into a more data-dense product space with real-time trading workflows, secure auth, and complex portfolio views.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "JWT Auth"],
    color: "from-energy-red to-energy-orange",
    links: [
      { label: "Live Demo", href: "https://opti-trade-3-0.vercel.app/", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/OptiTrade-3.0", kind: "external" },
      { label: "Details", href: "/projects/optitrade", kind: "route" },
    ],
  },
  {
    dateRange: "March 2024 - August 2024",
    category: "AI-Assisted Business Tools",
    title: "InvoiceGen Pro",
    description:
      "An invoicing platform with SSR-ready Next.js architecture, AI-assisted invoice creation, chatbot support, client management, PDF export, and analytics.",
    impact:
      "Pushed the portfolio into AI-enabled workflow software with more practical business value and production-style UX decisions.",
    tech: ["Next.js 15", "Gemini AI", "MongoDB", "Stripe"],
    color: "from-energy-gold to-energy-red",
    links: [
      { label: "Live Demo", href: "https://invoicegen-pro.netlify.app/", kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/invoicegen-pro", kind: "external" },
      { label: "Details", href: "/projects/invoicegen-pro", kind: "route" },
    ],
  },
  {
    dateRange: "March 2025 - July 2025",
    category: "Creator Platforms and Media Infrastructure",
    title: "PhotoStream / SnapCloud",
    description:
      "A cloud-native photo-sharing platform with creator and consumer roles, uploads, search, comments, likes, ratings, and two frontend implementations on one API.",
    impact:
      "Validated one backend with two frontend directions, which is stronger portfolio evidence than a single UI skin over the same feature set.",
    tech: ["React", "TypeScript", "FastAPI", "MongoDB Atlas"],
    color: "from-energy-red to-energy-orange",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.photostream, kind: "external", tone: "primary" },
      { label: "PhotoStream Code", href: "https://github.com/SameerAli126/PhotoStream", kind: "external" },
      { label: "SnapCloud Code", href: "https://github.com/SameerAli126/snapcloud", kind: "external" },
      { label: "Details", href: "/projects/photostream-snapcloud", kind: "route" },
    ],
  },
  {
    dateRange: "August 2025 - November 2025",
    category: "Personal Finance and Life Ops",
    title: "SAMIO",
    description:
      "A local-first personal finance and life-ops dashboard with OTP auth, admin CRUD workflows, reports, budgeting, and structured PostgreSQL data models.",
    impact:
      "Moved deeper into operational software design with structured data models, admin flows, and day-to-day decision support features.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    color: "from-energy-orange to-energy-gold",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.samio, kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/SAMIO", kind: "external" },
      { label: "Details", href: "/projects/samio", kind: "route" },
    ],
  },
  {
    dateRange: "December 2025 - March 2026",
    category: "Public Data and GIS Systems",
    title: "Peshawar Civic GIS Atlas",
    description:
      "A Laravel-based civic GIS with public facility discovery, dataset ingestion, validation, RBAC, Leaflet mapping, and provenance-aware publishing workflows.",
    impact:
      "Showed range beyond standard SaaS and dashboards by shipping a public-facing data operations platform with genuine ingestion and publishing pipelines.",
    tech: ["Laravel", "PHP", "Leaflet", "MariaDB"],
    color: "from-energy-gold to-energy-red",
    links: [
      { label: "Live Demo", href: FUNNEL_LINKS.civicAtlas, kind: "external", tone: "primary" },
      { label: "Source", href: "https://github.com/SameerAli126/PCA", kind: "external" },
      { label: "Details", href: "/projects/peshawar-civic-gis-atlas", kind: "route" },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { icon: Trophy, label: "Projects Shipped", value: "12+", color: "text-energy-gold" },
  { icon: Medal, label: "Years Experience", value: "3+", color: "text-primary" },
  { icon: Target, label: "Client Satisfaction", value: "95%", color: "text-energy-orange" },
  { icon: Flame, label: "Active Learning", value: "Daily", color: "text-primary" },
];

export const TOURNAMENT_RESULTS: TournamentResult[] = [
  { event: "OptiTrade 3.0", placement: "Shipped", character: "Production Release", result: "W" },
  { event: "WordWanderer", placement: "Shipped", character: "Full Stack Delivery", result: "W" },
  { event: "InvoiceGen Pro", placement: "Shipped", character: "AI + Product Integration", result: "W" },
  { event: "PhotoStream / SnapCloud", placement: "Built", character: "Dual Frontend Delivery", result: "W" },
  { event: "SAMIO", placement: "Built", character: "Finance Ops Dashboard", result: "W" },
  { event: "Peshawar Civic GIS Atlas", placement: "Built", character: "Public GIS Workflow", result: "W" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: PROFILE.githubUrl, label: "GitHub" },
  { icon: Linkedin, href: PROFILE.linkedinUrl, label: "LinkedIn" },
  { icon: Twitter, href: PROFILE.xUrl, label: "X" },
];
