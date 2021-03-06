import styles from "./Button.module.css";

function Button({ title, onClick, disabled, id }) {
  return (
    <button id={id} data-testid="button-component" disabled={disabled}
    onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
}

export default Button;
