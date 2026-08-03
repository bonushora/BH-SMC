import { Link } from "react-router-dom";


export default function Header() {

  return (

    <header>


      <h1>
        BônusHora Social
      </h1>


      <h2>
        Piloto SECIS Salvador
      </h2>


      <p className="subtitle">
        Serviço de Telemetria de Impacto Social
      </p>


      <nav className="navigation">


        <Link to="/">
          Dashboard
        </Link>


        <Link to="/executivo">
          Executivo
        </Link>


        <Link to="/auditoria">
          Auditoria
        </Link>


        <Link to="/sci">
          SCI
        </Link>


        <Link to="/demo">
          Demo
        </Link>


      </nav>


      <div className="status">
        🟢 Sistema Operacional
      </div>


    </header>

  );

}
