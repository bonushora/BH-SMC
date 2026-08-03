export default function MetricCard({ titulo, valor, icon }) {

  return (

    <div className="card">

      <div className="icon">
        {icon}
      </div>

      <span>{titulo}</span>

      <strong>{valor}</strong>

    </div>

  );

}
