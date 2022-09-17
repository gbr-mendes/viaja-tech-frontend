import { Table } from "../components/Table/Table";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchGet } from "../utils/FetchGet";
import { ReadClientModal } from "../components/Modals/ReadClientModal";

export function Clients() {
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
  return (
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
        <h1>Clients page</h1>
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
        />
      )}
    </>
  );
}
