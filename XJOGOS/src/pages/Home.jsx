import { useState, useEffect } from "react";
import JogoForm from "../components/JogoForm";
import JogoItem from "../components/JogoItem";
import styles from "./Home.module.css";

function Home() {
  // CARREGAR: a função roda só na primeira vez
  // o ternário cobre a primeira visita, quando não tem nada salvo
  const [jogos, setJogos] = useState(() => {
    const salvo = localStorage.getItem("jogos");
    return salvo ? JSON.parse(salvo) : [];
  });

  // campos do formulário
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [erro, setErro] = useState("");

  // id do jogo que está sendo editado (null = jogo novo)
  const [editandoId, setEditandoId] = useState(null);

  // texto da busca
  const [busca, setBusca] = useState("");

  // SALVAR: roda toda vez que jogos mudar
  // criar, editar e remover passam por aqui sem precisar lembrar
  useEffect(() => {
    localStorage.setItem("jogos", JSON.stringify(jogos));
  }, [jogos]);

  // CRIAR ou EDITAR, quando envia o formulário
  const enviar = (evento) => {
    evento.preventDefault();

    // validação simples
    if (nome === "" || genero === "") {
      setErro("Preencha os dois campos.");
      return;
    }
    setErro("");

    if (editandoId) {
      // EDITAR: map + ternário, troca só o jogo escolhido
      setJogos(
        jogos.map((jogo) =>
          jogo.id === editandoId ? { ...jogo, nome, genero } : jogo
        )
      );
      setEditandoId(null);
    } else {
      // CRIAR: o id nasce junto com o jogo
      const novoJogo = { id: crypto.randomUUID(), nome, genero };
      setJogos([...jogos, novoJogo]);
    }

    // limpa os campos
    setNome("");
    setGenero("");
  };

  // joga os dados do jogo no formulário
  const editar = (jogo) => {
    setNome(jogo.nome);
    setGenero(jogo.genero);
    setEditandoId(jogo.id);
  };

  // REMOVER: filter devolve todos menos o que tem esse id
  const remover = (id) => {
    if (!confirm("Apagar este jogo?")) return;
    setJogos(jogos.filter((jogo) => jogo.id !== id));
  };

  // BUSCA: só os jogos que têm o texto da busca no nome
  const jogosFiltrados = jogos.filter((jogo) =>
    jogo.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <JogoForm
        nome={nome}
        genero={genero}
        setNome={setNome}
        setGenero={setGenero}
        erro={erro}
        editando={editandoId}
        aoEnviar={enviar}
      />

      {/* busca: filtra enquanto digita */}
      <input
        className={styles.busca}
        placeholder="Buscar jogo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <ul className={styles.lista}>
        {/* lista vazia também é um caso: mostra uma mensagem */}
        {jogosFiltrados.length === 0 ? (
          <p>Nenhum jogo encontrado.</p>
        ) : (
          jogosFiltrados.map((jogo) => (
            <JogoItem
              key={jogo.id}
              jogo={jogo}
              aoEditar={editar}
              aoRemover={remover}
            />
          ))
        )}
      </ul>
    </main>
  );
}

export default Home;