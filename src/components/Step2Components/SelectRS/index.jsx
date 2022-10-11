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
            cursor: "text",
            transition: ".25s",
            "&:hover": {
              borderColor: "#757F86",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            fontSize: "16px",
            padding: "17px 14px",
          }),
        }}
        options={options}
        {...props}
      />
    </div>
  );
};

export default SelectRS;
