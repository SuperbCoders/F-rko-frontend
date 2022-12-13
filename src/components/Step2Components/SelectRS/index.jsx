import React from "react";
import Select from "react-select";

const opts = [
  { value: "test1", label: "Тестовое значение #1" },
  { value: "test2", label: "Тестовое значение #2" },
  { value: "test3", label: "Тестовое значение #3" },
];

const SelectRS = ({ name, nameStyles={}, backgroundColor,  options=opts, value, defaultValue="", onChange, ...props }) => {
  const styles = {
    placeholder: (provided) => ({ ...provided, color: "#c8c8c8" }),
    indicatorSeparator: () => ({ display: "none" }),
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
    valueContainer: (provided) => ({ ...provided, fontSize: "16px", padding: "17px 14px" }),
  }
  return (
    <div className={styles.input__wrapper}>
      <p style={nameStyles} className={styles.name}>{name}</p>
      <Select
        defaultValue={defaultValue}
        value={value}
        noOptionsMessage={() => "Нет результатов"}
        styles={styles}
        options={options}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default SelectRS;
