import { Spinner } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Table } from "../components/Table";
import { useState } from "react";
import { useEffect } from "react";
import { ReadLeadModal } from "../components/Modals/ReadLeadModal/ReadLeadModal";
import { fetchGet } from "../utils/FetchGet";
import { useVerifyPermissions } from "../hooks/useVerifyPermissions";

export function Leads() {
  const thByFieldObject = {
    name: "Nome",
    email: "E-mail",
    phone: "Telefone",
    mostViewedDestination: "Destino mais Pesquisado",
  };
  const authToken = localStorage.getItem("auth-token");
  const allowedRoles = ["isAdmin", "isSalesManager"];
  const { isAllowed } = useVerifyPermissions(allowedRoles);
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_DOMAIN}/leads`,
    authToken
  );
  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/leads`;
  const handleShow = (e) => {
    setShow(true);
  };
  useEffect(() => {
    async function fetchData() {
      if (idFetchElement) {
        const data = await fetchGet(`${baseUrl}/${idFetchElement}`, authToken);
        setModalData(data);
        handleShow();
      }
    }
    fetchData();
  }, [idFetchElement, authToken, baseUrl]);

  return isAllowed ? (
    <>
      <ReadLeadModal
        show={show}
        onHide={() => {
          setIdFetchElement(null);
          setShow(false);
        }}
        data={modalData}
      />
      <div className="d-flex justify-content-center">
        <h1>Leads</h1>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && (
        <Table
          fields={["name", "email", "phone", "mostViewedDestination"]}
          rowsData={data.results}
          setIdMethod={setIdFetchElement}
          thByFieldObject={thByFieldObject}
        />
      )}
    </>
  ) : (
    <div className="d-flex flex-column flex-md-row align-items-center">
      <h1>Forbidden</h1>
    </div>
  );
}
