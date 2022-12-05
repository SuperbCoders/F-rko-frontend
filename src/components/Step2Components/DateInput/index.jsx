import React from "react";
import classNames from "classnames";
import styles from "../../../pages/Step2/styles.module.scss";
import DatePickerRS from "../../DatePickerRS";

const DateInput = ({ name, value, required, isError, onChange }) => {
  return (
    <div className={classNames(styles.input__wrapper)}>
      <p className={styles.name}>{name}</p>
      <DatePickerRS
        className={isError ? "error" : ""}
        required={required}
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;
