import Preloader from "@/components/Preloader";
import NavbarAr from "@/components/ar/NavbarAr";
import HeroAr from "@/components/ar/HeroAr";
import MarqueeBandAr from "@/components/ar/MarqueeBandAr";
import AboutSectionAr from "@/components/ar/AboutSectionAr";
import FallingTextSectionAr from "@/components/ar/FallingTextSectionAr";
import ServicesAr from "@/components/ar/ServicesAr";
import HowIWorkAr from "@/components/ar/HowIWorkAr";
import ProjectsAr from "@/components/ar/ProjectsAr";
import StatsAr from "@/components/ar/StatsAr";
import ExperienceAr from "@/components/ar/ExperienceAr";
import CertificationsAr from "@/components/ar/CertificationsAr";
import ContactAr from "@/components/ar/ContactAr";
import FooterAr from "@/components/ar/FooterAr";
import AskAhmedAr from "@/components/ar/AskAhmedAr";

export default function HomeAr() {
  return (
    <>
      <Preloader />
      <NavbarAr />
      <main>
        <HeroAr />
        <MarqueeBandAr />
        <AboutSectionAr />
        <FallingTextSectionAr />
        <ServicesAr />
        <HowIWorkAr />
        <ProjectsAr />
        <StatsAr />
        <ExperienceAr />
        <CertificationsAr />
        <ContactAr />
      </main>
      <FooterAr />
      <AskAhmedAr />
    </>
  );
}
