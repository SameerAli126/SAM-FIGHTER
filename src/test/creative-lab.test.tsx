import { describe, expect, it, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import CreativeLabSection from "@/components/CreativeLabSection";
import {
  isSoundEnabled,
  setSoundEnabled,
  toggleSound,
  playClick,
  playBlip,
  playChime,
  playPulse,
  playWhoosh,
  playLaser,
  playEngine,
  playHaptic,
  playCameraShutter,
  playSynthNote,
  playBrakeSqueal,
} from "@/lib/audio";

beforeAll(() => {
  MotionGlobalConfig.skipAnimations = true;
});

beforeEach(() => {
  setSoundEnabled(false);
});

describe("CreativeLabSection & Audio Synthesizer", () => {
  it("renders Creative Studio & 3D Lab with Iphone3D interactive showcase by default", () => {
    render(<CreativeLabSection />);

    expect(screen.getByRole("heading", { name: /creative studio & 3d lab/i })).toBeInTheDocument();
    expect(screen.getByText(/Spatial 3D Hardware Showcase/i)).toBeInTheDocument();

    // Check display modes
    const samioModeBtn = screen.getByRole("button", { name: /samio lifeops/i });
    fireEvent.click(samioModeBtn);
    expect(screen.getByText(/SAMIO Finance/i)).toBeInTheDocument();

    const hudModeBtn = screen.getByRole("button", { name: /spatial hud/i });
    fireEvent.click(hudModeBtn);
    expect(screen.getByText(/SPATIAL 3D ACTIVE/i)).toBeInTheDocument();

    // Toggle Exploded Architecture
    const explodedBtn = screen.getByRole("button", { name: /exploded architecture/i });
    fireEvent.click(explodedBtn);
    expect(screen.getByText(/A17 PRO ARCHITECTURE/i)).toBeInTheDocument();

    // Interactive Dynamic Island test
    const dynamicIsland = screen.getByTitle(/Click Dynamic Island to interact/i);
    fireEvent.click(dynamicIsland);
    expect(screen.getByText(/Voyager \(Live\)/i)).toBeInTheDocument();

    // Interactive Haptic Buzz
    const buzzBtn = screen.getByRole("button", { name: /haptic buzz/i });
    fireEvent.click(buzzBtn);

    // Audio FX toggle in lab header
    const audioToggle = screen.getByTitle(/Toggle Generative Audio FX/i);
    fireEvent.click(audioToggle);
    expect(screen.getByText(/Audio FX: ON/i)).toBeInTheDocument();
  });

  it("switches to Wheel on Reels showcase and adjusts aerodynamics throttle and DRS", () => {
    render(<CreativeLabSection />);

    const automotiveTab = screen.getByRole("button", { name: /wheel on reels — aero dynamics/i });
    fireEvent.click(automotiveTab);

    expect(screen.getByText(/Wheel on Reels — Aero Simulation/i)).toBeInTheDocument();
    expect(screen.getByText(/VELOCITY: 120 MPH/i)).toBeInTheDocument();

    // Change paint finish
    const solarButton = screen.getByTitle(/Solar Flare/i);
    fireEvent.click(solarButton);
    expect(screen.getByText(/Solar Flare/i)).toBeInTheDocument();

    // Toggle Photon DRLs
    const drlButton = screen.getByRole("button", { name: /photon drls/i });
    fireEvent.click(drlButton);
    expect(screen.getByText(/Photon DRLs: OFF/i)).toBeInTheDocument();

    // Toggle DRS Wing
    const drsButton = screen.getByRole("button", { name: /drs wing/i });
    fireEvent.click(drsButton);
    expect(screen.getByText(/DRS Wing: OPEN/i)).toBeInTheDocument();

    // Nitrous Boost button
    const nitrousBtn = screen.getByRole("button", { name: /nitrous boost/i });
    fireEvent.click(nitrousBtn);
    expect(screen.getByText(/VELOCITY: 220 MPH/i)).toBeInTheDocument();

    // Change Aero Simulation mode to Smoke Wand
    const smokeWandBtn = screen.getByRole("button", { name: /smoke wand/i });
    fireEvent.click(smokeWandBtn);
    expect(screen.getByText(/Smoke Injector Height/i)).toBeInTheDocument();

    // Change smoke dye
    const pinkDye = screen.getByTitle(/Plasma Pink/i);
    fireEvent.click(pinkDye);
  });

  it("interacts with Pro Camera, Beat Machine, and Dynamic Island widgets in Iphone3D", () => {
    render(<CreativeLabSection />);

    // Switch to Pro Camera mode
    const cameraModeBtn = screen.getByRole("button", { name: /pro camera/i });
    fireEvent.click(cameraModeBtn);
    expect(screen.getByText(/4K • 60 FPS • RAW/i)).toBeInTheDocument();

    // Zoom and Capture Photo
    const zoom3x = screen.getByRole("button", { name: "3x" });
    fireEvent.click(zoom3x);
    const captureBtn = screen.getByTitle(/Capture Photo/i);
    fireEvent.click(captureBtn);
    expect(screen.getByText(/4 Photos/i)).toBeInTheDocument();

    // Switch to Beat Machine mode
    const synthModeBtn = screen.getByRole("button", { name: /beat machine/i });
    fireEvent.click(synthModeBtn);
    expect(screen.getByText(/SAM BEAT MACHINE/i)).toBeInTheDocument();

    // Tap synth pad
    const kickPad = screen.getByRole("button", { name: /kick 01/i });
    fireEvent.click(kickPad);

    // Dynamic Island multi-step cycle:
    // 1. Initial -> Compact
    const dynamicIsland = screen.getByTitle(/Click Dynamic Island to interact/i);
    // 2. Click -> Music
    fireEvent.click(dynamicIsland);
    expect(screen.getByText(/Voyager \(Live\)/i)).toBeInTheDocument();
    // 3. Click -> FaceID
    fireEvent.click(dynamicIsland);
    expect(screen.getByText(/FaceID Verified/i)).toBeInTheDocument();
    // 4. Click -> Call
    fireEvent.click(dynamicIsland);
    expect(screen.getByText(/Tim Cook/i)).toBeInTheDocument();
    // 5. Click -> MagSafe Charging
    fireEvent.click(dynamicIsland);
    expect(screen.getByText(/MagSafe 15W Fast Charge/i)).toBeInTheDocument();
  });

  it("safely handles audio synthesizer without exceptions in headless environment", () => {
    expect(isSoundEnabled()).toBe(false);
    toggleSound();
    expect(isSoundEnabled()).toBe(true);

    // Call synthesizer methods with sound enabled
    expect(() => {
      playClick();
      playBlip(800);
      playChime();
      playPulse();
      playWhoosh();
      playLaser();
      playEngine(180);
      playHaptic(440);
      playCameraShutter();
      playSynthNote(2);
      playBrakeSqueal();
    }).not.toThrow();

    // Turn sound off
    setSoundEnabled(false);
    expect(isSoundEnabled()).toBe(false);
  });
});

