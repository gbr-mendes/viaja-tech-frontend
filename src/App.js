import React from "react";

import "./styles/global.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { Website } from "./Pages/Website";
import { AuthContext } from "./providers/auth";
import { fetchGet } from "./utils/FetchGet";

function App() {
  const { user } = React.useContext(AuthContext);
  React.useEffect(() => {
    async function appendVisite() {
      if (user) {
        const { _id: userId } = user.userInfo;
        const resp = await fetchGet(
          `${process.env.REACT_APP_API_DOAMIN}/business/append-visite/${userId}`
        );
        console.log(resp);
      }
    }
    appendVisite();
  }, [user]);
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
