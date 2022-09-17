import { Footer } from "../components/Footer";
import { Main } from "../components/Main/Main";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../providers/auth";
import { useEffect, useContext, useState } from "react";
import { fetchGet } from "../utils/FetchGet";

export function Dashboard() {
  const [data, setData] = useState(null);
  const { setUser } = useContext(AuthContext);

  const authToken = localStorage.getItem("auth-token");

  useEffect(() => {
    async function fetchData() {
      const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/users/me`;
      if (authToken) {
        const data = await fetchGet(baseUrl, authToken);
        localStorage.setItem("userData", JSON.stringify(data));
        setData(data);
        setUser(data);
      }
    }
    fetchData();
  }, [authToken, setUser]);

  return (
    <PrivateRoute
      redirectTo={"/login/dashboard"}
      excludedRoles={["isClient", "isLead"]}
      userData={data}
    >
      {data && (
        <section
          className="container-fluid vh-100 vw-100 d-flex row p-0"
          id="main-container"
        >
          <SideMenu />

          <div className="col-10 d-flex flex-column p-0">
            <Main />
            <Footer />
          </div>
        </section>
      )}
    </PrivateRoute>
  );
}
