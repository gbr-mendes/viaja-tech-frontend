import "./Masthead.css";

export function Masthead() {
  return (
    <header className="masthead">
      <div className="container">
        <div className="masthead-subheading">Bem vindo ao</div>
        <div className="masthead-heading text-uppercase">Viaja Tech</div>
        <a className="btn btn-primary btn-xl text-uppercase" href="#services">
          Saiba Mais
        </a>
      </div>
    </header>
  );
}
