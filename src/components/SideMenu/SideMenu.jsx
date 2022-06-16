import unknown from './img/blank-profile.png'
import './SideMenu.css'
import { Button } from './Button'

export function SideMenu() {

    return (
        <aside className="side-bar col-2 p-0">
            <header className="side-bar-header d-none d-lg-flex flex-column align-items-center justify-content-center p-4">
                <img className="profile-image" src={unknown} alt="Profile of the user" />
                <div className="welcome-message text-center">
                    <h3>Bem Vindo Usuário</h3>
                </div>
            </header>
            <div className="side-menu d-flex flex-column d-lg-block justify-content-center align-items-center">
                <nav className="menu-items">
                    <ul className="items-list">
                        <Button link="/clients" text="Clientes" icon="fa-solid fa-money-bills" isActive={true} />
                        <Button link="/leads" text="Leads" icon="fa-regular fa-eye" />
                        <Button link="/marketing" text="Marketing" icon="fa-solid fa-headphones-simple" />
                        <Button link="/reports" text="Relatórios" icon="fa-solid fa-print" />
                        <Button link="/calls" text="Chamados" icon="fa-solid fa-phone" />
                        <Button link="/emails" text="Emails" icon="fa-regular fa-envelope" />
                        <Button link="/tools" text="Ferramentas" icon="fa-solid fa-screwdriver-wrench" />
                    </ul>
                </nav>
            </div>
        </aside>
    )
}