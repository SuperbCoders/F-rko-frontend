import React, { useState } from "react";
import styles from "../../pages/Step2/styles.module.scss";
import Select from "react-select";
import { requestDaData } from "../../api/DaData";

const DaDataSelect = ({
  name,
  valueInput,
  setValueInput,
  backgroundColor,
  ...props
}) => {
  const [optionsList, setOptionsList] = useState([]);

  return (
    <div className={styles.input__wrapper}>
      {name ? <p className={styles.name}>{name}</p> : null}
      <Select
        onChange={(choice) => console.log(choice)}
        isClearable
        onInputChange={(text) => {
          requestDaData(text.trim())
            .then((data) => data.json())
            .then((data) => {
              const newState = [];
              const suggestions = data.suggestions;
              suggestions.forEach((item) => {
                const address = item.data.address.unrestricted_value;
                const inn = item.data.inn;
                const name = item.value;
                newState.push({ value: inn, label: `${name} ${address}` });
              });
              setOptionsList(newState);
            });
        }}
        noOptionsMessage={({ inputValue }) => {
          if (inputValue) {
            return "Нет результатов";
          }
          return "Введите название или ИНН";
        }}
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
        options={optionsList}
        {...props}
      />
    </div>
  );
};

export default DaDataSelect;
