export function Register() {
  return (
    <section
      id="login-form"
      className="d-flex justify-content-center align-items-center flex-column bg-white vh-100"
    >
      <h2>Registre-se</h2>
      <form className="col-9 col-md-6 col-lg-3 d-flex flex-column">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 d-flex flex-column flex-md-row">
          <div className="m-0 me-md-3">
            <label for="exampleInputEmail1" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="m-0 ms-md-3">
            <label for="exampleInputEmail1" className="form-label">
              Telefone
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registre-se
        </button>
      </form>
    </section>
  );
}
