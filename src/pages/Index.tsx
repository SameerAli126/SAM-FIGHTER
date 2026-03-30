import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EsportsSection from "@/components/EsportsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FighterBackground from "@/components/FighterBackground";
import SeoMeta from "@/components/SeoMeta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SeoMeta />
      <Navbar />
      <FighterBackground>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EsportsSection />
        <ContactSection />
        <Footer />
      </FighterBackground>
    </div>
  );
};

export default Index;
