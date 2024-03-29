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
import { Navigate, useNavigate } from "react-router-dom";
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
      name: "Первый ",
      desc: "Подойдёт тем, кто неавно зарегистрировал ИП или ООО и только начинает вести бизнес",
      list: [
        "Нет бесплатных платежей",
        "49 ₽ за платеж",
        "100 000 ₽ бесплатно для снятия наличных и переводов на ФЛ/Card 2 Card Далее 349 ₽ за каждые 50 000 ₽",
        "59 ₽ минимальная плата в день за использование овердрафта",
        "50 000 ₽ максимальный кэшбэк по бизнес-карте",
        "0 ₽ за SMS-уведомления",
        "0 ₽ за подключение эквайринга и сервисов для бизнеса"
      ],
      price: 0,
    },
    {
      name: "Второй",
      desc: "Оптимальный тариф для тех, чей бизнес начал приносить первую прибыль",
      list: [
        "5 платежей бесплатно",
        "29 ₽ за платеж сверх лимита",
        "200 000 ₽ бесплатно для снятия наличных и переводов на ФЛ/Card 2 Card Далее 349 ₽ за каждые 50 000 ₽",
        "59 ₽ минимальная плата в день за использование овердрафта",
        "50 000 ₽ максимальный кэшбэк по бизнес-карте",
        "0 ₽ за SMS-уведомления",
        "0 ₽ за подключение эквайринга и сервисов для бизнеса"
      ],
      price: 490,
    },
    {
      name: "Третий",
      desc: "Для активно растущего бизнеса, который выходит на новые рынки",
      list: [
        "50 платежей бесплатно",
        "19 ₽ за платеж сверх лимита 300 000 ₽ бесплатно для снятия наличных и переводов на ФЛ и Card/Card Далее 349 ₽ за каждые 50 000 ₽",
        "59 ₽ минимальная плата в день за использование овердрафта",
        "50 000 ₽ максимальный кэшбэк по бизнес-карте",
        "0 ₽ за SMS-уведомления",
        "0 ₽ за подключение эквайринга и сервисов для бизнеса"
      ],
      price: 1490,
    },
  ]

  const navigate = useNavigate();

  const { data, info, setData } = React.useContext(RequisitesContext)

  const [isShowModal, setShowModal] = useState(false);
  const [additionals, setAdditionals] = React.useState(["СМС-оповещение"])
  const [activeCard, setActiveCard] = useState("");
  const [disableUI, setDisableUI] = React.useState(false)
  const [isSubed, setIsSubed] = React.useState(false)
  const [showTerms, setShowTerms] = React.useState(false)

  React.useEffect(() => window.scrollTo(0, 0), []);

  const toggle = (e) => {
    const content = e.target.nextElementSibling
    if (!content) {
      return 
    }

    if (content.style.maxHeight) {
      content.style.maxHeight = null
      e.target.classList.remove("active")
      content.style.marginTop = 0
    } else {
      e.target.classList.add("active")
      content.style.maxHeight = content.scrollHeight + "px"
      content.style.marginTop = "15px"
    }
  }

  const onCheck = (name) => () => setAdditionals(prev => prev.includes(name) ? prev.filter(a => a !== name ) : [...prev, name] ) 

  const onSubmit = async () => {
    const dto = {
      ...data,
      addresses: data.addresses.map(({ type_adress, address }) => ({ 
        type_adress, 
        legal_address: type_adress === "Юридический" ? address : "", 
        mail_address: type_adress === "Почтовый" ? address : "",
        address
      })),
      tariff: activeCard ? activeCard : "",
      additional_products: additionals,
      sms_sending: isSubed,
      is_finished: true
    }

    try {
      setDisableUI(true)
      await userApi.postInfo(dto, data.contact_number)
      localStorage.removeItem("rko_name")
      localStorage.removeItem("rko_info")
      localStorage.removeItem("rko_data")
      localStorage.removeItem("contact_number")
      localStorage.setItem("rko_active_step", 1)
      setData(initData)
      setDisableUI(false)
      setShowModal(true)
    } catch (error) {
      setDisableUI(false)
    }
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
            {cardList.map(({ name, desc, price, list }) => 
              <div
                key={name}
                className={styles.cards__item}
                onClick={() => setActiveCard(name)}
              >
                <p className={styles.name}>{name}</p>
                <p className={styles.desc}>{desc}</p>

                <ul className={styles.list}>
                  {list.map((text, idx) => 
                    <li key={idx} className={styles.list__item}>
                      {text}
                    </li>
                  )}
                </ul>
                <p className={styles.price}>{price} руб/мес</p>
                <button
                  className={classNames(styles.button, name === activeCard && styles.active)}
                >
                  {name === activeCard ? "Выбрано" : "Выбрать"}
                  {name === activeCard && <TickSymbol />}
                </button>
              </div>
            )}
          </div>

          <div className="flex jcc">
            <button
              className={classNames(styles.button, activeCard === "" && styles.active)}
              type="button"
              onClick={() => setActiveCard("")}
            >
              Выбрать позже
              {activeCard === "" && <TickSymbol />}
            </button>
          </div>

          <div className="mt60">
            <p className={styles.title}>
              Выберите дополнительные продукты к подключению
            </p>
            <div className={styles.options}>
              <div className={styles.options__item}>
                <p className={styles.text}>СМС-оповещение</p>
                <CheckBoxRS
                  isChecked={true} 
                  size="medium" 
                  onChange={() => {}}
                />
              </div>
              <div className={styles.options__item}>
                <div>
                  <p className={styles.text}>Интернет-эквайринг</p>
                  <p className="p mt10">Торговый-эквайринг - Способ безналичного приема платежей за товары либо услуги банковской картой</p>
                </div>
                <CheckBoxRS
                  isChecked={additionals.includes("Интернет-эквайринг")} 
                  size="medium" 
                  onChange={onCheck("Интернет-эквайринг")}
                />
              </div>
              <div className={styles.options__item}>
                <div>
                  <p className={styles.text}>Комьюнити</p>
                  <p className="p mt10">
                    Бесплатный онлайн-сервис для поиска бизнес-партнёров. Собирает и обрабатывает информацию о предпринимателях на множестве различных платформ, формирует подборку интересных контактов, представляет и знакомит предпринимателей друг с другом.
                  </p>
                </div>
                <CheckBoxRS
                  isChecked={additionals.includes("Комьюнити")} 
                  size="medium" 
                  onChange={onCheck("Комьюнити")}
                />
              </div>
              <div className={styles.options__item}>
                <div>
                  <p className={styles.text}>Бухгалтерия</p>
                  <p className="p mt10">
                    Онлайн-сервис по ведению бухгалтерского учета и дистанционной сдаче налогов и сборов в ФНС и различные фонды. Сервис интегрирован с интернет-банком и мобильным банком. Стоимость сервиса - от 833 Р/месяц.
                  </p>
                </div>
                <CheckBoxRS
                  isChecked={additionals.includes("Бухгалтерия")} 
                  size="medium" 
                  onChange={onCheck("Бухгалтерия")}
                />
              </div>
              <div className={styles.options__item}>
                <div>
                  <p className={styles.text}>Юридическая поддержка</p>
                  <p className="p mt10">
                    Услуги юридической поддержки по бизнесу и личным вопросам. После подключения услуги в режиме 24/7 можно получать консультации профессиональных юристов. Стоимость услуги - от 500 Р/месяц.
                  </p>
                </div>
                <CheckBoxRS
                  isChecked={additionals.includes("Юридическая поддержка")} 
                  size="medium" 
                  onChange={onCheck("Юридическая поддержка")}
                />
              </div>
              <div className={styles.options__item}>
                <div>
                  <p className={styles.text}>Продвижение</p>
                  <p className="p mt10">
                    Услуга продвижения бизнеса на онлайн-площадках. Выдается промо-код, позволяющий увеличить рекламный бюджет. Выдача промо-кода - бесплатно.а продвижения бизнеса на онлайн-площадках. Выдается промо-код, позволяющий увеличить рекламный бюджет. Выдача промо-кода - бесплатно.
                  </p>
                </div>
                <CheckBoxRS
                  isChecked={additionals.includes("Продвижение")} 
                  size="medium" 
                  onChange={onCheck("Продвижение")}
                />
              </div>

              <div className={styles.options__item}>
                <p className={styles.text}>Овердрафт</p>
                <CheckBoxRS
                  isChecked={additionals.includes("Овердрафт")} 
                  size="medium" 
                  onChange={onCheck("Овердрафт")}
                />
              </div>

              <div className={styles.agreement}>
                <button
                  className={styles.toggle}
                  onClick={toggle}
                >
                  Согласие на получение информационной рассылки
                </button>
                <div className={styles.foldable} style={{ maxHeight: "100%" }}>
                  <div className="flex aic">
                    <label className="mr15">
                      <input 
                        type="checkbox"
                        checked={isSubed}
                        name="sub"
                        className="agree__radio-real"
                        onChange={() => setIsSubed(!isSubed)}
                      />
                      <span className="agree__toggle"></span>
                    </label>
                    <p className={styles.text}>
                      Заявитель дает согласие на получение им предложений, информации о продуктах/ услугах, рекламы и иной информации от Банка, Партнеров Банка по почте, по сетям электросвязи, в том числе путем контактов по телефону, электронной почте, с помощью СМС - сообщений и иными способами.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.agreement}>
            <p className={styles.text}>
              Нажимая на кнопку «Отправить», вы соглашаетесь с условиями подачи заявки и обработки персональных данных
            </p>

            <button
              className={`${styles.toggle} ${styles.toggle__plain}`}
              onClick={() => setShowTerms(true)}
            >
              Согласие на обработку персональных данных
            </button>
          </div>
          <div className="mt60" style={{ textAlign: "right" }}>
            <ButtonRS
              title="Отправить"
              style={{ width: "auto" }}
              disable={disableUI}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
      {showTerms &&
        <Modal onClick={() => setShowTerms(false)}>
          <div className={styles.success} style={{ maxWidth: "80%", textAlign: "left" }}>
            <p className="p fw500">Согласие на обработку персональных данных</p>
            <p className="p mt10">
              Настоящим Заявитель предоставляет КБ «Ренессанс Кредит» (ООО) (ОГРН 1027739586291, 115114, г. Москва, Кожевническая улица, д.14) (далее – Банк) согласие на обработку (совершение любых действий с использованием средств автоматизации или без, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокировку, удаление, уничтожение) Банком, Партнерами Банка и иными лицами, с которыми Банк заключит договоры на оказание услуг для исполнения обязательств Банка перед Клиентом в рамках Договоров на предоставление Услуги, путем осуществления контактов с помощью средств связи, всех своих персональных данных и/или своего фото- и/или видео изображения, и/или аудиозапись своего голоса в целях проверки достоверности
              предоставленных им сведений, комплексной оценки своего финансового состояния, а также в целях продвижения услуг Банка и Партнеров Банка на рынке. Согласие действует в течение сроков хранения документов и сведений, содержащих персональные данные, установленных законодательством Российской Федерации, и может быть отозвано путем предоставления письменного заявления в Банк.
            </p>
            {info.current?.type === "INDIVIDUAL" && <div className="mt25">
              <p className="p fw500">Согласие на использование ПЭП</p>
              <p className="p">
                Настоящим Заявитель в соответствии со ст. 428 Гражданского кодекса Российской Федерации присоединяется к Соглашению об использовании простой электронной подписи физического лица (далее – Соглашение ПЭП ФЛ), подтверждает, что ознакомлен с Соглашением ПЭП ФЛ, опубликованным на Сайте Банка, выражает свое согласие с ним и обязуется его выполнять.
              </p>
            </div>}

            {additionals.includes("Овердрафт") && <div className="mt25">
              <p className="p fw500">
                Согласие для Бюро кредитных историй
              </p>
              <p className="p mt10">
                Настоящим Клиент, а также Заявитель, выражают свое согласие на получение Банком в отношении Клиента и Заявителя кредитных отчетов из любых бюро кредитных историй с целью проверки сведений, предоставленных Клиентом при заключении и исполнении Договора кредитования счета и Заявителем при заключении и исполнении Договора поручительства, оценки финансового состояния Клиента и Заявителя, а также формирования Банком для Клиента и Заявителя предложений по кредитным продуктам.
                Заявитель, являющийся пользователем номера мобильного телефона, указанного в настоящем Комплексном заявлении, выражает согласие ПАО “Вымпел-Коммуникации» (ОГРН 1027700166636) (далее – Оператор) на обработку сведений о себе, как об абоненте, в том числе: о номере мобильного телефона, абонентском оборудовании (далее-Оборудование), о международном идентификаторе sim-карты, об изменениях номера мобильного телефона на sim-карте/номера Оборудования/номера абонентского договора, об оформлении номера мобильного телефона на иное лицо, о расторжении договора в отношении номера мобильного телефона/перенесения номера мобильного телефона в сеть другого Оператора, приостановки/возобновлении предоставления услуг на номере мобильного телефона, иные данные о номере мобильного телефона, об оказанных Оператором услугах связи (сведений об оплате услуг связи, идентификаторах, местонахождении Оборудования при оказании услуг связи) и передачу результата обработки Банку для проверки предоставленных Заявителем данных, а также для других законных целей. Согласие дано на срок до его отзыва.
              </p>
            </div>}

            {additionals.includes("Овердрафт") && info.current?.type === "INDIVIDUAL" && <div className="mt25">
              <p className="p fw500">Подтверждение присоединения к условиям поручительства</p>
              <p className="p mt10">
                Настоящим Заявитель в обеспечение исполнения Клиентом всех обязательств по Договору кредитования счета в соответствии со ст. 428 Гражданского кодекса Российской Федерации присоединяется к Условиям поручительства, опубликованным на Сайте Банка, и подтверждает, что ознакомился с Договором кредитования счета и Договором поручительства в полном объеме, полностью и всецело понимает их содержание, принимает их условия и обязуется их выполнять.
                Заявитель соглашается на получение Банком кредитных отчетов о Заявителе из любых бюро кредитных историй с целью проверки сведений, предоставленных Заявителем при заключении и исполнении Договора поручительства, оценки финансового состояния Заявителя, а также формирования Банком для Заявителя предложений по кредитным продуктам.
                Заявитель, являющийся пользователем номера мобильного телефона, указанного в настоящем Комплексном заявлении, дает согласие ПАО «Вымпел-Коммуникации» (ОГРН 1027700166636) (далее – Оператор) на обработку сведений о себе, как об абоненте, в том числе: о номере мобильного телефона, абонентском оборудовании (далее-Оборудование), о международном идентификаторе sim-карты, об изменениях номера мобильного телефона на sim-карте/номера Оборудования/номера абонентского договора, об оформлении номера мобильного телефона на иное лицо, о расторжении договора в отношении номера мобильного телефона/перенесения номера мобильного телефона в сеть другого Оператора, приостановки/возобновлении
                предоставления услуг на номере мобильного телефона, иные данные о номере мобильного телефона, об оказанных Оператором услугах связи (сведений об оплате услуг связи, идентификаторах, местонахождении Оборудования при оказании услуг связи) и передачу результата обработки Банку для проверки предоставленных мной данных, а также для других законных целей. Согласие дано на срок до его отзыва.
              </p>
            </div> }

            <p className="p fw500 mt25">
              Согласие на обработку сведений об абоненте
            </p>
            <p className="p mt10">
              Заявитель, являющийся пользователем номера мобильного телефона, указанного в настоящей Анкете, выражает согласие ПАО «Вымпел-Коммуникации» (ОГРН 1027700166636) (далее – Оператор) на обработку сведений о себе, как об абоненте, в том числе: о номере мобильного телефона, абонентском оборудовании (далее-Оборудование), о международном идентификаторе sim- карты, об изменениях номера мобильного телефона на sim-карте/ номера Оборудования/ номера абонентского договора, об оформлении номера мобильного телефона на иное лицо, о расторжении договора в отношении номера мобильного телефона/ перенесения номера мобильного телефона в сеть другого Оператора, приостановки/ возобновлении предоставления услуг на номере мобильного телефона, иные данные о номере мобильного телефона, об оказанных Оператором услугах связи (сведений об оплате услуг связи, идентификаторах, местонахождении Оборудования при оказании услуг связи) и передачу результата обработки Банку для проверки предоставленных Заявителем данных, а также для других законных целей. Согласие дано на срок до его отзыва.
            </p>
          </div>
        </Modal>
      }
      {isShowModal && (
        <Modal onClick={() => {
          setShowModal(false)
          navigate(ROUTES.STEP1)
        }}>
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
