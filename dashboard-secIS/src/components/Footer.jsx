export default function Footer({ timestamp }) {

  return (
    <footer>

      Atualizado{" "}
      {new Date(timestamp).toLocaleString()}

    </footer>
  );

}
