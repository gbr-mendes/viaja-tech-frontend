import packageImage from "./img/air-craft.jpg";

export function Package(props) {
  return (
    <>
      <section id="package-section" className="bg-white">
        <div className="section-title d-flex justify-content-center align-items-center flex-column p-5 mt-5 mt-md-0 mb-0">
          <div className="package-title">
            <h2>Las Vegas</h2>
          </div>
          <p className="display-lead text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            libero quo quaerat tempore architecto.
          </p>
        </div>
        <container className="packages-container d-flex align-items-center justify-content-center p-5">
          <div className="package-image d-flex d-md-block align-items-center justify-content-center">
            <img
              src={packageImage}
              className="img-thumbnail rounded w-75 mb-4 mb-lg-0"
              alt=""
            />
            <div className="package-price mt-3">
              <h4>R$ 2000.00</h4>
            </div>
          </div>
          <div className="package-description col-7">
            <div className="pacakge-extract text-muted">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
              saepe similique, cumque corporis quam soluta et fuga, error
              impedit laborum accusantium illum quis perspiciatis totam natus
              fugiat labore aperiam quibusdam.
            </div>
          </div>
        </container>
        <div className="checkout-button d-flex justify-content-center">
          <button className="btn btn-primary">COMPRAR AGORA</button>
        </div>
      </section>
    </>
  );
}
