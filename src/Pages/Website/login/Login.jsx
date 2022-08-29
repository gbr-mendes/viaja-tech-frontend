export function Login() {
  return (
    <section
      id="login-form"
      className="d-flex justify-content-center align-items-center flex-column bg-white vh-100"
    >
      <h2>Bem-vindo(a)</h2>
      <form className="col-9 col-md-6 col-lg-3 d-flex flex-column">
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
          Submit
        </button>
      </form>
    </section>
  );
}
