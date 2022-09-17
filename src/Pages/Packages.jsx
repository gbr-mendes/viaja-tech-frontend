import { Spinner } from "react-bootstrap";
import { Table } from "../components/Table";
import { useState, useEffect } from "react";
import { AddPackageModal } from "../components/Modals/AddPackageModal";
import { fetchGet } from "../utils/FetchGet";
import { useVerifyPermissions } from "../hooks/useVerifyPermissions";

export function Packages() {
  const allowedRoles = ["isAdmin", "isSiteAdmin"];
  const authToken = localStorage.getItem("auth-token");
  const { isAllowed } = useVerifyPermissions(allowedRoles);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Adicionar Pacote");
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowDeleteAtt, setAllowDeleteAtt] = useState(true);
  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/packages/`;

  const handleShow = (e) => {
    setModalTitle("Atualizar Pacote");
    setShow(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchGet(baseUrl, authToken);
      setLoading(false);
      if (!data || data.error) {
        setData(null);
      } else {
        setData(data);
      }
    }
    fetchData();
  }, [authToken, show, baseUrl]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchGet(`${baseUrl}/${idFetchElement}`, authToken);
      setFormData(data);
      handleShow();
    }
    if (idFetchElement) {
      fetchData();
    }
  }, [authToken, baseUrl, idFetchElement]);

  return isAllowed ? (
    <>
      <AddPackageModal
        show={show}
        onHide={() => {
          setShow(false);
          setIdFetchElement(null);
          setAllowDeleteAtt(true);
        }}
        title={modalTitle}
        data={formData}
        allowDelete={allowDeleteAtt}
        packageId={idFetchElement}
      />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1>Pacotes</h1>
        <button
          className="btn btn-primary ms-md-5"
          onClick={() => {
            setAllowDeleteAtt(false);
            handleShow();
            setModalTitle("Adicionar Pacote");
            setIdFetchElement(null);
            setFormData(null);
          }}
        >
          Adicionar Pacote
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {data && (
          <Table
            fields={["title", "valuePerDay"]}
            rowsData={data.results}
            setIdMethod={setIdFetchElement}
          />
        )}
      </div>
    </>
  ) : (
    <div className="d-flex flex-column flex-md-row align-items-center">
      <h1>Forbidden</h1>
    </div>
  );
}
