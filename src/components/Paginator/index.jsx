import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const PaginatorItem = ({ active, ...props }) => {
  return (
    <div className={styles.paginator__wrapper} {...props}>
      <div
        className={classNames(styles.paginator__item, active && styles.active)}
      />
    </div>
  );
};

const Paginator = ({ activeStep = 1, ...props }) => {
  const navigate = useNavigate();

  return (
    <div {...props}>
      <div className={styles.paginator}>
        {[1, 2, 3].map((item) => {
          return (
            <PaginatorItem
              key={item}
              active={item <= activeStep}
              onClick={() => navigate(`/step${item}`)}
            />
          );
        })}
      </div>
      <p className={styles.paginator__text}>Шаг {activeStep} из 3</p>
    </div>
  );
};

export default Paginator;
