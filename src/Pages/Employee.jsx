import { Spinner } from "react-bootstrap";
import { Table } from "../components/Table";
import { useState } from "react";
import { AddUpdateEmployeeModal } from "../components/Modals/AddUpdateEmployeeModal";
import { useEffect } from "react";

export function Employee() {
  const authToken = localStorage.getItem("auth-token");
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setModalTitle("Atualizar Funcionário");
    setShow(true);
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [formData, setFormData] = useState(null);
  const [modalTitle, setModalTitle] = useState("Adicionar Funcionário");

  useEffect(() => {
    if (idFetchElement) {
      fetch(
        `https://viaja-tech-backend.herokuapp.com/api/v1/employee/${idFetchElement}`,
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
    fetch(
      "https://viaja-tech-backend.herokuapp.com/api/v1/employee?limit=10&page=1",
      { method: "GET", headers: { Authorization: `Bearer ${authToken}` } }
    )
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
  }, [authToken]);
  return (
    <>
      <AddUpdateEmployeeModal
        show={show}
        onHide={() => setShow(false)}
        title={modalTitle}
        data={formData}
      />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1>Funcionários</h1>
        <button
          className="btn btn-primary ms-md-5"
          onClick={() => {
            handleShow();
            setModalTitle("Adicionar Funcionário");
            setFormData(null);
          }}
        >
          Adicionar Funcionário
        </button>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {data && (
        <Table
          fields={["name", "cpf", "phone", "salary", "position"]}
          rowsData={data.results}
          setIdMethod={setIdFetchElement}
        />
      )}
    </>
  );
}
