import React from "react";
import classNames from "classnames";
import styles from "../../../pages/Step2/styles.module.scss";
import DatePickerRS from "../../DatePickerRS";

const DateInput = ({ name }) => {
  return (
    <div className={classNames(styles.input__wrapper)}>
      <p className={styles.name}>{name}</p>
      <DatePickerRS />
    </div>
  );
};

export default DateInput;
