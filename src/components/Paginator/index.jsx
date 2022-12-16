import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const PaginatorItem = ({ active, ...props }) => {
  return (
    <div 
      className={classNames(styles.paginator__wrapper, !active && styles.disabled)}
      {...props}
    >
      <div
        className={classNames(styles.paginator__item, active && styles.active)}
      />
    </div>
  );
};

const Paginator = ({ activeStep=1 }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.paginator}>
        {[1, 2, 3].map((item) => 
          <PaginatorItem
            key={item}
            active={item <= activeStep}
            onClick={() => activeStep >= item && navigate(`/step${item}`)}
          />
          )}
      </div>
      <p className={styles.paginator__text}>Шаг {activeStep} из 3</p>
    </div>
  );
};

export default Paginator;
