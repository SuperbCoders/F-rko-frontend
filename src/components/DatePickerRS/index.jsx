import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const DatePickerRS = ({ value, required=false, className="", onChange }) => {
  return (
    <DatePicker
      placeholderText="Дата"
      selected={value}
      locale="ru"
      className={className}
      required={required}
      dateFormat="yyyy-MM-dd"
      onChange={onChange}
    />
  );
};

export default DatePickerRS;
