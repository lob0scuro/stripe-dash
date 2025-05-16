import styles from "../styles/Button.module.css";
import clsx from "clsx";

const Button = ({ title, type = "button", className = "", ...props }) => {
  return (
    <button className={clsx(styles.button, className)} type={type} {...props}>
      {title}
    </button>
  );
};

export default Button;
