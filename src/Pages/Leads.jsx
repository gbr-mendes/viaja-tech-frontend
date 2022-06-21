import { Spinner } from 'react-bootstrap'
import { useFetch } from '../hooks/useFetch'
import { Table } from '../components/Table'
export function Leads() {
    const { data, loading } = useFetch('http://localhost:3001/leads?limit=10&page=1')
    return (
        <>
            <h1>Leads</h1>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {!loading && (
                < Table
                    fields={['name', 'email', 'phone', 'mostViewedDestination']}
                    rowsData={data.results} />
            )}
        </>
    )
}