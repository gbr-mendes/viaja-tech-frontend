import "./Footer.css";
export function Footer() {
  return (
    <footer className="footer py-4 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-lg-start">
            Copyright &copy; Viaja-Tech {new Date().getFullYear()}
          </div>
          <div className="col-lg-6 my-3 my-lg-0">
            <a
              className="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
