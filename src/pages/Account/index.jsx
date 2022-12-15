import React, { useState } from "react";
import HeaderFull from "../../components/HeaderFull";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const BidItem = ({ item }) => {
  return (
    <div className={styles.bids__item}>
      <div className={styles.content}>
        <div className={styles.left}>
          <p className={styles.title}>{item.title}</p>
          <p className={classNames(styles.status, styles[item.status.type])}>
            {item.status.text}
          </p>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.grey_color}>ИНН: {item.inn}</p>
          <p className={styles.black_color}>
            {item.number}{" "}
            <span className={styles.grey_color}>от {item.date}</span>
          </p>
          <p className={styles.black_color}>
            Зарезервирован счет №{item.score}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.progress}>
            <div className={styles.progress__line}>
              <div
                className={styles.progress__done}
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>
            <p className={styles.progress__text}>
              Выполнено: <span className={styles.procent}>{item.percent}%</span>
            </p>
          </div>
          <p className={styles.progress__tip}>{item.tip}</p>
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
  );
};

const Account = () => {
  let navigate = useNavigate();
  const [bidsList, setBidsList] = useState([
    {
      title: " Открытие первого расчётного счёта",
      status: {
        text: "Ждёт ответа клиента",
        type: "wait",
      },
      name: "ООО «ТехИнвест»",
      inn: "2901142357",
      number: "234567",
      date: "01.08.2018",
      score: "40234930880000033939",
      percent: "15",
      tip: " Для открытия счета ответьте на вопросы и приложите правоустанавливающие документы",
    },
    {
      title: " Открытие первого расчётного счёта",
      status: {
        text: "В работе",
        type: "work",
      },
      name: "ООО «ТехИнвест»",
      inn: "2901142357",
      number: "234567",
      date: "01.08.2018",
      score: "40234930880000033939",
      percent: "15",
      tip: " Для открытия счета ответьте на вопросы и приложите правоустанавливающие документы",
    },
    {
      title: " Открытие первого расчётного счёта",
      status: {
        text: "Отказ",
        type: "cancel",
      },
      name: "ООО «ТехИнвест»",
      inn: "2901142357",
      number: "234567",
      date: "01.08.2018",
      score: "40234930880000033939",
      percent: "15",
      tip: " Для открытия счета ответьте на вопросы и приложите правоустанавливающие документы",
    },
    {
      title: " Открытие первого расчётного счёта",
      status: {
        text: "Готово",
        type: "done",
      },
      name: "ООО «ТехИнвест»",
      inn: "2901142357",
      number: "234567",
      date: "01.08.2018",
      score: "40234930880000033939",
      percent: "100",
      tip: " Для открытия счета ответьте на вопросы и приложите правоустанавливающие документы",
    },
    {
      title: " Открытие первого расчётного счёта",
      status: {
        text: "Ожидает проверки",
        type: "check",
      },
      name: "ООО «ТехИнвест»",
      inn: "2901142357",
      number: "234567",
      date: "01.08.2018",
      score: "40234930880000033939",
      percent: "15",
      tip: " Для открытия счета ответьте на вопросы и приложите правоустанавливающие документы",
    },
  ]);

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
              {/* <p className={styles.item}>Клиенты</p> */}
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
              {bidsList.map((item, index) => (
                <BidItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
