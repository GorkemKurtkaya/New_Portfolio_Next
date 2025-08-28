import HomeSection from "../components/home";
import ServicesSection from "../components/services";
import ProjectsSection from "../components/projects";
import FooterSection from "../components/footer";
import ContactSection from "../components/contact";

export default function Home() {
  return (
    <main className="font-sans">
      <HomeSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
