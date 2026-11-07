import { describe, expect, it, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MotionGlobalConfig } from "framer-motion";
import ExperienceSection from "@/components/ExperienceSection";
import CvModal from "@/components/CvModal";
import AboutSection from "@/components/AboutSection";
import TerminalModal from "@/components/TerminalModal";
import Index from "@/pages/Index";

beforeAll(() => {
  MotionGlobalConfig.skipAnimations = true;
});

describe("Experience, CV & Academic Foundation", () => {
  it("renders ExperienceSection with Deepixel flagship role and interactive simulator", () => {
    render(<ExperienceSection />);

    // Verify heading
    expect(
      screen.getByRole("heading", { name: /professional experience & impact/i }),
    ).toBeInTheDocument();

    // Verify Deepixel role & Invictus platform
    expect(screen.getByText(/Deepixel —/i)).toBeInTheDocument();
    expect(screen.getByText(/Invictus — AI Deal Intelligence and Reporting Platform/i)).toBeInTheDocument();

    // Verify contract role
    expect(screen.getByText(/Full-Stack Software Engineer \(Contract\)/i)).toBeInTheDocument();

    // Test interactive tab switching in Deepixel simulator
    const tiptapTab = screen.getByRole("button", { name: /tiptap table engine/i });
    fireEvent.click(tiptapTab);
    expect(screen.getByText(/Tiptap Headless Document Editor/i)).toBeInTheDocument();
    expect(screen.getByText(/ARR Growth/i)).toBeInTheDocument();

    const scalingTab = screen.getByRole("button", { name: /dpi scaling/i });
    fireEvent.click(scalingTab);
    expect(screen.getByText(/Windows Scaling Adaptability \(125% \/ 150%\)/i)).toBeInTheDocument();

    const playwrightTab = screen.getByRole("button", { name: /playwright audits/i });
    fireEvent.click(playwrightTab);
    expect(screen.getByText(/21 Views Verified/i)).toBeInTheDocument();
  });

  it("renders CvModal with full curriculum vitae content and download button", () => {
    const handleClose = () => {};
    render(<CvModal isOpen={true} onClose={handleClose} />);

    // Header & identity
    expect(screen.getByRole("heading", { name: /official curriculum vitae/i })).toBeInTheDocument();
    expect(screen.getByText(/\+92 335 8181400/i)).toBeInTheDocument();
    expect(screen.getByText(/khsameer626@gmail.com/i)).toBeInTheDocument();

    // Experience entries
    expect(screen.getByText(/Deepixel —/i)).toBeInTheDocument();
    expect(screen.getByText(/SAMIO — Personal Finance Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/PhotoStream \/ SnapCloud/i)).toBeInTheDocument();

    // Education & GPA
    expect(screen.getByText(/GPA: 3.51 \/ 4.00/i)).toBeInTheDocument();
    expect(screen.getByText(/City University of Science and Information Technology/i)).toBeInTheDocument();

    // Download PDF action
    const downloadLink = screen.getByRole("link", { name: /download pdf/i });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute("href", "/muhammad-sameer-ali-cv.pdf");
  });

  it("renders Education credentials in AboutSection", () => {
    render(<AboutSection />);

    expect(screen.getByText(/Academic Foundation/i)).toBeInTheDocument();
    expect(screen.getByText(/BS in Computer Science/i)).toBeInTheDocument();
    expect(screen.getByText(/GPA: 3.51 \/ 4.00/i)).toBeInTheDocument();
  });

  it("handles experience, education, and phone commands in TerminalModal", () => {
    const handleClose = () => {};
    render(<TerminalModal isOpen={true} onClose={handleClose} />);

    // Click experience chip
    const expChip = screen.getByRole("button", { name: "experience" });
    fireEvent.click(expChip);
    expect(screen.getByText(/Professional Work Experience:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Deepixel/i).length).toBeGreaterThan(0);

    // Click education chip
    const eduChip = screen.getByRole("button", { name: "education" });
    fireEvent.click(eduChip);
    expect(screen.getByText(/Academic Education:/i)).toBeInTheDocument();
    expect(screen.getByText(/GPA: 3.51 \/ 4.00/i)).toBeInTheDocument();
  });

  it("renders Index page with all sections including Experience and opens CV modal", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /professional experience & impact/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technical expertise/i })).toBeInTheDocument();

    // Open CV modal via Hero button
    const viewCvBtn = screen.getByRole("button", { name: /view & download cv/i });
    fireEvent.click(viewCvBtn);
    expect(screen.getByRole("heading", { name: /official curriculum vitae/i })).toBeInTheDocument();
  });
});
