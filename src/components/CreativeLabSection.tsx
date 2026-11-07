import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Compass,
  Cpu,
  ExternalLink,
  Eye,
  Gauge,
  Github,
  Layers,
  Palette,
  RotateCw,
  Sliders,
  Sparkles,
  Wind,
  Zap,
  Volume2,
  VolumeX,
  Volume1,
  Flame,
  Shield,
  Maximize2,
  Minimize2,
  Music,
  Play,
  Pause,
  RefreshCw,
  Crosshair,
  Smartphone,
  Activity,
  SlidersHorizontal,
  Vibrate,
  Radio,
  Fingerprint,
  Camera,
  Disc,
  BatteryCharging,
  PhoneCall,
  PhoneOff,
  Droplets,
  CircleDot,
  FastForward,
  Info,
} from "lucide-react";
import {
  isSoundEnabled,
  toggleSound,
  playClick,
  playBlip,
  playPulse,
  playChime,
  playWhoosh,
  playLaser,
  playEngine,
  playHaptic,
  playCameraShutter,
  playSynthNote,
  playBrakeSqueal,
} from "@/lib/audio";
import BrandLogo from "./BrandLogo";

const IPHONE_COLORS = {
  natural: { name: "Natural Titanium", hex: "#9a958d", border: "#b8b3ab", accent: "#d4ceb0", glow: "rgba(154, 149, 141, 0.3)" },
  blue: { name: "Blue Titanium", hex: "#344256", border: "#4f6580", accent: "#38bdf8", glow: "rgba(56, 189, 248, 0.35)" },
  white: { name: "White Titanium", hex: "#e5e5e7", border: "#f5f5f7", accent: "#ffffff", glow: "rgba(255, 255, 255, 0.25)" },
  black: { name: "Black Titanium", hex: "#1f2022", border: "#333538", accent: "#64748b", glow: "rgba(100, 116, 139, 0.3)" },
  cyber: { name: "Cyberpunk Neon", hex: "#0b2034", border: "#06b6d4", accent: "#38bdf8", glow: "rgba(6, 182, 212, 0.5)" },
  desert: { name: "Desert Rose Titanium", hex: "#634739", border: "#c2997f", accent: "#f5c5a3", glow: "rgba(194, 153, 127, 0.4)" },
} as const;

const CAR_PAINTS = {
  stealth: { name: "Stealth Obsidian", hex: "#111827", secondary: "#1e293b", glow: "rgba(30, 41, 59, 0.5)" },
  cyber: { name: "Electric Cyan", hex: "#0891b2", secondary: "#06b6d4", glow: "rgba(6, 182, 212, 0.6)" },
  crimson: { name: "Crimson Velocity", hex: "#be123c", secondary: "#f43f5e", glow: "rgba(225, 29, 72, 0.6)" },
  solar: { name: "Solar Flare", hex: "#d97706", secondary: "#f59e0b", glow: "rgba(245, 158, 11, 0.6)" },
} as const;

const SMOKE_DYES = {
  cyan: { name: "Aero Cyan", hex: "#06b6d4", rgb: "6, 182, 212" },
  pink: { name: "Plasma Pink", hex: "#ec4899", rgb: "236, 72, 153" },
  emerald: { name: "Toxic Emerald", hex: "#10b981", rgb: "16, 185, 129" },
  amber: { name: "Solar Amber", hex: "#f59e0b", rgb: "245, 158, 11" },
} as const;

export const CreativeLabSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [activeShowcase, setActiveShowcase] = useState<"iphone" | "automotive">("iphone");
  const [audioActive, setAudioActive] = useState<boolean>(() => isSoundEnabled());

  // Handle master audio toggle
  const handleToggleAudio = () => {
    const newState = toggleSound();
    setAudioActive(newState);
  };

  // ==========================================
  // 1. IPHONE 3D HARDWARE MATRIX STATE
  // ==========================================
  const [iphoneColor, setIphoneColor] = useState<keyof typeof IPHONE_COLORS>("cyber");
  const [screenMode, setScreenMode] = useState<"invictus" | "samio" | "hud" | "camera" | "synth">("invictus");
  const [explodedView, setExplodedView] = useState(false);
  const [explosionDepth, setExplosionDepth] = useState(100); // 20 to 100%
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: -8, y: 14 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({ x: 0, y: 0, rotX: -8, rotY: 14 });

  // Dynamic Island interactive widget
  const [islandMode, setIslandMode] = useState<"compact" | "music" | "call" | "faceid" | "charging">("compact");
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  // Chassis interactive features
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [screenPowered, setScreenPowered] = useState(true);
  const [isVibrating, setIsVibrating] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState<number | null>(null);

  // In-Screen App States
  const [invictusMemosCount, setInvictusMemosCount] = useState(14);
  const [samioBalance, setSamioBalance] = useState(24850);
  const [photosCaptured, setPhotosCaptured] = useState(3);
  const [cameraZoom, setCameraZoom] = useState<"0.5x" | "1x" | "3x" | "5x">("1x");
  const [cameraShutterFlash, setCameraShutterFlash] = useState(false);
  const [activePad, setActivePad] = useState<number | null>(null);

  // Auto-rotate effect for iPhone
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    let angle = rotation.y;
    const interval = setInterval(() => {
      angle = (angle + 0.35) % 360;
      setRotation((prev) => ({
        ...prev,
        y: angle > 180 ? angle - 360 : angle,
        x: Math.sin((angle * Math.PI) / 180) * 8 - 4,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging, rotation.y]);

  // Pointer drag to orbit 3D phone
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const newX = Math.max(-65, Math.min(65, dragStartRef.current.rotX - deltaY * 0.45));
    const newY = (dragStartRef.current.rotY + deltaX * 0.55) % 360;
    setRotation({ x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const setViewPreset = (x: number, y: number) => {
    playWhoosh();
    setAutoRotate(false);
    setRotation({ x, y });
  };

  const triggerVibrate = () => {
    playPulse();
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 600);
  };

  const handleTriggerShutter = () => {
    playCameraShutter();
    setCameraShutterFlash(true);
    setPhotosCaptured((p) => p + 1);
    setTimeout(() => setCameraShutterFlash(false), 160);
  };

  const handlePadTap = (padIndex: number) => {
    playSynthNote(padIndex);
    setActivePad(padIndex);
    setTimeout(() => setActivePad(null), 250);
  };

  const iphoneColors = IPHONE_COLORS;

  // ==========================================
  // 2. AUTOMOTIVE WIND TUNNEL STATE
  // ==========================================
  const [carSpeed, setCarSpeed] = useState(120);
  const [carPaint, setCarPaint] = useState<keyof typeof CAR_PAINTS>("cyber");
  const [smokeDye, setSmokeDye] = useState<keyof typeof SMOKE_DYES>("cyan");
  const [aeroSimMode, setAeroSimMode] = useState<"streamlines" | "smokeWand" | "pressure">("streamlines");
  const [smokeWandYRatio, setSmokeWandYRatio] = useState(0.48); // 0.1 to 0.9 of tunnel height
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [drsOpen, setDrsOpen] = useState(false);
  const [suspensionMode, setSuspensionMode] = useState<"track" | "sport" | "street">("sport");
  const [underglowOn, setUnderglowOn] = useState(true);
  const [isNitrousActive, setIsNitrousActive] = useState(false);
  const [brakeGlow, setBrakeGlow] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamlinesRef = useRef<
    Array<{ x: number; y: number; speed: number; length: number; opacity: number; yOffset: number }>
  >([]);
  const smokeParticlesRef = useRef<
    Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }>
  >([]);

  const carPaints = CAR_PAINTS;
  const smokeDyes = SMOKE_DYES;

  // Calculate dynamic aerodynamic telemetry
  const dragCoeff = useMemo(() => {
    let base = 0.23;
    if (drsOpen) base -= 0.05;
    if (suspensionMode === "track") base -= 0.02;
    if (suspensionMode === "street") base += 0.03;
    return Math.max(0.18, Math.round(base * 100) / 100);
  }, [drsOpen, suspensionMode]);

  const downforceKg = useMemo(() => {
    const wingFactor = drsOpen ? 0.016 : 0.0333;
    const suspFactor = suspensionMode === "track" ? 1.15 : suspensionMode === "sport" ? 1.0 : 0.85;
    return Math.round(carSpeed * carSpeed * wingFactor * suspFactor);
  }, [carSpeed, drsOpen, suspensionMode]);

  // Dynamic DCT Gear & Engine RPM
  const gear = useMemo(() => {
    if (carSpeed < 45) return "2nd";
    if (carSpeed < 75) return "3rd";
    if (carSpeed < 110) return "4th";
    if (carSpeed < 155) return "5th";
    if (carSpeed < 205) return "6th";
    return "7th";
  }, [carSpeed]);

  const engineRpm = useMemo(() => {
    const baseRpm = 2500 + (carSpeed % 45) * 160 + (isNitrousActive ? 2200 : 0);
    return Math.min(10800, Math.round(baseRpm));
  }, [carSpeed, isNitrousActive]);

  // Wind Tunnel Streamline Physics Canvas Simulation
  // CAR FACES RIGHT: Front splitter is at right (x ~ 72%), Rear wing is at left (x ~ 28%)
  // AIR BLOWS FROM RIGHT TO LEFT: Streamlines travel x -= speed
  useEffect(() => {
    if (typeof window === "undefined" || (typeof navigator !== "undefined" && navigator.userAgent?.includes("jsdom"))) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 640);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 75 aerodynamic streamlines
    if (streamlinesRef.current.length === 0) {
      const lines = [];
      for (let i = 0; i < 75; i++) {
        lines.push({
          x: Math.random() * width,
          y: height * 0.12 + Math.random() * (height * 0.72),
          speed: 0.85 + Math.random() * 0.5,
          length: 35 + Math.random() * 65,
          opacity: 0.2 + Math.random() * 0.65,
          yOffset: (Math.random() - 0.5) * 4,
        });
      }
      streamlinesRef.current = lines;
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Wind Tunnel Telemetry Grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
      ctx.lineWidth = 1;
      const step = 42;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Wind Velocity: Streamlines travel RIGHT to LEFT (meeting front of car)
      const effectiveVelocity = (carSpeed / 13) * (isNitrousActive ? 1.85 : 1.0);
      const paintColor = CAR_PAINTS[carPaint].hex;
      const smokeRgb = SMOKE_DYES[smokeDye].rgb;

      // Car bounding coordinates in canvas space:
      // Centered: Rear wing ~ 24% to 32% width, Front splitter ~ 70% to 78% width
      // Chassis vertical span ~ 50% to 75% height
      const carFrontX = width * 0.74;
      const carRearX = width * 0.26;
      const carTopY = height * 0.44;
      const carBottomY = height * 0.74;
      const carCenterY = (carTopY + carBottomY) / 2;

      // Render 75 Streamlines
      streamlinesRef.current.forEach((line) => {
        line.x -= effectiveVelocity * line.speed;
        if (line.x < -line.length) {
          line.x = width + line.length + Math.random() * 40;
          line.y = height * 0.12 + Math.random() * (height * 0.72);
        }

        // Distance-weighted aerodynamic deflection
        let deflectY = 0;
        const distFromChassisCenter = Math.abs(line.y - carCenterY);
        const verticalInfluence = Math.max(0, 1 - distFromChassisCenter / (height * 0.35));

        // When streamline enters car envelope (from right to left)
        if (line.x <= carFrontX + 30 && line.x >= carRearX - 60 && verticalInfluence > 0) {
          // Progress from front (1.0) to rear (0.0)
          const prog = (line.x - carRearX) / (carFrontX - carRearX);

          if (line.y < carCenterY) {
            // Upper aerodynamic flow: Splitter -> Hood -> Canopy -> Rear Wing
            if (prog >= 0.8) {
              // Front splitter up to hood
              deflectY = -Math.sin((1 - prog) * Math.PI * 2.5) * 22 * verticalInfluence;
            } else if (prog >= 0.35 && prog < 0.8) {
              // Hood over teardrop canopy
              deflectY = (-30 - Math.sin((prog - 0.35) * Math.PI) * 26) * verticalInfluence;
            } else if (prog >= 0.15 && prog < 0.35) {
              // Roof down to rear deck
              deflectY = (-25 + (0.35 - prog) * 24) * verticalInfluence;
            } else {
              // Rear wing vortex wake shedding
              const vortexFreq = drsOpen ? 4 : 8;
              const vortexAmp = drsOpen ? 6 : 14;
              deflectY = ((-15) + Math.sin(line.x * 0.1) * vortexAmp) * verticalInfluence;
            }
          } else {
            // Underbody Venturi ground effect flow (accelerates and hugs ground)
            deflectY = Math.sin(prog * Math.PI) * 10 * verticalInfluence;
          }
        }

        const currentY = line.y + deflectY + line.yOffset;

        // Draw streamline
        ctx.beginPath();
        const grad = ctx.createLinearGradient(line.x + line.length, currentY, line.x, currentY);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        if (isNitrousActive) {
          grad.addColorStop(0.5, "rgba(236, 72, 153, 0.7)");
          grad.addColorStop(1, "rgba(56, 189, 248, 0.95)");
        } else if (aeroSimMode === "pressure") {
          // In pressure mode, colorize streamlines by pressure: red stagnation at front, cyan/blue over roof
          if (line.x > carFrontX - 40 && line.x < carFrontX + 40) {
            grad.addColorStop(1, "rgba(244, 63, 94, 0.9)"); // high pressure
          } else {
            grad.addColorStop(1, "rgba(6, 182, 212, 0.85)"); // suction
          }
        } else {
          grad.addColorStop(0.4, `${paintColor}55`);
          grad.addColorStop(1, `rgba(${smokeRgb}, 0.85)`);
        }

        ctx.strokeStyle = grad;
        ctx.lineWidth = isNitrousActive ? 2.2 : 1.5;
        ctx.moveTo(line.x + line.length, currentY);
        ctx.lineTo(line.x, currentY);
        ctx.stroke();

        // High speed turbulence spark particles
        if (carSpeed > 165 && Math.random() < 0.035) {
          ctx.fillStyle = isNitrousActive ? "#f43f5e" : "#38bdf8";
          ctx.beginPath();
          ctx.arc(line.x, currentY, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Interactive Smoke Wand Particle Generator
      // Inject smoke particles at the smoke wand's upstream coordinate
      if (aeroSimMode === "smokeWand") {
        const wandX = width * 0.88;
        const wandY = height * smokeWandYRatio;

        // Draw Smoke Wand injector nozzle
        ctx.fillStyle = "rgba(100, 116, 139, 0.9)";
        ctx.fillRect(wandX - 4, 0, 8, wandY);
        ctx.beginPath();
        ctx.arc(wandX, wandY, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${smokeRgb})`;
        ctx.fill();

        // Spawn new smoke particles
        for (let i = 0; i < 3; i++) {
          smokeParticlesRef.current.push({
            x: wandX,
            y: wandY + (Math.random() - 0.5) * 6,
            vx: -effectiveVelocity * (0.9 + Math.random() * 0.2),
            vy: (Math.random() - 0.5) * 0.8,
            life: 0,
            maxLife: 60 + Math.random() * 40,
            size: 3 + Math.random() * 4,
          });
        }
      }

      // Update and render smoke particles
      const activeParticles: typeof smokeParticlesRef.current = [];
      smokeParticlesRef.current.forEach((p) => {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;

        // Aerodynamic deflection around car body
        if (p.x <= carFrontX + 20 && p.x >= carRearX - 50) {
          const prog = (p.x - carRearX) / (carFrontX - carRearX);
          if (p.y < carCenterY) {
            p.vy -= 0.15; // curve upward over hood and canopy
          } else {
            p.vy += 0.08; // curve down under splitter
          }
        }
        // Wake vortex swirling past rear wing
        if (p.x < carRearX && p.x > carRearX - 120) {
          p.vy += Math.sin(p.x * 0.15) * (drsOpen ? 0.3 : 0.8);
        }

        const alpha = Math.max(0, 1 - p.life / p.maxLife) * 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + p.life * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${smokeRgb}, ${alpha})`;
        ctx.fill();

        if (p.life < p.maxLife && p.x > -50) {
          activeParticles.push(p);
        }
      });
      smokeParticlesRef.current = activeParticles;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [carSpeed, carPaint, smokeDye, aeroSimMode, smokeWandYRatio, drsOpen, isNitrousActive]);

  // Nitrous boost trigger
  const handleNitrousTrigger = () => {
    playLaser();
    playEngine(240);
    setIsNitrousActive(true);
    setCarSpeed(220);
    setTimeout(() => {
      setIsNitrousActive(false);
      setCarSpeed(180);
    }, 2000);
  };

  // Brake trigger
  const handleBrakeTrigger = () => {
    playBrakeSqueal();
    setBrakeGlow(true);
    setCarSpeed((prev) => Math.max(30, prev - 45));
    setTimeout(() => setBrakeGlow(false), 1000);
  };

  return (
    <section id="creative-lab" className="py-24 relative overflow-hidden select-none" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading & Audio Control Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Sparkles size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Interactive 3D &amp; Creative Engineering • WebGL &amp; Canvas Matrix</span>
          </div>

          <h2
            id="creative-heading"
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
          >
            Creative <span className="tech-gradient-text">Studio</span> &amp; 3D Lab
          </h2>

          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Interactive spatial hardware showcases curated from Muhammad Sameer Ali&apos;s GitHub repositories, demonstrating 3D matrix transforms, aerodynamic wind tunnel fluid dynamics, and tactile micro-interactions.
          </p>

          {/* Master Lab Switcher & Sound FX Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveShowcase("iphone");
              }}
              className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                activeShowcase === "iphone"
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_24px_rgba(59,130,246,0.6)] scale-105 ring-2 ring-cyan-400/40"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground border-border/70 hover:border-cyan-500/40"
              }`}
            >
              <Smartphone size={15} className={activeShowcase === "iphone" ? "text-cyan-300" : ""} />
              <span>Iphone3D — Spatial Hardware Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveShowcase("automotive");
              }}
              className={`px-5 py-2.5 rounded-xl font-heading text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                activeShowcase === "automotive"
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_24px_rgba(59,130,246,0.6)] scale-105 ring-2 ring-cyan-400/40"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground border-border/70 hover:border-cyan-500/40"
              }`}
            >
              <Wind size={15} className={activeShowcase === "automotive" ? "text-cyan-300" : ""} />
              <span>Wheel on Reels — Aero Dynamics</span>
            </button>

            {/* Tactile Audio Switch */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 border ${
                audioActive
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-secondary/40 text-muted-foreground border-border/60 hover:text-foreground"
              }`}
              title="Toggle Generative Audio FX"
            >
              {audioActive ? (
                <>
                  <Volume2 size={15} className="text-emerald-400 animate-pulse" />
                  <span className="font-bold">Audio FX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={15} />
                  <span>Audio FX: OFF</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Master Glass Studio Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-6xl mx-auto glass-panel rounded-3xl p-5 sm:p-8 md:p-10 border border-border/80 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {/* Ambient Lighting Dynamic Backing */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] blur-[140px] pointer-events-none -z-10 transition-colors duration-700"
            style={{
              background:
                activeShowcase === "iphone"
                  ? `radial-gradient(circle, ${iphoneColors[iphoneColor].glow} 0%, rgba(59,130,246,0.1) 50%, transparent 80%)`
                  : `radial-gradient(circle, ${carPaints[carPaint].glow} 0%, rgba(6,182,212,0.15) 50%, transparent 80%)`,
            }}
          />

          {/* ======================================================== */}
          {/* 1. IPHONE 3D SPATIAL HARDWARE MATRIX SHOWCASE */}
          {/* ======================================================== */}
          {activeShowcase === "iphone" && (
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 md:gap-10 items-center">
              {/* 3D Interactive Viewport with touch-none */}
              <div
                className={`relative h-[530px] sm:h-[580px] md:h-[630px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#070c1a] via-[#040812] to-[#010207] border border-cyan-500/30 overflow-hidden select-none touch-none transition-shadow duration-300 ${
                  isDragging ? "cursor-grabbing ring-2 ring-cyan-400/50" : "cursor-grab"
                }`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onDoubleClick={() => setViewPreset(-8, 14)}
              >
                {/* Viewport Ambient Stars/Grid */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.45) 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Cybernetic HUD Overlay: Top-Left */}
                <div className="absolute top-4 left-4 font-mono text-[11px] text-cyan-400 flex flex-col gap-1 pointer-events-none z-40">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-cyan-500/30">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">MATRIX: X: {rotation.x.toFixed(1)}° | Y: {rotation.y.toFixed(1)}°</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1">
                    <span className="text-emerald-400">● 120 FPS</span>
                    <span>TILT: {Math.abs(rotation.x).toFixed(0)}°</span>
                    <span>Z-INDEX: {explodedView ? `${explosionDepth}%` : "0%"}</span>
                  </div>
                </div>

                {/* Quick Angle Presets: Top-Right */}
                <div className="absolute top-4 right-4 z-40 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-border/70">
                  <span className="text-[10px] font-mono text-muted-foreground px-1 hidden sm:inline">VIEW:</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewPreset(0, 0);
                    }}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                      rotation.x === 0 && rotation.y === 0 ? "bg-primary text-white font-bold" : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    Front
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewPreset(-12, 28);
                    }}
                    className="px-2 py-1 rounded text-[10px] font-mono text-muted-foreground hover:text-white transition-colors"
                  >
                    Iso 3D
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewPreset(0, 90);
                    }}
                    className="px-2 py-1 rounded text-[10px] font-mono text-muted-foreground hover:text-white transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewPreset(-6, 175);
                    }}
                    className="px-2 py-1 rounded text-[10px] font-mono text-muted-foreground hover:text-white transition-colors"
                  >
                    Cam Rear
                  </button>
                </div>

                {/* Bottom Viewport Telemetry Bar */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-40 font-mono text-[10px] text-muted-foreground">
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-border/40">
                    Renderer: 3D Spatial Matrix • Ceramic Shield Glass
                  </span>
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-border/40 hidden sm:inline">
                    Drag to Orbit • Double-Click to Reset
                  </span>
                </div>

                {/* Volumetric Flashlight Beam Projection (When rear flash is on) */}
                {flashlightOn && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-75"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(254, 243, 199, 0.45) 0%, rgba(251, 191, 36, 0.15) 35%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />
                )}

                {/* 3D Scene Perspective World */}
                <div
                  className={`transition-transform duration-75 ease-out flex items-center justify-center ${
                    isVibrating ? "animate-bounce" : ""
                  }`}
                  style={{
                    perspective: "1400px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Phone Master Chassis Assembly */}
                  <div
                    className="relative w-[260px] sm:w-[276px] h-[505px] sm:h-[535px] transition-transform duration-300"
                    style={{
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* PHYSICAL SIDE HARDWARE BUTTONS (3D Mounted) */}
                    {/* Left: Action Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playHaptic(880);
                        setFlashlightOn(!flashlightOn);
                      }}
                      className="absolute -left-[5px] top-28 w-[5px] h-7 rounded-l-md bg-neutral-400 hover:bg-cyan-400 transition-colors shadow-lg cursor-pointer z-50"
                      title="Action Button (Click to toggle Flashlight)"
                    />
                    {/* Left: Volume Up */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playBlip(700);
                        setVolumeLevel((prev) => Math.min(100, (prev || 50) + 10));
                        setTimeout(() => setVolumeLevel(null), 1400);
                      }}
                      className="absolute -left-[5px] top-40 w-[5px] h-11 rounded-l-md bg-neutral-400 hover:bg-white transition-colors shadow-lg cursor-pointer z-50"
                      title="Volume Up"
                    />
                    {/* Left: Volume Down */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playBlip(550);
                        setVolumeLevel((prev) => Math.max(0, (prev || 50) - 10));
                        setTimeout(() => setVolumeLevel(null), 1400);
                      }}
                      className="absolute -left-[5px] top-56 w-[5px] h-11 rounded-l-md bg-neutral-400 hover:bg-white transition-colors shadow-lg cursor-pointer z-50"
                      title="Volume Down"
                    />
                    {/* Right: Power/Siri Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClick();
                        setScreenPowered(!screenPowered);
                      }}
                      className="absolute -right-[5px] top-36 w-[5px] h-16 rounded-r-md bg-neutral-400 hover:bg-cyan-400 transition-colors shadow-lg cursor-pointer z-50"
                      title="Power / Lock Display"
                    />

                    {/* Bottom USB-C & Stereo Speakers */}
                    <div className="absolute -bottom-[2px] inset-x-12 h-[3px] flex items-center justify-between px-3 pointer-events-none opacity-90 z-50">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                      </div>
                      <div className="w-6 h-1.5 rounded-sm bg-neutral-900 border border-neutral-600" />
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                        <div className="w-1.5 h-1 rounded-full bg-black border border-neutral-700" />
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* 3D FACE 1: FRONT FACE (OLED DISPLAY & CERAMIC SHIELD) */}
                    {/* ======================================================== */}
                    <div
                      className="absolute inset-0 rounded-[48px] p-3 shadow-2xl transition-all duration-500"
                      style={{
                        transform: explodedView
                          ? `translateZ(${140 * (explosionDepth / 100)}px)`
                          : "translateZ(10px)",
                        backgroundColor: iphoneColors[iphoneColor].hex,
                        border: `3.5px solid ${iphoneColors[iphoneColor].border}`,
                        boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 35px ${iphoneColors[iphoneColor].border}44`,
                        opacity: xrayMode ? 0.75 : 1,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* Metallic Reflection Sheen */}
                      <div
                        className="absolute inset-0 rounded-[44px] pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(${135 + rotation.y}deg, rgba(255,255,255,0.22) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)`,
                        }}
                      />

                      {/* INNER OLED DISPLAY (Super Retina XDR) */}
                      <div
                        className="relative w-full h-full rounded-[40px] bg-black overflow-hidden flex flex-col justify-between p-3 border border-neutral-800 transition-all duration-300"
                        style={{
                          opacity: screenPowered ? 1 : 0.08,
                        }}
                      >
                        {/* Ceramic Shield Specular Shine */}
                        <div
                          className="absolute inset-0 pointer-events-none z-30 opacity-40"
                          style={{
                            background: `linear-gradient(${115 + rotation.x * 2}deg, rgba(255,255,255,0.45) 0%, transparent 35%, transparent 70%, rgba(255,255,255,0.12) 100%)`,
                          }}
                        />

                        {/* On-screen Camera Shutter Flash Bang */}
                        {cameraShutterFlash && (
                          <div className="absolute inset-0 bg-white z-50 animate-fade-out pointer-events-none" />
                        )}

                        {/* Volume Indicator HUD */}
                        {volumeLevel !== null && (
                          <div className="absolute top-16 left-3 z-40 bg-black/90 text-white font-mono text-[10px] px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-2 shadow-lg">
                            <Volume2 size={12} className="text-cyan-400" />
                            <span>{volumeLevel}%</span>
                          </div>
                        )}

                        {/* ========================================== */}
                        {/* DYNAMIC ISLAND PILL (4 Interactive Modes) */}
                        {/* ========================================== */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            playBlip(720);
                            setIslandMode((prev) =>
                              prev === "compact"
                                ? "music"
                                : prev === "music"
                                ? "faceid"
                                : prev === "faceid"
                                ? "call"
                                : prev === "call"
                                ? "charging"
                                : "compact"
                            );
                          }}
                          className={`mx-auto rounded-full bg-black border border-neutral-800 transition-all duration-300 z-30 cursor-pointer shadow-lg hover:border-cyan-400/60 ${
                            islandMode === "compact"
                              ? "w-28 h-7 px-2.5 flex items-center justify-between text-[9px] font-mono text-muted-foreground"
                              : "w-56 h-14 p-2 flex items-center justify-between text-[10px] font-mono rounded-2xl"
                          }`}
                          title="Click Dynamic Island to interact!"
                        >
                          {islandMode === "compact" && (
                            <>
                              <div className="flex items-center gap-1.5">
                                <BrandLogo size={12} variant="minimal" className="w-3 h-3" />
                                <span className="text-white text-[8px] font-bold">SAM.OS</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-cyan-500/80" />
                                <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700" />
                              </div>
                            </>
                          )}

                          {islandMode === "music" && (
                            <div className="flex items-center justify-between w-full px-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow">
                                  <Disc size={16} className={`text-white ${isPlayingMusic ? "animate-spin" : ""}`} style={{ animationDuration: "5s" }} />
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] font-bold text-white truncate max-w-[90px]">Voyager (Live)</p>
                                  <p className="text-[8px] text-cyan-300">Daft Punk • 120 FPS</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    playClick();
                                    setIsPlayingMusic(!isPlayingMusic);
                                  }}
                                  className="w-5 h-5 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
                                >
                                  {isPlayingMusic ? <Pause size={10} /> : <Play size={10} />}
                                </button>
                                {/* Audio Equalizer Bars */}
                                <div className="flex items-end gap-0.5 h-4">
                                  <div className="w-1 bg-cyan-400 h-3 animate-pulse" />
                                  <div className="w-1 bg-purple-400 h-4 animate-pulse" style={{ animationDelay: "150ms" }} />
                                  <div className="w-1 bg-emerald-400 h-2 animate-pulse" style={{ animationDelay: "300ms" }} />
                                </div>
                              </div>
                            </div>
                          )}

                          {islandMode === "faceid" && (
                            <div className="flex items-center justify-between w-full px-2">
                              <div className="flex items-center gap-2">
                                <Fingerprint size={20} className="text-emerald-400 animate-pulse" />
                                <div className="text-left">
                                  <p className="text-[10px] font-bold text-emerald-400">FaceID Verified</p>
                                  <p className="text-[8px] text-muted-foreground">Sameer Ali Matrix</p>
                                </div>
                              </div>
                              <span className="text-emerald-400 text-xs font-bold">✓</span>
                            </div>
                          )}

                          {islandMode === "call" && (
                            <div className="flex items-center justify-between w-full px-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                                  <PhoneCall size={14} className="text-cyan-400 animate-bounce" />
                                </div>
                                <div className="text-left">
                                  <p className="text-[10px] font-bold text-white">Tim Cook</p>
                                  <p className="text-[8px] text-cyan-300">Apple Park • Sameer AI</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    playChime();
                                    setIslandMode("compact");
                                  }}
                                  className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow"
                                >
                                  <PhoneCall size={10} />
                                </button>
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    playHaptic(200);
                                    setIslandMode("compact");
                                  }}
                                  className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white shadow"
                                >
                                  <PhoneOff size={10} />
                                </button>
                              </div>
                            </div>
                          )}

                          {islandMode === "charging" && (
                            <div className="flex items-center justify-between w-full px-2">
                              <div className="flex items-center gap-2">
                                <BatteryCharging size={18} className="text-emerald-400 animate-pulse" />
                                <div className="text-left">
                                  <p className="text-[10px] font-bold text-white">MagSafe 15W Fast Charge</p>
                                  <p className="text-[8px] text-emerald-400">99% Charged • 29W Peak</p>
                                </div>
                              </div>
                              <span className="text-emerald-400 text-xs font-mono font-bold">99%</span>
                            </div>
                          )}
                        </div>

                        {/* ========================================== */}
                        {/* SCREEN MODES & INTERACTIVE OS WORKSPACES */}
                        {/* ========================================== */}
                        <div className="flex-1 my-2 flex flex-col justify-center text-center font-body text-xs text-white overflow-hidden relative">
                          {/* 1. INVICTUS AI MODE */}
                          {screenMode === "invictus" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-2 p-3 rounded-2xl bg-gradient-to-b from-blue-950/70 to-[#071329] border border-blue-500/40 font-mono text-[10px] text-left shadow-lg backdrop-blur-sm"
                            >
                              <div className="flex items-center justify-between text-cyan-300 font-bold border-b border-blue-500/30 pb-1.5">
                                <span className="flex items-center gap-1">
                                  <Activity size={12} className="text-cyan-400 animate-pulse" />
                                  <span>Invictus AI (Deepixel)</span>
                                </span>
                                <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded text-[8px] border border-emerald-500/40">
                                  Streaming
                                </span>
                              </div>

                              <p className="text-muted-foreground text-[9px]">Deal UUID: d89f-21ae</p>

                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] text-cyan-200">
                                  <span>Series B Deal Memo</span>
                                  <span className="font-bold">92% Match</span>
                                </div>
                                <div className="h-1.5 bg-blue-900/80 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-3/4 animate-pulse" />
                                </div>
                              </div>

                              <p className="text-[9px] text-cyan-200 leading-snug">
                                Generating Series B Investment Report...
                              </p>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playClick();
                                  setInvictusMemosCount((c) => c + 1);
                                }}
                                className="w-full py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-[9px] font-bold transition-all shadow active:scale-95 cursor-pointer"
                              >
                                + Run Neural Analysis ({invictusMemosCount} Completed)
                              </button>
                            </motion.div>
                          )}

                          {/* 2. SAMIO LIFEOPS MODE */}
                          {screenMode === "samio" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-2 p-3 rounded-2xl bg-gradient-to-b from-purple-950/70 to-[#120a26] border border-purple-500/40 font-mono text-[10px] text-left shadow-lg backdrop-blur-sm"
                            >
                              <div className="flex items-center justify-between text-purple-300 font-bold border-b border-purple-500/30 pb-1.5">
                                <span>SAMIO Finance</span>
                                <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded text-[8px] border border-emerald-500/40">
                                  ACID
                                </span>
                              </div>

                              <div className="bg-purple-900/30 p-2 rounded-xl border border-purple-500/30">
                                <span className="text-[9px] text-purple-300/80 block">Total Portfolio Balance</span>
                                <p className="text-sm font-extrabold text-white tracking-wide">
                                  ${samioBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} Net Worth
                                </p>
                              </div>

                              <p className="text-muted-foreground text-[9px]">Prisma PostgreSQL • OTP Verified</p>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playChime();
                                  setSamioBalance((b) => b + 500);
                                }}
                                className="w-full py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-300 text-[9px] font-bold transition-all shadow active:scale-95 cursor-pointer"
                              >
                                + Deposit $500 Micro-payment
                              </button>
                            </motion.div>
                          )}

                          {/* 3. SPATIAL HUD MODE */}
                          {screenMode === "hud" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-2.5 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 font-mono"
                            >
                              <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-bold text-xs">
                                <Crosshair size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
                                <span>SPATIAL 3D ACTIVE</span>
                              </div>

                              {/* Reactive Gyroscopic Artificial Horizon */}
                              <div className="relative w-28 h-28 mx-auto rounded-full border-2 border-cyan-400/50 flex items-center justify-center overflow-hidden bg-black/60 shadow-inner">
                                <div
                                  className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 to-blue-950/60 transition-transform duration-75"
                                  style={{
                                    transform: `rotate(${-rotation.y}deg) translateY(${rotation.x * 0.8}px)`,
                                  }}
                                />
                                <div className="w-full h-0.5 bg-cyan-400/80 z-10" />
                                <div className="h-full w-0.5 bg-cyan-400/80 z-10" />
                                <div className="absolute w-12 h-12 rounded-full border border-dashed border-cyan-300/60 z-10" />
                                <span className="absolute bottom-1 text-[8px] font-bold text-cyan-300 z-10">
                                  {rotation.y.toFixed(0)}° YAW
                                </span>
                              </div>

                              <p className="text-[9px] text-muted-foreground">
                                Interact with controls to adjust tilt &amp; chassis finish.
                              </p>
                            </motion.div>
                          )}

                          {/* 4. PRO CAMERA MODE */}
                          {screenMode === "camera" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-2 p-2 rounded-2xl bg-neutral-950/90 border border-cyan-500/40 font-mono text-[9px] relative h-48 flex flex-col justify-between"
                            >
                              {/* Viewfinder Reticle */}
                              <div className="relative flex-1 rounded-xl border border-dashed border-cyan-400/40 flex items-center justify-center overflow-hidden bg-black/50">
                                <div className="absolute top-2 left-2 text-[8px] text-cyan-400">4K • 60 FPS • RAW</div>
                                <div className="w-10 h-10 border border-yellow-400/80 rounded-sm flex items-center justify-center">
                                  <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                                </div>
                                <div className="absolute bottom-1 right-2 text-[8px] text-muted-foreground">
                                  {photosCaptured} Photos
                                </div>
                              </div>

                              {/* Zoom Selector */}
                              <div className="flex justify-center gap-1.5 text-[8px]">
                                {(["0.5x", "1x", "3x", "5x"] as const).map((z) => (
                                  <button
                                    key={z}
                                    type="button"
                                    onClick={(ev) => {
                                      ev.stopPropagation();
                                      playClick();
                                      setCameraZoom(z);
                                    }}
                                    className={`px-2 py-0.5 rounded-full transition-colors ${
                                      cameraZoom === z ? "bg-yellow-400 text-black font-bold" : "bg-neutral-800 text-neutral-400"
                                    }`}
                                  >
                                    {z}
                                  </button>
                                ))}
                              </div>

                              {/* Shutter Button */}
                              <button
                                type="button"
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  handleTriggerShutter();
                                }}
                                className="mx-auto w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform bg-white/20"
                                title="Capture Photo"
                              >
                                <div className="w-7 h-7 rounded-full bg-white shadow" />
                              </button>
                            </motion.div>
                          )}

                          {/* 5. SYNTH BEAT PAD MODE */}
                          {screenMode === "synth" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="space-y-2 p-2.5 rounded-2xl bg-neutral-950/90 border border-purple-500/40 font-mono text-[9px] relative"
                            >
                              <div className="flex items-center justify-between text-purple-300 font-bold border-b border-purple-500/30 pb-1">
                                <span>MSA BEAT MACHINE</span>
                                <span className="text-cyan-400">128 BPM</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-1">
                                {[
                                  { name: "KICK 01", note: 0, bg: "from-cyan-600 to-blue-700" },
                                  { name: "SNARE 02", note: 1, bg: "from-purple-600 to-pink-700" },
                                  { name: "LASER 03", note: 2, bg: "from-emerald-600 to-teal-700" },
                                  { name: "CHIME 04", note: 3, bg: "from-amber-600 to-orange-700" },
                                ].map((pad) => (
                                  <button
                                    key={pad.name}
                                    type="button"
                                    onClick={(ev) => {
                                      ev.stopPropagation();
                                      handlePadTap(pad.note);
                                    }}
                                    className={`h-14 rounded-xl p-2 flex flex-col justify-between font-bold text-left transition-all bg-gradient-to-br ${pad.bg} shadow-md active:scale-90 ${
                                      activePad === pad.note ? "ring-2 ring-white scale-95" : ""
                                    }`}
                                  >
                                    <span className="text-[8px] text-white/90">{pad.name}</span>
                                    <span className="text-[10px] text-white">TAP NOTE</span>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Home Indicator Bar */}
                        <div className="mx-auto w-28 h-1 rounded-full bg-white/50 mb-0.5 shadow" />
                      </div>
                    </div>

                    {/* ======================================================== */}
                    {/* 3D FACE 2: REAR FACE (FROSTED TITANIUM & SAPPHIRE CAMERAS) */}
                    {/* ======================================================== */}
                    <div
                      className="absolute inset-0 rounded-[48px] p-3 shadow-2xl transition-all duration-500"
                      style={{
                        transform: explodedView
                          ? `translateZ(${-150 * (explosionDepth / 100)}px) rotateY(180deg)`
                          : "translateZ(-10px) rotateY(180deg)",
                        backgroundColor: iphoneColors[iphoneColor].hex,
                        border: `3.5px solid ${iphoneColors[iphoneColor].border}`,
                        boxShadow: `0 35px 70px -15px rgba(0, 0, 0, 0.95)`,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {/* Frosted Titanium Satin Finish & Specular */}
                      <div
                        className="absolute inset-0 rounded-[44px] pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18) 0%, transparent 60%, rgba(0,0,0,0.4) 100%)`,
                        }}
                      />

                      {/* Bespoke Polished Titanium Emblem */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-80 transition-opacity hover:opacity-100">
                        <BrandLogo
                          variant="metallic"
                          size={46}
                          className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                        />
                      </div>

                      {/* TRIPLE SAPPHIRE CAMERA PLATE (Top-Left of backplate) */}
                      <div
                        className="absolute top-4 left-4 w-28 h-28 rounded-3xl bg-neutral-900/90 border border-white/20 p-2 shadow-2xl"
                        style={{
                          boxShadow: "0 10px 25px rgba(0,0,0,0.85)",
                        }}
                      >
                        <div className="relative w-full h-full">
                          {/* Main 48MP Sapphire Lens */}
                          <div className="absolute top-0 left-0 w-11 h-11 rounded-full bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                            <div className="w-6 h-6 rounded-full bg-blue-950 border border-cyan-400/60 shadow-inner" />
                          </div>
                          {/* Ultra-Wide 12MP Sapphire Lens */}
                          <div className="absolute bottom-0 left-0 w-11 h-11 rounded-full bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                            <div className="w-6 h-6 rounded-full bg-blue-950 border border-cyan-400/60 shadow-inner" />
                          </div>
                          {/* 5x Telephoto Periscope Sapphire Lens */}
                          <div className="absolute top-5 right-0 w-11 h-11 rounded-full bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center shadow-inner">
                            <div className="w-6 h-6 rounded-full bg-blue-950 border border-cyan-400/60 shadow-inner" />
                          </div>
                          {/* Quad-LED True Tone Flashlight */}
                          <div
                            className={`absolute top-0.5 right-2 w-4 h-4 rounded-full border border-neutral-600 transition-all ${
                              flashlightOn
                                ? "bg-amber-100 shadow-[0_0_20px_#fff] scale-110"
                                : "bg-neutral-800"
                            }`}
                          />
                          {/* LiDAR Scanner Dot */}
                          <div className="absolute bottom-1.5 right-2 w-3.5 h-3.5 rounded-full bg-black border border-neutral-700" />
                        </div>
                      </div>

                      {/* MagSafe Wireless Alignment Ring Outline */}
                      <div className="absolute inset-x-8 top-32 h-48 rounded-full border border-dashed border-white/10 pointer-events-none" />
                    </div>

                    {/* ======================================================== */}
                    {/* EXPLODED ARCHITECTURE CAD LAYERS (When active) */}
                    {/* ======================================================== */}
                    {explodedView && (
                      <>
                        {/* Layer 1: Titanium Midframe & Vapor Chamber */}
                        <div
                          className="absolute inset-x-4 inset-y-4 rounded-[42px] border-2 border-cyan-400/50 bg-cyan-950/60 p-3 flex flex-col justify-between font-mono text-cyan-300 shadow-2xl transition-transform duration-500 backdrop-blur-md pointer-events-none"
                          style={{
                            transform: `translateZ(${75 * (explosionDepth / 100)}px)`,
                          }}
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-white">VAPOR CHAMBER MIDFRAME</span>
                            <span className="text-cyan-400">Grade 5 Ti</span>
                          </div>
                          <div className="h-1 bg-cyan-500/40 rounded-full w-full" />
                          <span className="text-[8px] text-muted-foreground text-center">
                            Thermal Dissipation • 100% Recycled Graphite
                          </span>
                        </div>

                        {/* Layer 2: A17 Pro Bionic Logic Board */}
                        <div
                          className="absolute inset-x-3 top-20 h-40 rounded-2xl bg-slate-950/95 border-2 border-cyan-400 p-3 flex flex-col justify-between font-mono text-xs text-cyan-300 shadow-2xl transition-transform duration-500 backdrop-blur-md pointer-events-none"
                          style={{
                            transform: `translateZ(${15 * (explosionDepth / 100)}px)`,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Cpu size={26} className="text-cyan-400 animate-pulse" />
                            <div className="text-left">
                              <span className="font-bold text-white tracking-wide block">A17 PRO ARCHITECTURE</span>
                              <span className="text-[10px] text-cyan-300 block">3nm Neural Engine • 6-Core GPU</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[9px] text-cyan-200/80 border-t border-cyan-500/30 pt-1.5">
                            <span>19B Transistors</span>
                            <span>Ray Tracing Accel</span>
                            <span>16-Core NPU</span>
                            <span>35 TOPS Compute</span>
                          </div>
                        </div>

                        {/* Layer 3: High Density Graphene Battery */}
                        <div
                          className="absolute inset-x-5 bottom-16 h-36 rounded-xl bg-slate-900/95 border border-emerald-400/60 p-2.5 flex flex-col justify-between font-mono text-[10px] text-emerald-300 transition-transform duration-500 backdrop-blur-md shadow-xl pointer-events-none"
                          style={{
                            transform: `translateZ(${-45 * (explosionDepth / 100)}px)`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">GRAPHENE BATTERY</span>
                            <span className="text-white font-bold">4,422 mAh</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 w-[94%]" />
                          </div>
                          <span className="text-[8px] text-muted-foreground text-center">
                            3.87V Li-Ion • 29W Fast Charge • Zero Degradation
                          </span>
                        </div>

                        {/* Layer 4: MagSafe Wireless Charging Matrix */}
                        <div
                          className="absolute inset-x-6 top-32 h-44 rounded-full border-2 border-dashed border-cyan-400/60 bg-cyan-950/40 p-2 flex items-center justify-center pointer-events-none transition-transform duration-500 backdrop-blur-sm shadow-xl"
                          style={{
                            transform: `translateZ(${-100 * (explosionDepth / 100)}px)`,
                          }}
                        >
                          <div className="w-24 h-24 rounded-full border border-cyan-300/40 flex items-center justify-center">
                            <Radio size={20} className="text-cyan-400 animate-ping opacity-60" />
                          </div>
                          <span className="absolute -bottom-5 text-[9px] font-mono text-cyan-300 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
                            MAGSAFE MATRIX • 15W
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls Column */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={13} className="text-cyan-400" />
                      <span>Interactive Hardware Matrix</span>
                    </span>
                    <a
                      href="https://github.com/SameerAli126/Iphone3D"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                    >
                      <Github size={13} />
                      <span>View GitHub Repo</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                    Spatial 3D Hardware Showcase
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Interactive 3D model featuring full physics orbit, multi-layer CAD teardown, interactive Dynamic Island, and live tactile Web Audio feedback.
                  </p>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-foreground/80 mb-2">
                    Titanium Chassis Finish: <span className="text-cyan-400 font-bold">{iphoneColors[iphoneColor].name}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {(Object.keys(iphoneColors) as Array<keyof typeof iphoneColors>).map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => {
                          playBlip(640);
                          setIphoneColor(col);
                        }}
                        className={`w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center relative cursor-pointer ${
                          iphoneColor === col
                            ? "scale-110 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                            : "border-border/60 hover:scale-105"
                        }`}
                        style={{ backgroundColor: iphoneColors[col].hex }}
                        title={iphoneColors[col].name}
                      >
                        {iphoneColor === col && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Display Mode Switcher */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-foreground/80 mb-2">
                    Dynamic Display Mode &amp; Interactive Apps
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    {[
                      { id: "invictus", label: "Invictus AI" },
                      { id: "samio", label: "SAMIO LifeOps" },
                      { id: "hud", label: "Spatial HUD" },
                      { id: "camera", label: "Pro Camera" },
                      { id: "synth", label: "Beat Machine" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          playClick();
                          setScreenMode(mode.id as typeof screenMode);
                        }}
                        className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          screenMode === mode.id
                            ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            : "bg-secondary/50 text-muted-foreground border-border/70 hover:text-foreground hover:border-cyan-500/40"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exploded Architecture Toggle & Depth Slider */}
                <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        playPulse();
                        setExplodedView(!explodedView);
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        explodedView
                          ? "bg-purple-500/20 border-purple-500/50 text-purple-300 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : "bg-secondary/60 border-border/70 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Layers size={14} className={explodedView ? "text-purple-400" : ""} />
                      <span>Exploded Architecture: {explodedView ? "ACTIVE" : "COLLAPSED"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playPulse();
                        setAutoRotate(!autoRotate);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        autoRotate
                          ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                          : "bg-secondary/60 border-border/70 text-muted-foreground"
                      }`}
                    >
                      <RotateCw size={13} className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: "6s" }} />
                      <span>Auto-Orbit: {autoRotate ? "ON" : "OFF"}</span>
                    </button>
                  </div>

                  {explodedView && (
                    <div className="space-y-1.5 pt-1 border-t border-border/40">
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>Teardown Z-Depth Separation</span>
                        <span className="text-purple-300 font-bold">{explosionDepth}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={explosionDepth}
                        onChange={(e) => setExplosionDepth(Number(e.target.value))}
                        className="w-full accent-purple-400 cursor-pointer h-1.5 bg-secondary rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Tactile Hardware Ping Tools */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                  <button
                    type="button"
                    onClick={triggerVibrate}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 bg-secondary/50 text-xs font-mono text-muted-foreground hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
                  >
                    <Vibrate size={13} />
                    <span>Haptic Buzz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playLaser();
                      setXrayMode(!xrayMode);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                      xrayMode
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                        : "border-border/70 bg-secondary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Eye size={13} />
                    <span>X-Ray Wireframe: {xrayMode ? "ON" : "OFF"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setViewPreset(-8, 14);
                      setAutoRotate(true);
                      setExplodedView(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 bg-secondary/50 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors ml-auto cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    <span>Reset View</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. AUTOMOTIVE WIND TUNNEL & AERO DYNAMICS SHOWCASE */}
          {/* ======================================================== */}
          {activeShowcase === "automotive" && (
            <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 md:gap-10 items-center">
              {/* Wind Tunnel Viewport */}
              <div className="relative h-[530px] sm:h-[580px] md:h-[630px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#02050e] via-[#050c1f] to-[#020409] border border-cyan-500/30 overflow-hidden select-none shadow-2xl">
                {/* Wind Tunnel Canvas Physics Streamlines */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

                {/* Telemetry HUD Top Left */}
                <div className="absolute top-4 left-4 font-mono text-[11px] text-cyan-400 space-y-1.5 z-30 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 shadow-lg">
                    <Gauge size={14} className="text-cyan-400 animate-pulse" />
                    <span className="font-bold text-white">VELOCITY: {carSpeed} MPH ({Math.round(carSpeed * 1.609)} KM/H)</span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-border/50 text-[10px] text-muted-foreground flex items-center gap-2">
                    <span className="text-cyan-300 font-bold">DRAG COEFF: Cd {dragCoeff.toFixed(2)}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">DOWNFORCE: {downforceKg} KG</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">GEAR: {gear}</span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-[9px] text-neutral-400 border border-neutral-800 flex items-center gap-2">
                    <span>RPM: {engineRpm.toLocaleString()}</span>
                    <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          engineRpm > 9000 ? "bg-rose-500" : engineRpm > 7000 ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                        style={{ width: `${(engineRpm / 11000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Active Aero Status Badge Top Right */}
                <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-border/60">
                    <span className="text-muted-foreground">DRS:</span>
                    <span className={`font-bold ${drsOpen ? "text-emerald-400" : "text-amber-400"}`}>
                      {drsOpen ? "DEPLOYED (V-MAX)" : "CLOSED (APEX)"}
                    </span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-muted-foreground border border-border/40">
                    AERO BALANCE: 46% F / 54% R
                  </div>
                </div>

                {/* Interactive Hypercar 2.5D SVG Architecture */}
                <div
                  className={`relative z-10 w-[90%] max-w-[490px] transition-transform duration-300 ${
                    isNitrousActive ? "scale-105" : ""
                  }`}
                  style={{
                    transform:
                      suspensionMode === "track"
                        ? "translateY(8px)"
                        : suspensionMode === "street"
                        ? "translateY(-8px)"
                        : "translateY(0px)",
                  }}
                >
                  <svg
                    viewBox="0 0 540 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
                  >
                    <defs>
                      {/* Headlight volumetric laser beam gradient */}
                      <linearGradient id="headlightBeam" x1="480" y1="125" x2="540" y2="125">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                        <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                      </linearGradient>

                      {/* Hypercar body gradient */}
                      <linearGradient id="hypercarBody" x1="60" y1="50" x2="480" y2="160">
                        <stop offset="0%" stopColor={carPaints[carPaint].hex} />
                        <stop offset="45%" stopColor={carPaints[carPaint].secondary} />
                        <stop offset="100%" stopColor="#0a0f1d" />
                      </linearGradient>

                      {/* Carbon fiber accent pattern */}
                      <linearGradient id="carbonGloss" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#090d16" />
                      </linearGradient>
                    </defs>

                    {/* Photon Headlight Volumetric Beam */}
                    {headlightsOn && (
                      <polygon
                        points="480,125 540,85 540,165"
                        fill="url(#headlightBeam)"
                        opacity="0.65"
                      />
                    )}

                    {/* Neon Underglow Ground Effect */}
                    {underglowOn && (
                      <ellipse
                        cx="270"
                        cy="172"
                        rx="210"
                        ry="10"
                        fill={carPaints[carPaint].hex}
                        opacity={isNitrousActive ? 0.9 : 0.55}
                        filter="blur(8px)"
                      />
                    )}

                    {/* Nitrous Exhaust Flame Burst */}
                    {isNitrousActive && (
                      <g className="animate-pulse">
                        <polygon
                          points="40,150 5,146 5,154"
                          fill="#ec4899"
                          opacity="0.9"
                          filter="blur(2px)"
                        />
                        <polygon
                          points="40,150 -15,142 -15,158"
                          fill="#38bdf8"
                          opacity="0.8"
                          filter="blur(3px)"
                        />
                      </g>
                    )}

                    {/* REAR ACTIVE AERO SPOILER / DRS WING */}
                    <g
                      className="transition-transform duration-300"
                      style={{
                        transform: drsOpen ? "rotate(-14deg)" : "rotate(0deg)",
                        transformOrigin: "85px 85px",
                      }}
                    >
                      {/* Carbon Wing Blade */}
                      <path
                        d="M 60 76 L 115 84 L 110 88 L 55 80 Z"
                        fill="#020617"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                      />
                      {/* Wing Struts */}
                      <line x1="75" y1="80" x2="78" y2="108" stroke="#334155" strokeWidth="3" />
                      <line x1="100" y1="84" x2="102" y2="110" stroke="#334155" strokeWidth="3" />
                    </g>

                    {/* MAIN HYPERCAR CHASSIS BODYWORK */}
                    <path
                      d="M 40 150 C 60 150, 80 150, 95 150 C 105 118, 145 118, 155 150 C 230 150, 290 150, 355 150 C 365 118, 405 118, 415 150 C 445 150, 480 148, 495 132 C 485 102, 430 80, 360 75 C 295 70, 240 70, 180 80 C 135 90, 95 102, 60 125 C 45 135, 35 145, 40 150 Z"
                      fill="url(#hypercarBody)"
                      stroke={carPaints[carPaint].secondary}
                      strokeWidth="2.5"
                    />

                    {/* Carbon Fiber Front Aero Splitter */}
                    <path
                      d="M 470 145 L 510 145 L 505 152 L 465 152 Z"
                      fill="url(#carbonGloss)"
                      stroke="#06b6d4"
                      strokeWidth="1"
                    />

                    {/* Teardrop Cockpit Canopy & Reflective Tint */}
                    <path
                      d="M 175 90 C 205 74, 270 72, 325 76 C 360 80, 370 96, 375 102 L 165 102 Z"
                      fill="#020617"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                    {/* Cockpit Inner Driver Silhouette & Dash Glow */}
                    <ellipse cx="260" cy="94" rx="14" ry="7" fill="#38bdf8" opacity="0.3" filter="blur(3px)" />

                    {/* Front Wheel Assembly */}
                    <g>
                      <circle cx="385" cy="150" r="30" fill="#090d16" stroke="#334155" strokeWidth="4" />
                      {/* Brake Disc with Dynamic Heat Glow */}
                      <circle
                        cx="385"
                        cy="150"
                        r="18"
                        fill="#1e293b"
                        stroke={brakeGlow ? "#f97316" : "#64748b"}
                        strokeWidth="3"
                        className={brakeGlow ? "animate-pulse" : ""}
                      />
                      {/* Brake Caliper */}
                      <rect x="398" y="140" width="6" height="20" rx="2" fill={carPaints[carPaint].hex} />
                      {/* Alloy Rim Spokes (Spinning with velocity) */}
                      <circle
                        cx="385"
                        cy="150"
                        r="12"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                        style={{
                          animation: `spin ${(260 - carSpeed) / 160}s linear infinite`,
                          transformOrigin: "385px 150px",
                        }}
                      />
                      <circle cx="385" cy="150" r="5" fill="#f8fafc" />
                    </g>

                    {/* Rear Wheel Assembly */}
                    <g>
                      <circle cx="125" cy="150" r="30" fill="#090d16" stroke="#334155" strokeWidth="4" />
                      {/* Brake Disc */}
                      <circle
                        cx="125"
                        cy="150"
                        r="18"
                        fill="#1e293b"
                        stroke={brakeGlow ? "#f97316" : "#64748b"}
                        strokeWidth="3"
                        className={brakeGlow ? "animate-pulse" : ""}
                      />
                      {/* Brake Caliper */}
                      <rect x="138" y="140" width="6" height="20" rx="2" fill={carPaints[carPaint].hex} />
                      {/* Alloy Rim Spokes */}
                      <circle
                        cx="125"
                        cy="150"
                        r="12"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                        style={{
                          animation: `spin ${(260 - carSpeed) / 160}s linear infinite`,
                          transformOrigin: "125px 150px",
                        }}
                      />
                      <circle cx="125" cy="150" r="5" fill="#f8fafc" />
                    </g>

                    {/* Titanium Dual Exhaust Tailpipes */}
                    <rect x="36" y="144" width="8" height="5" rx="1.5" fill="#475569" stroke="#94a3b8" />
                    <rect x="36" y="151" width="8" height="5" rx="1.5" fill="#475569" stroke="#94a3b8" />
                  </svg>
                </div>
              </div>

              {/* Automotive Lab Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Wind size={13} className="text-cyan-400" />
                      <span>Aerodynamic Wind Tunnel Lab</span>
                    </span>
                    <a
                      href="https://github.com/SameerAli126/wheel_on_reels"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
                    >
                      <Github size={13} />
                      <span>View GitHub Repo</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                    Wheel on Reels — Aero Simulation
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Automotive aerodynamics wind tunnel featuring real-time fluid particle streamlines, dynamic drag coefficient telemetry, active rear wing DRS, and tactile throttle physics.
                  </p>
                </div>

                {/* Wind Tunnel Throttle Slider */}
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-foreground/90">Wind Tunnel Throttle</span>
                    <span className="text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/40">
                      {carSpeed} MPH
                    </span>
                  </div>

                  <input
                    type="range"
                    min="30"
                    max="220"
                    step="5"
                    value={carSpeed}
                    onChange={(e) => {
                      const spd = Number(e.target.value);
                      setCarSpeed(spd);
                      playEngine(spd);
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-secondary rounded-lg"
                  />

                  {/* Velocity Presets */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setCarSpeed(30);
                      }}
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      30 MPH (Cruising)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setCarSpeed(120);
                      }}
                      className="hover:text-cyan-400 transition-colors font-bold text-foreground cursor-pointer"
                    >
                      120 MPH (Track)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setCarSpeed(220);
                      }}
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      220 MPH (V-Max)
                    </button>
                  </div>
                </div>

                {/* Simulation Mode Switcher (Streamlines / Smoke Wand / Pressure) */}
                <div>
                  <label className="block text-xs font-mono font-semibold text-foreground/80 mb-2">
                    Aerodynamic Flow Visualization
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    {[
                      { id: "streamlines", label: "Streamlines" },
                      { id: "smokeWand", label: "Smoke Wand" },
                      { id: "pressure", label: "Pressure Map" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          playClick();
                          setAeroSimMode(mode.id as typeof aeroSimMode);
                        }}
                        className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          aeroSimMode === mode.id
                            ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            : "bg-secondary/50 text-muted-foreground border-border/70 hover:text-foreground hover:border-cyan-500/40"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* Smoke Wand Height Slider (When in smokeWand mode) */}
                  {aeroSimMode === "smokeWand" && (
                    <div className="mt-3 p-2.5 rounded-xl bg-secondary/40 border border-border/60 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                        <span>Smoke Injector Height</span>
                        <span className="text-cyan-400 font-bold">{Math.round(smokeWandYRatio * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="0.8"
                        step="0.02"
                        value={smokeWandYRatio}
                        onChange={(e) => setSmokeWandYRatio(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-secondary rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Paint Finishes & Smoke Dye Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-foreground/80 mb-2">
                      Aero Livery Finish: <span className="text-cyan-400 font-bold">{carPaints[carPaint].name}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {(Object.keys(carPaints) as Array<keyof typeof carPaints>).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => {
                            playBlip(750);
                            setCarPaint(col);
                          }}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                            carPaint === col
                              ? "scale-110 border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                              : "border-border/60 hover:scale-105"
                          }`}
                          style={{ backgroundColor: carPaints[col].hex }}
                          title={carPaints[col].name}
                        >
                          {carPaint === col && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-foreground/80 mb-2">
                      Smoke Dye Color
                    </label>
                    <div className="flex items-center gap-2">
                      {(Object.keys(smokeDyes) as Array<keyof typeof smokeDyes>).map((dye) => (
                        <button
                          key={dye}
                          type="button"
                          onClick={() => {
                            playBlip(850);
                            setSmokeDye(dye);
                          }}
                          className={`w-7 h-7 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                            smokeDye === dye
                              ? "scale-110 border-white ring-2 ring-white/50 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                              : "border-border/60 hover:scale-105"
                          }`}
                          style={{ backgroundColor: smokeDyes[dye].hex }}
                          title={smokeDyes[dye].name}
                        >
                          {smokeDye === dye && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aerodynamic Suspension & DRS Tuning */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {/* DRS Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      playWhoosh();
                      setDrsOpen(!drsOpen);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between cursor-pointer ${
                      drsOpen
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold"
                        : "bg-secondary/50 border-border/70 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>DRS Wing: {drsOpen ? "OPEN" : "CLOSED"}</span>
                    <Sliders size={13} />
                  </button>

                  {/* Suspension Height */}
                  <button
                    type="button"
                    onClick={() => {
                      playHaptic(300);
                      setSuspensionMode((m) => (m === "sport" ? "track" : m === "track" ? "street" : "sport"));
                    }}
                    className="p-2.5 rounded-xl border border-border/70 bg-secondary/50 text-left text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>Stance: {suspensionMode.toUpperCase()}</span>
                    <SlidersHorizontal size={13} />
                  </button>
                </div>

                {/* Action Buttons: DRLs, Nitrous, Brake */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => {
                      playPulse();
                      setHeadlightsOn(!headlightsOn);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                      headlightsOn
                        ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-300"
                        : "bg-secondary/60 border-border/70 text-muted-foreground"
                    }`}
                  >
                    <Zap size={13} />
                    <span>Photon DRLs: {headlightsOn ? "ACTIVE" : "OFF"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNitrousTrigger}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-500/50 bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(236,72,153,0.3)] active:scale-95 cursor-pointer"
                  >
                    <Flame size={13} className="text-pink-400 animate-pulse" />
                    <span>Nitrous Boost</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBrakeTrigger}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-500/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <span>Carbon Brake</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeLabSection;
