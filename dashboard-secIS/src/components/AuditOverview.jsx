import { useEffect, useState } from "react";

import { getAuditoriaOverview } from "../services/auditoria";


export default function AuditOverview() {

  const [dados, setDados] = useState(null);


  useEffect(() => {

    getAuditoriaOverview()
      .then(setDados)
      .catch(error => {

        console.error(
          "Erro ao carregar auditoria:",
          error
        );

      });

  }, []);


  if (!dados) {

    return (

      <section className="audit-overview">

        <h3>
          Governança e Evidências
        </h3>

        <p>
          Carregando auditoria...
        </p>

      </section>

    );

  }


  return (

    <section className="audit-overview">

      <h3>
        Governança e Evidências
      </h3>


      <div className="executive-grid">


        <div>

          <strong>
            {dados.registros.transacoes}
          </strong>

          <span>
            Transações Registradas
          </span>

        </div>


        <div>

          <strong>
            {dados.registros.execucoes}
          </strong>

          <span>
            Execuções Validadas
          </span>

        </div>


        <div>

          <strong>
            {dados.registros.beneficios}
          </strong>

          <span>
            Benefícios Gerados
          </span>

        </div>


        <div>

          <strong>
            {dados.integridade}
          </strong>

          <span>
            Integridade do Sistema
          </span>

        </div>


      </div>


    </section>

  );

}
