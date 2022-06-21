import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MainHeader.css'

export function ToggleBtn() {
    const [showContent, setShowContent] = useState(false)
    const navigate = useNavigate()
    function logOut() {
        localStorage.removeItem('userData')
        localStorage.removeItem('auth-token')
        navigate('/login/dashboard')
    }
    return (
        <div className="dropdown order-1">
            <button onClick={() => setShowContent(!showContent)} className="dropbtn toggle-menu m-1 col-md-1 d-flex justify-content-center align-items-center p-2"><i className="fa-solid fa-bars fa-2xl" default></i></button>
            <div id="myDropdown" className={`dropdown-content ${showContent ? 'show' : ''}`}>
                <div>
                    <span><i className="fa-solid fa-user"></i> </span>Profile
                </div>
                <div onClick={logOut}>
                    <span><i className="fa-solid fa-arrow-right-from-bracket"></i> </span>Logout
                </div>
            </div>
        </div>
    )
}
