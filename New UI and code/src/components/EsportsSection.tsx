import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Target, Flame } from "lucide-react";

const achievements = [
  { icon: Trophy, label: "Tournaments Played", value: "20+", color: "text-energy-gold" },
  { icon: Medal, label: "Top Placements", value: "8", color: "text-primary" },
  { icon: Target, label: "Win Rate", value: "72%", color: "text-energy-orange" },
  { icon: Flame, label: "Current Streak", value: "5W", color: "text-primary" },
];

const EsportsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="esports" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">TEKKEN 8</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Esports <span className="energy-gradient-text">Profile</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-lg p-6 text-center fighting-border group hover:box-glow transition-shadow duration-300"
            >
              <a.icon className={`mx-auto mb-3 ${a.color}`} size={28} />
              <p className="font-display text-2xl md:text-3xl font-black">{a.value}</p>
              <p className="font-heading text-xs uppercase tracking-wider text-muted-foreground mt-1">
                {a.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Fight record card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card rounded-lg p-8 max-w-3xl mx-auto fighting-border"
        >
          <h3 className="font-display text-lg font-bold uppercase text-center mb-6">
            Recent Tournament Results
          </h3>
          <div className="space-y-4">
            {[
              { event: "FGC Weekly #42", placement: "1st", character: "Jin Kazama", result: "W" },
              { event: "TEKKEN City Showdown", placement: "3rd", character: "Jin Kazama", result: "W" },
              { event: "Online Qualifier S3", placement: "Top 8", character: "Jin Kazama", result: "W" },
            ].map((match, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-heading text-sm font-semibold">{match.event}</p>
                  <p className="text-xs text-muted-foreground">{match.character}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-energy-gold">{match.placement}</span>
                  <span className="w-6 h-6 rounded-sm energy-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {match.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EsportsSection;
