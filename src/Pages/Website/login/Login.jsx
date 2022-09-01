import { useContext } from "react";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/auth";

export function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = window.localStorage.getItem("auth-token");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://viaja-tech-backend.herokuapp.com/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .then(({ token, error }) => {
        if (error) {
          setAlert(true);
          setAlertMessage(error);
        } else {
          window.localStorage.setItem("auth-token", token);
          setUser({ name: "Gabriel" });
          setIsLoggedIn(true);
        }
      });
  };
  if (!isLoggedIn) {
    return (
      <section
        id="login-form"
        className="d-flex justify-content-center align-items-center flex-column bg-white vh-100"
      >
        <h2>Bem-vindo(a)</h2>
        <form
          className="col-9 col-md-6 col-lg-3 d-flex flex-column"
          onSubmit={handleLogin}
        >
          {alert && (
            <Alert key={alertClass} variant={alertClass}>
              {alertMessage}
            </Alert>
          )}
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
    );
  } else {
    navigate("/");
  }
}
