import { HashLink } from "react-router-hash-link";
import "./Masthead.css";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="container">
        <div className="masthead-subheading">Bem vindo ao</div>
        <div className="masthead-heading text-uppercase">Viaja Tech</div>
        <HashLink
          to={"/home#services"}
          className="btn btn-primary btn-xl text-uppercase"
        >
          Saiba Mais
        </HashLink>
      </div>
    </header>
  );
}
