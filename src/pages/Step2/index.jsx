import React from "react";
import Paginator from "../../components/Paginator";
import styles from "./styles.module.scss";
import classNames from "classnames";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import { useNavigate } from "react-router-dom";
import HeaderMy from "../../components/HeaderMy";

const IconLock = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z"
        stroke="#ADB2B6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6665 7.33337V4.66671C4.6665 3.78265 5.01769 2.93481 5.64281 2.30968C6.26794 1.68456 7.11578 1.33337 7.99984 1.33337C8.88389 1.33337 9.73174 1.68456 10.3569 2.30968C10.982 2.93481 11.3332 3.78265 11.3332 4.66671V7.33337"
        stroke="#ADB2B6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Input = ({ name, value = "", placeholder }) => {
  return (
    <div className={styles.input__wrapper}>
      <p className={styles.name}>{name}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={classNames(styles.input)}
      />
    </div>
  );
};

const InputLock = ({ name, value }) => {
  return (
    <div className={styles.input__wrapper}>
      <p className={styles.name}>{name}</p>
      <input
        type="text"
        value={value}
        className={classNames(styles.input, styles.locked)}
      />
      <span className={styles.lock}>
        <IconLock />
      </span>
    </div>
  );
};

const Step2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderMy />
      <div className={"container"}>
        <Paginator
          activeStep={2}
          style={{
            marginTop: "105px",
            marginBottom: "16px",
          }}
        />
        <p className={styles.title}>Заполните анкету и прикрепите документы</p>
        <div className={styles.company}>
          <p className={styles.title_block}>Реквизиты компании</p>
          <div className={styles.content}>
            <div className={styles.column}>
              <div className={styles.row}>
                <InputLock
                  name={"Краткое наименование"}
                  value={"ООО «Ромашка»"}
                />
              </div>
              <div className={styles.row}>
                <InputLock
                  name={"Полное наименование"}
                  value={"Общество с ограниченной ответственностью «Ромашка»"}
                />
              </div>
              <div className={styles.row}>
                <InputLock name={"Дата регистрации"} value={"01.01.2022"} />
                <InputLock name={"Дата внесения ОГРН"} value={"01.01.2022"} />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.row}>
                <InputLock name={"ИНН"} value={"12345677890"} />
                <InputLock name={"КПП"} value={"12345677890"} />
                <InputLock name={"ОГРН"} value={"12345677890"} />
              </div>
              <div className={styles.row}>
                <InputLock
                  name={"Наименование регистрирующего органа"}
                  value={"ИНФНС №46 по г. Москва"}
                />
              </div>
              <div className={styles.row}>
                <InputLock name={"Основной ОКВЭД"} value={"123456778"} />
                <InputLock name={"ОКТМО"} value={"123456778"} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={styles.title_block}>Адреса</p>
          <div className={styles.content}>
            <div className={styles.row}>
              <div>
                <p className={styles.name_option}>Адрес</p>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Юридический</p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Фактический</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.column}>
              <div className={styles.row}>
                <Input name={"Адрес"} placeholder={"Напишите адрес"} />
              </div>
              <div className={styles.row}>
                <Input name={"Почтовый адрес"} placeholder={"Напишите адрес"} />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.row}>
                <Input name={"Основание"} placeholder={"Аренда"} />
              </div>
              <div className={styles.row}>
                <Input name={"Основание"} placeholder={"Аренда"} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right", margin: "40px 0" }}>
          <ButtonRS
            title={"Продолжить"}
            style={{ width: "auto" }}
            onClick={() => navigate("/step3")}
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
