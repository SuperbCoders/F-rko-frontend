import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const PaginatorItem = ({ active }) => {
  return (
    <div
      className={classNames(styles.paginator__item, active && styles.active)}
    />
  );
};

const Paginator = ({ activeStep = 1, ...props }) => {
  return (
    <div {...props}>
      <div className={styles.paginator}>
        {[1, 2, 3].map((item) => {
          return <PaginatorItem active={item <= activeStep} />;
        })}
      </div>
      <p className={styles.paginator__text}>Шаг {activeStep} из 3</p>
    </div>
  );
};

export default Paginator;
