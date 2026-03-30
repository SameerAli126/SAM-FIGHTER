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

export type Project = {
  title: string;
  description: string;
  tech: string[];
  color: string;
  route?: `/${string}`;
  liveUrl?: string;
  sourceUrl?: string;
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

export const PROFILE = {
  initials: "MSA",
  fullName: "Muhammad Sameer Ali",
  contactEmail: "khsameer626@gmail.com",
  roleLine: "Full-Stack MERN Developer",
  heroTitleLeading: "Unleash The",
  heroTitleAccent: "Power of Code",
  heroDescription:
    "I design and build fast, scalable web products with strong UX and clean engineering standards.",
  aboutDeveloper:
    "I am a full-stack MERN developer building modern products with React, Node.js, Next.js, TypeScript, and Tailwind CSS. My focus is simple: ship software that solves real business problems and still feels great to use.",
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
    title: "OptiTrade 3.0",
    description:
      "A modern, data-driven stock trading app with portfolio management, stock screener, financial news, watchlist, and AI-powered diversification tips.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "JWT Auth"],
    color: "from-energy-red to-energy-orange",
    route: "/projects/optitrade",
    liveUrl: "https://opti-trade-3-0.vercel.app/",
    sourceUrl: "https://github.com/SameerAli126/OptiTrade-3.0",
  },
  {
    title: "WordWanderer",
    description:
      "A gamified language learning platform with XP systems, streak tracking, achievements, adaptive difficulty, voice recognition, and Mandarin support.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "MongoDB"],
    color: "from-energy-orange to-energy-gold",
    route: "/projects/wordwanderer",
    liveUrl: "https://wordwanderer.vercel.app",
    sourceUrl: "https://github.com/SameerAli126/WordWanderer",
  },
  {
    title: "InvoiceGen Pro",
    description:
      "An AI-powered full-stack invoicing solution with Gemini 2.0 Flash chatbot, smart invoice generation, payment prediction analytics, and client management.",
    tech: ["Next.js 15", "Gemini AI", "MongoDB", "Stripe"],
    color: "from-energy-gold to-energy-red",
    route: "/projects/invoicegen-pro",
    liveUrl: "https://invoicegen-pro.netlify.app/",
    sourceUrl: "https://github.com/SameerAli126/invoicegen-pro",
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
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: "https://github.com/SameerAli126", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sameerali126", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/theUninvited444", label: "X" },
];
