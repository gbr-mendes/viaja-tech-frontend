import { MainHeader } from "../MainHeader";
import { Routes, Route } from "react-router-dom";

// Pages import
import { Clients } from "../../Pages/Clients";
import { Leads } from "../../Pages/Leads";
import { Profile } from "../../Pages/Profile";

import "./Main.css";
import { Marketing } from "../../Pages/Marketing";
import { Packages } from "../../Pages/Packages";
import { Employee } from "../../Pages/Employee";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth";

export function Main() {
  const { user } = useContext(AuthContext);
  const { role: userRole } = user.userInfo;
  const defaultComponentsByRole = {
    isAdmin: <Clients />,
    isSalesManager: <Clients />,
    isSiteAdmin: <Packages />,
  };
  return (
    <main className="main-content p-0">
      <MainHeader />
      <section className="content-section container-fluid">
        <div className="dyanamic-content d-flex flex-column">
          <Routes>
            <Route path="" element={defaultComponentsByRole[userRole]} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </section>
    </main>
  );
}
