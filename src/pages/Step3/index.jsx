import React, { useState } from "react";
import Paginator from "../../components/Paginator";
import HeaderFull from "../../components/HeaderFull";
import styles from "./styles.module.scss";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import Modal from "../../components/Modal";
import classNames from "classnames";

const TickSymbol = () => {
  return (
    <span style={{ marginLeft: "12px" }}>
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 1L6 12L1 7"
          stroke="#D41367"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

const Step3 = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [cardList, setCardList] = useState([
    {
      id: 1,
      name: "Простой",
      desc: "Для начинающих предпринимателей",
      list: [
        { id: 1, text: "До 400 000 ₽ себе на счет для ИП бесплатно" },
        { id: 2, text: "Переводы физлицам от 1,5% + 99 ₽" },
        {
          id: 3,
          text: "49 ₽ платеж в другие банки, в Ренессанс — бесплатно",
        },
      ],
      price: 490,
    },
    {
      id: 2,
      name: "Продвинутый",
      desc: "Для малого бизнеса",
      list: [
        { id: 1, text: "До 700 000 ₽ себе на счет для ИП бесплатно" },
        { id: 2, text: "Переводы физлицам от 1% + 79 ₽" },
        {
          id: 3,
          text: " 29 ₽ платеж в другие банки, в Ренессанс — бесплатно",
        },
      ],
      price: 1990,
    },
    {
      id: 3,
      name: "Профессиональный",
      desc: "Для бизнеса с большими оборотами",
      list: [
        { id: 1, text: "До 1 млн рублей себе на счет  для ИП бесплатно" },
        { id: 2, text: "Переводы физлицам от 1% + 59 ₽" },
        {
          id: 3,
          text: "19 ₽ платеж в другие банки, в Ренессанс — бесплатно",
        },
      ],
      price: 4490,
    },
  ]);

  return (
    <>
      <div className={"container"}>
        <HeaderFull />
        <Paginator
          activeStep={3}
          style={{
            marginTop: "64px",
            marginBottom: "16px",
          }}
        />
        <div className={styles.content}>
          <p className={styles.title}>
            Тарифы на расчетно-кассовое обслуживание
          </p>
          <div className={styles.cards}>
            {cardList.map((card) => {
              const isActiveCard = card.id === activeCard;

              return (
                <div className={styles.cards__item}>
                  <p className={styles.name}>{card.name}</p>
                  <p className={styles.desc}>{card.desc}</p>

                  <ul className={styles.list}>
                    {card.list.map((listItem) => (
                      <li key={listItem.id} className={styles.list__item}>
                        {listItem.text}
                      </li>
                    ))}
                  </ul>
                  <p className={styles.price}>{card.price} руб/мес</p>
                  <button
                    className={classNames(
                      styles.button,
                      isActiveCard && styles.active
                    )}
                    onClick={() => setActiveCard(card.id)}
                  >
                    Выбрать
                    {isActiveCard && <TickSymbol />}
                  </button>
                </div>
              );
            })}
          </div>
          <p className={styles.title}>
            Выберите дополнительные продукты к подключению
          </p>
          <div className={styles.options}>
            <div className={styles.options__item}>
              <p className={styles.text}>Овердрафт</p>
              <CheckBoxRS size={"medium"} />
            </div>
            <div className={styles.options__item}>
              <p className={styles.text}>Интернет-Эквайринг</p>
              <CheckBoxRS size={"medium"} />
            </div>
          </div>
          <div className={styles.agreement}>
            <p className={styles.text}>
              Я выражаю свое согласие на обращение Банка в соответствии с
              Федеральным законом от 30.12.2004 № 218-ФЗ «О кредитных историях»
              на получение информации, характеризующей мою кредитную историю в
              одно или несколько бюро кредитных историй для получения информации
              обо мне.
            </p>
            <p className={styles.text}>
              Настоящее согласие является безотзывным и в соответствии с частью
              10 ст.6 Федерального закона от 30.12.2004 №218-ФЗ «О кредитных
              историях» действительно в течение шести месяцев со дня оформления
              и в случае заключения кредитного договора в указанный срок,
              сохраняет силу в течение всего срока действия кредитного договора.
            </p>
            <p className={styles.text}>
              Право выбора бюро кредитных историй предоставляется мной Банку по
              его усмотрению и дополнительного согласования со мной не
              требуется.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <ButtonRS
              title={"Отправить"}
              style={{
                width: "auto",
              }}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </div>
      {isShowModal && (
        <Modal onClick={() => setShowModal(false)}>
          <div className={styles.success}>
            <div className={styles.icon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.6668 24L28.0002 38.6667L21.3335 32"
                  stroke="#D41367"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="1.5"
                  y="1.5"
                  width="61"
                  height="61"
                  rx="30.5"
                  stroke="#D41367"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <p className={styles.title}>Ваша заявка успешно отправлена!</p>
            <p className={styles.desc}>В ближайшее время с вами свяжутся.</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Step3;
