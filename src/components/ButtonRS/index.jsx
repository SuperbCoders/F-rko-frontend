import React from "react";
import styles from "./styles.module.scss";

const ButtonRS = ({ title, disable = false, ...props }) => {
  return (
    <button
      className={`${styles.button} ${disable ? styles.disable : ""}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default ButtonRS;
