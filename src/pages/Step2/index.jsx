import React from "react";
import Paginator from "../../components/Paginator";
import styles from "./styles.module.scss";
import classNames from "classnames";
import CheckBoxRS from "../../components/CheckBoxRS";
import ButtonRS from "../../components/ButtonRS";
import { Navigate, useNavigate } from "react-router-dom";
import HeaderMy from "../../components/HeaderMy";
import YesOrNo from "../../components/YesOrNo";
import RadioButtonRS from "../../components/RadioButtonRS";
import AddressItem from "../../components/Step2Components/AdressItem";
import Input from "../../components/Step2Components/Input";
import SelectRS from "../../components/Step2Components/SelectRS";
import { getFormatFile, getSizeMb, ROUTES } from "../../helpers";
import DateInput from "../../components/Step2Components/DateInput";
import DocumentItem from "../DocumentItem";
import ScanOrPhoto from "../../components/Step2Components/ScanOrPhoto";
import Wrapper from "../../components/Step2Components/Wrapper";
import InputLock from "../../components/InputLock";
import DeleteButton from "../../components/DeleteButton";
import AddButton from "../../components/AddButton";
import DownloadButton from "../../components/DownloadButton";
import { passportApi, userApi } from "../../api";
import { RequisitesContext } from "../../contexts/companyRequisits";
import PhoneInput from "../../components/PhoneInput";
import DaDataSelect from "../../components/DaDataSelect";

export const statementsTexts = [
  "Компания является Финансовым институтом в соответствии с Законом США «О налогообложении иностранных счетов» (FATCA) и/или главой 20.1 Налогового кодекса РФ",
  "Компания, выгодоприобретатель или бенефициар компании является налоговым резидентом США",
  "Компания является хозяйственным обществом, имеющим стратегическое значение для оборонно-промышленного комплекса и безопасности РФ либо обществом, находящимся под его прямым или косвенным контролем, которые указаны в Федеральном законе от 21.07.2014 N 213-ФЗ",
  "Компания осуществляет виды деятельности, которые могут иметь стратегическое значение для оборонно-промышленного комплекса и безопасности РФ",
  "Компания не относится к указанным в настоящем пункте юридическим лицам",
]

export const Protector2 = ({ children }) => {
  const activeStep = parseInt(localStorage.getItem("rko_active_step") ?? 1)
  if (activeStep < 2) {
    return <Navigate to={ROUTES.STEP1} replace />
  } else {
    return children
  }
}

const Step2 = () => {
  const navigate = useNavigate();

  const planned_operations = [
    'Договор купли-продажи (товарный)',
    'Агентский договор',
    'Договор комиссии',
    'Договор купли-продажи ценных бумаг',
    'Договор аренды',
  ]

  const cash_source = [
    'Средства, полученные в рамках осуществляемой хозяйственной деятельности',
    'Собственные средства',
    'Заемные средства (займы от третьих лиц, учредителей и т.д)',
    'Иные', 
  ]

  const account_operations = [
    'Дистанционное банковское обслуживание',
    'Внешнеэкономические операции',
    'Интернет-эквайринг',
    'Кредитование',
    'Торговый эквайринг',
    'Переводы СБП (c2b)',
  ]

  const roles = [
    "Учредитель",
    "Бенефициарный владелец",
    "Подписант"
  ]

  const mailing_addresses = [
    "Совпадает с адресом регистрации",
    "Совпадает с адресом проживания",
    "Не совпадает с адресом регистрации и адресом проживания"
  ]

  const formatedOptions = (list) => list.map((item) => ({ value: item.data.address.unrestricted_value, label: item.data.address.unrestricted_value }))

  const AddressIndex = React.useRef(0)
  const companyGroupMemberIndex = React.useRef(0)
  const passportPagesUrls = React.useRef([null, null])

  const { data, setData } = React.useContext(RequisitesContext)

  const { 
    list_supervisoty_board_persone: watch, // Члены наблюдательного совета
    list_collegial_executive_body: exec } = data // Члены коллегиального исполнительного органа

  const regDate = data?.registration_date ? new Date(parseInt(data.registration_date)) : ""
  const formatedRegDate = regDate ? `${regDate.getFullYear?.()}-${regDate?.getMonth?.() + 1}-${regDate?.getDate?.()}` : ""

  const orgnDate = data?.ogrn_date ? new Date(parseInt(data.ogrn_date)) : ""
  const formatedOgrnDate = orgnDate ? `${orgnDate.getFullYear?.()}-${orgnDate.getMonth?.() + 1}-${orgnDate.getDate?.()}` : ""

  const [showErrors, setShowErrors] = React.useState(false)
  const [passportPages, setPassportPages] = React.useState([null, null])
  const [erroredFields, setErroredFields] = React.useState([ 
    ...!data.start_date ? ["start_date"] : [], 
    ...!data.end_date ? ["end_date"] : [], 
  ])

  React.useEffect(() => setErroredFields(prev => prev ? prev.filter(f => f !== "start_date") : [...prev, "start_date"]), [data.start_date])
  React.useEffect(() => setErroredFields(prev => prev ? prev.filter(f => f !== "end_date") : [...prev, "end_date"]), [data.end_date])

  const addToAddressList = () => {
    AddressIndex.current = AddressIndex.current + 1
    setData({
      ...data,
      addresses: [
        ...data.addresses,
        {
          id: AddressIndex.current,
          type_adress: ["Юридический"],
          basis: "Аренда",
          address: ""
        }
      ]
    })
  };

  const onSelectAddressType = (type, id) => () => {
    const curr = data.addresses.find(a => a.id === id)
    curr.type_adress = curr.type_adress.includes(type) ? curr.type_adress.filter(t => t !== type) : [...curr.type_adress, type]
    setData({ ...data })
  }

  const onSelect = (str) => () => setData({ ...data, information_goals: data.information_goals.includes(str) ? data.information_goals.filter(s => s !== str) : [...data.information_goals, str] })

  const addCompanyGroupMember = () => {
    setData({
      ...data,
      group_members: [
        ...data.group_members,
        { id: companyGroupMemberIndex.current, inn: "", name: "", ogrn: "" }
      ]
    })
    companyGroupMemberIndex.current = companyGroupMemberIndex.current + 1
  }

  const deleteCompanyGroupMember = (id) => () => {
    setData(prev => {
      prev.group_members = prev.group_members.filter(a => a.id !== id)
      return {...prev}
    })
  };

  const onChangeCompanyGroupMember = (id) => (value) => {
    const idx = data.group_members.findIndex(c => c.id === id)
    data.group_members[idx].name = value?.value?.unrestricted_value ?? ""
    data.group_members[idx].inn = value?.value?.data.inn ?? ""
    data.group_members[idx].ogrn = value?.value?.data.ogrn ?? ""
    setData({ ...data })  
  }

  const onSelectAddress = (id) => (v) => {
    const idx = data.addresses.findIndex(a => a.id === id)
    data.addresses[idx].address = v?.label ?? ""
    setData({ ...data })
  }

  const onSelectBasis = (id) => ({ label }) => {
    const idx = data.addresses.findIndex(a => a.id === id)
    data.addresses[idx].basis = label
    setData({ ...data })
  }

  const getPassportPageUrl = (idx) => (file) => passportApi.uploadPassport(file).then(res => {
    passportPagesUrls.current[idx] = res?.path
    passportPages[idx] = file
    setPassportPages([...passportPages])
  })

  const onChangeRole = (name, r) => () => setData({
    ...data,
    [name]: {
      ...exec,
      account_onw_role: r
    }
  })

  const onChangeStartDate = (v) => {
    setData({ ...data, start_date: v })
    setErroredFields(erroredFields.filter(f => f !== "start_date"))
  }
  const onChangeEndDate = (v) => {
    setData({ ...data, end_date: v })
    setErroredFields(erroredFields.filter(f => f !== "end_date"))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setShowErrors(true)
    const { start_date, end_date } = data
    if (!start_date || !end_date) {
      return setErroredFields(prev => ([
        ...prev, 
        ...!start_date ? ["start_date"] : [], 
        ...!end_date ? ["end_date"] : []
      ]))
    }

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
      start_date: start_date ? `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}` : "",
      end_date: end_date ? `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}` : "",
      group_members: data.group_members?.map(({ name, inn, ogrn }) => ({ name, inn, ogrn })), // оставил только нужные поля
    }

    if (passportPagesUrls.current[0]) {
      dto.list_supervisoty_board_persone.first_passport_page_url = passportPagesUrls.current[0]
    }
    if (passportPagesUrls.current[1]) {
      dto.list_collegial_executive_body.first_passport_page_url = passportPagesUrls.current[1]
    }

    userApi.postInfo(dto, formattedPhone).then(() => {
      localStorage.setItem("rko_active_step", 3)
      localStorage.removeItem("rko_data")
      navigate(ROUTES.STEP3)
    })
  }

  return (
    <>
      <HeaderMy />
      <div className="container">
        <Paginator
          activeStep={2}
          style={{ marginTop: "64px", marginBottom: "16px" }}
        />
        <p className={styles.title}>Заполните анкету и прикрепите документы</p>
        <div className={styles.company}>
          <p className={styles.title_block}>Реквизиты компании</p>
          <div className={styles.content}>
            <div className={styles.column}>
              <div className={styles.row}>
                <InputLock
                  name="Краткое наименование"
                  value={data.short_name ?? ""}
                />
              </div>
              <div className={styles.row}>
                <InputLock
                  name="Полное наименование"
                  value={data.company_name ?? ""}
                />
              </div>
              <div className={styles.row}>
                <InputLock 
                  name="Дата регистрации"
                  value={formatedRegDate ?? ""}
                />
                <InputLock 
                  name="Дата внесения ОГРН"
                  value={formatedOgrnDate ?? ""}
                />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.row}>
                <InputLock 
                  name="ИНН"
                  value={data.inn ?? ""}
                />
                <InputLock 
                  name="КПП" 
                  value={data.kpp ?? ""}
                 />
                <InputLock 
                  name="ОГРН"
                  value={data.ogrn ?? ""}
                />
              </div>
              <div className={styles.row}>
                <InputLock
                  name={"Наименование регистрирующего органа"}
                  value={data.registrator_name ?? ""}
                />
              </div>
              <div className={styles.row}>
                <InputLock 
                  name="Основной ОКВЭД"
                  value={data.okved ?? ""}
                  />
                <InputLock 
                  name="ОКТМО"
                  value={data.oktmo ?? ""}
                />
              </div>
            </div>
          </div>
        </div>

        <form>
          <div className={styles.mb64}>
            <Wrapper headElement={<p className={styles.title_block}>Адреса</p>}>
              <div className={styles.content}>
                {data.addresses.map(({ type_adress, basis, address, id }) => 
                  <AddressItem
                    key={id}
                    id={id}
                    type={type_adress}
                    basis={basis}
                    address={address}
                    onSelectType={onSelectAddressType}
                    onSelectAddress={onSelectAddress}
                    onSelectBasis={onSelectBasis}
                  /> 
                )}
                <div>
                  <AddButton
                    type="button" 
                    onClick={addToAddressList} 
                  />
                </div>
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Структура органов управления</p>}
            >
              <div className={styles.content}>
                <div className={styles.row}>
                  <Input
                    value={data.supreme_management_body}
                    name="Высший орган управления"
                    placeholder="Высший орган управления"
                    onChange={(e) => setData({ ...data, supreme_management_body: e.target.value })}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <Input
                      value={data.supreme_management_person}
                      name="Руководитель"
                      placeholder="Руководитель"
                      onChange={(e) => setData({ ...data, supreme_management_person: e.target.value })}
                    />
                  </div>
                  <div className={styles.column}>
                    <Input
                      value={data.supreme_management_inn}
                      name="ИНН"
                      type="number"
                      pattern="[0-9]*"
                      placeholder="Введите ИНН"
                      onChange={(e) => setData({ ...data, supreme_management_inn: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles.mb24} style={{ width: "100%" }}>
                  <p className={styles.option_title}>
                    Наличие наблюдательного совета
                  </p>
                  <YesOrNo
                    value={data.is_collegiate_body}
                    toggle={() => setData({ ...data, is_collegiate_body: !data.is_collegiate_body })}
                  />
                </div>
                {data.is_collegiate_body && 
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <Input
                        value={data.collegiate_person}
                        name="Наименование наблюдательного совета"
                        placeholder="Наименование"
                        onChange={(e) => setData({ ...data, collegiate_person: e.target.value })}
                      />
                    </div>
                  </div>
                }
                <div className={styles.mb24} style={{ width: "100%" }}>
                  <p className={styles.option_title}>
                    Наличие коллегиального исполнительного органа
                  </p>
                  <YesOrNo
                    value={data.is_supervisoty}
                    toggle={() => setData({ ...data, is_supervisoty: !data.is_supervisoty })}
                  />
                </div>
                {data.is_supervisoty && 
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <Input
                        value={data.supervisoty_board_persone_name}
                        name="Наименование коллегиального исполнительного органа"
                        placeholder="Наименование"
                        onChange={(e) => setData({ ...data, supervisoty_board_persone_name: e.target.value })}
                      />
                    </div>
                  </div>}
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о персонале</p>}
            >
              <div className={styles.content}>
                <div className={styles.row}>
                  <Input
                    value={data.employers_volume}
                    type="number"
                    pattern="[0-9]*"
                    name="Численность персонала"
                    placeholder="Напишите значение"
                    onChange={(e) => setData({ ...data, employers_volume: e.target.value })}
                  />
                  <Input
                    value={data.salary_debt}
                    name="Задолженность по з/п"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Укажите сумму"
                    rightElement={<p>₽</p>}
                    onChange={(e) => setData({ ...data, salary_debt: e.target.value })}
                  />
                </div>
              </div>
            </Wrapper>
          </div>

          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о группе компаний</p>}
            >
              <div className={styles.content}>
                <div className={styles.row}>
                  <Input
                    value={data.company_group_name}
                    name="Название группы компаний"
                    placeholder="Укажите название"
                    onChange={(e) => setData({ ...data, company_group_name: e.target.value })}
                  />
                </div>
                <div className={styles.row}>
                  <DateInput
                    isError={showErrors && erroredFields.includes("start_date")}
                    name="Дата начала действия"
                    value={data.start_date}
                    onChange={onChangeStartDate}
                  />

                  <DateInput 
                    isError={showErrors && erroredFields.includes("end_date")}
                    name="Дата окончания действия" 
                    value={data.end_date}
                    onChange={onChangeEndDate}
                    />
                </div>
                
                <div className={styles.row}>
                  <p>Состав группы компаний</p>
                </div>
                
                {data.group_members?.map(({ name, id }) => 
                  <div className={`${styles.row} ${styles.align_end}`} key={id}>
                    <DaDataSelect 
                      backgroundColor="#F0F2F5"
                      name="Название"
                      value={name}
                      style={{ width: "50%" }}
                      message="Введите название или ИНН"
                      formatedOptions={(list) => list.map((item) => ({ value: item, label: item.unrestricted_value }) )}
                      onSelect={onChangeCompanyGroupMember(id)}
                    />

                    <DeleteButton onClick={deleteCompanyGroupMember(id)} />
                  </div>)}

                <div className={styles.buttons}>
                  <AddButton 
                    type="button" 
                    onClick={addCompanyGroupMember} 
                  />
                </div>
              </div>
            </Wrapper>
          </div>

          {/* Члены наблюдательного совета */}
          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о Связанных физических лицах (Члены наблюдательного совета)</p>}
            >
              <div>
                <p className={styles.name_option}>Роль лица</p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    {roles.map(r => 
                      <div 
                        key={r}
                        className={styles.checks__item}
                        onClick={onChangeRole("list_supervisoty_board_persone", r)}
                      >
                        <RadioButtonRS 
                          isActive={watch.account_onw_role === r} 
                        />
                        <p>{r}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <Input 
                    value={watch.account_own_lastname}
                    name="Фамилия"
                    placeholder="Введите Фамилию"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_lastname: e.target.value } })}
                  />
                  <Input 
                    value={watch.account_own_name}
                    name="Имя"
                    placeholder="Введите Имя"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_name: e.target.value } })}
                  />
                  <Input
                    value={watch.account_own_surname}
                    name="Отчество (при наличии)"
                    placeholder={"Введите Отчество"}
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_surname: e.target.value } })}
                  />
                </div>
                <div className={styles.checks}>
                  <p className={styles.checks__item}>Пол</p>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_gender: "Мужской" } })}
                  >
                    <RadioButtonRS isActive={watch.account_own_gender === "Мужской"} />
                    <p>Мужской</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_gender: "Женский" } })}
                  >
                    <RadioButtonRS isActive={watch.account_own_gender === "Женский"} />
                    <p>Женский</p>
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <Input
                    value={watch.account_onw_inn}
                    name="ИНН" 
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Введите ИНН"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_onw_inn: e.target.value } })}
                  />
                  <Input
                    value={watch.account_own_snils}
                    name="СНИЛС (при наличии)"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Введите СНИЛС"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_snils: e.target.value } })}
                  />
                  <Input
                    value={watch.account_own_citizenship}
                    name="Гражданство"
                    placeholder="Введите гражданство"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_citizenship: e.target.value } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey")}>

                <div className={styles.input__wrapper}>
                  <p className={styles.name}>Телефон</p>
                  <PhoneInput
                    value={watch.account_own_phone ?? ""}
                    style={{margin: 0, padding: "20px 16px" }}
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_phone: e.target.value } })}
                  />
                </div>
                  <Input 
                    value={watch.account_own_piece}
                    name="Доля владения"
                    placeholder="Доля владения"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_piece: e.target.value } })}
                  />
                </div>
                <div className={styles.mb24}>
                  <p className={classNames(styles.mb24)}>
                    Является ли лицо иностранным публичным должностным лицом либо
                    лицом, связанным с таковым родственными, партнерскими или
                    иными отношениями?
                  </p>
                  <YesOrNo 
                    value={watch.is_person_a_foreign_public} 
                    toggle={() => setData({ ...data, list_supervisoty_board_persone : { ...watch, is_person_a_foreign_public: !watch.is_person_a_foreign_public } })}
                  />
                </div>
                <div>
                  <p className={styles.mb24}>
                    Степень родства либо статус (супруг или супруга) по отношению
                    к публичному должностному лицу
                  </p>
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <SelectRS
                        nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                        value={{ value: watch.assigned_publ_pers_relation, label: watch.assigned_publ_pers_relation }}
                        defaultValue={{ value: watch.assigned_publ_pers_relation, label: watch.assigned_publ_pers_relation }}
                        name="Выбрать статус"
                        placeholder="Выбрать статус"
                        options={[{ label: 'Супруг', value: 'Супруг' }, { label: 'Супруга', value: 'Супруга' } ]}
                        onChange={(v) => setData({ ...data, list_supervisoty_board_persone: { ...watch, assigned_publ_pers_relation: v.label } })}
                      />
                    </div>
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <DaDataSelect 
                    backgroundColor="#F0F2F5"
                    name="Адрес регистрации"
                    value={watch.account_own_registration}
                    message="Введите адрес"
                    formatedOptions={formatedOptions}
                    onSelect={({ label }) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_registration: label }  })}
                  />
                </div>
                <div>
                  <p className={styles.mb24}>Адрес фактического проживания</p>
                  <div className={styles.row}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, accownt_own_living: "Совпадает" } })}
                    >
                      <RadioButtonRS
                        isActive={watch.accownt_own_living === "Совпадает"}
                      />
                      <p>Совпадает с адресом регистрации</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, accownt_own_living: "" } })}
                    >
                      <RadioButtonRS 
                        isActive={watch.accownt_own_living !== "Совпадает"}
                      />
                      <p>Не совпадает с адресом регистрации</p>
                    </div>
                  </div>
                </div>
                {watch.accownt_own_living !== "Совпадает" && 
                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Адрес фактического проживания"
                        value={watch.accownt_own_living}
                        message="Введите адрес"
                        formatedOptions={formatedOptions}
                        onSelect={({ label }) => setData({ ...data, list_supervisoty_board_persone: { ...watch, accownt_own_living: label }  })}
                      />
                    </div>
                  </div>
                }
                <div>
                  <p className={styles.mb24}>Почтовый адрес</p>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_mail: mailing_addresses[0] } })}
                    >
                      <RadioButtonRS 
                        isActive={watch.account_own_mail === mailing_addresses[0]} 
                      />
                      <p>{mailing_addresses[0]}</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_mail: mailing_addresses[1] } })}
                    >
                      <RadioButtonRS 
                        isActive={watch.account_own_mail === mailing_addresses[1]} 
                        />
                      <p>{mailing_addresses[1]}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_mail: "" } })}
                  >
                    <RadioButtonRS 
                      isActive={watch.account_own_mail !== mailing_addresses[0] && watch.account_own_mail !== mailing_addresses[1]} 
                    />
                      <p>{mailing_addresses[2]}</p>
                  </div>
                </div>
                {watch.account_own_mail !== mailing_addresses[0] && watch.account_own_mail !== mailing_addresses[1] &&
                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Почтовый адрес"
                        value={watch.account_own_mail}
                        message="Введите адрес"
                        formatedOptions={formatedOptions}
                        onSelect={({ label }) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_own_mail: label }  })}
                      />
                    </div>
                  </div>
                }
                <div className={styles.mb24}>
                  <p className={styles.mb24}>
                    Загрузить первую страницу паспорта
                  </p>
                  {passportPages[0] && passportPagesUrls.current[0] &&
                    <div className={styles.mb24}>
                      <div className={styles.download__item}>
                        <div className={styles.icon}>
                          <p className={styles.format}>
                            {getFormatFile(passportPages[0].name)}
                          </p>
                          <p className={styles.size}>
                            {getSizeMb(passportPages[0].size)}
                          </p>
                        </div>
                        <p className={styles.name}>{passportPages[0].name}</p>
                      </div>
                    </div>
                  }
                  <DownloadButton 
                    addFile={getPassportPageUrl(0)} 
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <DaDataSelect 
                    backgroundColor="#F0F2F5"
                    name="Место рождения"
                    value={watch.account_birth_place}
                    message="Введите адрес"
                    formatedOptions={formatedOptions}
                    onSelect={({ label }) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_birth_place: label }  })}
                  />
                  <DateInput 
                    value={watch.account_datebirth}
                    placeholderText="Дата"
                    locale="ru"
                    dateFormat="yyyy-MM-dd"            
                    name={"Дата рождения"}
                    onChange={(v) => setData({ ...data, list_supervisoty_board_persone: { ...watch, account_datebirth: v } })}
                  />
                  <SelectRS
                    value={{ label: watch.doc_type, value: watch.doc_type }}
                    name="Тип документа, удостоверяющего личность"
                    nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                    placeholder="Выберите тип"
                    backgroundColor="#F0F2F5"
                    options={[{ value: "Паспорт", label: "Паспорт" }]}
                    onChange={(v) => setData({ ...data, list_supervisoty_board_persone: { ...watch, doc_type: v.label } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <Input
                    value={watch.doc_serial}
                    type="number"
                    pattern="[0-9]*"
                    name="Серия документа, удостоверяющего личность (при наличии)"
                    placeholder="Введите серию документа"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, doc_serial: e.target.value } })}
                  />

                  <Input
                    value={watch.doc_number}
                    type="number"
                    pattern="[0-9]*"
                    name="Номер документа, удостоверяющего личность"
                    placeholder="Введите номер документа"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, doc_number: e.target.value } })}
                  />
                  <Input 
                    value={watch.issued_by}
                    name="Кем выдан"
                    placeholder="Наименование"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, issued_by: e.target.value } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <Input
                    value={watch.division_code}
                    name="Код подразделения (при наличии)"
                    placeholder="Введите код"
                    onChange={(e) => setData({ ...data, list_supervisoty_board_persone: { ...watch, division_code: e.target.value } })}
                  />
                  <DateInput 
                    name="Дата выдачи"
                    value={watch.date_issue}
                    onChange={(v) => setData({ ...data, list_supervisoty_board_persone: { ...watch, date_issue: v } })}
                  />
                  <DateInput 
                    value={watch.validity}
                    name="Срок действия"
                    onChange={(v) => setData({ ...data, list_supervisoty_board_persone: { ...watch, validity: v } })}
                  />
                </div>
              </div>
            </Wrapper>
          </div>
          {/* Члены коллегиального исполнительного органа */}
          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о Связанных физических лицах (Члены коллегиального исполнительного органа)</p>}
            >
              <div>
                <p className={styles.name_option}>Роль лица</p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    {roles.map(r => 
                      <div 
                        key={r}
                        className={styles.checks__item}
                        onClick={onChangeRole("list_collegial_executive_body", r)}
                      >
                        <RadioButtonRS 
                          isActive={exec.account_onw_role === r} 
                        />
                        <p>{r}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <Input 
                    value={exec.account_own_lastname}
                    name="Фамилия"
                    placeholder="Введите Фамилию"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_lastname: e.target.value } })}
                  />
                  <Input 
                    value={exec.account_own_name}
                    name="Имя"
                    placeholder="Введите Имя"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_name: e.target.value } })}
                  />
                  <Input
                    value={exec.account_own_surname}
                    name="Отчество (при наличии)"
                    placeholder={"Введите Отчество"}
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_surname: e.target.value } })}
                  />
                </div>
                <div className={styles.checks}>
                  <p className={styles.checks__item}>Пол</p>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_gender: "Мужской" } })}
                  >
                    <RadioButtonRS isActive={exec.account_own_gender === "Мужской"} />
                    <p>Мужской</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_gender: "Женский" } })}
                  >
                    <RadioButtonRS isActive={exec.account_own_gender === "Женский"} />
                    <p>Женский</p>
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <Input
                    value={exec.account_onw_inn}
                    name="ИНН" 
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Введите ИНН"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_onw_inn: e.target.value } })}
                  />
                  <Input
                    value={exec.account_own_snils}
                    name="СНИЛС (при наличии)"
                    type="number"
                    pattern="[0-9]*"
                    placeholder={"Введите СНИЛС"}
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_snils: e.target.value } })}
                  />
                  <Input
                    value={exec.account_own_citizenship}
                    name="Гражданство"
                    placeholder="Введите гражданство"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_citizenship: e.target.value } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey")}>

                <div className={styles.input__wrapper}>
                  <p className={styles.name}>Телефон</p>
                  <PhoneInput
                    value={exec.account_own_phone ?? ""}
                    style={{margin: 0, padding: "20px 16px" }}
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_phone: e.target.value } })}
                  />
                </div>
                  <Input 
                    value={exec.account_own_piece}
                    name={"Доля владения"} 
                    placeholder={"Доля владения"} 
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_piece: e.target.value } })}
                  />
                </div>
                <div className={styles.mb24}>
                  <p className={classNames(styles.mb24)}>
                    Является ли лицо иностранным публичным должностным лицом либо
                    лицом, связанным с таковым родственными, партнерскими или
                    иными отношениями?
                  </p>
                  <YesOrNo 
                    value={exec.is_person_a_foreign_public} 
                    toggle={() => setData({ ...data, list_collegial_executive_body : { ...exec, is_person_a_foreign_public: !exec.is_person_a_foreign_public } })}
                  />
                </div>
                <div>
                  <p className={styles.mb24}>
                    Степень родства либо статус (супруг или супруга) по отношению
                    к публичному должностному лицу
                  </p>
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <SelectRS
                        nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                        value={{ value: exec.assigned_publ_pers_relation, label: exec.assigned_publ_pers_relation }}
                        defaultValue={{ value: exec.assigned_publ_pers_relation, label: exec.assigned_publ_pers_relation }}
                        name="Выбрать статус"
                        placeholder="Выбрать статус"
                        options={[{ label: 'Супруг', value: 'Супруг' }, { label: 'Супруга', value: 'Супруга' } ]}
                        onChange={(v) => setData({ ...data, list_collegial_executive_body: { ...exec, assigned_publ_pers_relation: v.label } })}
                      />
                    </div>
                  </div>
                </div>
                <div className={classNames(styles.row, "bg-grey")}>
                  <DaDataSelect 
                    backgroundColor="#F0F2F5"
                    name="Адрес регистрации"
                    value={exec.account_own_registration}
                    message="Введите адрес"
                    formatedOptions={formatedOptions}
                    onSelect={({ label }) => setData({ ...data, list_collegial_executive_body: { ...watch, account_own_registration: label }  })}
                  />
                </div>
                <div>
                  <p className={styles.mb24}>Адрес фактического проживания</p>
                  <div className={styles.row}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, accownt_own_living: "Совпадает" } })}
                    >
                      <RadioButtonRS
                        isActive={exec.accownt_own_living === "Совпадает"}
                      />
                      <p>Совпадает с адресом регистрации</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, accownt_own_living: "" } })}
                    >
                      <RadioButtonRS 
                        isActive={exec.accownt_own_living !== "Совпадает"}
              />
                      <p>Не совпадает с адресом регистрации</p>
                    </div>
                  </div>
                </div>
                {exec.accownt_own_living !== "Совпадает" && 
                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Адрес фактического проживания"
                        value={exec.accownt_own_living}
                        message="Введите адрес"
                        formatedOptions={formatedOptions}
                        onSelect={({ label }) => setData({ ...data, list_collegial_executive_body: { ...watch, accownt_own_living: label }  })}
                      />
                    </div>
                  </div>
                }
                <div>
                  <p className={styles.mb24}>Почтовый адрес</p>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_mail: mailing_addresses[0] } })}
                    >
                      <RadioButtonRS 
                        isActive={exec.account_own_mail === mailing_addresses[0]} 
                      />
                      <p>{mailing_addresses[0]}</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_mail: mailing_addresses[1] } })}
                    >
                      <RadioButtonRS 
                        isActive={exec.account_own_mail === mailing_addresses[1]} 
                        />
                      <p>{mailing_addresses[1]}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, list_collegial_executive_body: { ...exec, account_own_mail: "" } })}
                  >
                    <RadioButtonRS 
                      isActive={exec.account_own_mail !== mailing_addresses[0] && exec.account_own_mail !== mailing_addresses[1]} 
                    />
                      <p>{mailing_addresses[2]}</p>
                  </div>
                </div>
                {exec.account_own_mail !== mailing_addresses[0] && exec.account_own_mail !== mailing_addresses[1] &&
                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        name="Почтовый адрес"
                        value={exec.account_own_mail}
                        message="Введите адрес"
                        backgroundColor="#F0F2F5"
                        formatedOptions={formatedOptions}
                        onSelect={({ label }) => setData({ ...data, list_collegial_executive_body: { ...watch, account_own_mail: label }  })}
                      />
                    </div>
                  </div>
                }
                <div className={styles.mb24}>
                  <p className={styles.mb24}>
                    Загрузить первую страницу паспорта
                  </p>
                  {passportPages[1] && passportPagesUrls.current[1] &&
                    <div className={styles.mb24}>
                      <div className={styles.download__item}>
                        <div className={styles.icon}>
                          <p className={styles.format}>
                            {getFormatFile(passportPages[1].name)}
                          </p>
                          <p className={styles.size}>
                            {getSizeMb(passportPages[1].size)}
                          </p>
                        </div>
                        <p className={styles.name}>{passportPages[1].name}</p>
                      </div>
                    </div>
                  }
                  <DownloadButton 
                    addFile={getPassportPageUrl(1)} 
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <DaDataSelect 
                    name="Место рождения"
                    value={exec.account_birth_place}
                    message="Введите адрес"
                    backgroundColor="#F0F2F5"
                    formatedOptions={formatedOptions}
                    onSelect={({ label }) => setData({ ...data, list_collegial_executive_body: { ...watch, account_birth_place: label }  })}
                  />
                  <DateInput 
                    value={exec.account_datebirth}
                    placeholderText="Дата"
                    locale="ru"
                    dateFormat="yyyy-MM-dd"            
                    name={"Дата рождения"}
                    onChange={(v) => setData({ ...data, list_collegial_executive_body: { ...exec, account_datebirth: v } })}
                  />
                  <SelectRS
                    nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                    value={{ label: exec.doc_type, value: exec.doc_type }}
                    name="Тип документа, удостоверяющего личность"
                    placeholder="Выберите тип"
                    backgroundColor="#F0F2F5"
                    options={[{ value: "Паспорт", label: "Паспорт" }]}
                    onChange={(v) => setData({ ...data, list_collegial_executive_body: { ...exec, doc_type: v.label } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <Input
                    value={exec.doc_serial}
                    type="number"
                    pattern="[0-9]*"
                    name="Серия документа, удостоверяющего личность (при наличии)"
                    placeholder="Введите серию документа"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, doc_serial: e.target.value } })}
                  />

                  <Input
                    value={exec.doc_number}
                    type="number"
                    pattern="[0-9]*"
                    name="Номер документа, удостоверяющего личность"
                    placeholder="Введите номер документа"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, doc_number: e.target.value } })}
                  />
                  <Input 
                    value={exec.issued_by}
                    name="Кем выдан"
                    placeholder="Наименование"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, issued_by: e.target.value } })}
                  />
                </div>
                <div className={classNames(styles.row, "bg-grey", "form")}>
                  <Input
                    value={exec.division_code}
                    name="Код подразделения (при наличии)"
                    placeholder="Введите код"
                    onChange={(e) => setData({ ...data, list_collegial_executive_body: { ...exec, division_code: e.target.value } })}
                  />
                  <DateInput 
                    name="Дата выдачи"
                    value={exec.date_issue}
                    onChange={(v) => setData({ ...data, list_collegial_executive_body: { ...exec, date_issue: v } })}
                  />
                  <DateInput 
                    value={exec.validity}
                    name="Срок действия"
                    onChange={(v) => setData({ ...data, list_collegial_executive_body: { ...exec, validity: v } })}
                  />
                </div>
              </div>
            </Wrapper>
          </div>

          {/* <div className={styles.mb64}>
            <p className={styles.title_block}>
              Данные документа, подтверждающего право иностранного гражданина или
              <br />
              лица без гражданства на пребывание (проживание) в РФ
            </p>
            {documentList.map((item, idx) => <DocumentItem key={idx} /> )}
            <div className={styles.buttons}>
              {!!documentList.length && <DeleteButton onClick={removeFromDocumentList} />}
              <AddButton onClick={addToDocumentList} />
            </div>
          </div> */}

          {/* <div className={styles.mb64}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о лицензии</p>}
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
          </div> */}
          <div className={styles.mb24}>
            <Wrapper
              headElement={
                <p className={styles.title_block}>
                  Сведения о планируемых операциях по счёту
                </p>
              }
            >
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, planned_operations: planned_operations[0] })}
                  >
                    <RadioButtonRS 
                      isActive={data.planned_operations === planned_operations[0]} 
                    />
                    <p>{planned_operations[0]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, planned_operations: planned_operations[1] })}
                  >
                    <RadioButtonRS 
                      isActive={data.planned_operations === planned_operations[1]} 
                    />
                    <p>{planned_operations[1]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, planned_operations: planned_operations[2] })}
                  >
                    <RadioButtonRS 
                      isActive={data.planned_operations === planned_operations[2]} 
                    />
                    <p>{planned_operations[2]}</p>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, planned_operations: planned_operations[3] })}
                  >
                    <RadioButtonRS 
                      isActive={data.planned_operations === planned_operations[3]} 
                    />
                    <p>{planned_operations[3]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, planned_operations: planned_operations[4] })}
                  >
                    <RadioButtonRS 
                      isActive={data.planned_operations === planned_operations[4]} 
                    />
                    <p>{planned_operations[4]}</p>
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb40}>
            <p className={styles.title_block}>Выгодоприобретатели</p>
            <div className={styles.row}>
              <div className={styles.checks}>
                <p className={styles.checks__item}>
                  Имеются ли выгодоприобретатели
                </p>
                <div
                  className={styles.checks__item}
                  onClick={() => setData({ ...data, beneficiaries: "Отсутствуют" })}
                >
                  <RadioButtonRS isActive={data.beneficiaries === "Отсутствуют"} />
                  <p>Отсутствуют</p>
                </div>
                <div
                  className={styles.checks__item}
                  onClick={() => setData({ ...data, beneficiaries: "Имеются" })}
                >
                  <RadioButtonRS isActive={data.beneficiaries === "Имеются"} />
                  <p>Имеются</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mb24}>
            <Wrapper
              headElement={
                <p className={styles.title_block}>
                  Сведения о целях установления деловых отношений с банком
                </p>
              }
            >
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[0] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[0]} 
                    />
                    <p>{account_operations[0]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[1] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[1]} 
                    />
                    <p>{account_operations[1]}</p>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[2] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[2]} 
                    />
                    <p>{account_operations[2]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[3] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[3]} 
                    />
                    <p>{account_operations[3]}</p>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.checks}>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[4] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[4]} 
                    />
                    <p>{account_operations[4]}</p>
                  </div>
                  <div
                    className={styles.checks__item}
                    onClick={() => setData({ ...data, account_operations: account_operations[5] })}
                  >
                    <RadioButtonRS 
                      isActive={data.account_operations === account_operations[5]} 
                    />
                    <p>{account_operations[5]}</p>
                  </div>
                </div>
              </div>

              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по безналичным платежам в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, operation_volume: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.operation_volume === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, operation_volume: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.operation_volume === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, operation_volume: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.operation_volume === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Сумма операций по снятию наличности в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_per_month: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_per_month === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_per_month: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_per_month === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_per_month: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_per_month === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по внешнеторговым контрактам в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, outside_contracts_volume: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.outside_contracts_volume === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, outside_contracts_volume: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.outside_contracts_volume === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, outside_contracts_volume: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.outside_contracts_volume === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Источники происхождения денежных средств
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, cash_source: cash_source[0] })}
                    >
                      <RadioButtonRS
                        isActive={data.cash_source === cash_source[0]}
                      />
                      <p>{cash_source[0]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, cash_source: cash_source[1] })}
                    >
                      <RadioButtonRS
                        isActive={data.cash_source === cash_source[1]}
                      />
                      <p>{cash_source[1]}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, cash_source: cash_source[2] })}
                      >
                      <RadioButtonRS
                        isActive={data.cash_source === cash_source[2]}
                      />
                      <p>{cash_source[2]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, cash_source: cash_source[3] })}
                      >
                      <RadioButtonRS
                        isActive={data.cash_source === cash_source[3]}
                      />
                      <p>{cash_source[3]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>Штатная численность сотрудников</p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, state_employers: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.state_employers === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, state_employers: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.state_employers === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, state_employers: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.state_employers === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb24}>
            <p className={styles.mb24}>Отметьте все верные утверждения</p>
            <div className={styles.content}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.information_goals.includes(statementsTexts[0])}
                      onChange={onSelect(statementsTexts[0])}
                      >
                      <p>{statementsTexts[0]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.information_goals.includes(statementsTexts[1])}
                      onChange={onSelect(statementsTexts[1])}
                      >
                      <p>{statementsTexts[1]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.information_goals.includes(statementsTexts[2])}
                      onChange={onSelect(statementsTexts[2])}
                    >
                      <p>{statementsTexts[2]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS 
                      isChecked={data.information_goals.includes(statementsTexts[3])}
                      onChange={onSelect(statementsTexts[3])}
                    >
                      <p>{statementsTexts[3]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.column}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS 
                      isChecked={data.information_goals.includes(statementsTexts[4])}
                      onChange={onSelect(statementsTexts[4])}
                      >
                      <p>{statementsTexts[4]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <Wrapper
              headElement={<p className={styles.title_block}>Документы</p>}
            >
              <ScanOrPhoto 
                name="Устав юридического лица"
              />
              <ScanOrPhoto
                name="Решение и/или приказ о назначении на должность ЕИО"
              />
              <ScanOrPhoto
                name="Паспорт исполнительного органа Клиента/лица, действующего по доверенности, а также паспорт каждого бенефициарного владельца\n"
              />
              <ScanOrPhoto
                name="Доверенность лица, действующего по доверенности, в случаи если подписантом будет выступать не единоличный исполнительный орган\n"
              />
              <ScanOrPhoto
                name="Документы, подтверждающие законное право ЕИО - физ.лица, не являющегося гражданином РФ, на нахождение / пребывание на территории РФ (Миграционная карта, вид на жительство и иные документы подтверждающие такое право\n"
              />
              <ScanOrPhoto name={"Прочие документы"} />
            </Wrapper>
          </div> */}
          {erroredFields.length && showErrors ? <p style={{ color: "red" }}>Часть полей не заполнена или заполнена некорректно</p> : null}
          <div style={{ textAlign: "right", margin: "40px 0" }}>
            <ButtonRS
              title="Продолжить"
              style={{ width: "auto" }}
              onClick={onSubmit}
            />
          </div>

        </form>
      </div>
    </>
  );
};

export default Step2;
