import { Footer } from "../components/Footer";
import { Main } from "../components/Main/Main";
import { SideMenu } from "../components/SideMenu/SideMenu";
import { PrivateRoute } from "./PrivateRoute";
import { useFetch } from "../hooks/useFetch";

export function Dashboard() {
  const authToken = localStorage.getItem("auth-token");
  const { data } = useFetch(
    `${process.env.REACT_APP_API_DOAMIN}/users/me`,
    authToken
  );
  localStorage.setItem("userData", JSON.stringify(data));
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
