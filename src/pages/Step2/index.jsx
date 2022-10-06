import React from "react";
import Paginator from "../../components/Paginator";
import styles from "./styles.module.scss";
import classNames from "classnames";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import { useNavigate } from "react-router-dom";
import HeaderMy from "../../components/HeaderMy";
import YesOrNo from "../../components/YesOrNo";
import RadioButtonRS from "../../components/RadioButtonRS";
import Select from "react-select";
import DragDropFile from "../../components/DragAndDrop";

const DownloadButton = () => {
  return (
    <button className={styles.button_add}>
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

const AddButton = () => {
  return (
    <button className={styles.button_add}>
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

const DeleteButton = () => {
  return (
    <div className={styles.delete_button}>
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

const Input = ({ name, rightElement = null, value = "", placeholder }) => {
  return (
    <div className={styles.input__wrapper}>
      {rightElement ? (
        <span className={styles.icon}>{rightElement}</span>
      ) : null}
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

const SelectRS = ({ name, backgroundColor, ...props }) => {
  const options = [
    { value: "test1", label: "Тестовое значение #1" },
    { value: "test2", label: "Тестовое значение #2" },
    { value: "test3", label: "Тестовое значение #3" },
  ];

  return (
    <div className={styles.input__wrapper}>
      <p className={styles.name}>{name}</p>
      <Select
        noOptionsMessage={({ inputValue }) => "Нет результатов"}
        styles={{
          placeholder: (provided) => ({
            ...provided,
            color: "#c8c8c8",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          control: (provided, state) => ({
            ...provided,
            borderColor: backgroundColor ? backgroundColor : "#D6D8DA",
            borderRadius: "8px",
            backgroundColor,
            boxShadow: "none",
            "&:hover": {
              borderColor: "#D6D8DA",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            fontSize: "14px",
            padding: "12px 16px",
          }),
        }}
        options={options}
        {...props}
      />
    </div>
  );
};

const ScanOrPhoto = ({ name }) => {
  return (
    <div className={styles.mb24}>
      <p className={styles.scan__name}>{name}</p>
      <div className={styles.scan__wrapper}>
        <DragDropFile />
        <p className={styles.scan__or}>или</p>
        <div className={styles.scan__right}>
          <div className={styles.qr} />
          <p>
            Наведите камеру телефона на QR код,
            <br /> чтобы сфотографироваться
          </p>
        </div>
      </div>
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
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.row}>
                  <Input name={"Адрес"} placeholder={"Напишите адрес"} />
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.row}>
                  <SelectRS name={"Основание"} placeholder={"Аренда"} />
                </div>
              </div>
            </div>
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
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.row}>
                  <Input name={"Адрес"} placeholder={"Напишите адрес"} />
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.row}>
                  <SelectRS name={"Основание"} placeholder={"Аренда"} />
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <AddButton />
              <DeleteButton />
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
        </div>

        <div className={styles.mb40}>
          <p className={styles.title_block}>Структура органов управления</p>
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
                <SelectRS name={"Руководитель"} placeholder={"Руководитель"} />
              </div>
              <div className={styles.column}>
                <SelectRS
                  name={"ИНН"}
                  placeholder={"Введите ИНН или название компании"}
                />
              </div>
            </div>
            <div className={styles.mb24}>
              <p className={styles.option_title}>
                Наличие наблюдательного совета
              </p>
              <YesOrNo />
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <Input
                  name={"Наименование наблюдательного совета "}
                  placeholder={"Наименование"}
                />
              </div>
            </div>
            <div className={styles.mb24}>
              <p className={styles.option_title}>
                Наличие коллегиального исполнительного органа
              </p>
              <YesOrNo />
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <Input
                  name={"Наименование коллегиального исполнительного органа"}
                  placeholder={"Наименование"}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <Input
                  name={"Члены коллегиального исполнительного органа - ФЛ"}
                  placeholder={"Укажите Физ. Лицо"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mb40}>
          <p className={styles.title_block}>Сведения о персонале</p>
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
        </div>

        <div>
          <p className={styles.title_block}>
            Сведения о Связанных физических лицах
          </p>
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
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>Мужской</p>
              </div>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>Женский</p>
              </div>
            </div>
            <div className={classNames(styles.row, "bg-grey")}>
              <Input name={"ИНН"} placeholder={"Введите ИНН"} />
              <Input
                name={"СНИЛС (при наличии)"}
                placeholder={"Введите СНИЛС"}
              />
              <Input name={"Гражданство"} placeholder={"Введите гражданство"} />
            </div>
            <div className={classNames(styles.row, "bg-grey")}>
              <Input name={"Телефон"} placeholder={"+7 (__) ___ __ __"} />
              <Input name={"Доля владения"} placeholder={"Доля владения"} />
            </div>
            <div className={styles.checks}>
              <p className={styles.checks__item}>
                Основание для признания бенефициарным владельцем
              </p>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>xxxxxxx</p>
              </div>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>xxxxxxx</p>
              </div>
            </div>
            <div className={styles.mb24}>
              <p className={classNames(styles.mb24)}>
                Является ли лицо иностранным публичным должностным лицом либо
                лицом, связанным с таковым родственными, партнерскими или иными
                отношениями?
              </p>
              <YesOrNo />
            </div>
            <div>
              <p className={styles.mb24}>
                Степень родства либо статус (супруг или супруга) по отношению к
                публичному должностному лицу
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
              <Input name={"Адрес регистрации"} placeholder={"Введите адрес"} />
              <Input name={"Адрес регистрации"} placeholder={"Введите адрес"} />
            </div>
            <div>
              <p className={styles.mb24}>Адрес фактического проживания</p>
              <div className={styles.row}>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>Совпадает с адресом регистрации</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>Совпадает с адресом регистрации</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>Совпадает с адресом проживания</p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>Не совпадает с адресом регистрации и адресом проживания</p>
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
            <div className={styles.mb24}>
              <p className={styles.mb24}>Загрузить первую страницу паспорта</p>
              <div className={styles.mb24}>
                <div className={styles.download__item}>
                  <div className={styles.icon}>
                    <p className={styles.format}>PDF</p>
                    <p className={styles.size}>12 Мб</p>
                  </div>
                  <p className={styles.name}>Название файла</p>
                </div>
              </div>
              <DownloadButton />
            </div>
            <div className={classNames(styles.row, "bg-grey", "form")}>
              <Input name={"Место рождения"} placeholder={"Введите адрес"} />
              <Input name={"Введите адрес"} placeholder={"Дата"} />
              <SelectRS
                name={"Тип документа, удостоверяющего личность"}
                placeholder={"Выберите тип"}
                backgroundColor={"#F0F2F5"}
              />
            </div>
            <div className={classNames(styles.row, "bg-grey", "form")}>
              <Input
                name={"Серия документа, удостоверяющего личность (при наличии)"}
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
              <Input name={"Дата выдачи"} placeholder={"Дата"} />
              <Input name={"Срок действия"} placeholder={"Дата"} />
            </div>
          </div>
        </div>

        <div className={styles.mb64}>
          <p className={styles.title_block}>
            Данные документа, подтверждающего право иностранного гражданина или
            <br />
            лица без гражданства на пребывание (проживание) в РФ
          </p>
          <div className={classNames(styles.row, "bg-grey", "form")}>
            <SelectRS
              name={"Тип документа"}
              placeholder={"Выберите тип"}
              backgroundColor={"#F0F2F5"}
            />
            <Input
              name={"Серия (если имеется)"}
              placeholder={"Введите серию"}
            />
            <Input name={"Номер"} placeholder={"Введите номер"} />
          </div>
          <div className={classNames(styles.row, "bg-grey", "form")}>
            <Input
              name={"Дата начала срока действия права пребывания (проживания)"}
              placeholder={"Дата"}
            />
            <Input
              name={
                "Дата окончания срока действия права пребывания (проживания)"
              }
              placeholder={"Дата"}
            />
          </div>
          <div className={styles.buttons}>
            <DeleteButton />
            <AddButton />
          </div>
        </div>

        <div className={styles.mb64}>
          <p className={styles.title_block}>Сведения о лицензии</p>
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
        </div>
        <div>
          <p className={styles.title_block}>
            Сведения о планируемых операциях по счёту
          </p>
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
        </div>
        <div className={styles.mb24}>
          <p className={styles.title_block}>Выгодоприобретатели</p>
          <div className={styles.row}>
            <div className={styles.checks}>
              <p className={styles.checks__item}>
                Имеются ли выгодоприобретатели
              </p>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>Отсутствуют</p>
              </div>
              <div className={styles.checks__item}>
                <RadioButtonRS />
                <p>Имеются</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mb64}>
          <p className={styles.title_block}>
            Сведения о целях установления деловых отношений с банком
          </p>
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0-29</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>30-100</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0 - 99 000 руб.</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>100 000 - 1 000 000 руб.</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0-29</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>30-100</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0 - 99 000 руб.</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>100 000 - 1 000 000 руб.</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0-29</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>30-100</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
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
                    Заемные средства (займы от третьих лиц, учредителей и т.д.)
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
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>0-29</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>30-100</p>
                </div>
                <div className={styles.checks__item}>
                  <RadioButtonRS />
                  <p>более 100</p>
                </div>
              </div>
            </div>
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
                      стратегическое значение для оборонно-промышленного
                      комплекса и безопасности РФ либо обществом, находящимся
                      под его прямым или косвенным контролем, которые указаны в
                      Федеральном законе от 21.07.2014 N 213-ФЗ
                    </p>
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS />
                    <p>
                      Компания осуществляет виды деятельности, которые могут
                      иметь стратегическое значение для оборонно-промышленного
                      комплекса и безопасности РФ
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
        </div>

        <div>
          <p className={styles.title_block}>Документы</p>
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
        </div>
      </div>

      <div style={{ textAlign: "right", margin: "40px 0" }}>
        <ButtonRS
          title={"Продолжить"}
          style={{ width: "auto" }}
          onClick={() => navigate("/step3")}
        />
      </div>
    </>
  );
};

export default Step2;
