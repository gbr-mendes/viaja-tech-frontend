import "./SideMenu.css";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/auth";

export function Button({ link, text, icon, allowedRoles = [] }) {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const { userInfo } = user;
    const { role } = userInfo;
    if (allowedRoles.includes(role)) {
      setShow(true);
    }
  }, [location, user, allowedRoles]);
  return (
    show && (
      <NavLink
        to={link}
        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
      >
        <li
          className={`list-item d-flex justify-content-center justify-content-lg-start align-items-center`}
        >
          <i className={icon}></i>
          <span className="d-none d-lg-inline">{text}</span>
        </li>
      </NavLink>
    )
  );
}
