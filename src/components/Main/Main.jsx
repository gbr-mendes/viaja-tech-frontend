import { MainHeader } from "../MainHeader";
import { Routes, Route } from "react-router-dom";

// Pages import
import { Clients } from "../../Pages/Clients";
import { Leads } from "../../Pages/Leads";
import { Profile } from "../../Pages/Profile";

import "./Main.css";
import { Marketing } from "../../Pages/Marketing";
import { Packages } from "../../Pages/Packages";

export function Main() {
  return (
    <main className="main-content p-0">
      <MainHeader />
      <section className="content-section container-fluid">
        <div className="dyanamic-content d-flex flex-column">
          <Routes>
            <Route path="" element={<Clients />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </section>
    </main>
  );
}
