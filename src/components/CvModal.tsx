import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Check,
  Copy,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";
import { PROFILE, EXPERIENCES, EDUCATION } from "@/config/site";
import { useToast } from "@/hooks/use-toast";
import { playClick, playBlip, playChime } from "@/lib/audio";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal = ({ isOpen, onClose }: CvModalProps) => {
  const { toast } = useToast();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      playBlip(880);
      setCopiedItem(label);
      toast({
        title: "Copied to clipboard",
        description: `${label}: ${text}`,
      });
      setTimeout(() => setCopiedItem(null), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-md overflow-y-auto custom-scrollbar"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl glass-panel shadow-2xl border border-border/80 overflow-hidden"
          >
            {/* Modal Action Bar */}
            <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-secondary/80 border-b border-border/70 gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h2 id="cv-modal-title" className="font-heading text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                  Official Curriculum Vitae
                  <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-cyan-300 hidden sm:inline">
                    Updated April 2026
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PROFILE.resumePath}
                  download="Muhammad-Sameer-Ali-CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-heading text-xs font-semibold shadow-md hover:opacity-95 transition-all active:scale-[0.96]"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  aria-label="Print CV"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-secondary/50 text-foreground font-heading text-xs font-medium hover:bg-secondary transition-colors"
                >
                  <Printer size={13} />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close CV modal"
                  className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable CV Document Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 font-body text-foreground space-y-7 overscroll-contain custom-scrollbar">
              {/* Header */}
              <div className="text-center pb-6 border-b border-border/60">
                <h1 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
                  {PROFILE.fullName}
                </h1>
                <p className="font-heading text-base sm:text-lg font-semibold text-cyan-400 mt-1">
                  {PROFILE.roleLine}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-4 mt-3 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-cyan-400" />
                    {PROFILE.location}
                  </span>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PROFILE.contactEmail, "Email")}
                    className="flex items-center gap-1 text-foreground/90 hover:text-primary transition-colors"
                  >
                    <Mail size={12} className="text-blue-400" />
                    {PROFILE.contactEmail}
                    {copiedItem === "Email" ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(PROFILE.phone, "Phone")}
                    className="flex items-center gap-1 text-foreground/90 hover:text-primary transition-colors"
                  >
                    <Phone size={12} className="text-emerald-400" />
                    {PROFILE.phone}
                    {copiedItem === "Phone" ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs font-mono text-muted-foreground">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    linkedin.com/in/sameerali126 <ExternalLink size={10} />
                  </a>
                  <span>•</span>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    github.com/SameerAli126 <ExternalLink size={10} />
                  </a>
                  <span>•</span>
                  <a
                    href="https://msameerali.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    msameerali.dev <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider font-bold text-cyan-400 pb-1 mb-2 border-b border-border/50">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
                  {PROFILE.summary}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider font-bold text-cyan-400 pb-1 mb-3 border-b border-border/50">
                  Experience
                </h3>

                <div className="space-y-5">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.company} className="rounded-xl bg-secondary/30 p-4 border border-border/60">
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                        <h4 className="font-heading text-sm sm:text-base font-bold text-foreground">
                          {exp.company} — <span className="text-cyan-400">{exp.role}</span>
                        </h4>
                        <span className="font-mono text-xs text-muted-foreground font-semibold">
                          {exp.period}
                        </span>
                      </div>

                      {exp.product && (
                        <p className="text-xs font-heading font-semibold text-primary mb-1">
                          {exp.product}
                        </p>
                      )}

                      <p className="font-mono text-[11px] text-muted-foreground mb-3">
                        {exp.tech.join(" • ")}
                      </p>

                      <ul className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
                        {exp.highlights.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Independent Projects */}
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider font-bold text-cyan-400 pb-1 mb-3 border-b border-border/50">
                  Selected Independent Projects
                </h3>

                <div className="space-y-4">
                  <div className="rounded-xl bg-secondary/30 p-4 border border-border/60">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5">
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        SAMIO — Personal Finance Dashboard
                      </h4>
                      <span className="font-mono text-xs text-muted-foreground">2025 – Present</span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground mb-2">
                      Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL
                    </p>
                    <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
                      <li>
                        Built responsive budgeting, transaction and reporting interfaces, including JSON export and distinct mobile, tablet and desktop navigation.
                      </li>
                      <li>
                        Implemented email OTP verification, signed sessions and protected API routes with Prisma/PostgreSQL backend foundations and administrative tools.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-secondary/30 p-4 border border-border/60">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5">
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        PhotoStream / SnapCloud — Cloud Photo Sharing
                      </h4>
                      <span className="font-mono text-xs text-muted-foreground">Mar – Jul 2025</span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground mb-2">
                      React, TypeScript, Vite, FastAPI, MongoDB Atlas, Cloudinary
                    </p>
                    <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
                      <li>
                        Built two frontend experiences backed by a shared FastAPI service, with JWT authentication and role-based access.
                      </li>
                      <li>
                        Implemented photo uploads, search and social interactions, using Cloudinary for media delivery and MongoDB Atlas for metadata.
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-secondary/30 p-4 border border-border/60">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5">
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        OptiTrade — Market and Portfolio Dashboard
                      </h4>
                      <span className="font-mono text-xs text-muted-foreground">Oct 2023 – Sep 2024</span>
                    </div>
                    <p className="font-mono text-[11px] text-muted-foreground mb-2">
                      Next.js, TypeScript, Node.js, PostgreSQL, TanStack Query, JWT
                    </p>
                    <ul className="space-y-1 pl-4 list-disc text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
                      <li>
                        Migrated a React frontend to Next.js and integrated stock-data APIs into responsive market dashboards.
                      </li>
                      <li>
                        Built watchlists, portfolio monitoring and trading interfaces with JWT authorization.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider font-bold text-cyan-400 pb-1 mb-2 border-b border-border/50">
                  Technical Skills
                </h3>

                <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                  <p>
                    <strong className="text-foreground font-semibold">Frontend: </strong>
                    <span className="text-muted-foreground">JavaScript, TypeScript, React, Next.js, HTML, CSS, Tailwind CSS, Radix UI, Tiptap, Figma</span>
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">Backend &amp; Data: </strong>
                    <span className="text-muted-foreground">Python, FastAPI, Node.js, Express.js, Laravel, REST APIs, SSE, Prisma, PostgreSQL, MongoDB, MySQL</span>
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">Testing &amp; Tools: </strong>
                    <span className="text-muted-foreground">Git, GitHub, Playwright, Vitest, Vite, debugging, responsive testing, AI-assisted development</span>
                  </p>
                  <p>
                    <strong className="text-foreground font-semibold">Deployment: </strong>
                    <span className="text-muted-foreground">Vercel, Netlify, Render, Railway; Docker fundamentals</span>
                  </p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-heading text-xs uppercase tracking-wider font-bold text-cyan-400 pb-1 mb-2 border-b border-border/50">
                  Education
                </h3>

                <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-heading font-bold text-foreground">
                      {EDUCATION.degree}
                    </h4>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {EDUCATION.institution}, {EDUCATION.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-muted-foreground block">{EDUCATION.period}</span>
                    <span className="font-mono font-bold text-cyan-400 text-xs">GPA: {EDUCATION.gpa}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CvModal;
