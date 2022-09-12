import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { fetchDelete } from "../../../utils/FetchDelete";
import { fetchPost } from "../../../utils/FetchPost";

export function AddPackageModal(props) {
  const accessToken = localStorage.getItem("auth-token");
  const [alert, setAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [valuePerDay, setValuePerDay] = useState(0);
  const formData = props.data || {};
  const allowDelete = props.allowDelete;

  const baseUrl = "https://viaja-tech-backend.herokuapp.com/api/v1/packages";
  const deletePackage = async (e) => {
    await fetchDelete(`${baseUrl}/${formData._id}`, accessToken);
    props.onHide();
  };

  const addPackage = async (e) => {
    const resp = await fetchPost(
      baseUrl,
      {
        title,
        description,
        valuePerDay,
      },
      accessToken
    );
    setAlert(true);
    if (resp.error) {
      setAlertMessage(resp.error);
      setAlertClass("danger");
    } else {
      setAlertClass("success");
      setAlertMessage("Pacote adicionado com sucesso");
      setTitle("");
      setDescription("");
      setValuePerDay("");
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
          Adicionar Pacote
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert && (
          <Alert key={alertClass} variant={alertClass}>
            {alertMessage}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="addPackageForm.ControlInput1">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título do pacote"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={formData.title || title}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="addPackageForm.ControlTextarea1"
          >
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              value={formData.description || description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addPackageForm.ControlInput2">
            <Form.Label>Valor da Diária</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setValuePerDay(e.target.value)}
              value={formData.valuePerDay || valuePerDay}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {allowDelete && (
          <Button className="btn-danger" onClick={deletePackage}>
            Excluir
          </Button>
        )}
        <Button onClick={addPackage}>Adicionar Pacote</Button>
      </Modal.Footer>
    </Modal>
  );
}
