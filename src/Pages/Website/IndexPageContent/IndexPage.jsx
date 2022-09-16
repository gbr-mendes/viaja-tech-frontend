import "./IndexPage.css";
import { Masthead } from "../../../components/Website/Masthead/Masthead";
import { ServicesSection } from "../../../components/Website/ServicesSection/ServicesSection";
import { ContactSection } from "../../../components/Website/ContactSection/ContactSection";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import { fetchGet } from "../../../utils/FetchGet";

export function IndexPage() {
  const [data, setData] = useState(null);
  const { setUser } = useContext(AuthContext);
  const authToken = window.localStorage.getItem("auth-token");
  useEffect(() => {
    async function fetchData() {
      if (authToken) {
        const data = await fetchGet(
          `${process.env.REACT_APP_API_DOMAIN}/users/me`,
          authToken
        );
        if (data) {
          setData(data);
        }
      }
    }
    fetchData();
  }, [authToken]);
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
