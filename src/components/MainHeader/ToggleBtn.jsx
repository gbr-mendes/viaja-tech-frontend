import './MainHeader.css'

export function ToggleBtn() {
    return (
        <div className="toggle-menu order-1 order-md-2 m-1 col-md-1 d-flex justify-content-center align-items-center p-2"
            id="toggler-btn">
            <i className="fa-solid fa-bars fa-2xl" default></i>
        </div>
    )
}