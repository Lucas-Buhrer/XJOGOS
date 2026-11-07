import styles from "./JogoItem.module.css";

function JogoItem(props) {
  return (
    <li className={styles.item}>
      <span>
        {props.jogo.nome} - {props.jogo.genero}
      </span>
      <div>
        <button onClick={() => props.onEditar(props.jogo)}>Editar</button>
        <button onClick={() => props.onRemover(props.jogo.id)}>Remover</button>
      </div>
    </li>
  );
}

export default JogoItem;
