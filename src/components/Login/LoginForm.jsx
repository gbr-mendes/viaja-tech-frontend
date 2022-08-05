import './Login.css';
import logo from './img/logo.png';
import { LoginBtn } from './LoginBtn';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert'

import { useNavigate } from 'react-router-dom';


export function LoginForm() {
    const [inputEmailHasValue, setInputEmailHasValue] = useState(false)
    const [inputPasswordHasValue, setInputPasswordHasValue] = useState(false)
    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertClass] = useState('danger')
    const [alertMessage, setAlertMessage] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('https://viaja-tech-backend.herokuapp.com/api/v1/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: inputEmail,
                password: inputPassword
            }),
            headers: { "Content-type": "application/json" }
        })
            .then(resp => resp.json())
            .then(({ token, error }) => {
                if (error) {
                    setAlert(true)
                    setAlertMessage(error)
                } else {
                    window.localStorage.setItem('auth-token', token)
                    setIsLoggedIn(true)
                }

            })
    }

    useEffect(() => {
        const authToken = window.localStorage.getItem('auth-token')
        if (authToken) {
            setIsLoggedIn(true)
        }
    }, [])

    if (!isLoggedIn) {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleLogin}>
                            <div className="logo d-flex justify-content-center flex-column align-items-center">
                                <img src={logo} alt="" />
                                <span className="text">Login CRM</span>
                            </div>
                            {alert && <Alert key={alertClass} variant={alertClass}>{alertMessage}</Alert>}
                            <div className="wrap-input100 validate-input">
                                <input
                                    className={inputEmailHasValue ? "input100 has-val" : "input100"}
                                    type="text"
                                    name="email"
                                    onChange={(e) => {
                                        setInputEmail(e.target.value)
                                        inputEmail.length > 0 ? setInputEmailHasValue(true) : setInputEmailHasValue(false)
                                    }} />
                                <span className="focus-input100" data-placeholder="E-mail"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className={inputPasswordHasValue ? "input100 has-val" : "input100"}
                                    type={passwordVisible ? "text" : "password"}
                                    name="pass"
                                    onChange={(e) => {
                                        setInputPassword(e.target.value)
                                        inputPassword.length > 0 ? setInputPasswordHasValue(true) : setInputPasswordHasValue(false)
                                    }} />
                                <span className="focus-input100" data-placeholder="Senha"></span>
                                <span className="btn-show-pass">
                                    <i className="fa-solid fa-eye" onClick={() => setPasswordVisible(!passwordVisible)}></i>
                                </span>
                            </div>
                            <LoginBtn />
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        navigate('/dashboard')
    }
}