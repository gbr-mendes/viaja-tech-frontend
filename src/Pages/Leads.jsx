import { Spinner } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Table } from "../components/Table";
export function Leads() {
  const authToken = localStorage.getItem("auth-token");
  const { data, loading } = useFetch(
    `${process.env.REACT_APP_API_DOAMIN}/leads`,
    authToken
  );
  return (
    <>
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
        />
      )}
    </>
  );
}
