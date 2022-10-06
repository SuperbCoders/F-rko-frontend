import React, { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const YesOrNo = () => {
  const [list, setList] = useState([
    { id: 1, value: "Да" },
    { id: 2, value: "Нет" },
  ]);
  const [active, setActive] = useState();

  return (
    <div className={styles.wrapper}>
      {list.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.id);
            }}
            className={classNames(
              styles.item,
              item.id === active && styles.active
            )}
          >
            {item.value}
          </div>
        );
      })}
    </div>
  );
};

export default YesOrNo;
