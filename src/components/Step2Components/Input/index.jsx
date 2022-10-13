import React, { useState } from "react";
import styles from "../../../pages/Step2/styles.module.scss";
import classNames from "classnames";

const Input = ({
  name,
  error = false,
  rightElement = null,
  value = "",
  placeholder,
}) => {
  const [defaultValue, setDefaultValue] = useState(value);

  return (
    <div className={styles.input__wrapper}>
      {rightElement ? (
        <span className={styles.icon}>{rightElement}</span>
      ) : null}
      <p className={styles.name}>{name}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={defaultValue}
        onChange={(e) => setDefaultValue(e.target.value)}
        className={classNames(styles.input, error && styles.error)}
      />
    </div>
  );
};

export default Input;
