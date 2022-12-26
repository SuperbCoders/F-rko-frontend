import React, { useState } from "react";
import Select from "react-select";
import { requestCountries, requestCodes, requestDaData } from "../../api/DaData";

const DaDataSelect = ({
  name,
  value,
  setValueInput,
  onSelect,
  nameStyles={ color: "#8E909B", fontSize: "14px", marginBottom: "8px" },
  error,
  backgroundColor="",
  message="Введите название или ИНН",
  formatedOptions,
  isCountries=false,
  isCode=false,
  style={},
  ...props
}) => {
  const [optionsList, setOptionsList] = useState([]);
  if (!formatedOptions) {
    formatedOptions = (list) => list.map((item) => ({ value: item, label: `${item.value} ${item.data.address.unrestricted_value}` }))
  }
  
  const noOptionsMessage = ({ inputValue }) => inputValue ? "Нет результатов" : message

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
      backgroundColor,
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
    if (isCountries) {
      requestCountries(text.trim())
      .then((data) => data.json())
      .then((data) => {
        const russiaOption = data.suggestions.find(s => s.value === "Россия") 
        setOptionsList(
          russiaOption
          ? [ russiaOption, ...data.suggestions.filter(s => s.value !== "Россия") ]
          : data.suggestions
        )
      })
    } else if (isCode) {
      requestCodes(text.trim())
        .then((data) => data.json())
        .then((data) => { console.log(data.suggestions); setOptionsList(data.suggestions) })

    } else {
      requestDaData(text.trim())
      .then((data) => data.json())
      .then((data) => setOptionsList(data.suggestions))
    }
  }

  return (
    <div className={styles.input__wrapper} style={style}>
      {name ? <p className={styles.name} style={nameStyles}>{name}</p> : null}
      <Select
        value={{ value, label: value }}
        isClearable
        noOptionsMessage={noOptionsMessage}
        styles={styles}
        options={formatedOptions(optionsList)}
        onChange={onSelect}
        onInputChange={onChange}
        {...props}
      />
    </div>
  );
};

export default DaDataSelect;
