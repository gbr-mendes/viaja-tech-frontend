import React, { useEffect, useContext } from "react";
import "./styles/global.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { Website } from "./Pages/Website";
import { AuthContext } from "./providers/auth";
import { fetchGet } from "./utils/FetchGet";

function App() {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    async function fetchUserData() {
      const authToken = localStorage.getItem("auth-token");
      if (!user && authToken) {
        const userInfo = await fetchGet(
          `${process.env.REACT_APP_API_DOMAIN}/users/me`,
          authToken
        );
        setUser(userInfo);
      }
    }
    fetchUserData();
  });
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/login/dashboard/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/*" element={<Website />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
