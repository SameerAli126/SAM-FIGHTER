import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-sm md:text-base uppercase tracking-[0.3em] text-primary mb-4">
            MERN Stack Developer &bull; TEKKEN 8 Competitor
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6"
        >
          <span className="text-foreground">Unleash The</span>
          <br />
          <span className="energy-gradient-text text-glow">Power of Code</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          I'm <span className="text-foreground font-semibold">Muhammad Sameer Ali</span> — building
          powerful web apps and fighting my way through TEKKEN 8 tournaments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 energy-gradient px-8 py-3 rounded-sm font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity box-glow"
          >
            Explore My Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border border-primary/40 px-8 py-3 rounded-sm font-display text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors"
          >
            Challenge Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
