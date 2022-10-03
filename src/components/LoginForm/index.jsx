import React from "react";
import styles from "./styles.module.scss";
import CheckBoxRS from "../CheckBoxRS";
import ButtonRS from "../ButtonRS";

const LoginForm = () => {
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

      <div className={styles.inputs}>
        <div className={styles.input__wrapper}>
          <p className={styles.input__name}>Номер телефона</p>
          <div className={styles.input__container}>
            <input
              className={styles.input}
              type="text"
              placeholder={"+7 (__) ___ __ __"}
              style={{ maxWidth: "267px" }}
            />
            <ButtonRS
              title={"Получить код"}
              disable={true}
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
            <input
              className={styles.input}
              type="text"
              style={{ maxWidth: "170px" }}
            />
            <p className={styles.form__notify}>
              Повторно можно
              <br /> отправить код через 59 сек
            </p>
          </div>
        </div>
        <div>
          <CheckBoxRS title={"Запомнить"} />
        </div>
      </div>
      <ButtonRS title={"Войти"} />
    </div>
  );
};

export default LoginForm;
