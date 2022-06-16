import './Footer.css'
import logo from './img/logo-crm-grande.png'

export function Footer() {
    return (
        <footer className="dashboard-footer">
            <div className="footer-logo">
                <img src={logo} alt="Logo Viaja Tech" />
            </div>
            <div className="copyright-section">
                <span>PoweredBy Gabriel&Nixon</span>
            </div>
        </footer>
    )
}