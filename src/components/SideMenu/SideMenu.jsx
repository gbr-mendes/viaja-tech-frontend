import unknown from "./img/blank-profile.png";
import "./SideMenu.css";
import { Button } from "./Button";
import { useEffect, useState } from "react";

export function SideMenu() {
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("Usuário");
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userData"));

    if (userData) {
      const { userInfo } = userData;
      if (userInfo.avatar) {
        setAvatar(userInfo.avatar);
      }
      setUserName(userInfo.name);
    }
  }, []);
  return (
    <aside className="side-bar flex-row flex-lg-column col-2 p-0">
      <header className="side-bar-header d-none d-lg-flex flex-column align-items-center justify-content-center p-4">
        <img
          className="profile-image"
          src={avatar ? avatar : unknown}
          alt="Profile of the user"
        />
        <div className="welcome-message text-center">
          <h3>Bem Vindo(a) {userName}</h3>
        </div>
      </header>
      <div className="side-menu d-flex flex-column d-lg-block justify-content-center align-items-center">
        <nav className="menu-items">
          <ul className="items-list">
            <Button
              link="/dashboard/clients"
              text="Clientes"
              icon="fa-solid fa-money-bills"
              allowedRoles={["isAdmin", "isSalesManager"]}
            />
            <Button
              link="/dashboard/leads"
              text="Leads"
              icon="fa-regular fa-eye"
              allowedRoles={["isAdmin", "isSalesManager"]}
            />
            <Button
              link="/dashboard/employee"
              text="Funcionários"
              icon="fa-solid fa-person-chalkboard"
              allowedRoles={["isAdmin"]}
            />
            <Button
              link="/dashboard/packages"
              text="Pacotes"
              icon="fa-solid fa-route"
              isActive={true}
              allowedRoles={["isAdmin", "isSiteAdmin"]}
            />
            <Button
              link="/dashboard/marketing"
              text="Marketing"
              icon="fa-solid fa-headphones-simple"
              allowedRoles={["isAdmin", "isSalesManager"]}
            />
            <Button
              link="/dashboard/reports"
              text="Relatórios"
              icon="fa-solid fa-print"
              allowedRoles={["isAdmin"]}
            />
            <Button
              link="/dashboard/calls"
              text="Chamados"
              icon="fa-solid fa-phone"
              allowedRoles={["isAdmin"]}
            />
            <Button
              link="/dashboard/tools"
              text="Ferramentas"
              icon="fa-solid fa-screwdriver-wrench"
              allowedRoles={["isAdmin", "isSalesManager", "isSiteAdmin"]}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
}
