import "./IndexPage.css";
import { Masthead } from "../../../components/Website/Masthead/Masthead";
import { ServicesSection } from "../../../components/Website/ServicesSection/ServicesSection";
import { ContactSection } from "../../../components/Website/ContactSection/ContactSection";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import { useFetch } from "../../../hooks/useFetch";
import { useState } from "react";

export function IndexPage() {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const authToken = window.localStorage.getItem("auth-token");
  const { data } = useFetch(
    "https://viaja-tech-backend.herokuapp.com/api/v1/users/me",
    authToken
  );
  useEffect(() => {
    if (data != null) {
      setUser(data);
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data, setUser]);
  return (
    <>
      <Masthead />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
