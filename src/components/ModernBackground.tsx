import React from "react";
import AmbientBackground from "./AmbientBackground";

interface ModernBackgroundProps {
  children: React.ReactNode;
}

export const ModernBackground = ({ children }: ModernBackgroundProps) => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      <AmbientBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ModernBackground;
