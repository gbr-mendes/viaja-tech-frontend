import { Spinner } from "react-bootstrap";
import { Table } from "../components/Table";
import { useState } from "react";
import { AddPackageModal } from "../components/Modals/AddPackageModal";
import { useEffect } from "react";

export function Packages() {
  const authToken = localStorage.getItem("auth-token");
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Adicionar Pacote");
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowDeleteAtt, setAllowDeleteAtt] = useState(true);
  const handleShow = (e) => {
    setModalTitle("Atualizar Pacote");
    setShow(true);
  };
  useEffect(() => {
    if (idFetchElement) {
      fetch(
        `https://viaja-tech-backend.herokuapp.com/api/v1/packages/${idFetchElement}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
        .then((resp) => resp.json())
        .then((data) => {
          setFormData(data);
          handleShow();
        });
    }
  }, [idFetchElement, authToken]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOAMIN}/packages`, {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resourse");
        }
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        setData(null);
      });
  }, [show, authToken]);
  return (
    <>
      <AddPackageModal
        show={show}
        onHide={() => {
          setShow(false);
          setAllowDeleteAtt(true);
        }}
        title={modalTitle}
        data={formData}
        allowDelete={allowDeleteAtt}
      />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1>Pacotes</h1>
        <button
          className="btn btn-primary ms-md-5"
          onClick={() => {
            setAllowDeleteAtt(false);
            handleShow();
            setModalTitle("Adicionar Pacote");
            setFormData(null);
          }}
        >
          Adicionar Pacote
        </button>
      </div>
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
    </>
  );
}
