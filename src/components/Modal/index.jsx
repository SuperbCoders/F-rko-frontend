import React from "react";
import styles from "./styles.module.scss";

const Modal = ({ children, ...props }) => {
  return (
    <div className={styles.modal} {...props}>
      {children}
    </div>
  );
};

export default Modal;
