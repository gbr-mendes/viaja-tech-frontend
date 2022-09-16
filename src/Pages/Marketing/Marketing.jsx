import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import "./Marketing.css";

export function Marketing() {
  const [getLeads, setGetLeads] = useState(true);
  const [getClients, setGetClients] = useState(true);
  const [getAll, setGetAll] = useState(getLeads && getClients);
  let leads = [];
  for (let i = 0; i < 10; i++) {
    leads.push(`Lead ${i + 1}`);
  }
  return (
    <>
      <div className="d-flex justify-content-center align-itens-center">
        <h1>Marketing Page</h1>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-5">
        <div className="contact-list-container col-12 col-md-3 bg-white mb-3 mb-md-0 me-md-2">
          <Form>
            <FormGroup className="d-flex flex-row flex-md-column p-3 ps-1 d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                label="Clientes"
                className="me-3"
                checked={getClients}
                onClick={(e) => {
                  const shoudGetClients = !getClients;
                  const shoudGetLeads = getLeads;
                  setGetClients(shoudGetClients);
                  setGetAll(shoudGetClients && shoudGetLeads);
                }}
              />
              <Form.Check
                type="checkbox"
                label="Leads"
                className="me-3"
                checked={getLeads}
                onClick={(e) => {
                  const shoudGetLeads = !getLeads;
                  const shoudGetClients = getClients;
                  setGetLeads(shoudGetLeads);
                  setGetAll(shoudGetClients && shoudGetLeads);
                }}
              />
              <Form.Check
                type="checkbox"
                label="Todos"
                className="me-3"
                checked={getAll}
                onClick={(e) => {
                  if (!getAll) {
                    setGetAll(true);
                    setGetLeads(true);
                    setGetClients(true);
                  }
                }}
              />
            </FormGroup>
          </Form>
          <div className="contact-list ps-4">
            {leads.map((lead) => {
              return (
                <div className="contact col-12">
                  <h6>{lead}</h6>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-editor col-12 col-md-8 bg-white">
          <RichTextEditor />
          <div className="d-flex justify-content-center align-items-center p-3">
            <button className="btn btn-primary">Disparar Email</button>
          </div>
        </div>
      </div>
    </>
  );
}
