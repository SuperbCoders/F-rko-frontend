import React from "react";
import InputMask from "react-input-mask";
import styles from "./styles.module.scss";

const MaskedInput = ({ value, maskChar="", mask="", placeholder="", className="", error=false, ...props }) => {
  return (
    <InputMask
      value={value}
      placeholder={placeholder}
      mask={mask}
      className={`${styles.input} ${className} ${error ? "error" : ""}`}
      maskChar={maskChar}
      {...props}
    />
  )
};

export default MaskedInput;
