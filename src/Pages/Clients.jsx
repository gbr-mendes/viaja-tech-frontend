import { Table } from "../components/Table/Table";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchGet } from "../utils/FetchGet";
import { ReadClientModal } from "../components/Modals/ReadClientModal";
import { useVerifyPermissions } from "../hooks/useVerifyPermissions";

export function Clients() {
  const thByFieldObject = {
    name: "Nome",
    email: "E-mail",
    spending: "Gastos (R$)",
    lastPurchase: "Última Compra",
  };
  const allowedRoles = ["isAdmin", "isSalesManager"];
  const { isAllowed } = useVerifyPermissions(allowedRoles);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [modalData, setModalData] = useState(null);

  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/clients`;
  const authToken = localStorage.getItem("auth-token");

  const handleShow = (e) => {
    setShow(true);
  };

  useEffect(() => {
    async function fetchData() {
      const dataFetched = await fetchGet(baseUrl, authToken);
      setLoading(false);
      if (!dataFetched || dataFetched.error) {
        setData(null);
      } else {
        setData(dataFetched.results);
      }
    }
    fetchData();
  }, [authToken, show, baseUrl]);

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
      <ReadClientModal
        show={show}
        onHide={() => {
          setIdFetchElement(null);
          setShow(false);
        }}
        data={modalData}
        employeeId={idFetchElement}
      />
      <div className="d-flex justify-content-center">
        <h1>Clientes</h1>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && (
        <Table
          fields={["name", "email", "spending", "lastPurchase"]}
          rowsData={data}
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
