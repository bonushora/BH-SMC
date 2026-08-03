import DashboardOverview from "../components/DashboardOverview";
import MetricsGrid from "../components/MetricsGrid";
import Charts from "../components/Charts";

export default function Home({ indicadores }) {

    const cards = [

        {
            titulo: "Participantes",
            valor: indicadores.voluntarios
        },

        {
            titulo: "Ações",
            valor: indicadores.acoes
        },

        {
            titulo: "Execuções",
            valor: indicadores.execucoes
        },

        {
            titulo: "Benefícios",
            valor: indicadores.beneficios
        },

        {
            titulo: "Emitido",
            valor: `${indicadores.bonusHoraEmitido} BH`
        },

        {
            titulo: "Saldo",
            valor: `${indicadores.saldoCirculante} BH`
        }

    ];


    return (

        <>
            <MetricsGrid cards={cards} />

            <Charts
                indicadores={indicadores}
            />

            <DashboardOverview />

        </>

    );

}
