import { Routes, Route } from "react-router-dom";

import { Navbar } from "../../components/Website/Navbar";
import { Footer } from "../../components/Website/Footer";
import { IndexPage } from "./IndexPageContent";
import { Register } from "./register";
import { Login } from "./login";
import { Packages } from "./packages";
import { Package } from "./package";

export function Website() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<IndexPage />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:packageId" element={<Package />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
