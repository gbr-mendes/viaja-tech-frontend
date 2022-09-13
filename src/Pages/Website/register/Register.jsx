import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export function Register() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputCPF, setInputCPF] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = window.localStorage.getItem("auth-token");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_DOAMIN}/users/register`, {
      method: "POST",
      body: JSON.stringify({
        name: inputName,
        email: inputEmail,
        phone: inputPhone,
        cpf: inputCPF,
        password: inputPassword,
        confirmPassword: inputConfirmPassword,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .then(({ error }) => {
        if (error) {
          setAlert(true);
          setAlertMessage(error);
          return;
        } else {
          navigate("/login");
          return;
        }
      });
  };
  if (!isLoggedIn) {
    return (
      <section
        id="login-form"
        className="d-flex justify-content-center align-items-center flex-column bg-white vh-100"
      >
        <h2>Registre-se</h2>
        <form
          className="col-9 col-md-6 col-lg-4 d-flex flex-column"
          onSubmit={handleRegister}
        >
          {alert && (
            <Alert key={alertClass} variant={alertClass}>
              {alertMessage}
            </Alert>
          )}
          <div className="mb-3">
            <label for="input-name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              id="input-name"
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="input-email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="input-email"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 d-flex flex-column flex-md-row justify-content-md-between">
            <div className="m-0 me-md-3">
              <label for="input-cpf" className="form-label">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="input-cpf"
                aria-describedby="cpfHelp"
                onChange={(e) => {
                  setInputCPF(e.target.value);
                }}
              />
            </div>

            <div className="m-0 ms-md-3">
              <label for="input-phone" className="form-label">
                Telefone
              </label>
              <input
                type="text"
                className="form-control"
                id="input-phone"
                aria-describedby="phoneHelp"
                onChange={(e) => {
                  setInputPhone(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="mb-3 d-flex flex-column flex-md-row justify-content-md-between">
            <div className="m-0 me-md-3">
              <label for="input-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="input-password"
                aria-describedby="passwordHelp"
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
              />
            </div>

            <div className="m-0 ms-md-3">
              <label for="input-confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="input-confirm-password"
                aria-describedby="confirmPasswordHelp"
                onChange={(e) => {
                  setInputConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Registre-se
          </button>
        </form>
      </section>
    );
  } else {
    navigate("/");
  }
}
