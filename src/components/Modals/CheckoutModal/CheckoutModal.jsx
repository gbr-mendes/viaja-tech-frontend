import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import { fetchGet } from "../../../utils/FetchGet";
import Alert from "react-bootstrap/Alert";

export function CheckoutModal(props) {
  const { packageData } = props;
  const [value, setValue] = useState(0);
  const [qtdDays, setQtdDays] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("success");

  const handlePurchase = async (e) => {
    e.preventDefault();
    const { _id: packageId } = packageData;
    const url = `${process.env.REACT_APP_API_DOMAIN}/checkout/${packageId}/${qtdDays}`;
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      const resp = await fetchGet(url, authToken);
      setAlert(true);
      if (resp.error) {
        setAlertClass("danger");
        setAlertMessage(resp.error);
      } else if (resp.success) {
        setAlertClass("success");
        setAlertMessage(resp.success);
      }
    }
  };
  useEffect(() => {
    if (packageData) {
      setValue(packageData.valuePerDay);
    }
  }, [packageData]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comprar Pacote
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
              <b>Quantos dias deseja?</b>
            </Form.Label>
            <Form.Control
              type="number"
              autoFocus
              value={qtdDays}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 1) {
                  setQtdDays(value);
                }
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Total:</b>
            </Form.Label>
            <Form.Label>
              <span className="ms-2">
                <b>R$ {value * qtdDays}</b>
              </span>
            </Form.Label>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success" onClick={handlePurchase}>
              FINALIZAR COMPRA
            </button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
    </Modal>
  );
}
