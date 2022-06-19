import { Footer } from "../components/Footer";
import { Main } from '../components/Main/Main';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { PrivateRoute } from "./PrivateRoute";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "react-bootstrap";


export function Dashboard() {
    const token = window.localStorage.getItem('auth-token')
    const { data, error, loading } = useFetch('http://localhost:3001/users/me', token)
    if (!error && data) {
        window.localStorage.setItem('userData', JSON.stringify(data))
    }

    return (
        <PrivateRoute excludedRoles={['isClient']}>
            {loading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {data && !loading && (
                <section className="container-fluid vh-100 vw-100 d-flex row p-0" id="main-container">
                    <SideMenu />

                    <div className="col-10 d-flex flex-column p-0">
                        <Main />
                        <Footer />
                    </div>

                </section>
            )}
        </PrivateRoute>
    )
}