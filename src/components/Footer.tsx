import { ArrowUp } from "lucide-react";
import { PROFILE } from "@/config/site";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border/60 bg-background/80 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <BrandLogo size={36} className="shadow-[0_0_15px_rgba(59,130,246,0.25)]" />
            <div>
              <p className="font-heading text-sm text-foreground font-semibold">
                &copy; {new Date().getFullYear()}{" "}
                <span className="tech-gradient-text">{PROFILE.fullName}</span>
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Engineered with React 18, TypeScript, Tailwind CSS &amp; Framer Motion.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/40 px-3.5 py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors active:scale-[0.96]"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
