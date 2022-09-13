import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { fetchPost } from "../../../utils/FetchPost";
import { fetchDelete } from "../../../utils/FetchDelete";

export function AddUpdateEmployeeModal(props) {
  const accessToken = localStorage.getItem("auth-token");
  const [alert, setAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("Sales Manager");
  const [salary, setSalary] = useState(0);
  const formData = props.data || {};
  const allowDelete = props.allowDelete;
  const baseUrl = `${process.env.REACT_APP_API_DOAMIN}/employee`;
  const deleteEmployee = async (e) => {
    console.log(formData);
    await fetchDelete(`${baseUrl}/${formData._id}`, accessToken);
    props.onHide();
  };

  const addEmployee = async (e) => {
    const resp = await fetchPost(
      baseUrl,
      {
        userInfo: {
          name,
          email,
          phone,
          cpf,
          password: "password",
          confirmPassword: "password",
        },
        employeeInfo: {
          position: role,
          salary,
        },
      },
      accessToken
    );
    setAlert(true);
    if (resp.error) {
      setAlertClass("danger");
      setAlertMessage(resp.error);
    } else {
      setAlertClass("success");
      setAlertMessage("Funcionário cadastrado com sucesso");
      setName("");
      setEmail("");
      setPhone("");
      setCpf("");
      setSalary(0);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert && (
          <Alert key={alertClass} variant={alertClass}>
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do funcionário"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={formData.name || name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email do funcionário"
              onChange={(e) => setEmail(e.target.value)}
              value={formData.email || email}
            />
          </Form.Group>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <Form.Group className="mb-3 col-12 col-md-5 me-md-2">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefone do funcionário"
                onChange={(e) => setPhone(e.target.value)}
                value={formData.phone || phone}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-12 col-md-5 ms-md-2">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="CPF do funcionário"
                onChange={(e) => setCpf(e.target.value)}
                value={formData.cpf || cpf}
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <Form.Group className="mb-3 col-12 col-md-5 me-md-2">
              <Form.Select
                onChange={(e) => setRole(e.target.value)}
                defaultValue={role}
              >
                <option value="Sales Manager" defaultChecked>
                  Gerente de vendas
                </option>
                <option value="General Manager">Administrador Geral</option>
                <option value="Content Manager">Gerente de conteúdo</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-5 ms-md-2 d-md-flex justify-content-md-between">
              <Form.Label className=" pe-2 pt-2">Salário</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setSalary(e.target.value)}
                value={formData.salary || salary}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {allowDelete && (
          <Button className="btn-danger" onClick={deleteEmployee}>
            Excluir
          </Button>
        )}
        <Button onClick={addEmployee}>{props.title}</Button>
      </Modal.Footer>
    </Modal>
  );
}
