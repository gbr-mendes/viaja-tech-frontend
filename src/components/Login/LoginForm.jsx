import './Login.css'
import logo from './img/logo.png'
import { LoginBtn } from './LoginBtn';
import { useState } from 'react';
export function LoginForm() {
    const [inputEmailHasValue, setInputEmailHasValue] = useState(false)
    const [inputPasswordHasValue, setInputPasswordHasValue] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form">
                        <div className="logo d-flex justify-content-center flex-column align-items-center">
                            <img src={logo} alt="" />
                            <span className="text">Login CRM</span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input
                                className={inputEmailHasValue ? "input100 has-val" : "input100"}
                                type="text"
                                name="email"
                                onChange={(e) => {
                                    e.target.value.length > 0 ? setInputEmailHasValue(true) : setInputEmailHasValue(false)
                                }} />
                            <span className="focus-input100" data-placeholder="E-mail"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <input
                                className={inputPasswordHasValue ? "input100 has-val" : "input100"}
                                type={passwordVisible ? "text" : "password"}
                                name="pass"
                                onChange={(e) => {
                                    e.target.value.length > 0 ? setInputPasswordHasValue(true) : setInputPasswordHasValue(false)
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
}