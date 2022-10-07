import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);

const DatePickerRS = () => {
  const [startDate, setStartDate] = useState("");

  return (
    <DatePicker
      placeholderText="Дата"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      locale={"ru"}
      dateFormat="dd/MM/yyyy"
    />
  );
};

export default DatePickerRS;
