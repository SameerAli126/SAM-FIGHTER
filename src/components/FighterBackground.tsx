import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import fighterJin from "@/assets/fighter-jin.png";
import fighterKazuya from "@/assets/fighter-kazuya.png";

const FighterBackground = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Jin starts far left, moves right across the full page scroll
  const jinX = useTransform(scrollYProgress, [0, 1], ["-70%", "20%"]);
  // Kazuya starts far right, moves left
  const kazuyaX = useTransform(scrollYProgress, [0, 1], ["70%", "-20%"]);
  // Scale up as they converge
  const fighterScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 1.2]);
  const fighterOpacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0.15, 0.4, 0.4, 0.15]);

  return (
    <div ref={containerRef} className="relative">
      {/* Jin - fixed to viewport left */}
      <motion.div
        style={{ x: jinX, scale: fighterScale, opacity: fighterOpacity }}
        className="fixed top-0 left-0 w-[45%] max-w-[550px] h-screen pointer-events-none z-[1]"
      >
        <img
          src={fighterJin}
          alt=""
          className="w-full h-full object-contain object-bottom -scale-x-100"
        />
      </motion.div>

      {/* Kazuya - fixed to viewport right */}
      <motion.div
        style={{ x: kazuyaX, scale: fighterScale, opacity: fighterOpacity }}
        className="fixed top-0 right-0 w-[45%] max-w-[550px] h-screen pointer-events-none z-[1]"
      >
        <img
          src={fighterKazuya}
          alt=""
          className="w-full h-full object-contain object-bottom"
        />
      </motion.div>

      {/* Page content rendered on top */}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
};

export default FighterBackground;
