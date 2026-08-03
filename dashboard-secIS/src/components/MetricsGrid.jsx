import MetricCard from "./MetricCard";

export default function MetricsGrid({ cards }) {

  return (

    <section className="grid">

      {cards.map((card, index) => (

        <MetricCard
          key={index}
          titulo={card.titulo}
          valor={card.valor}
          icon={card.icon}
        />

      ))}

    </section>

  );

}
