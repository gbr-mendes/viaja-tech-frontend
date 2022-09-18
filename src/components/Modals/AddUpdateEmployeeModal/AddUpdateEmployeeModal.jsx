import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { fetchPost } from "../../../utils/FetchPost";
import { fetchPatch } from "../../../utils/FetchPatch";
import { fetchDelete } from "../../../utils/FetchDelete";
import { v4 as uuidv4 } from "uuid";

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
  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/employee`;
  const options = ["Sales Manager", "General Manager", "Content Manager"];

  useEffect(() => {
    setAlert(false);
    if (props.data) {
      const { data } = props;
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setCpf(data.cpf);
      setRole(data.position);
      setSalary(data.salary);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setCpf("");
      setRole("Sales Manager");
      setSalary(0);
    }
  }, [props, props.show, props.data]);

  const deleteEmployee = async (e) => {
    await fetchDelete(`${baseUrl}/${formData._id}`, accessToken);
    props.onHide();
  };

  const addOrUpdateEmployee = async (e) => {
    let resp = null;
    const fetchData = {
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
    };

    if (!props.employeeId) {
      fetchData.password = "password";
      fetchData.confirmPassword = "password";
      resp = await fetchPost(baseUrl, fetchData, accessToken);
      if (!resp.error) {
        setName("");
        setEmail("");
        setPhone("");
        setCpf("");
        setSalary(0);
      }
    } else {
      resp = await fetchPatch(
        `${baseUrl}/${props.employeeId}`,
        fetchData,
        accessToken
      );
    }
    setAlert(true);
    if (resp.error) {
      setAlertClass("danger");
      setAlertMessage(resp.error);
    } else {
      setAlertClass("success");
      setAlertMessage("Operação realizada com sucesso");
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
            <Form.Label>
              <b>Nome</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do funcionário"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Email do funcionário"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <Form.Group className="mb-3 col-12 col-md-5 me-md-2">
              <Form.Label>
                <b>Telefone</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefone do funcionário"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Form.Group>

            <Form.Group className="mb-3 col-12 col-md-5 ms-md-2">
              <Form.Label>
                <b>CPF</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="CPF do funcionário"
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
              />
            </Form.Group>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <Form.Group className="mb-3 col-12 col-md-5 me-md-2">
              <Form.Select
                onChange={(e) => setRole(e.target.value)}
                defaultChecked={role}
              >
                <option value={role}>{role}</option>
                {options.map((option) => {
                  if (option !== role) {
                    return (
                      <option value={option} key={uuidv4()}>
                        {option}
                      </option>
                    );
                  }
                  return null;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 col-12 col-md-5 ms-md-2 d-md-flex justify-content-md-between">
              <Form.Label className=" pe-2 pt-2">
                <b>Salário</b>
              </Form.Label>
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
        {allowDelete ? (
          <Button className="btn-danger" onClick={deleteEmployee}>
            Excluir
          </Button>
        ) : null}
        <Button onClick={addOrUpdateEmployee}>{props.title}</Button>
      </Modal.Footer>
    </Modal>
  );
}
