import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { fetchDelete } from "../../../utils/FetchDelete";
import { fetchPost } from "../../../utils/FetchPost";
import { fetchPatch } from "../../../utils/FetchPatch";
import { useEffect } from "react";

export function AddPackageModal(props) {
  const accessToken = localStorage.getItem("auth-token");
  const [alert, setAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [valuePerDay, setValuePerDay] = useState(0);
  const formData = props.data || {};
  const allowDelete = props.allowDelete;

  useEffect(() => {
    setAlert(false);
    if (props.data) {
      const { data } = props;
      setTitle(data.title);
      setShortDescription(data.shortDescription);
      setDescription(data.description);
      setValuePerDay(data.valuePerDay);
    } else {
      setTitle("");
      setShortDescription("");
      setDescription("");
      setValuePerDay(0);
    }
  }, [props, props.show]);
  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/packages`;
  const deletePackage = async (e) => {
    await fetchDelete(`${baseUrl}/${formData._id}`, accessToken);
    props.onHide();
  };

  const addOrUpdatePackage = async (e) => {
    let resp = null;
    if (!props.packageId) {
      resp = await fetchPost(
        baseUrl,
        {
          title,
          shortDescription,
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
        setTitle("");
        setShortDescription("");
        setDescription("");
        setValuePerDay("");
      }
    } else {
      resp = await fetchPatch(
        `${baseUrl}/${props.packageId}`,
        {
          title,
          shortDescription,
          description,
          valuePerDay,
        },
        accessToken
      );
      setAlert(true);
      if (resp.error) {
        setAlertMessage(resp.error);
        setAlertClass("danger");
      }
    }
    if (!resp.error) {
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
          <Form.Group className="mb-3" controlId="addPackageForm.ControlInput1">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título do pacote"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="addPackageForm.ControlTextarea1"
          >
            <Form.Label>Descrição Curta</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setShortDescription(e.target.value)}
              value={shortDescription}
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
              value={description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addPackageForm.ControlInput2">
            <Form.Label>Valor da Diária</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => setValuePerDay(e.target.value)}
              value={valuePerDay}
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
        <Button onClick={addOrUpdatePackage}>{props.title}</Button>
      </Modal.Footer>
    </Modal>
  );
}
