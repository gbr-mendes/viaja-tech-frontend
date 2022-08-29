import "./IndexPage.css";
import { Masthead } from "../../../components/Website/Masthead/Masthead";
import { ServicesSection } from "../../../components/Website/ServicesSection/ServicesSection";
import { ContactSection } from "../../../components/Website/ContactSection/ContactSection";

export function IndexPage() {
  return (
    <>
      <Masthead />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
