import { useEffect, useState } from "react";

import { getDashboardOverview } from "../services/dashboard";


export default function DashboardOverview() {

  const [dados, setDados] = useState(null);


  useEffect(() => {

    getDashboardOverview()
      .then(setDados)
      .catch(error => {

        console.error(
          "Erro ao carregar dashboard consolidado:",
          error
        );

      });

  }, []);


  if (!dados) {

    return (

      <section className="dashboard-overview">

        <h3>
          Dashboard Consolidado BH-SMC
        </h3>

        <p>
          Carregando visão consolidada...
        </p>

      </section>

    );

  }


  return (

    <section className="dashboard-overview">

      <h3>
        Dashboard Consolidado BH-SMC
      </h3>


      <div className="executive-grid">


        <div>

          <strong>
            {dados.operacional.participantes}
          </strong>

          <span>
            Participantes
          </span>

        </div>


        <div>

          <strong>
            {dados.operacional.acoes}
          </strong>

          <span>
            Ações
          </span>

        </div>


        <div>

          <strong>
            {dados.social.beneficios}
          </strong>

          <span>
            Benefícios
          </span>

        </div>


        <div>

          <strong>
            {dados.economia.saldo} BH
          </strong>

          <span>
            Saldo Social
          </span>

        </div>


      </div>


    </section>

  );

}
