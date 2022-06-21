import { useState } from "react"
import { Alert } from "react-bootstrap"

export function Form({ name, email, phone, cpf }) {
    const [alertShow, setAlertShow] = useState(false)
    const [alertClass, setAlertClass] = useState('success')
    const [alertMessage, setAlertMessage] = useState('')

    const [inputName, setIntputName] = useState(name)
    const [inputEmail, setInputEmail] = useState(email)
    const [inputPhone, setInputPhone] = useState(phone)

    function handleSubmit(e) {
        e.preventDefault()
        const authToken = localStorage.getItem('auth-token')
        const data = { name: inputName, email: inputEmail, phone: inputPhone }

        fetch('https://viaja-tech-backend.herokuapp.com/users/update', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'auth-token': authToken,
                "Content-Type": "application/json"
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setAlertShow(true)
                if (data.error) {
                    setAlertClass('danger')
                    setAlertMessage(data.error)
                } else {
                    setAlertClass('success')
                    setAlertMessage('Perfil atualizado com sucesso')
                }
            })
    }

    return (
        <form className="profile-form p-4" onSubmit={handleSubmit}>
            {alertShow && <Alert key={alertClass} variant={alertClass}>{alertMessage}</Alert>}
            <div className="mb-3">
                <label for="name" className="form-label">Nome</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={inputName} onChange={(e) => setIntputName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
            </div>
            <div className="row">
                <div className="mb-3 col-5">
                    <label for="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} />
                </div>
                <div className="mb-3 col-5">
                    <label for="cpf" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="cpf" value={cpf} disabled />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn button">Salvar alterações</button>
            </div>
        </form>
    )
}