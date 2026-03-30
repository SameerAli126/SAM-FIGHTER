import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SKILLS } from "@/config/site";

type SkillBarProps = {
  skill: (typeof SKILLS)[0];
  index: number;
  inView: boolean;
};

const SkillBar = ({ skill, index, inView }: SkillBarProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-heading text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
        <skill.icon size={18} className="text-primary" aria-hidden="true" />
        {skill.name}
      </span>
      <span className="font-display text-xs text-primary">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        className="h-full energy-bar rounded-full"
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Arsenal</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Combat <span className="energy-gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {SKILLS.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

