import React from "react";
import classNames from "classnames";
import styles from "../Step2/styles.module.scss";
import SelectRS from "../../components/Step2Components/SelectRS";
import Input from "../../components/Step2Components/Input";
import DateInput from "../../components/Step2Components/DateInput";

const Index = () => {
  return (
    <>
      <div className={classNames(styles.row, "bg-grey", "form")}>
        <SelectRS
          name={"Тип документа"}
          placeholder={"Выберите тип"}
          backgroundColor={"#F0F2F5"}
        />
        <Input name={"Серия (если имеется)"} placeholder={"Введите серию"} />
        <Input name={"Номер"} placeholder={"Введите номер"} />
      </div>
      <div className={classNames(styles.row, "bg-grey", "form")}>
        <DateInput
          name={"Дата начала срока действия права пребывания (проживания)"}
        />
        <DateInput
          name={"Дата окончания срока действия права пребывания (проживания)"}
        />
      </div>
    </>
  );
};

export default Index;
