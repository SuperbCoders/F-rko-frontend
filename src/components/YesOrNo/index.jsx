import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const YesOrNo = ({ value, toggle }) => {
  const options = [
    { id: 1, label: "Да", value: true },
    { id: 2, label: "Нет", value: false },
  ]

  return (
    <div className={styles.wrapper}>
      {options.map(({ id, label, ...item }) => 
        <div
          key={id}
          onClick={toggle}
          className={classNames(
            styles.item,
            item.value === value && styles.active
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export default YesOrNo;
