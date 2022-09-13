import { Spinner } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Table } from "../components/Table";
import { useState } from "react";
import { useEffect } from "react";
import { ReadLeadModal } from "../components/Modals/ReadLeadModal/ReadLeadModal";
import { fetchGet } from "../utils/FetchGet";

export function Leads() {
  const authToken = localStorage.getItem("auth-token");
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [show, setShow] = useState(true);
  const [modalData, setModalData] = useState(null);
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_DOAMIN}/leads`,
    authToken
  );
  const baseUrl = `${process.env.REACT_APP_API_DOAMIN}/leads`;
  const handleShow = (e) => {
    setShow(true);
  };
  useEffect(() => {
    async function fetchData() {
      if (idFetchElement) {
        const data = await fetchGet(`${baseUrl}/${idFetchElement}`, authToken);
        console.log(data);
        setModalData(data);
        handleShow();
      }
    }
    fetchData();
  }, [idFetchElement, authToken, baseUrl]);
  return (
    <>
      <ReadLeadModal
        show={show}
        onHide={() => setShow(false)}
        title="teste"
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
        />
      )}
    </>
  );
}
