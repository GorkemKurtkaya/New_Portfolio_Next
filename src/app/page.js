import HomeSection from "../components/home";
import ServicesSection from "../components/services";
import ProjectsSection from "../components/projects";
import StackSection from "../components/stack";
import FooterSection from "../components/footer";
import ContactSection from "../components/contact";

export default function Home() {
  return (
    <main className="font-sans">
      <HomeSection />
      <StackSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
