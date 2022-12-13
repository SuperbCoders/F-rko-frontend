import React, { useState } from "react";
import Select from "react-select";
import { requestDaData } from "../../api/DaData";

const DaDataSelect = ({
  name,
  value,
  setValueInput,
  onSelect,
  error,
  ...props
}) => {
  const [optionsList, setOptionsList] = useState([]);
  const formatedOptions = optionsList.map((item) => ({ value: item, label: `${item.value} ${item.data.address.unrestricted_value}` }))
  
  const noOptionsMessage = ({ inputValue }) => inputValue ? "Нет результатов" : "Введите название или ИНН"

  const styles = {
    placeholder: (provided) => ({
      ...provided,
      color: "#c8c8c8",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    control: (provided) => ({
      ...provided,
      borderColor: error ? "red" : "#D6D8DA",
      borderRadius: "8px",
      boxShadow: "none",
      transition: ".25s",
      "&:hover": {
        borderColor: "#757F86",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      fontSize: "16px",
      padding: "16px",
    })
  }
  const onChange = (text) => {
    requestDaData(text.trim())
    .then((data) => data.json())
    .then((data) => setOptionsList(data.suggestions));
  }
  return (
    <div className={styles.input__wrapper}>
      {name ? <p className={styles.name}>{name}</p> : null}
      <Select
        value={{ value, label: value }}
        isClearable
        noOptionsMessage={noOptionsMessage}
        styles={styles}
        options={formatedOptions}
        onChange={onSelect}
        onInputChange={onChange}
        {...props}
      />
    </div>
  );
};

export default DaDataSelect;
