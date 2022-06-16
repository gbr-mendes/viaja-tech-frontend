import './SideMenu.css'
import { NavLink } from 'react-router-dom'
import React from 'react'

export function Button({ link, text, icon }) {
    return (
        <NavLink to={link} className={({ isActive }) =>
            "nav-link" + (isActive ? " active" : "")
        }>
            <li
                className={`list-item d-flex justify-content-center justify-content-lg-start align-items-center `}>
                <i className={icon}></i><span className="d-none d-lg-inline">{text}</span>
            </li>
        </NavLink>
    )
}