import React, { useState } from "react";
import styles from "./styles.module.scss";
import CheckBoxRS from "../CheckBoxRS";
import ButtonRS from "../ButtonRS";
import InputRS from "../InputRS";
import { useNavigate } from "react-router-dom";
import PhoneInput from "../PhoneInput";
import { ROUTES } from "../../helpers";
import { AuthContext } from "../../contexts/auth";
import { RequisitesContext } from "../../contexts/companyRequisits";

const LoginForm = () => {
  const { auth: { phone }, setAuth } = React.useContext(AuthContext)
  const { setData } = React.useContext(RequisitesContext)
  const initialFields = {
    phone: {
      value: "",
      valid: false,
      required: true,
      validationFn: (str) => /[0-9]+/.test(str[17])
    }
  }

  React.useEffect(() => setFields({
    ...fields,
    phone: {
      ...fields.phone,
      value: phone,
      valid: fields.phone.validationFn(phone)
    }
  }), [phone])

  const navigate = useNavigate();
  const [showErrors, setShowErrors] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(true)
  const [code, setCode] = useState("");
  const [fields, setFields] = React.useState(initialFields)

  const onChange = (name) => (e) => setFields({
    ...fields,
    [name]: {
      ...fields[name],
      value: e.target.value,
      valid: fields[name].validationFn(e.target.value)
    }
  })

  const onLogin = (e) => {
    e.preventDefault()

    setShowErrors(true)
    if (!fields.phone.valid) {
      return
    }

    setData(prev => ({ ...prev, contact_number: fields.phone.value }))
    setAuth({ isAuthed: true, phone: fields.phone.value })
    localStorage.setItem("login_number", fields.phone.value)
    localStorage.setItem("contact_number", fields.phone.value)
    navigate(ROUTES.ACCOUNT)
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__header}>
        <p className={styles.form__title}>Вход в личный кабинет</p>
        <p className={styles.form__subtitle}>
          Или{" "}
          <a href="#" className={styles.link}>
            создайте личный кабинет
          </a>
          , если нет личного кабинет
        </p>
      </div>
      <form onSubmit={onLogin}>
        <div className={styles.inputs}>
          <div className={styles.input__wrapper}>
            <p className={styles.input__name}>Номер телефона</p>
            <div className={styles.input__container}>
              <PhoneInput
                value={fields.phone.value}
                onChange={onChange("phone")}
                className={showErrors && !fields.phone.valid ? "error" : ""}
              />
              <ButtonRS
                title="Получить код"
                disable={!/[0-9]+/.test(code[17])}
                style={{
                  marginLeft: "8px",
                  maxWidth: "186px",
                }}
              />
            </div>
          </div>
          <div className={styles.input__wrapper}>
            <p className={styles.input__name}>Код проверки из СМС</p>
            <div className={styles.input__container}>
              <InputRS
                name={"Код проверки из СМС"}
                inputStyle={{ maxWidth: "170px" }}
              />
              <p className={styles.form__notify}>
                Повторно можно
                <br /> отправить код через 59 сек
              </p>
            </div>
          </div>
          <div className={styles.remember}>
            <CheckBoxRS
              isChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            >
              <p className={styles.remember__text}>Запомнить</p>
            </CheckBoxRS>
          </div>
        </div>
        <ButtonRS 
          title="Войти" 
          type="submit"
        />
      </form>
    </div>
  );
};

export default LoginForm;
