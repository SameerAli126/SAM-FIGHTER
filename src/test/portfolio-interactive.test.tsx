import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MotionGlobalConfig } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import MilestonesSection from "@/components/MilestonesSection";
import TerminalModal from "@/components/TerminalModal";
import ExperienceSection from "@/components/ExperienceSection";
import OptiTradePage from "@/pages/projects/OptiTrade";
import WordWandererPage from "@/pages/projects/WordWanderer";

beforeAll(() => {
  MotionGlobalConfig.skipAnimations = true;
});

describe("Interactive Portfolio Components", () => {
  it("renders HeroSection with interactive HUD tabs", () => {
    render(<HeroSection />);

    // Default Identity tab shows profile
    expect(screen.getByText(/Architecting/i)).toBeInTheDocument();
    expect(screen.getByText(/Modern Web Systems/i)).toBeInTheDocument();

    // Click 'System Flow' HUD tab
    const architectureBtn = screen.getByRole("button", { name: /system flow/i });
    fireEvent.click(architectureBtn);
    expect(screen.getByText(/Client Edge/i)).toBeInTheDocument();
    expect(screen.getByText(/Microservices/i)).toBeInTheDocument();

    // Click 'Telemetry' HUD tab
    const telemetryBtn = screen.getByRole("button", { name: /telemetry/i });
    fireEvent.click(telemetryBtn);
    expect(screen.getByText(/API Uptime/i)).toBeInTheDocument();
    expect(screen.getByText(/99.98%/i)).toBeInTheDocument();

    // Click 'Invictus' HUD tab
    const invictusBtn = screen.getByRole("button", { name: /^invictus$/i });
    fireEvent.click(invictusBtn);
    expect(screen.getByText(/Invictus Platform/i)).toBeInTheDocument();

    // Verify tabs container has no-scrollbar and scrollbar-none to prevent native Windows scrollbars
    const tabsContainer = invictusBtn.closest(".overflow-x-auto");
    expect(tabsContainer).toHaveClass("no-scrollbar");
    expect(tabsContainer).toHaveClass("scrollbar-none");
  });

  it("renders skills section and filters technologies by discipline", () => {
    render(<SkillsSection />);

    // Check heading
    expect(
      screen.getByRole("heading", { name: /technical expertise/i }),
    ).toBeInTheDocument();

    // Check category tabs
    const backendTab = screen.getByRole("button", { name: /backend/i });
    expect(backendTab).toBeInTheDocument();

    // Switch to Backend tab
    fireEvent.click(backendTab);
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
    expect(screen.getByText("Laravel")).toBeInTheDocument();

    // Test code snippet tab switching
    const fastApiCodeBtn = screen.getByRole("button", { name: /fastapi python/i });
    fireEvent.click(fastApiCodeBtn);
    expect(screen.getByText(/from fastapi import FastAPI/i)).toBeInTheDocument();
  });

  it("renders projects section, filters by category, and toggles architecture drawer", () => {
    render(
      <MemoryRouter>
        <ProjectsSection />
      </MemoryRouter>,
    );

    // Verify main heading
    expect(
      screen.getByRole("heading", { name: /featured projects/i }),
    ).toBeInTheDocument();

    // Verify all 6 projects appear in default All view
    expect(screen.getByText("WordWanderer")).toBeInTheDocument();
    expect(screen.getByText("OptiTrade 3.0")).toBeInTheDocument();
    expect(screen.getByText("InvoiceGen Pro")).toBeInTheDocument();
    expect(screen.getByText("PhotoStream / SnapCloud")).toBeInTheDocument();
    expect(screen.getByText("SAMIO")).toBeInTheDocument();
    expect(screen.getByText("Peshawar Civic GIS Atlas")).toBeInTheDocument();

    // Toggle architecture highlights on a project
    const highlightButtons = screen.getAllByRole("button", {
      name: /view architecture highlights/i,
    });
    expect(highlightButtons.length).toBeGreaterThan(0);
    fireEvent.click(highlightButtons[0]);
    expect(
      screen.getByRole("button", { name: /hide architecture highlights/i }),
    ).toBeInTheDocument();
  });

  it("renders about section with 4 engineering pillars and location telemetry", () => {
    render(<AboutSection />);

    expect(screen.getByText(/full-cycle engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/modern web performance/i)).toBeInTheDocument();
    expect(screen.getByText(/data integrity & scale/i)).toBeInTheDocument();
    expect(screen.getByText(/ai business automation/i)).toBeInTheDocument();
    expect(screen.getByText(/peshawar, pakistan/i)).toBeInTheDocument();
  });

  it("renders milestones section with verified deployments", () => {
    render(<MilestonesSection />);

    expect(
      screen.getByRole("heading", { name: /production milestones/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Verified Product Deployments/i)).toBeInTheDocument();
    expect(screen.getByText(/100% Deployed/i)).toBeInTheDocument();
  });

  it("handles CLI commands in TerminalModal", () => {
    const handleClose = () => {};
    render(<TerminalModal isOpen={true} onClose={handleClose} />);

    // Click the 'projects' chip button
    const projectsChip = screen.getByRole("button", { name: "projects" });
    fireEvent.click(projectsChip);
    expect(screen.getByText(/Production Projects/i)).toBeInTheDocument();

    // Click the 'stats' chip button
    const statsChip = screen.getByRole("button", { name: "stats" });
    fireEvent.click(statsChip);
    expect(screen.getByText(/12\+ Production/i)).toBeInTheDocument();

    // Click 'clear'
    const clearChip = screen.getByRole("button", { name: "clear" });
    fireEvent.click(clearChip);
    expect(screen.queryByText(/Production Projects/i)).not.toBeInTheDocument();
  });

  it("renders modernized subproject pages properly", () => {
    render(
      <MemoryRouter>
        <OptiTradePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Fintech and Trading UX/i)).toBeInTheDocument();
    expect(screen.getAllByText(/OptiTrade/i).length).toBeGreaterThan(0);

    render(
      <MemoryRouter>
        <WordWandererPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Gamified Product Architecture/i)).toBeInTheDocument();
    expect(screen.getAllByText(/WordWanderer/i).length).toBeGreaterThan(0);
  });

  it("provides cross-browser modern scroll styling and eliminates generic retro scrollbars", () => {
    // Check ExperienceSection simulator tabs
    const { unmount: unmountExp } = render(<ExperienceSection />);
    const sseBtn = screen.getByRole("button", { name: /sse stream flow/i });
    const expTabsContainer = sseBtn.closest(".overflow-x-auto");
    expect(expTabsContainer).toHaveClass("no-scrollbar");
    expect(expTabsContainer).toHaveClass("scrollbar-none");
    unmountExp();

    // Check SkillsSection snippet tabs
    const { unmount: unmountSkills } = render(<SkillsSection />);
    const reactSnippetBtn = screen.getByRole("button", { name: /react 19 \/ ts/i });
    const skillsTabsContainer = reactSnippetBtn.closest(".overflow-x-auto");
    expect(skillsTabsContainer).toHaveClass("no-scrollbar");
    expect(skillsTabsContainer).toHaveClass("scrollbar-none");
    unmountSkills();

    // Check TerminalModal quick tap chips and output buffer
    const { unmount: unmountTerminal } = render(<TerminalModal isOpen={true} onClose={() => {}} />);
    const helpChip = screen.getByRole("button", { name: "help" });
    const chipContainer = helpChip.closest(".overflow-x-auto");
    expect(chipContainer).toHaveClass("no-scrollbar");
    expect(chipContainer).toHaveClass("scrollbar-none");
    const outputBuffer = screen.getByText(/SAM\.OS Interactive Console/i).closest(".overflow-y-auto");
    expect(outputBuffer).toHaveClass("custom-scrollbar");
    unmountTerminal();
  });
});
