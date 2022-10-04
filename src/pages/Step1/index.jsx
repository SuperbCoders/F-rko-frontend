import React from "react";
import Paginator from "../../components/Paginator";
import InputRS from "../../components/InputRS";
import styles from "./styles.module.scss";
import ButtonRS from "../../components/ButtonRS";
import CheckBoxRS from "../../components/CheckBoxRS";
import cube from "../../assets/img/cube.png";
import Header from "../../components/Header";

const Step1 = () => {
  return (
    <div className={"container"}>
      <Header />
      <Paginator
        style={{
          marginTop: "64px",
          marginBottom: "16px",
        }}
      />
      <div className={styles.form}>
        <div className={styles.form__left}>
          <p className={styles.title}>Заявка на открытие расчетного счета</p>
          <div>
            <div>
              <p className={styles.input__name}>Контактное лицо</p>
              <InputRS
                placeholder={"Введите ФИО"}
                inputStyle={{ width: "100%", marginBottom: "24px" }}
              />
            </div>
            <div>
              <p className={styles.input__name}>Компания или ИП</p>
              <InputRS
                placeholder={"Введите название или ИНН"}
                inputStyle={{ width: "100%", marginBottom: "24px" }}
              />
            </div>
            <div
              className={styles.input__wrapper}
              style={{ marginBottom: "24px" }}
            >
              <p className={styles.input__name}>Номер телефона</p>
              <div className={styles.input__container}>
                <InputRS
                  inputStyle={{ maxWidth: "364px" }}
                  placeholder={"+7 (__) ___ __ __"}
                />
                <ButtonRS
                  title={"Получить код"}
                  disable={true}
                  style={{
                    marginLeft: "24px",
                    maxWidth: "267px",
                  }}
                />
              </div>
            </div>
            <div
              className={styles.input__wrapper}
              style={{
                marginBottom: "40px",
              }}
            >
              <p className={styles.input__name}>Код проверки из СМС</p>
              <div className={styles.input__container}>
                <InputRS
                  name={"Код проверки из СМС"}
                  inputStyle={{ maxWidth: "267px" }}
                />
                <p className={styles.form__notify}>
                  Повторно можно
                  <br /> отправить код через 59 сек
                </p>
              </div>
            </div>
            <div className={styles.checkbox__container}>
              <CheckBoxRS />
              <p className={styles.checkbox__name}>
                Я ознакомился и согласен с условиями{" "}
                <a href="#">резервирования счёта</a>,<br /> а также с{" "}
                <a href="#">
                  условиями обработки и хранения персональных данных
                </a>
              </p>
            </div>
            <div className={styles.buttons}>
              <ButtonRS
                view={"ghost"}
                title={"Отказаться"}
                style={{ maxWidth: "152px" }}
              />
              <ButtonRS title={"Продолжить"} style={{ maxWidth: "267px" }} />
            </div>
          </div>
        </div>
        <div className={styles.form__right}>
          <img src={cube} alt="cube" className={styles.picture} />
        </div>
      </div>
    </div>
  );
};

export default Step1;
