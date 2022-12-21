import React, { useState } from "react";
import Paginator from "../../components/Paginator";
import styles from "./styles.module.scss";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import Modal from "../../components/Modal";
import classNames from "classnames";
import HeaderMy from "../../components/HeaderMy";
import { initData, RequisitesContext } from "../../contexts/companyRequisits";
import { userApi } from "../../api";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../helpers";

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
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};

export const Protector = ({ children }) => {
  const activeStep = parseInt(localStorage.getItem("rko_active_step") ?? 1)
  if (activeStep === 2) {
    return <Navigate to={ROUTES.STEP2} replace />
  } else if (activeStep !== 3) {
    return <Navigate to={ROUTES.STEP1} replace />
  } else {
    return children
  }
}

const Step3 = () => {
  const cardList = [
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
  ]

  const { data, setData } = React.useContext(RequisitesContext)

  const [isShowModal, setShowModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [overdraft, setOverdraft] = useState(false);
  const [acquire, setAcquire] = useState(false);

  React.useEffect(() => window.scrollTo(0, 0), []);

  const toggle = (e) => {
    const content = e.target.nextElementSibling
    if (!content) {
      return 
    }

    if (content.style.maxHeight) {
      content.style.maxHeight = null
      e.target.classList.remove("active")
    } else {
      e.target.classList.add("active")
      content.style.maxHeight = content.scrollHeight + "px"
    }
  }

  const onSubmit = async () => {
    const { start_date, end_date } = data

    const formattedPhone = data.contact_number.replace(/\(|\)+|-|\s|/g, "") // убираем пробелы, дефисы, скоблки

    const dto = {
      ...data,
      addresses: data.addresses.map(({ type_adress, basis, address }) => ({ 
        type_adress, 
        legal_address: type_adress === "Юридический" ? address : "", 
        physic_address: type_adress === "Фактический" ? address : "",
        mail_address: type_adress === "Почтовый" ? address : "",
        basis,
        address
      })),

      start_date: typeof start_date === "object" ? `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}` : start_date,
      end_date: typeof end_date === "object" ? `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}` : end_date,
      is_finished: true
    }

    await userApi.postInfo(dto, formattedPhone)
    localStorage.removeItem("rko_name")
    localStorage.removeItem("rko_data")
    localStorage.setItem("rko_active_step", 1)
    setData(initData)
    setShowModal(true)
  }

  return (
    <>
      <HeaderMy />
      <div className="container">
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
            {cardList.map(({ id, name, desc, price, list }) => 
              <div
                key={id}
                className={styles.cards__item}
                onClick={() => setActiveCard(id)}
              >
                <p className={styles.name}>{name}</p>
                <p className={styles.desc}>{desc}</p>

                <ul className={styles.list}>
                  {list.map(({ id, text }) => 
                    <li key={id} className={styles.list__item}>
                      {text}
                    </li>
                  )}
                </ul>
                <p className={styles.price}>{price} руб/мес</p>
                <button
                  className={classNames(styles.button, id === activeCard && styles.active)}
                >
                  {id === activeCard ? "Выбрано" : "Выбрать"}
                  {id === activeCard && <TickSymbol />}
                </button>
              </div>
            )}
          </div>
          <p className={styles.title}>
            Выберите дополнительные продукты к подключению
          </p>
          <div className={styles.options}>
            <div
              className={styles.options__item}
            >
              <p className={styles.text}>Овердрафт</p>
              <CheckBoxRS
                isChecked={overdraft} 
                size="medium" 
                onChange={() => setOverdraft((prevState) => !prevState)}
              />
            </div>
            <div
              className={styles.options__item}
            >
              <p className={styles.text}>Интернет-Эквайринг</p>
              <CheckBoxRS 
                isChecked={acquire} 
                size="medium" 
                onChange={() => setAcquire((prevState) => !prevState)}
              />
            </div>
          </div>
          <div className={styles.agreement}>
            <p className={styles.text}>
              Нажимая на кнопку «Отправить», вы соглашаетесь с условиями подачи заявки и обработки персональных данных
            </p>

            <button
              className={styles.toggle}
              onClick={toggle}
            >
              Согласие на обработку персональных данных
            </button>
            <div className={styles.text_wrap}>
              <p className={styles.text}>
                Настоящим Заявитель предоставляет КБ «Ренессанс Кредит» (ООО) (ОГРН 1027739586291, 115114, г. Москва, Кожевническая улица, д.14) (далее – Банк) согласие на обработку (совершение любых действий с использованием средств автоматизации или без, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокировку, удаление, уничтожение) Банком, Партнерами Банка и иными лицами, с которыми Банк заключит договоры на оказание услуг для исполнения обязательств Банка перед Клиентом в рамках Договоров на предоставление Услуги, путем осуществления контактов с помощью средств связи, всех своих персональных данных и/или своего фото- и/или видео изображения, и/или аудиозапись своего голоса в целях проверки достоверности
                предоставленных им сведений, комплексной оценки своего финансового состояния, а также в целях продвижения услуг Банка и Партнеров Банка на рынке. Согласие действует в течение сроков хранения документов и сведений, содержащих персональные данные, установленных законодательством Российской Федерации, и может быть отозвано путем предоставления письменного заявления в Банк.
              </p>
              <p className={styles.text}>
                При возможности выводить согласие на использование ПЭП только если клиент является индивидуальным предпринимателем (ОПФ клиента = “Индивидуальный предприниматель” или ОКОПФ клиента = “50102”)
                Согласие на использование ПЭП
                Настоящим Заявитель в соответствии со ст. 428 Гражданского кодекса Российской Федерации присоединяется к Соглашению об использовании простой электронной подписи физического лица (далее – Соглашение ПЭП ФЛ), подтверждает, что ознакомлен с Соглашением ПЭП ФЛ, опубликованным на Сайте Банка, выражает свое согласие с ним и обязуется его выполнять.
              </p>
              <p className={styles.text}>
                Согласие на обработку сведений об абоненте Заявитель, являющийся пользователем номера мобильного телефона, указанного в настоящей Анкете, выражает согласие ПАО «Вымпел-Коммуникации» (ОГРН 1027700166636) (далее – Оператор) на обработку сведений о себе, как об абоненте, в том числе: о номере мобильного телефона, абонентском оборудовании (далее-Оборудование), о международном идентификаторе sim- карты, об изменениях номера мобильного телефона на sim-карте/ номера Оборудования/ номера абонентского договора, об оформлении номера мобильного телефона на иное лицо, о расторжении договора в отношении номера мобильного телефона/ перенесения номера мобильного телефона в сеть другого Оператора, приостановки/ возобновлении предоставления услуг на номере мобильного телефона, иные данные о номере мобильного телефона, об оказанных Оператором услугах связи (сведений об оплате услуг связи, идентификаторах, местонахождении Оборудования при оказании услуг связи) и передачу результата обработки Банку для проверки предоставленных Заявителем данных, а также для других законных целей. Согласие дано на срок до его отзыва.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <ButtonRS
              title="Отправить"
              style={{ width: "auto" }}
              onClick={onSubmit}
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
