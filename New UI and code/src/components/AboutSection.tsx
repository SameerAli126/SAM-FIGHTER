import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gamepad2, Code2 } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Who I Am</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Developer <span className="energy-gradient-text">&</span> Fighter
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Developer side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-lg p-8 fighting-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm energy-gradient flex items-center justify-center">
                <Code2 size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide">The Developer</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Full-stack MERN developer with expertise in React, Node.js, Next.js, TypeScript and
              Tailwind CSS. I build fast, responsive, and scalable web applications that deliver
              exceptional user experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My approach to code mirrors my fighting game mentality — precise execution,
              quick adaptation, and always looking for the optimal combo.
            </p>
          </motion.div>

          {/* Esports side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-card rounded-lg p-8 fighting-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm energy-gradient flex items-center justify-center">
                <Gamepad2 size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide">The Fighter</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Competitive TEKKEN 8 player with a passion for high-level play. Esports has taught
              me strategic thinking, composure under pressure, and the relentless drive to improve.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From frame data to fight strategies, the analytical mindset translates directly
              into debugging code and architecting software systems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
