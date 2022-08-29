import "./Footer.css";
export function Footer() {
  return (
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 text-lg-start">
            Copyright &copy; Viaja-Tech {new Date().getFullYear()}
          </div>
          <div class="col-lg-6 my-3 my-lg-0">
            <a
              class="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              class="btn btn-dark btn-social mx-2"
              href="#!"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
