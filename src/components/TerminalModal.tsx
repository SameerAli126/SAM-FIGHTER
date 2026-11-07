import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { PROJECTS, PROFILE, EXPERIENCES, EDUCATION } from "@/config/site";
import BrandLogo from "./BrandLogo";

type TerminalLine = {
  id: string;
  type: "command" | "output" | "error" | "system";
  text: string | React.ReactNode;
};

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal = ({ isOpen, onClose }: TerminalModalProps) => {
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      text: "MSA Interactive Console v2.5.0 (x86_64-node-enterprise)",
    },
    {
      id: "init-2",
      type: "system",
      text: 'Type "help" or click any quick command chip below to explore.',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === "function") {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { id: String(Date.now()), type: "command", text: `$ ${rawCmd}` },
    ];

    switch (cmd) {
      case "help":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1">
              <p className="text-cyan-400 font-semibold">Available Commands:</p>
              <div className="grid grid-cols-[110px_1fr] gap-x-2 text-xs">
                <span className="text-blue-400">experience</span>
                <span>Deepixel &amp; contract engineering history</span>
                <span className="text-blue-400">projects</span>
                <span>List full-stack production projects</span>
                <span className="text-blue-400">creativelab</span>
                <span>Interactive 3D Iphone &amp; Wheel on Reels lab</span>
                <span className="text-blue-400">skills</span>
                <span>List core engineering competencies</span>
                <span className="text-blue-400">education</span>
                <span>Academic credentials &amp; BS Computer Science</span>
                <span className="text-blue-400">about</span>
                <span>Display background &amp; engineering philosophy</span>
                <span className="text-blue-400">contact</span>
                <span>Display direct communication channels</span>
                <span className="text-blue-400">cv</span>
                <span>Download curriculum vitae (PDF)</span>
                <span className="text-blue-400">phone</span>
                <span>Direct phone contact (+92 335 8181400)</span>
                <span className="text-blue-400">stats</span>
                <span>Show deployment &amp; production metrics</span>
                <span className="text-blue-400">whoami</span>
                <span>Display current user info</span>
                <span className="text-blue-400">repo</span>
                <span>Open Muhammad Sameer Ali's GitHub</span>
                <span className="text-blue-400">clear</span>
                <span>Clear console buffer</span>
                <span className="text-blue-400">exit</span>
                <span>Close terminal session</span>
              </div>
            </div>
          ),
        });
        break;

      case "creativelab":
      case "3d":
      case "aero":
        try {
          document.getElementById("creative-lab")?.scrollIntoView({ behavior: "smooth" });
        } catch {
          // ignore
        }
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <p className="text-xs text-cyan-300">
              Navigated to Creative Studio &amp; 3D Lab (Iphone3D spatial matrix &amp; Wheel on Reels aerodynamic simulation).
            </p>
          ),
        });
        break;


      case "experience":
      case "deepixel":
      case "invictus":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-2 text-xs">
              <p className="text-cyan-400 font-semibold">Professional Work Experience:</p>
              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className="border-l-2 border-primary/50 pl-2 space-y-1">
                  <p className="text-foreground font-bold">{exp.company} — <span className="text-cyan-400">{exp.role}</span> ({exp.period})</p>
                  {exp.product && <p className="text-primary font-semibold">{exp.product}</p>}
                  <p className="text-muted-foreground">{exp.tech.join(" • ")}</p>
                  <ul className="list-disc pl-4 text-muted-foreground/90 space-y-0.5">
                    {exp.highlights.slice(0, 3).map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case "education":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs">
              <p className="text-cyan-400 font-semibold">Academic Education:</p>
              <p className="text-foreground font-bold">{EDUCATION.degree}</p>
              <p className="text-muted-foreground">{EDUCATION.institution}, {EDUCATION.location}</p>
              <p className="text-emerald-400 font-mono font-semibold">Timeline: {EDUCATION.period} | GPA: {EDUCATION.gpa}</p>
            </div>
          ),
        });
        break;

      case "phone":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <p className="text-xs">
              Direct Phone: <a href={PROFILE.phoneTel} className="text-emerald-400 underline">{PROFILE.phone}</a>
            </p>
          ),
        });
        break;

      case "projects":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-semibold">Production Projects ({PROJECTS.length}):</p>
              {PROJECTS.map((p, idx) => {
                const routeLink = p.links.find((l) => l.kind === "route")?.href;
                const externalLink = p.links.find((l) => l.kind === "external")?.href;
                return (
                  <div key={p.title} className="text-xs border-l-2 border-primary/40 pl-2">
                    <span className="text-foreground font-bold">{idx + 1}. </span>
                    {routeLink ? (
                      <a href={routeLink} className="text-cyan-400 underline hover:text-cyan-300 font-bold">
                        {p.title}
                      </a>
                    ) : (
                      <span className="text-foreground font-bold">{p.title}</span>
                    )}{" "}
                    <span className="text-muted-foreground">({p.category})</span>
                    <p className="text-muted-foreground">{p.tech.join(" • ")}</p>
                    {externalLink && (
                      <a
                        href={externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-400 underline"
                      >
                        Live: {externalLink}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ),
        });
        break;

      case "whoami":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs">
              <p className="text-foreground font-semibold">User: Muhammad Sameer Ali</p>
              <p className="text-muted-foreground">Role: Full-Stack Software Engineer</p>
              <p className="text-muted-foreground">Location: Peshawar, Pakistan (PKT / UTC+5)</p>
              <p className="text-cyan-400">Permissions: root (full-cycle product ownership)</p>
            </div>
          ),
        });
        break;

      case "repo":
      case "github":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <p className="text-xs">
              GitHub Profile:{" "}
              <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-400">
                {PROFILE.githubUrl}
              </a>
            </p>
          ),
        });
        break;

      case "skills":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs">
              <p className="text-cyan-400 font-semibold">Technical Architecture Stack:</p>
              <p><strong className="text-blue-400">Frontend:</strong> React 19/18, Next.js 15, TypeScript, Tailwind CSS, Zustand</p>
              <p><strong className="text-emerald-400">Backend:</strong> Node.js, FastAPI (Python), Laravel (PHP), Express.js</p>
              <p><strong className="text-purple-400">Data:</strong> PostgreSQL, Prisma ORM, MongoDB Atlas, Redis</p>
              <p><strong className="text-amber-400">DevOps:</strong> Docker, Git / GitHub, CI/CD, Netlify, Vercel, Vitest</p>
            </div>
          ),
        });
        break;

      case "about":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs">
              <p className="text-foreground font-semibold">{PROFILE.fullName} — {PROFILE.roleLine}</p>
              <p className="text-muted-foreground">{PROFILE.aboutDeveloper}</p>
              <p className="text-cyan-400 mt-1">Focus: High performance, clean architectural boundaries & business utility.</p>
            </div>
          ),
        });
        break;

      case "contact":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="space-y-1 text-xs">
              <p className="text-cyan-400 font-semibold">Direct Communication Channels:</p>
              <p>Email: <a href={`mailto:${PROFILE.contactEmail}`} className="underline text-blue-400">{PROFILE.contactEmail}</a></p>
              <p>LinkedIn: <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className="underline text-blue-400">{PROFILE.linkedinUrl}</a></p>
              <p>GitHub: <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="underline text-blue-400">{PROFILE.githubUrl}</a></p>
            </div>
          ),
        });
        break;

      case "cv":
        window.open(PROFILE.resumePath, "_blank");
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: "Triggered CV download in new window.",
        });
        break;

      case "stats":
        newHistory.push({
          id: `${Date.now()}-out`,
          type: "output",
          text: (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-secondary/50 rounded">
                <p className="text-muted-foreground">Shipped Deployments</p>
                <p className="text-base font-bold text-foreground">12+ Production</p>
              </div>
              <div className="p-2 bg-secondary/50 rounded">
                <p className="text-muted-foreground">Engineering Experience</p>
                <p className="text-base font-bold text-foreground">3+ Years</p>
              </div>
              <div className="p-2 bg-secondary/50 rounded">
                <p className="text-muted-foreground">Full-Stack Architectures</p>
                <p className="text-base font-bold text-foreground">6 Major Systems</p>
              </div>
              <div className="p-2 bg-secondary/50 rounded">
                <p className="text-muted-foreground">Client Satisfaction</p>
                <p className="text-base font-bold text-foreground">95% Positive</p>
              </div>
            </div>
          ),
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        onClose();
        return;

      default:
        newHistory.push({
          id: `${Date.now()}-err`,
          type: "error",
          text: `zsh: command not found: ${rawCmd}. Type "help" for a list of commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="terminal-title"
            className={`w-full ${
              isMaximized ? "h-[90vh] max-w-6xl" : "h-[540px] max-w-3xl"
            } flex flex-col rounded-xl glass-panel shadow-2xl border border-border/80 overflow-hidden font-mono`}
          >
            {/* Header / Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/60 border-b border-border/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  aria-label="Close terminal"
                />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"
                  aria-label="Toggle terminal size"
                />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span id="terminal-title" className="ml-2 text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <BrandLogo size={14} variant="minimal" className="w-3.5 h-3.5 text-primary" />
                  sameer@dev-machine: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 hover:text-foreground transition-colors"
                  aria-label={isMaximized ? "Restore window" : "Maximize window"}
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1 hover:text-foreground transition-colors"
                  aria-label="Close terminal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick interactive chip buttons */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-secondary/30 border-b border-border/40 overflow-x-auto no-scrollbar scrollbar-none text-[11px]">
              <span className="text-muted-foreground shrink-0">Quick tap:</span>
              {["help", "experience", "projects", "creativelab", "skills", "education", "about", "stats", "contact", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  className="px-2.5 py-0.5 rounded bg-secondary/70 hover:bg-primary/20 hover:text-primary transition-colors text-foreground/90 shrink-0 border border-border/50"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Output buffer */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-xs sm:text-sm custom-scrollbar">
              {history.map((line) => (
                <div key={line.id}>
                  {line.type === "command" && (
                    <div className="text-foreground font-semibold flex items-center gap-1 text-cyan-400">
                      {line.text}
                    </div>
                  )}
                  {line.type === "system" && (
                    <div className="text-muted-foreground">{line.text}</div>
                  )}
                  {line.type === "output" && (
                    <div className="text-foreground/90 py-1">{line.text}</div>
                  )}
                  {line.type === "error" && (
                    <div className="text-red-400">{line.text}</div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input line */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-secondary/40 border-t border-border/60"
            >
              <span className="text-cyan-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type a command (e.g. projects, skills, contact)..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-xs sm:text-sm focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Execute command"
                className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
