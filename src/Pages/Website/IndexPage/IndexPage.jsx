import "./IndexPage.css";
import { Masthead } from "../../../components/Website/Masthead/Masthead";
import { Navbar } from "../../../components/Website/Navbar";
import { ServicesSection } from "../../../components/Website/ServicesSection/ServicesSection";
import { ContactSection } from "../../../components/Website/ContactSection/ContactSection";
import { Footer } from "../../../components/Website/Footer/Footer";

export function IndexPage() {
  return (
    <>
      <Navbar />
      <Masthead />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </>
  );
}
