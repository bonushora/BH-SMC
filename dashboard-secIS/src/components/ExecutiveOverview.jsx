import { useEffect, useState } from "react";

import { getExecutiveOverview } from "../services/executive";

export default function ExecutiveOverview() {

  const [dados, setDados] = useState(null);

  useEffect(() => {

    getExecutiveOverview()
      .then(setDados)
      .catch(error => {
        console.error(
          "Erro ao carregar visão executiva:",
          error
        );
      });

  }, []);

  if (!dados) {

    return (
      <section className="executive-overview">
        <h3>Visão Executiva Consolidada</h3>
        <p>Carregando indicadores...</p>
      </section>
    );

  }

  return (

    <section className="executive-overview">

      <h3>
        Visão Executiva Consolidada
      </h3>

      <div className="executive-grid">

        <div>
          <strong>
            {dados.participacao.cidadaos}
          </strong>
          <span>Cidadãos</span>
        </div>

        <div>
          <strong>
            {dados.impacto.beneficios}
          </strong>
          <span>Benefícios</span>
        </div>

        <div>
          <strong>
            {dados.economia_bh.saldo} BH
          </strong>
          <span>Saldo Social</span>
        </div>

        <div>
          <strong>
            {dados.status}
          </strong>
          <span>Status</span>
        </div>

      </div>

    </section>

  );

}
