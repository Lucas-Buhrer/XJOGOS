import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar(props) {
  return (
    <nav className={styles.nav}>
      <h1>{props.titulo}</h1>
      <Link to="/">Início</Link>
      <Link to="/sobre">Sobre</Link>
    </nav>
  );
}

export default Navbar;
