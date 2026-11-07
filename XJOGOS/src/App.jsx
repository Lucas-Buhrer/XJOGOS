import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Erro from "./pages/Erro";

function App() {
  return (
    <BrowserRouter>
      {/* fora das Routes: aparece em todas as páginas */}
      <Navbar titulo="XJOGOS" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        {/* o * pega qualquer endereço que não existe */}
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;