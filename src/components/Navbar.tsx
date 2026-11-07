import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Download, Menu, Terminal, Volume2, VolumeX, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS, PROFILE } from "@/config/site";
import { isSoundEnabled, toggleSound, playClick } from "@/lib/audio";
import TerminalModal from "./TerminalModal";
import CvModal from "./CvModal";

interface NavbarProps {
  onOpenCv?: () => void;
}

const Navbar = ({ onOpenCv }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(isSoundEnabled());
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleToggleAudio = () => {
    const next = toggleSound();
    setAudioOn(next);
  };


  const resolveHref = (href: `#${string}`) => {
    return isHomePage ? href : `/${href}`;
  };

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (!isInput && (event.key === "`" || event.key === "~"))) {
        event.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-panel shadow-2xl py-3 border-b border-border/70" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo & Identity */}
          <a
            href={resolveHref("#hero")}
            className="group flex items-center gap-3 font-display text-lg md:text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-transform group-hover:scale-105">
              {PROFILE.initials}
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base leading-tight">
                {PROFILE.fullName}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-heading font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolveHref(item.href)}
                    className="text-muted-foreground transition-colors hover:text-primary hover:text-glow-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-4 w-px bg-border/60" />

            {/* Tactile Audio FX toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all hover:box-glow-cyan"
              title={audioOn ? "Mute interactive audio" : "Enable tactile sound effects"}
              aria-label={audioOn ? "Mute interactive audio" : "Enable tactile sound effects"}
            >
              {audioOn ? <Volume2 size={13} className="text-emerald-400" /> : <VolumeX size={13} className="text-muted-foreground" />}
              <span className="hidden xl:inline">{audioOn ? "Sound: ON" : "Sound: OFF"}</span>
            </button>

            {/* Quick Interactive Terminal CLI toggle */}
            <button
              onClick={() => {
                playClick();
                setTerminalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all hover:box-glow-cyan"
              title="Open Developer Console (~ or Ctrl+K)"
            >
              <Terminal size={13} className="text-cyan-400" />
              <span>CLI</span>
              <kbd className="hidden lg:inline text-[9px] bg-secondary/80 px-1 py-0.2 rounded border border-border/80 text-cyan-400">
                ~
              </kbd>
            </button>

            {/* Download / View CV */}
            <button
              type="button"
              onClick={() => {
                playClick();
                if (onOpenCv) onOpenCv();
                else setCvOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-1.5 font-heading text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 active:scale-[0.96]"
            >
              <Download size={13} className="text-cyan-400" />
              CV
            </button>

            {/* Hire Me CTA */}
            <a
              href={PROFILE.hireMeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 font-heading text-xs font-bold text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all hover:opacity-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.55)] active:scale-[0.96]"
            >
              <BriefcaseBusiness size={13} />
              Hire Me
            </a>
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={handleToggleAudio}
              aria-label={audioOn ? "Mute interactive audio" : "Enable tactile sound effects"}
              className="p-2 rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground hover:text-foreground"
            >
              {audioOn ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={() => {
                playClick();
                setTerminalOpen(true);
              }}
              aria-label="Open CLI console"
              className="p-2 rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground hover:text-foreground"
            >
              <Terminal size={17} className="text-cyan-400" />
            </button>


            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground rounded-lg border border-border/60 bg-secondary/40"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-panel border-b border-border/80 md:hidden mt-2 max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                <ul className="flex flex-col gap-3 font-heading font-semibold text-base">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={resolveHref(item.href)}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1 text-muted-foreground hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="h-px w-full bg-border/60 my-1" />

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      if (onOpenCv) onOpenCv();
                      else setCvOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border/80 py-2.5 font-heading text-sm font-semibold text-foreground hover:bg-secondary/50"
                  >
                    <Download size={15} /> View &amp; Download CV
                  </button>
                  <a
                    href={PROFILE.hireMeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-heading text-sm font-bold text-primary-foreground shadow-lg"
                  >
                    <BriefcaseBusiness size={15} /> Hire Me on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Terminal Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* CV Modal fallback for subpages */}
      {!onOpenCv && <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />}
    </>
  );
};

export default Navbar;
