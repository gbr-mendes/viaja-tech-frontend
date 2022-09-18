import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

export function ReadLeadModal(props) {
  const formData = props.data || {};

  return (
    props.data && (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {formData.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 d-flex flex-column flex-lg-row">
              <div className="d-flex flex-column col-12 col-lg-6 me-1">
                <Form.Label>
                  <b>Nome</b>
                </Form.Label>
                <Form.Control type="text" value={formData.name} disabled />
              </div>
              <div className="d-flex flex-column col-12 col-lg-6 ms-1">
                <Form.Label>
                  <b>Email</b>
                </Form.Label>
                <Form.Control type="email" value={formData.email} disabled />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column flex-lg-row">
              <div className="d-flex flex-column col-12 col-lg-6 me-1">
                <Form.Label>
                  <b>CPF</b>
                </Form.Label>
                <Form.Control type="text" value={formData.cpf} disabled />
              </div>
              <div className="d-flex flex-column col-12 col-lg-6 ms-1">
                <Form.Label>
                  <b>Telefone</b>
                </Form.Label>
                <Form.Control type="email" value={formData.phone} disabled />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column flex-lg-row">
              <div className="d-flex flex-column col-12 col-lg-6 me-1">
                <Form.Label>
                  <b>Qtd. de visitas ao website</b>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={formData.websiteVisits}
                  disabled
                />
              </div>
              <div className="d-flex flex-column col-12 col-lg-6 ms-1">
                <Form.Label>
                  <b>Destino mais visualizado</b>
                </Form.Label>
                <Form.Control
                  type="email"
                  value={formData.mostViewedDestination || "--------------"}
                  disabled
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column flex-lg-row">
              <div className="d-flex flex-column col-12 me-1">
                <Form.Label>
                  <b>Destinos pesquisados</b>
                </Form.Label>
                <ListGroup>
                  {formData.destinationsViewed.length > 0
                    ? formData.destinationsViewed.map((destination) => {
                        return (
                          <ListGroup.Item>
                            {destination.packageTitle}
                          </ListGroup.Item>
                        );
                      })
                    : "--------------"}
                </ListGroup>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    )
  );
}
