import { Table } from "../components/Table/Table";
import { Spinner } from "react-bootstrap";
import { useFetch } from '../hooks/useFetch'

export function Clients() {
    const { data, loading } = useFetch('https://62a6186c430ba53411d10fd7.mockapi.io/clients')
    return (
        <>
            <div className="d-flex justify-content-center">
                <h1>Clients page</h1>
            </div>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {!loading && (
                < Table
                    fields={['name', 'email', 'spending', 'lastPurchase']}
                    rowsData={data} />
            )}
        </>
    )
}