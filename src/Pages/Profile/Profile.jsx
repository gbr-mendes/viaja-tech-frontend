import { useState } from "react";

import { Alert } from "react-bootstrap";
import { Image } from "react-bootstrap";

import { Form } from "./Form";

import unknown from "../../components/SideMenu/img/blank-profile.png";

import "./Profile.css";

export function Profile() {
  const [alertClass, setAlertClass] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const localUserData = localStorage.getItem("userData");
  const [userData] = useState(JSON.parse(localUserData));

  const { avatar: avatarPath, name, email, cpf, phone } = userData.userInfo;
  const [avatar, setAvatar] = useState(avatarPath);

  function updateAvatar(e) {
    const authToken = localStorage.getItem("auth-token");
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    fetch(`${process.env.REACT_APP_API_DOMAIN}/users/avatar`, {
      method: "PUT",
      body: formData,
      headers: {
        "auth-token": authToken,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error("Ocorreu um erro ao atualizar a imagem");
        }
        return resp.json();
      })
      .then((data) => {
        setAvatar(data.image);
        setAlertShow(true);
        setAlertMessage(data.success);
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertClass("danger");
        setAlertMessage("Ocorreu um erro ao atualizar a imagem");
      });
  }
  return (
    <div className="d-flex align-items-center flex-column">
      <div className="d-flex justify-content-center">
        <h1>Meu Perfil</h1>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center profile-container">
        <div className="avatar d-flex flex-column justify-content-center align-items-center p-0 p-md-2">
          <div className="d-flex flex-row flex-md-column justify-content-center align-items-center mb-4 mb-md-0">
            <Image
              src={avatar ? avatar : unknown}
              roundedCircle
              className="me-5 me-md-0"
            />
            <label
              for="input-file"
              className="choose-file text-white d-flex justify-content-center align-items-center h-25"
            >
              Atualizar
              <input id="input-file" type="file" onChange={updateAvatar} />
            </label>
          </div>
          {alertShow && (
            <Alert key={alertClass} variant={alertClass}>
              {alertMessage}
            </Alert>
          )}
        </div>
        <div className="general-info">
          <Form name={name} email={email} cpf={cpf} phone={phone} />
        </div>
      </div>
    </div>
  );
}
