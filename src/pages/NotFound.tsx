import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404 route hit:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SeoMeta
        title="Page Not Found | Muhammad Sameer Ali"
        description="The requested page could not be found on Muhammad Sameer Ali's portfolio."
        path={location.pathname}
        noindex
      />
      <Navbar />
      <ModernBackground>
        <div className="flex min-h-[85vh] items-center justify-center px-6 pt-24">
          <div className="glass-card max-w-md w-full rounded-2xl p-8 text-center border border-border/80 shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Compass size={32} className="text-cyan-400" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
              404 • Resource Missing
            </span>
            <h1 className="font-display text-3xl font-extrabold text-foreground mt-2 mb-3">
              Route Not Found
            </h1>
            <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
              The path <code className="font-mono text-cyan-300 text-xs px-1.5 py-0.5 rounded bg-secondary/80">{location.pathname}</code> does not exist in this deployment.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-xs font-bold text-primary-foreground shadow-lg hover:opacity-95 transition-all"
            >
              <ArrowLeft size={14} />
              Return to Engineering Command Center
            </Link>
          </div>
        </div>
      </ModernBackground>
    </div>
  );
};

export default NotFound;
