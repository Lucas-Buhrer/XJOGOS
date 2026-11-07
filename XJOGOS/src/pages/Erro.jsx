import { Link } from "react-router-dom";

function Erro() {
  return (
    <main>
      <h2>Página não encontrada</h2>
      <Link to="/">Voltar para o início</Link>
    </main>
  );
}

export default Erro;
