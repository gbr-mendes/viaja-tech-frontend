import { Footer } from "../components/Footer";
import { Main } from '../components/Main/Main';
import { SideMenu } from '../components/SideMenu/SideMenu';

export function Dashboard() {
    return (
        <section className="container-fluid vh-100 vw-100 d-flex row p-0" id="main-container">
            <SideMenu />
            <div className="col-10 d-flex flex-column p-0">
                <Main />
                <Footer />
            </div>
        </section>
    )
}