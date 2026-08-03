import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function Charts({ indicadores }) {


  const dadosImpacto = [
    {
      nome: "Participantes",
      valor: indicadores.voluntarios
    },
    {
      nome: "Ações",
      valor: indicadores.acoes
    },
    {
      nome: "Execuções",
      valor: indicadores.execucoes
    },
    {
      nome: "Benefícios",
      valor: indicadores.beneficios
    }
  ];


  const dadosBH = [
    {
      nome: "Emitido",
      valor: indicadores.bonusHoraEmitido
    },
    {
      nome: "Resgatado",
      valor: indicadores.bonusHoraResgatado
    },
    {
      nome: "Saldo",
      valor: indicadores.saldoCirculante
    }
  ];


  return (

    <section className="charts">


      <div className="chart-card">

        <h3>
          Impacto Social
        </h3>


        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={dadosImpacto}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="nome" />

            <YAxis />

            <Tooltip />


            <Bar
              dataKey="valor"
            />

          </BarChart>

        </ResponsiveContainer>


      </div>



      <div className="chart-card">

        <h3>
          Economia BônusHora
        </h3>


        <ResponsiveContainer width="100%" height={250}>

          <BarChart data={dadosBH}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="nome" />

            <YAxis />

            <Tooltip />


            <Bar
              dataKey="valor"
            />

          </BarChart>

        </ResponsiveContainer>


      </div>


    </section>

  );

}
