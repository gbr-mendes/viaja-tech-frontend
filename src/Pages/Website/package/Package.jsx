import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGet } from "../../../utils/FetchGet";
import { Spinner } from "react-bootstrap";
import packageImage from "./img/air-craft.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../providers/auth";
import { CheckoutModal } from "../../../components/Modals/CheckoutModal/CheckoutModal";
import { useNavigate } from "react-router-dom";

export function Package(props) {
  const { packageId } = useParams();
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const { userInfo } = user;
      const { role } = userInfo;

      async function appendPackageView() {
        await fetchGet(
          `${process.env.REACT_APP_API_DOMAIN}/business/append-view/${packageId}/${userInfo._id}`
        );
      }

      if (role === "isLead" || role === "isClient") {
        appendPackageView();
      }
    }
  }, [packageId, user]);

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_API_DOMAIN}/packages/${packageId}`;
      const packageData = await fetchGet(url);
      setPack(packageData);
      setLoading(true);
    }
    fetchData();
  }, [packageId, setLoading]);

  return (
    <>
      <CheckoutModal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        packageData={pack}
      />
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {pack && (
        <section id="package-section" className="bg-white">
          <div className="section-title d-flex justify-content-center align-items-center flex-column p-5 mt-5 mt-md-0 mb-0">
            <div className="package-title">
              <h2>{pack.title}</h2>
            </div>
            <p className="display-lead text-center">{pack.shortDescription}</p>
          </div>
          <container className="packages-container d-flex flex-column flex-md-row align-items-center justify-content-center p-5">
            <div className="package-image d-flex flex-column flex-md-row d-md-block align-items-center justify-content-center">
              <img
                src={packageImage}
                className="img-thumbnail rounded w-75 mb-4 mb-lg-0"
                alt=""
              />
              <div className="package-price mt-3">
                <h4>R$ {pack.valuePerDay}/dia</h4>
              </div>
            </div>
            <div className="package-description col-7 mt-3 mt-md-0">
              <div className="pacakge-extract text-muted">
                {pack.description}
              </div>
            </div>
          </container>
          <div className="checkout-button d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                if (user) {
                  setShow(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              COMPRAR AGORA
            </button>
          </div>
        </section>
      )}
    </>
  );
}
