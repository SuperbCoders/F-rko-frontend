import React from "react";
import InputMask from "react-input-mask";
import styles from "./styles.module.scss";

const PhoneInput = ({ ...props }) => {
  return (
    <InputMask
      placeholder={"+7 (__) ___ __ __"}
      mask="+7 (999) 999 99 99"
      className={styles.input}
      maskChar={"_"}
      {...props}
    />
  );
};

export default PhoneInput;
