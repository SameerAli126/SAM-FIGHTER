import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseBusiness, Download, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS, PROFILE } from "@/config/site";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const resolveHref = (href: `#${string}`) => {
    return isHomePage ? href : `/${href}`;
  };

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href={resolveHref("#hero")}
          className="font-display text-sm md:text-xl font-bold tracking-wide md:tracking-wider max-w-[70vw] md:max-w-none truncate"
        >
          <span className="energy-gradient-text">{PROFILE.fullName}</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={resolveHref(item.href)}
                  className="font-heading text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={PROFILE.resumePath}
            download="Muhammad-Sameer-Ali-CV.pdf"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
          >
            Download CV
            <Download size={14} />
          </a>
          <a
            href={PROFILE.hireMeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
          >
            Hire Me
            <BriefcaseBusiness size={14} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card md:hidden"
          >
            <ul className="flex flex-col items-center gap-4 py-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={resolveHref(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-lg font-semibold uppercase tracking-widest text-foreground hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={PROFILE.resumePath}
                  download="Muhammad-Sameer-Ali-CV.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
                >
                  Download CV
                  <Download size={14} />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.hireMeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Hire Me
                  <BriefcaseBusiness size={14} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
