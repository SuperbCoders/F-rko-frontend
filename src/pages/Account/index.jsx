import React from "react";
import HeaderFull from "../../components/HeaderFull";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Account = () => {
  let navigate = useNavigate();

  return (
    <div>
      <HeaderFull />
      <div className="container">
        <div className={styles.account}>
          <div className={styles.aside}>
            <div className={styles.aside__menu}>
              <p
                className={classNames(styles.item, styles.active)}
                onClick={() => navigate("/step1")}
              >
                Добавить заявку
              </p>
              <p className={styles.item}>Клиенты</p>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.tabs}>
              <p className={classNames(styles.tabs__item, styles.active)}>
                В работе у банка
              </p>
              <p className={styles.tabs__item}>Ждёт ответа клиента</p>
              <p className={styles.tabs__item}>Подписание</p>
              <p className={styles.tabs__item}>Выполнена </p>
              <p className={styles.tabs__item}>Закрыта</p>
            </div>
            <div className={styles.filters}>
              <div className={styles.item__wrapper}>
                <input
                  type="text"
                  placeholder={"Поиск по дате"}
                  className={styles.item}
                />
              </div>
              <div className={styles.item__wrapper}>
                <input type="text" className={styles.item} />
              </div>
            </div>
            <div className={styles.bids}>
              <div className={styles.bids__item}>
                <div className={styles.content}>
                  <div className={styles.left}>
                    <p className={styles.title}>
                      Открытие первого расчётного счёта
                    </p>
                    <p className={styles.status}>Ждёт ответа клиента</p>
                    <p className={styles.name}>ООО «ТехИнвест»</p>
                    <p className={styles.grey_color}>ИНН: 2901142357</p>
                    <p className={styles.black_color}>
                      234567{" "}
                      <span className={styles.grey_color}>от 01.08.2018</span>
                    </p>
                    <p className={styles.black_color}>
                      Зарезервирован счет №40234930880000033939
                    </p>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.progress}>
                      <div className={styles.progress__line}>
                        <div
                          className={styles.progress__done}
                          style={{
                            width: "15%",
                          }}
                        />
                      </div>
                      <p className={styles.progress__text}>
                        Выполенено: <span className={styles.procent}>15%</span>
                      </p>
                    </div>
                    <p className={styles.progress__tip}>
                      Для открытия счета ответьте на вопросы и приложите
                      правоустанавливающие документы
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12.5H19"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19.5L19 12.5L12 5.5"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.bids__item}>
                <div className={styles.content}>
                  <div className={styles.left}>
                    <p className={styles.title}>
                      Открытие первого расчётного счёта
                    </p>
                    <p className={styles.status}>Ждёт ответа клиента</p>
                    <p className={styles.name}>ООО «ТехИнвест»</p>
                    <p className={styles.grey_color}>ИНН: 2901142357</p>
                    <p className={styles.black_color}>
                      234567{" "}
                      <span className={styles.grey_color}>от 01.08.2018</span>
                    </p>
                    <p className={styles.black_color}>
                      Зарезервирован счет №40234930880000033939
                    </p>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.progress}>
                      <div className={styles.progress__line}>
                        <div
                          className={styles.progress__done}
                          style={{
                            width: "50%",
                          }}
                        />
                      </div>
                      <p className={styles.progress__text}>
                        Выполенено: <span className={styles.procent}>50%</span>
                      </p>
                    </div>
                    <p className={styles.progress__tip}>
                      Для открытия счета ответьте на вопросы и приложите
                      правоустанавливающие документы
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12.5H19"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19.5L19 12.5L12 5.5"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.bids__item}>
                <div className={styles.content}>
                  <div className={styles.left}>
                    <p className={styles.title}>
                      Открытие первого расчётного счёта
                    </p>
                    <p className={styles.status}>Ждёт ответа клиента</p>
                    <p className={styles.name}>ООО «ТехИнвест»</p>
                    <p className={styles.grey_color}>ИНН: 2901142357</p>
                    <p className={styles.black_color}>
                      234567{" "}
                      <span className={styles.grey_color}>от 01.08.2018</span>
                    </p>
                    <p className={styles.black_color}>
                      Зарезервирован счет №40234930880000033939
                    </p>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.progress}>
                      <div className={styles.progress__line}>
                        <div
                          className={styles.progress__done}
                          style={{
                            width: "90%",
                          }}
                        />
                      </div>
                      <p className={styles.progress__text}>
                        Выполенено: <span className={styles.procent}>90%</span>
                      </p>
                    </div>
                    <p className={styles.progress__tip}>
                      Для открытия счета ответьте на вопросы и приложите
                      правоустанавливающие документы
                    </p>
                  </div>
                </div>
                <div>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12.5H19"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19.5L19 12.5L12 5.5"
                      stroke="#8E909B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
