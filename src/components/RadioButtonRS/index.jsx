import React, { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const RadioButtonRS = ({ ...props }) => {
  const [isActive, setActive] = useState(false);

  return (
    <div
      className={classNames(styles.radio, isActive && styles.active)}
      onClick={() => setActive((prevState) => !prevState)}
      {...props}
    />
  );
};

export default RadioButtonRS;
