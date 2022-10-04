import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const ButtonRS = ({ view = "classic", title, disable = false, ...props }) => {
  return (
    <button
      className={classNames(
        styles.button,
        disable && styles.disable,
        view === "ghost" && styles.ghost
      )}
      {...props}
    >
      {title}
    </button>
  );
};

export default ButtonRS;
