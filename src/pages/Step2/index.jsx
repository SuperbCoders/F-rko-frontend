import React, { useEffect, useRef, useState } from "react";
import Paginator from "../../components/Paginator";
import styles from "./styles.module.scss";
import classNames from "classnames";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import { useNavigate } from "react-router-dom";
import HeaderMy from "../../components/HeaderMy";
import YesOrNo from "../../components/YesOrNo";
import RadioButtonRS from "../../components/RadioButtonRS";
import AddressItem from "../../components/Step2Components/AdressItem";
import Input from "../../components/Step2Components/Input";
import SelectRS from "../../components/Step2Components/SelectRS";
import { getFormatFile, getSizeMb } from "../../helpers";
import DateInput from "../../components/Step2Components/DateInput";
import DocumentItem from "../DocumentItem";
import ScanOrPhoto from "../../components/Step2Components/ScanOrPhoto";
import Wrapper from "../../components/Step2Components/Wrapper";

const DownloadButton = ({ addFile }) => {
  const refInput = useRef();

  return (
    <button
      className={styles.button_add}
      onClick={() => refInput.current.click()}
    >
      <input
        ref={refInput}
        type={"file"}
        style={{
          height: 0,
          width: 0,
        }}
        onChange={(e) => {
          if (e.target.files[0]) {
            addFile(e.target.files[0]);
          }
        }}
      />
      <p>Загрузить документ</p>
      <span className={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12V16C10 17.6569 11.3431 19 13 19C14.6569 19 16 17.6569 16 16V9.5C16 7.01472 13.9853 5 11.5 5C9.01472 5 7 7.01472 7 9.5V15M13 15V9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5V14.4545"
            stroke="#323E48"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

const AddButton = ({ ...props }) => {
  return (
    <button className={styles.button_add} {...props}>
      <p>Добавить</p>
      <span className={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#5B656D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V16"
            stroke="#5B656D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12H16"
            stroke="#5B656D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

const DeleteButton = ({ ...props }) => {
  return (
    <div className={styles.delete_button} {...props}>
      <div className={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6H5H21"
            stroke="#8E909B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
            stroke="#8E909B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 11V17"
            stroke="#8E909B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11V17"
            stroke="#8E909B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p>Удалить</p>
    </div>
  );
};

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

  const [addressList, setAddressList] = useState([{}, {}]);
  const [documentList, setDocumentList] = useState([{}]);
  const [collegialExecutiveBody, setCollegialExecutiveBody] = useState(false);
  const [supervisoryBoard, setSupervisoryBoard] = useState(false);
  const [gender, setGender] = useState("");
  const [haveBeneficial, setHaveBeneficial] = useState("");
  const [basisBeneficialOwner, setBasisBeneficialOwner] = useState("");
  const [addressActualResidence, setAddressActualResidence] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [firstPagePassport, setFirstPagePassport] = useState(null);
  const [infoAboutMoney, setInfoAboutMoney] = useState({
    numberNoncashTransactions: "",
    numberNoncashMoney: "",
    numberCashTransactions: "",
    numberCashMoney: "",
    numberTradeTransactions: "",
    countHumans: "",
  });

  const addToAddressList = () => {
    setAddressList((prevState) => [...prevState, {}]);
  };

  const removeFromAddressList = () => {
    const copyState = [...addressList];
    copyState.pop();
    setAddressList(copyState);
  };

  const addToDocumentList = () => {
    setDocumentList((prevState) => [...prevState, {}]);
  };

  const removeFromDocumentList = () => {
    const copyState = [...documentList];
    copyState.pop();
    setDocumentList(copyState);
  };

  const setInfo = (propName, value) => {
    setInfoAboutMoney((prevState) => ({ ...prevState, [propName]: value }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        <div className={styles.mb64}>
          <Wrapper headElement={<p className={styles.title_block}>Адреса</p>}>
            <div className={styles.content}>
              {addressList.map(() => (
                <AddressItem />
              ))}
              <div className={styles.buttons}>
                <AddButton onClick={addToAddressList} />
                <DeleteButton onClick={removeFromAddressList} />
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.row}>
                    <Input
                      name={"Почтовый адрес"}
                      placeholder={"Напишите адрес"}
                    />
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.row}>
                    <SelectRS name={"Основание"} placeholder={"Аренда"} />
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
        <div className={styles.mb40}>
          <Wrapper
            headElement={
              <p className={styles.title_block}>Структура органов управления</p>
            }
          >
            <div className={styles.content}>
              <div className={styles.row}>
                <SelectRS
                  name={"Выберете из списка"}
                  placeholder={
                    "Единственный участник (один учатник с должей 100%) "
                  }
                />
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <SelectRS
                    name={"Руководитель"}
                    placeholder={"Руководитель"}
                  />
                </div>
                <div className={styles.column}>
                  <SelectRS
                    name={"ИНН"}
                    placeholder={"Введите ИНН или название компании"}
                  />
                </div>
              </div>
              <div className={styles.mb24} style={{ width: "100%" }}>
                <p className={styles.option_title}>
                  Наличие наблюдательного совета
                </p>
                <YesOrNo
                  defaultValue={supervisoryBoard}
                  handleChange={setSupervisoryBoard}
                />
              </div>
              {supervisoryBoard && (
                <div className={styles.row}>
                  <div className={styles.column}>
                    <Input
                      name={"Наименование наблюдательного совета "}
                      placeholder={"Наименование"}
                    />
                  </div>
                </div>
              )}
              <div className={styles.mb24} style={{ width: "100%" }}>
                <p className={styles.option_title}>
                  Наличие коллегиального исполнительного органа
                </p>
                <YesOrNo
                  defaultValue={collegialExecutiveBody}
                  handleChange={setCollegialExecutiveBody}
                />
              </div>
              {collegialExecutiveBody && (
                <div className={styles.row}>
                  <div className={styles.column}>
                    <Input
                      name={
                        "Наименование коллегиального исполнительного органа"
                      }
                      placeholder={"Наименование"}
                    />
                  </div>
                </div>
              )}

              <div className={styles.row}>
                <div className={styles.column}>
                  <Input
                    name={"Члены коллегиального исполнительного органа - ФЛ"}
                    placeholder={"Укажите Физ. Лицо"}
                  />
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
        <div className={styles.mb40}>
          <Wrapper
            headElement={
              <p className={styles.title_block}>Сведения о персонале</p>
            }
          >
            <div className={styles.content}>
              <div className={styles.row}>
                <Input
                  name={"Численность персонала"}
                  placeholder={"Напишите значение"}
                />
                <Input
                  name={"Задолженность по з/п"}
                  placeholder={"Укажите сумму"}
                  rightElement={<p style={{}}>₽</p>}
                />
              </div>
            </div>
          </Wrapper>
        </div>

        <div>
          <Wrapper
            headElement={
              <p className={styles.title_block}>
                {" "}
                Сведения о Связанных физических лицах
              </p>
            }
          >
            <div>
              <p className={styles.name_option}>Роль лица</p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Руководитель</p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Учредитель</p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Бенефициарный владелец</p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Подписант</p>
                  </div>
                </div>
              </div>
              <div className={classNames(styles.row, "bg-grey")}>
                <Input name={"Фамилия"} placeholder={"Введите Фамилию"} />
                <Input name={"Имя"} placeholder={"Введите Имя"} />
                <Input
                  name={"Отчество (при наличии)"}
                  placeholder={"Введите Отчество"}
                />
              </div>
              <div className={styles.checks}>
                <p className={styles.checks__item}>Пол</p>
                <div
                  className={styles.checks__item}
                  onClick={() => setGender("man")}
                >
                  <RadioButtonRS isActive={gender === "man"} />
                  <p>Мужской</p>
                </div>
                <div
                  className={styles.checks__item}
                  onClick={() => setGender("woman")}
                >
                  <RadioButtonRS isActive={gender === "woman"} />
                  <p>Женский</p>
                </div>
              </div>
              <div className={classNames(styles.row, "bg-grey")}>
                <Input name={"ИНН"} placeholder={"Введите ИНН"} />
                <Input
                  name={"СНИЛС (при наличии)"}
                  placeholder={"Введите СНИЛС"}
                />
                <Input
                  name={"Гражданство"}
                  placeholder={"Введите гражданство"}
                />
              </div>
              <div className={classNames(styles.row, "bg-grey")}>
                <Input name={"Телефон"} placeholder={"+7 (__) ___ __ __"} />
                <Input name={"Доля владения"} placeholder={"Доля владения"} />
              </div>
              <div className={styles.checks}>
                <p className={styles.checks__item}>
                  Основание для признания бенефициарным владельцем
                </p>
                <div
                  className={styles.checks__item}
                  onClick={() => setBasisBeneficialOwner("xxx")}
                >
                  <RadioButtonRS isActive={basisBeneficialOwner === "xxx"} />
                  <p>xxxxxxx</p>
                </div>
                <div
                  className={styles.checks__item}
                  onClick={() => setBasisBeneficialOwner("yyy")}
                >
                  <RadioButtonRS isActive={basisBeneficialOwner === "yyy"} />
                  <p>xxxxxxx</p>
                </div>
              </div>
              <div className={styles.mb24}>
                <p className={classNames(styles.mb24)}>
                  Является ли лицо иностранным публичным должностным лицом либо
                  лицом, связанным с таковым родственными, партнерскими или
                  иными отношениями?
                </p>
                <YesOrNo />
              </div>
              <div>
                <p className={styles.mb24}>
                  Степень родства либо статус (супруг или супруга) по отношению
                  к публичному должностному лицу
                </p>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <SelectRS
                      name={"Выбрать статус"}
                      placeholder={"Выбрать статус"}
                    />
                  </div>
                </div>
              </div>
              <div className={classNames(styles.row, "bg-grey")}>
                <Input
                  name={"Адрес регистрации"}
                  placeholder={"Введите адрес"}
                />
                <Input
                  name={"Адрес регистрации"}
                  placeholder={"Введите адрес"}
                />
              </div>
              <div>
                <p className={styles.mb24}>Адрес фактического проживания</p>
                <div className={styles.row}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setAddressActualResidence("yes")}
                  >
                    <RadioButtonRS
                      isActive={addressActualResidence === "yes"}
                    />
                    <p>Совпадает с адресом регистрации</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setAddressActualResidence("no")}
                  >
                    <RadioButtonRS isActive={addressActualResidence === "no"} />
                    <p>Не совпадает с адресом регистрации</p>
                  </div>
                </div>
              </div>
              <div className={classNames(styles.row, "bg-grey")}>
                <div className={styles.column}>
                  <Input
                    name={"Адрес фактического проживания"}
                    placeholder={"Введите адрес"}
                  />
                </div>
              </div>
              <div>
                <p className={styles.mb24}>Почтовый адрес</p>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setMailingAddress("register")}
                  >
                    <RadioButtonRS isActive={mailingAddress === "register"} />
                    <p>Совпадает с адресом регистрации</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setMailingAddress("live")}
                  >
                    <RadioButtonRS isActive={mailingAddress === "live"} />
                    <p>Совпадает с адресом проживания</p>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div
                  className={styles.checks__item}
                  onClick={() => setMailingAddress("no")}
                >
                  <RadioButtonRS isActive={mailingAddress === "no"} />
                  <p>Не совпадает с адресом регистрации и адресом проживания</p>
                </div>
              </div>
              {mailingAddress === "no" && (
                <div className={classNames(styles.row, "bg-grey")}>
                  <div className={styles.column}>
                    <Input
                      name={"Адрес фактического проживания"}
                      placeholder={"Введите адрес"}
                    />
                  </div>
                </div>
              )}
              <div className={styles.mb24}>
                <p className={styles.mb24}>
                  Загрузить первую страницу паспорта
                </p>
                {firstPagePassport && (
                  <div className={styles.mb24}>
                    <div className={styles.download__item}>
                      <div className={styles.icon}>
                        <p className={styles.format}>
                          {getFormatFile(firstPagePassport.name)}
                        </p>
                        <p className={styles.size}>
                          {getSizeMb(firstPagePassport.size)}
                        </p>
                      </div>
                      <p className={styles.name}>{firstPagePassport.name}</p>
                    </div>
                  </div>
                )}
                <DownloadButton addFile={setFirstPagePassport} />
              </div>
              <div className={classNames(styles.row, "bg-grey", "form")}>
                <Input name={"Место рождения"} placeholder={"Введите адрес"} />
                <DateInput name={"Дата рождения"} />
                <SelectRS
                  name={"Тип документа, удостоверяющего личность"}
                  placeholder={"Выберите тип"}
                  backgroundColor={"#F0F2F5"}
                />
              </div>
              <div className={classNames(styles.row, "bg-grey", "form")}>
                <Input
                  name={
                    "Серия документа, удостоверяющего личность (при наличии)"
                  }
                  placeholder={"Введите серию документа"}
                />
                <Input
                  name={"Номер документа, удостоверяющего личность"}
                  placeholder={"Введите номер документа"}
                />
                <Input name={"Кем выдан"} placeholder={"Наименование"} />
              </div>
              <div className={classNames(styles.row, "bg-grey", "form")}>
                <Input
                  name={"Код подразделения (при наличии)"}
                  placeholder={"Введите код"}
                />
                <DateInput name={"Дата выдачи"} />
                <DateInput name={"Срок действия"} />
              </div>
            </div>
          </Wrapper>
        </div>

        <div className={styles.mb64}>
          <p className={styles.title_block}>
            Данные документа, подтверждающего право иностранного гражданина или
            <br />
            лица без гражданства на пребывание (проживание) в РФ
          </p>
          {documentList.map(() => (
            <DocumentItem />
          ))}
          <div className={styles.buttons}>
            <DeleteButton onClick={removeFromDocumentList} />
            <AddButton onClick={addToDocumentList} />
          </div>
        </div>

        <div className={styles.mb64}>
          <Wrapper
            headElement={
              <p className={styles.title_block}>Сведения о лицензии</p>
            }
          >
            <div className={classNames(styles.row, "form")}>
              <InputLock name={"Вид"} value={"xxxxxxx"} />
              <InputLock name={"Номер"} value={"xxxxxxx"} />
              <InputLock name={"Кем выдана"} value={"xxxxxxx"} />
            </div>
            <div className={classNames(styles.row, "form")}>
              <InputLock name={"Дата выдачи лицензии"} value={"01.01.2022"} />
              <InputLock name={"Срок действия"} value={"01.01.2022"} />
              <InputLock
                name={"Перечень видов лицензируемой деятельности"}
                value={"xxxxxxx"}
              />
            </div>
          </Wrapper>
        </div>
        <div>
          <Wrapper
            headElement={
              <p className={styles.title_block}>
                Сведения о планируемых операциях по счёту
              </p>
            }
          >
            <div className={styles.row}>
              <div className={styles.checks}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Договор купли – продажи (товарный)</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Агентский договор</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Договор комиссии</p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.checks}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Договор купли-продажи ценных бумаг</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Договор аренды</p>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
        <div className={styles.mb24}>
          <p className={styles.title_block}>Выгодоприобретатели</p>
          <div className={styles.row}>
            <div className={styles.checks}>
              <p className={styles.checks__item}>
                Имеются ли выгодоприобретатели
              </p>
              <div
                className={styles.checks__item}
                onClick={() => setHaveBeneficial("no")}
              >
                <RadioButtonRS isActive={haveBeneficial === "no"} />
                <p>Отсутствуют</p>
              </div>
              <div
                className={styles.checks__item}
                onClick={() => setHaveBeneficial("yes")}
              >
                <RadioButtonRS isActive={haveBeneficial === "yes"} />
                <p>Имеются</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Wrapper
            headElement={
              <p className={styles.title_block}>
                Сведения о целях установления деловых отношений с банком
              </p>
            }
          >
            <div className={styles.row}>
              <div className={styles.checks}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Расчетно-кассовое обслуживание</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Дистанционное банковское обслуживание</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Внешнеэкономические операции</p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.checks}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Интернет-эквайринг</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Кредитование</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Торговый эквайринг</p>
                </div>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>Переводы СБП (c2b) </p>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Количество операций по безналичным платежам в месяц
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberNoncashTransactions", "0-29")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberNoncashTransactions === "0-29"
                      }
                    />
                    <p>0-29</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() =>
                      setInfo("numberNoncashTransactions", "30-100")
                    }
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberNoncashTransactions === "30-100"
                      }
                    />
                    <p>30-100</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberNoncashTransactions", ">100")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberNoncashTransactions === ">100"
                      }
                    />
                    <p>более 100</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Сумма операций по безналичным платежам в месяц
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberNoncashMoney", "0 - 99")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.numberNoncashMoney === "0 - 99"}
                    />
                    <p>0 - 99 000 руб.</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() =>
                      setInfo("numberNoncashMoney", "100000-1000000")
                    }
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberNoncashMoney === "100000-1000000"
                      }
                    />
                    <p>100 000 - 1 000 000 руб.</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberNoncashMoney", "1000000")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.numberNoncashMoney === "1000000"}
                    />
                    <p>более 1 000 000 руб.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Количество операций по снятию наличности в месяц
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberCashTransactions", "0-29")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberCashTransactions === "0-29"
                      }
                    />
                    <p>0-29</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberCashTransactions", "30-100")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberCashTransactions === "30-100"
                      }
                    />
                    <p>30-100</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberCashTransactions", ">100")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberCashTransactions === ">100"
                      }
                    />
                    <p>более 100</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Сумма операций по снятию наличности в месяц
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberCashMoney", "0 - 99 000")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.numberCashMoney === "0 - 99 000"}
                    />
                    <p>0 - 99 000 руб.</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() =>
                      setInfo("numberCashMoney", "100 000 - 1 000 000")
                    }
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberCashMoney === "100 000 - 1 000 000"
                      }
                    />
                    <p>100 000 - 1 000 000 руб.</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberCashMoney", ">1 000 000")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.numberCashMoney === ">1 000 000"}
                    />
                    <p>более 1 000 000 руб.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Количество операций по внешнеторговым контрактам в месяц
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberTradeTransactions", "0-29")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberTradeTransactions === "0-29"
                      }
                    />
                    <p>0-29</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberTradeTransactions", "30-100")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberTradeTransactions === "30-100"
                      }
                    />
                    <p>30-100</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("numberTradeTransactions", ">100")}
                  >
                    <RadioButtonRS
                      isActive={
                        infoAboutMoney.numberTradeTransactions === ">100"
                      }
                    />
                    <p>более 100</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>
                Источники происхождения денежных средств
              </p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>
                      Средства, полученные в рамках осуществляемой хозяйственной
                      деятельности{" "}
                    </p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Собственные средства</p>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>
                      Заемные средства (займы от третьих лиц, учредителей и
                      т.д.)
                    </p>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>Иные</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className={styles.mb24}>Штатная численность сотрудников</p>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("countHumans", "0-29")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.countHumans === "0-29"}
                    />
                    <p>0-29</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("countHumans", "30-100")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.countHumans === "30-100"}
                    />
                    <p>30-100</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setInfo("countHumans", ">100")}
                  >
                    <RadioButtonRS
                      isActive={infoAboutMoney.countHumans === ">100"}
                    />
                    <p>более 100</p>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
        <div>
          <p className={styles.mb24}>Отметьте все верные утверждения</p>
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>
                    Компания является Финансовым институтом в соответствии с
                    Законом США «О налогообложении иностранных счетов» (FATCA)
                    и/или главой 20.1 Налогового кодекса РФ
                  </p>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>
                    Компания, выгодоприобретатель или бенефициар компании
                    является налоговым резидентом США
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>
                    Компания является хозяйственным обществом, имеющим
                    стратегическое значение для оборонно-промышленного комплекса
                    и безопасности РФ либо обществом, находящимся под его прямым
                    или косвенным контролем, которые указаны в Федеральном
                    законе от 21.07.2014 N 213-ФЗ
                  </p>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>
                    Компания осуществляет виды деятельности, которые могут иметь
                    стратегическое значение для оборонно-промышленного комплекса
                    и безопасности РФ
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.checks__item}>
                  <CheckBoxRS />
                  <p>
                    Компания не относится к указанным в настоящем пункте
                    юридическим лицам
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Wrapper
            headElement={<p className={styles.title_block}>Документы</p>}
          >
            <ScanOrPhoto name={"Устав юридического лица"} />
            <ScanOrPhoto
              name={"Решение и/или приказ о назначении на должность ЕИО"}
            />
            <ScanOrPhoto
              name={
                "Паспорт исполнительного органа Клиента/лица, действующего по доверенности, а также паспорт каждого бенефициарного владельца\n"
              }
            />
            <ScanOrPhoto
              name={
                "Доверенность лица, действующего по доверенности, в случаи если подписантом будет выступать не единоличный исполнительный орган\n"
              }
            />
            <ScanOrPhoto
              name={
                "Документы, подтверждающие законное право ЕИО - физ.лица, не являющегося гражданином РФ, на нахождение / пребывание на территории РФ (Миграционная карта, вид на жительство и иные документы подтверждающие такое право\n"
              }
            />
            <ScanOrPhoto name={"Прочие документы"} />
          </Wrapper>
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
