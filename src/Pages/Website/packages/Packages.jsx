import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGet } from "../../../utils/FetchGet";
import packageImage from "./img/air-craft.jpg";
import "./Packages.css";

export function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_API_DOMAIN}/packages`;
      const packagesData = await fetchGet(url);
      setPackages(packagesData.results);
    }
    fetchData();
  }, []);
  return (
    <>
      <section id="packages-section" className="bg-white">
        <div className="section-title d-flex justify-content-center align-items-center flex-column p-5 mt-5 mt-md-0 mb-0">
          <h2>PACOTES</h2>
          <p className="display-lead text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            libero quo quaerat tempore architecto.
          </p>
        </div>
        <container className="packages-container d-flex flex-column align-items-center justify-content-center p-5">
          {packages.map((item) => {
            return (
              <Link
                to={`/packages/${item._id}`}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="package w-75 p-5 border d-flex flex-column flex-lg-row m-2">
                  <div className="package-image d-flex d-md-block align-items-center justify-content-center">
                    <img
                      src={packageImage}
                      className="img-thumbnail rounded w-75 mb-4 mb-lg-0"
                      alt=""
                    />
                  </div>
                  <div className="package-description">
                    <div className="package-title">
                      <h4>{item.title}</h4>
                    </div>
                    <div className="pacakge-extract text-muted">
                      {item.shortDescription}
                    </div>
                    <div className="package-price mt-3">
                      <h4>R$ {item.valuePerDay}/dia</h4>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </container>
      </section>
    </>
  );
}
