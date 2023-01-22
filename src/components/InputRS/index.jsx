import React from "react";
import styles from "./styles.module.scss";

const InputRS = ({ value, className="", placeholder, inputStyle, type="text", ...props }) => {
  return (
    <input
      value={value}
      className={`${styles.input} ${className}`}
      type={type}
      placeholder={placeholder}
      style={inputStyle}
      {...props}
    />
  );
};

export default InputRS;
