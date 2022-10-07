import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const RadioButtonRS = ({ isActive, handleClick, ...props }) => {
  return (
    <div
      className={classNames(styles.radio, isActive && styles.active)}
      onClick={handleClick}
      {...props}
    />
  );
};

export default RadioButtonRS;
