import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const DatePickerRS = ({ value, required=false, className="", dateFormat="dd-MM-yyyy", open, onChange }) => {
  return (
    <DatePicker
      placeholderText="Дата"
      selected={value}
      locale="ru"
      className={className}
      open={open}
      required={required}
      dateFormat={dateFormat}
      onChange={onChange}
    />
  );
};

export default DatePickerRS;
