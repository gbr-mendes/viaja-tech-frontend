import { Spinner } from 'react-bootstrap'
import { useFetch } from '../hooks/useFetch'
import { Table } from '../components/Table'
export function Leads() {
    const { data, loading } = useFetch('https://viaja-tech-backend.herokuapp.com/leads?limit=10&page=1')
    return (
        <>
            <div className='d-flex justify-content-center'>
                <h1>Leads</h1>
            </div>
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