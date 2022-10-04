import React from "react";
import styles from "./styles.module.scss";

const InputRS = ({ placeholder, inputStyle, ...props }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholder}
      style={inputStyle}
      {...props}
    />
  );
};

export default InputRS;
