import React from "react";
import styles from "../../../pages/Step2/styles.module.scss";
import Select from "react-select";

const SelectRS = ({ name, backgroundColor, ...props }) => {
  const options = [
    { value: "test1", label: "Тестовое значение #1" },
    { value: "test2", label: "Тестовое значение #2" },
    { value: "test3", label: "Тестовое значение #3" },
  ];

  return (
    <div className={styles.input__wrapper}>
      <p className={styles.name}>{name}</p>
      <Select
        noOptionsMessage={({ inputValue }) => "Нет результатов"}
        styles={{
          placeholder: (provided) => ({
            ...provided,
            color: "#c8c8c8",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          control: (provided, state) => ({
            ...provided,
            borderColor: backgroundColor ? backgroundColor : "#D6D8DA",
            borderRadius: "8px",
            backgroundColor,
            boxShadow: "none",
            "&:hover": {
              borderColor: "#D6D8DA",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            fontSize: "14px",
            padding: "12px 16px",
          }),
        }}
        options={options}
        {...props}
      />
    </div>
  );
};

export default SelectRS;
