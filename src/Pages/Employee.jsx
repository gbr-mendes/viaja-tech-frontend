import { Spinner } from "react-bootstrap";
import { Table } from "../components/Table";
import { useState } from "react";
import { AddUpdateEmployeeModal } from "../components/Modals/AddUpdateEmployeeModal";
import { useEffect } from "react";
import { fetchGet } from "../utils/FetchGet/FetchGet";
import { useVerifyPermissions } from "../hooks/useVerifyPermissions";

export function Employee() {
  const thByFieldObject = {
    name: "Nome",
    cpf: "CPF",
    phone: "Telefone",
    salary: "Salário(R$)",
    position: "Cargo",
  };
  const authToken = localStorage.getItem("auth-token");
  const allowedRoles = ["isAdmin"];
  const { isAllowed } = useVerifyPermissions(allowedRoles);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Adicionar Funcionário");
  const [idFetchElement, setIdFetchElement] = useState(null);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allowDeleteAtt, setAllowDeleteAtt] = useState(false);

  const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/employee/`;
  const handleShow = (e) => {
    setModalTitle("Atualizar Funcionário");
    setShow(true);
  };

  useEffect(() => {
    async function fetchData() {
      if (idFetchElement) {
        const data = await fetchGet(`${baseUrl}/${idFetchElement}`, authToken);
        setFormData(data);
        setAllowDeleteAtt(true);
        handleShow();
      }
    }
    fetchData();
  }, [idFetchElement, authToken, baseUrl]);

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

  return isAllowed ? (
    <>
      <AddUpdateEmployeeModal
        show={show}
        onHide={() => {
          setIdFetchElement(null);
          setShow(false);
        }}
        title={modalTitle}
        data={formData}
        allowDelete={allowDeleteAtt}
        employeeId={idFetchElement}
      />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1>Funcionários</h1>
        <button
          className="btn btn-primary ms-md-5"
          onClick={() => {
            setAllowDeleteAtt(false);
            handleShow();
            setModalTitle("Adicionar Funcionário");
            setIdFetchElement(null);
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
