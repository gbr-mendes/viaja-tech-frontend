import { Routes, Route } from "react-router-dom";

import { Navbar } from "../../components/Website/Navbar";
import { Footer } from "../../components/Website/Footer";
import { IndexPage } from "./IndexPageContent";
import { Register } from "./register";
import { Login } from "./login";
import { Package } from "./packages/Packages";

export function Website() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<IndexPage />} />
          <Route path="/packageS" element={<Package />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
