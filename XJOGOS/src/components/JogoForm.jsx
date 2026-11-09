import styles from "./JogoForm.module.css";

function JogoForm(props) {
  return (
    <form className={styles.form} onSubmit={props.onEnviar}>
      <input
        placeholder="Nome do jogo"
        value={props.nome}
        onChange={(e) => props.setNome(e.target.value)}
      />
      <input
        placeholder="Gênero"
        value={props.genero}
        onChange={(e) => props.setGenero(e.target.value)}
      />

      {props.erro && <p>{props.erro}</p>}
      
      <button type="submit">{props.editando ? "Salvar" : "Adicionar"}</button>
    </form>
  );
}

export default JogoForm;
