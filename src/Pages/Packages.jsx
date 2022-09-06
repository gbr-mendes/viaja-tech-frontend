import { Spinner } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Table } from "../components/Table";
import { useState } from "react";
import { AddPackageModal } from "../components/Modals/AddPackageModal";
import { useEffect } from "react";

export function Packages() {
  const authToken = localStorage.getItem("auth-token");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(
      "https://viaja-tech-backend.herokuapp.com/api/v1/packages?limit=10&page=1",
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
  }, [show]);
  return (
    <>
      <AddPackageModal show={show} onHide={() => setShow(false)} />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <h1>Pacotes</h1>
        <button className="btn btn-primary ms-md-5" onClick={handleShow}>
          Adicionar Pacote
        </button>
      </div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {data && (
        <Table fields={["title", "valuePerDay"]} rowsData={data.results} />
      )}
    </>
  );
}
