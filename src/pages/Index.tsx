import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CreativeLabSection from "@/components/CreativeLabSection";
import SkillsSection from "@/components/SkillsSection";
import MilestonesSection from "@/components/MilestonesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ModernBackground from "@/components/ModernBackground";
import SeoMeta from "@/components/SeoMeta";
import CvModal from "@/components/CvModal";

const Index = () => {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SeoMeta />
      <Navbar onOpenCv={() => setCvModalOpen(true)} />
      <ModernBackground>
        <HeroSection onOpenCv={() => setCvModalOpen(true)} />
        <ExperienceSection />
        <ProjectsSection />
        <CreativeLabSection />
        <SkillsSection />
        <MilestonesSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </ModernBackground>
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
};


export default Index;
