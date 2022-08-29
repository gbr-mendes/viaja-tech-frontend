import "./IndexPage.css";
import { Masthead } from "../../../components/Website/Masthead/Masthead";
import { Navbar } from "../../../components/Website/Navbar";
import { ServicesSection } from "../../../components/Website/ServicesSection/ServicesSection";

export function IndexPage() {
  return (
    <>
      <Navbar />
      <Masthead />
      <ServicesSection />
    </>
  );
}
