import { useEffect, useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useVerifyPermissions } from "../../hooks/useVerifyPermissions";
import { fetchGet } from "../../utils/FetchGet";
import { fetchPost } from "../../utils/FetchPost";
import Alert from "react-bootstrap/Alert";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import "./Marketing.css";

export function Marketing() {
  const allowedRoles = ["isAdmin", "isSalesManager"];
  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}`;
  const authToken = localStorage.getItem("auth-token");
  const { isAllowed } = useVerifyPermissions(allowedRoles);
  const [getLeads, setGetLeads] = useState(true);
  const [getClients, setGetClients] = useState(true);
  const [getAll, setGetAll] = useState(getLeads && getClients);
  const [contactList, setContactList] = useState([]);
  const [mailList, setMailList] = useState([]);
  const [sendEmailDisabled, setSendEmailDisabled] = useState(false);
  const [emailContent, setEmailContent] = useState(null);
  const [subject, setSubject] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("danger");
  const [alertMessage, setAlertMessage] = useState("");

  const triggerEmail = async (e) => {
    setSendEmailDisabled(true);
    const url = `${process.env.REACT_APP_API_MARKETING_DOMAIN}/marketing/promotions/create-campaing`;
    const authToken = localStorage.getItem("auth-token");
    const data = {
      target_emails: mailList,
      subject,
      body: emailContent,
    };
    const resp = await fetchPost(url, data, authToken);
    setAlert(true);
    if (resp.error) {
      setAlertClass("danger");
      setAlertMessage(resp.error);
    } else if (!resp.success) {
      setAlertClass("danger");
      setAlertMessage("Ocorreu um erro ao disparar os emails");
    }
    setAlertClass("success");
    setAlertMessage("Emails enviados com sucesso!");
    setSendEmailDisabled(false);
  };

  useEffect(() => {
    mailList.length > 0
      ? setSendEmailDisabled(false)
      : setSendEmailDisabled(true);
  }, [mailList]);

  useEffect(() => {
    async function fillContactList() {
      const contactList = [];
      if (getLeads) {
        let leads = await fetchGet(`${baseUrl}/leads`, authToken);
        leads = leads.results.filter((lead) => lead.notifications === true);
        leads.map((lead) => contactList.push(lead));
      }
      if (getClients) {
        let clients = await fetchGet(`${baseUrl}/clients`, authToken);
        clients = clients.results.filter(
          (client) => client.notifications === true
        );
        clients.map((client) => contactList.push(client));
      }
      setContactList(contactList);
    }
    fillContactList();
  }, [getLeads, getClients, baseUrl, authToken]);

  return isAllowed ? (
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
            {contactList.length > 0 ? (
              contactList.map((contact) => {
                return (
                  <div className="contact col-12 d-flex">
                    <Form.Check
                      type="checkbox"
                      className="me-3"
                      onClick={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setMailList((mailList) => [
                            ...mailList,
                            contact.email,
                          ]);
                        } else {
                          const filteredList = mailList.filter(
                            (email) => email !== contact.email
                          );
                          setMailList(() => [...filteredList]);
                        }
                      }}
                    />
                    <span className="align-middle">{contact.name}</span>
                  </div>
                );
              })
            ) : (
              <h6>Nenhum contato para os filtros selecionados</h6>
            )}
          </div>
        </div>
        <div className="text-editor col-12 col-md-8 bg-white">
          {alert && (
            <Alert key={alertClass} variant={alertClass}>
              {alertMessage}
            </Alert>
          )}
          <div>
            <label
              htmlFor="#campaing-title"
              className="col-12 col-md-3 d-flex justify-content-center"
            >
              <b>Título da campanha: </b>
            </label>
            <input
              className="col-12 col-md-9"
              type="text"
              id="campaing-title"
              placeholder="Digite aqui o título da campanha"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              value={subject}
            />
          </div>
          <RichTextEditor setContent={setEmailContent} />
          <div className="d-flex justify-content-center align-items-center p-3">
            <button
              className="btn btn-primary"
              onClick={triggerEmail}
              disabled={sendEmailDisabled}
            >
              Disparar Email
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="d-flex flex-column flex-md-row align-items-center">
      <h1>Forbidden</h1>
    </div>
  );
}
