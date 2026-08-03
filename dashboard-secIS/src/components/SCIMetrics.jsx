import { useEffect, useState } from "react";

import { getSCIMetrics } from "../services/sci";


export default function SCIMetrics() {

  const [dados, setDados] = useState(null);


  useEffect(() => {

    getSCIMetrics()
      .then(data => {

        setDados(data);

      })
      .catch(error => {

        console.error(
          "Erro ao carregar SCI:",
          error
        );

      });

  }, []);


  if (!dados) {

    return (

      <section className="sci-metrics">

        <h3>
          SCI - Indicadores de Impacto Social
        </h3>

        <p>
          Carregando métricas SCI...
        </p>

      </section>

    );

  }


  const indicadores = [

    {
      titulo: "Cidadãos Envolvidos",
      valor: dados.indicadores.cidadaos_envolvidos,
      descricao: "Participação monitorada"
    },

    {
      titulo: "Ações Registradas",
      valor: dados.indicadores.acoes_monitoradas,
      descricao: "Atividades sociais cadastradas"
    },

    {
      titulo: "Benefícios Gerados",
      valor: dados.indicadores.beneficios_gerados,
      descricao: "Reconhecimentos emitidos"
    },

    {
      titulo: "Horas Sociais",
      valor: `${dados.indicadores.horas_sociais} BH`,
      descricao: "Valor social movimentado"
    }

  ];


  return (

    <section className="sci-metrics">

      <h3>
        SCI - Indicadores de Impacto Social
      </h3>


      <p>
        Métricas consolidadas para acompanhamento
        estratégico das ações do ecossistema BônusHora.
      </p>


      <div className="sci-metrics-grid">

        {indicadores.map((item, index) => (

          <div
            className="sci-metric-card"
            key={index}
          >

            <strong>
              {item.valor}
            </strong>


            <span>
              {item.titulo}
            </span>


            <small>
              {item.descricao}
            </small>


          </div>

        ))}

      </div>


    </section>

  );

}
