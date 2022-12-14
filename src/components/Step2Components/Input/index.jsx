import React from "react";
import styles from "../../../pages/Step2/styles.module.scss";
import classNames from "classnames";

const Input = ({
  name,
  error = false,
  rightElement = null,
  value = "",
  type="text",
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.input__wrapper}>
      {rightElement ? <span className={styles.icon}>{rightElement}</span> : null}
      <p className={styles.name}>{name}</p>
      <input
        value={value}
        type={type}
        className={classNames(styles.input, error && "error")}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
