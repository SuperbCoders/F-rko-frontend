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
import { dateIsValid, getFormatFile, getSizeMb, ROUTES } from "../../helpers";
import Wrapper from "../../components/Step2Components/Wrapper";
import InputLock from "../../components/InputLock";
import DeleteButton from "../../components/DeleteButton";
import AddButton from "../../components/AddButton";
import DownloadButton from "../../components/DownloadButton";
import { documentApi, userApi } from "../../api";
import { RequisitesContext } from "../../contexts/companyRequisits";
import MaskedInput from "../../components/MaskedInput";
import DaDataSelect from "../../components/DaDataSelect";

export const statementsTexts = [
  "Подтверждаю и гарантирую, что все Выгодоприобретатели/бенефициары индивидуального предпринимателя являются налогоплательщиками исключительно в РФ и, если выгодоприобретателем является юридическое лицо, то оно не имеет признаков Пассивной нефинансовой организации",
  "Юридическое лицо, или бенефициар, или выгодоприобретатель являются налоговым резидентом иностранного государства и/или у юридического лица, бенефициара или выгодоприобретателя отсутствует налоговое резидентство во всех государствах (территориях)) - Юридическое лицо имеет признаки Пассивной нефинансовой организации",
  "Компания является хозяйственным обществом, имеющим стратегическое значение для оборонно-промышленного комплекса и безопасности РФ либо обществом, находящимся под его прямым или косвенным контролем, которые указаны в Федеральном законе от 21.07.2014 № 213-ФЗ ",
  "Юридическое лицо является Финансовым институтом в соответствии с Законом США «О налогообложении иностранных счетов» (FATCA) и/или главой 20.1 Налогового кодекса РФ",
  "Компания осуществляет виды деятельности, которые могут иметь стратегическое значение для оборонно-промышленного комплекса и безопасности РФ",
  "Юридическое лицо, выгодоприобретатель или бенефициар являются налоговым резидентом США",
  "Компания не относится к указанным в настоящем пункте юридическим лицам"
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
  const navigate = useNavigate()
  const planned_operations = [
    "Договор возмездного оказания услуг",
    "Договор поставки",
    "Договор подряда",
    "Договор комиссии",
    "Договор купли-продажи",
    "Договор аренды движимого имущества",
    "Договор аренды недвижимого имущества",
    "Договор лизинга",
    "Договор факторинга",
    "Иное (укажите)",
  ]

  const roles = [
    "Акционер/учредитель",
    "Бенефициарный владелец",
    "ЕИО"
  ]

  const supremeManOpts = [
    { label: 'Общее собрание участников', value: 'Общее собрание участников' }, 
    { label: 'Единоличный исполнительный орган', value: 'Единоличный исполнительный орган' }, 
    { label: 'Иное', value: 'Иное' }, 
  ]

  const identityDocOpts = [
    { 
      value: "Паспорт гражданина Российской Федерации (Код 21)",
      label: "Паспорт гражданина Российской Федерации (Код 21)"
    },
    { 
      value: "Дипломатический паспорт, служебный паспорт, удостоверяющие личность гражданина РФ за пределами РФ (Код 22)",
      label: "Дипломатический паспорт, служебный паспорт, удостоверяющие личность гражданина РФ за пределами РФ (Код 22)"
    },
    { 
      value: "Временное удостоверение личности гражданина РФ, выдаваемое на период оформления паспорта гражданина РФ (Код 26)",
      label: "Временное удостоверение личности гражданина РФ, выдаваемое на период оформления паспорта гражданина РФ (Код 26)"
    },
    { 
      value: "Свидетельство о рождении гражданина РФ (для граждан РФ в возрасте до 14 лет) (Код 27)",
      label: "Свидетельство о рождении гражданина РФ (для граждан РФ в возрасте до 14 лет) (Код 27)"
    },
    { 
      value: "Иные документы, признаваемые документами, удостоверяющими личность гражданина РФ в соответствии с законодательством РФ (Код 28)",
      label: "Иные документы, признаваемые документами, удостоверяющими личность гражданина РФ в соответствии с законодательством РФ (Код 28)"
    },
  ]

  const headcounts = [
    "Единственным работником является единоличный исполнительный орган",
    "2-5",
    "6-20",
    "Более 20",
  ]

  const num_transactions_week_opts = [
    { value: ">10", label : "От 10" },
    { value: ">100", label : "От 100" },
    { value: ">1000", label : "От 1000" },
  ]  

  const sun_select_opts = [
    { value: "<1 000 000", label: "До 1 000 000" },
    { value: "<10 000 000", label: "До 10 000 000" },
    { value: "<100 000 000", label: "До 100 000 000" },
    { value: ">100 000 000", label: "Свыше 100 000 000" },
  ]

  const cashSources = [
    { value: "Финансирование учредителей/участников", label: "Финансирование учредителей/участников" },
    { value: "Доходы от основного вида деятельности", label: "Доходы от основного вида деятельности" },
    { value: "Доходы от дополнительных видов деятельности", label: "Доходы от дополнительных видов деятельности" },
    { value: "Заемные (кредитные)/привлеченные денежные средства", label: "Заемные (кредитные)/привлеченные денежные средства" },
    { value: "Государственное финансирование", label: "Государственное финансирование" },
    { value: "Иное", label: "Иное" },
  ]

  const formatedOptions = (list) => list.map((item) => ({ value: item.data.address.unrestricted_value, label: item.data.address.unrestricted_value }))

  const { data, info, setData, erroredFields=[], setErroredFields } = React.useContext(RequisitesContext)

  const regDate = data?.registration_date ? new Date(parseInt(data.registration_date)) : ""
  const formatedRegDate = regDate ? `${regDate.getFullYear?.()}-${regDate?.getMonth?.() + 1}-${regDate?.getDate?.()}` : ""

  const orgnDate = data?.ogrn_date ? new Date(parseInt(data.ogrn_date)) : ""
  const formatedOgrnDate = orgnDate ? `${orgnDate.getFullYear?.()}-${orgnDate.getMonth?.() + 1}-${orgnDate.getDate?.()}` : ""

  const [isBeneficiaries, setIsBeneficiaries] = React.useState(false)
  const [disableUI, setDisableUI] = React.useState(false)
  const [customPlannedOper, setCustomPlannedOper] = React.useState({ active: false, value: "" })
  const [customSource, setCustomSource] = React.useState({ active: false, value: "" })
  const [showErrors, setShowErrors] = React.useState(false)

  React.useEffect(() => setIsBeneficiaries(data.beneficiaries !== "Отсутствуют"), [data.beneficiaries])
  React.useEffect(() => setCustomPlannedOper({
    active: info.current?.custom_planned_operation?.active ?? false,
    value: info.current?.custom_planned_operation?.value ?? ""
  }), [info.current?.custom_planned_operation])

  React.useEffect(() =>  {
    setCustomSource({ 
      active : data.sources_cash_receipts === "Иное",
      value: info.current.custom_source
    })
  }, [info.current.custom_source])

  const addToAddressList = () => data.addresses.length < 2 && setData({
    ...data,
    addresses: [
      ...data.addresses,
      {
        type_adress: ["Юридический"],
        address: ""
      }
    ]
  })

  const addToFoundersList = () => setData({
    ...data,
    founders: [
      ...data.founders,
      {
        founder_inn: "",
        label: "",
        capital: ""
      }
    ]
  })

  const onSelectAddressType = (type, idx) => () => {
    const curr = data.addresses[idx]
    if (curr.type_adress.includes(type) && curr.type_adress.length > 1) {
      curr.type_adress = curr.type_adress.filter(t => t !== type)
    } else if (!curr.type_adress.includes(type)) {
      curr.type_adress = [...curr.type_adress, type]
    }
    setData({ ...data })
  }

  const onSelectAddress = (idx) => (v) => {
    data.addresses[idx].address = v?.label ?? ""
    setData({ ...data })
    setErroredFields(prev => 
      v?.label 
        ? [...prev, `addresses_${idx}`]
        : prev.filter(f => f !== `addresses_${idx}`)
    )
  }

  const onSelect = (str) => () => setData({ ...data, information_goals: data.information_goals.includes(str) ? data.information_goals.filter(s => s !== str) : [...data.information_goals, str] })
  const onSelectOper = (str) => () => {
    if (data.planned_operations.includes(str)) {
      setData({ ...data, planned_operations: data.planned_operations.filter(s => s !== str) })
      if (!data.planned_operations.length) {
        setErroredFields(p => ([...p, "planned_operations"]))
      }
    } else {
      setData({ ...data, planned_operations: [...data.planned_operations, str]})
      setErroredFields(p => p.filter(f => f !== "planned_operations"))
    }
  }

  const getIdentityDocUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(fd).then(res => {
      data.document_certifying_identity_executive.push({ path: res.images[0]?.path, file, size: getSizeMb(file.size) })
      setData({ ...data })
      setErroredFields(p => p.filter(f => f !== "document_certifying_identity_executive"))
    })
  }
  const getActivityDocUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(fd).then(res => {
      data.document_confirming_real_activity.push({ path: res.images[0]?.path, file: file, size: getSizeMb(file.size) })
      setData({ ...data })
    })
  }

  const getLicenseUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(fd).then(res => {
      data.document_licenses.push({ path: res.images[0]?.path, file: file, size: getSizeMb(file.size) })
      setData({ ...data })
    })  
  }

  const deleteFromActivityDocs = (lic) => () => {
    data.document_confirming_real_activity = data.document_confirming_real_activity.filter(l => l !== lic)
    setData({ ...data })
  }
  const deleteFromIdentityDocs = (lic) => () => {
    data.document_certifying_identity_executive = data.document_certifying_identity_executive.filter(l => l !== lic)
    setData({ ...data })
  }
  const deleteFromLicense = (lic) => () => {
    data.document_licenses = data.document_licenses.filter(l => l !== lic)
    setData({ ...data })
  }

  const onSelectBenfs = () => {
    if (isBeneficiaries) {
      setData({ ...data, beneficiaries: "Отсутствуют" })
      setErroredFields(p => ([...p, "beneficiaries" ]))
    } else {
      setData({ ...data, beneficiaries: data.beneficiaries !== "Отсутствуют" ? data.beneficiaries : "" })
    }
    setIsBeneficiaries(!isBeneficiaries)
  }

  const onSelectFounderInn = (idx) => (value) => {
    data.founders[idx].founder_inn = value?.value ?? ""
    data.founders[idx].label = value?.label ?? ""
    setData({ ...data })
    value?.label 
      ? setErroredFields(p => p.filter(f => f !==  `founder_inn_${idx}`))
      : setErroredFields(p => ([...p, `founder_inn_${idx}`]))
  }

  const onChangeFounderCapital = (idx) => (e) => {
    data.founders[idx].capital = e.target.value
    setData({ ...data })
    e.target.value 
      ? setErroredFields(p => p.filter(f => f !==  `capital_${idx}`))
      : setErroredFields(p => ([...p, `capital_${idx}`]))
  }

  const removeFromFounderList = (idx) => () => {
    setData(prev => {
      prev.founders = prev.founders.filter((_, i) => i !== idx)
      return {...prev}
    })
  }

  const onCheckCustomPlannedOper = () => {
    info.current.custom_planned_operation = { active: !customPlannedOper.active, value: customPlannedOper.value }
    setCustomPlannedOper({ active: !customPlannedOper.active, value: customPlannedOper.value })
    if (customPlannedOper.value) {
      setErroredFields(p => p.filter(f => f !== "custom_planned_oper"))
    } else {
      setErroredFields(p => ([...p, "custom_planned_oper"]))
    }
  }

  const onChangeCustomPlannedOper = (e) => {
    info.current.custom_planned_operation = { active: true, value: e.target.value }
    setCustomPlannedOper({ active: true, value: e.target.value })
    e.target.value 
      ? setErroredFields(p => p.filter(f => f !== "custom_planned_oper"))
      : setErroredFields(p => ([...p, "custom_planned_oper"]))
  }

  const onChangeCounterparties = (i) => (e) => {
    data.information_counterparties_two[i] = e.target.value
    setData({ ...data })
  }

  const removeFromCounterparties = (idx) => () =>  {
    data.information_counterparties_two.filter((_, i) => i !== idx)
    setData({ ...data })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)
    const fields = [ 
      "email",
      "codeword",
      "contact_phone_number",
      "donainname",
      "fax",
      "supreme_management_body",
      "employers_volume",
      "document_certifying_identity_executive",
      "history_reputation",
      "week_cash_withdrawal",
      "quarter_cash_withdrawal",
      "age_cash_withdrawal",
      "sum_week_cash_withdrawal",
      "sum_mouth_cash_withdrawal",
      "sum_quarter_cash_withdrawal",
      "sum_age_cash_withdrawal",
      "foreign_trade_contracts_week",
      "foreign_trade_contracts_month",
      "foreign_trade_contracts_quarter",
      "foreign_trade_contracts_age",
      "num_transactions_week",
      "num_transactions_month",
      "num_transactions_quarter",
      "num_transactions_age",
      "foreign_sum_contracts_week",
      "foreign_sum_contracts_month",
      "foreign_sum_contracts_quarter",
      "foreign_sum_contracts_age",
      "sum_transactions_week",
      "sum_transactions_month",
      "sum_transactions_quarter",
      "sum_transactions_age",
      "sources_cash_receipts",
      "headcount",
      "supreme_management_body",
      "monthly_cash_withdrawal"
    ]
    const arr = fields.reduce((accum, next) => !data[next] || !data[next]?.length ? ([...accum, next]) : accum, [])
    if (!data.planned_operations.length && !info.current.custom_planned_operation.active) {
      arr.push("planned_operations")
    }
    setErroredFields(arr)

    if (data.information_counterparties && data.information_counterparties_two.every(str => str === "")) {
      return
    }
    if (data.addresses.length && data.addresses.every(a => a.address === "")) {
      return
    }
    if (data.founders.length && data.founders.every(a => a.capital === "" && a.label === "")) {
      return
    }
    if (!(data?.donainname?.includes?.("https://") || data?.donainname?.includes?.("www."))) {
      return
    }
    if (!/^[а-яА-ЯёЁ\s]+$/.test(data.codeword)) {
      return
    }
    if (arr.length) {
      return
    }

    let isValid = true
    data.list_persone.every(p => {
      if (!p?.account_onw_role.length) {
        isValid = false
        return false
      }
      if (!p.account_own_lastname?.length) {
        isValid = false
        return false
      }
      if (!p.account_own_name?.length) {
        isValid = false
        return false
      }
      if (!p.account_own_surname?.length) {
        isValid = false
        return false
      }
      if (p.account_onw_role?.includes?.("ЕИО") && !p.account_own_job_title?.length) {
        isValid = false
        return false
      }
      if (p.account_own_gender !== "Мужской" && p.account_own_gender !== "Женский") {
        isValid = false
        return false
      }
      if (!/[0-9]+/.test(p.account_onw_inn?.[11])) {
        isValid = false
        return false
      }
      if (!p.account_own_citizenship?.length) {
        isValid = false
        return false
      }
      if (!p.account_country_residence?.length) {
        isValid = false
        return false
      }
      if (!/[0-9]+/.test(p.account_own_phone?.[17])) {
        isValid = false
        return false
      }
      if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(p.email)) {
        isValid = false
        return false
      }
      if (!p.account_own_piece?.length) {
        isValid = false
        return false
      }
      if (!p.account_own_registration?.length) {
        isValid = false
        return false
      }
      if (!p.accownt_own_living?.length) {
        isValid = false
        return false
      }
      if (!p.account_birth_place?.length) {
        isValid = false
        return false
      }
      if (!p.doc_type?.length) {
        isValid = false
        return false
      }
      if (!isNaN(p.doc_number?.[5])) {
        isValid = false
        return false
      }
      if (!isNaN(p.doc_serial?.[5])) {
        isValid = false
        return false
      }
      if (!p.issued_by?.length) {
        isValid = false
        return false
      }
      if (!p.division_code?.length) {
        isValid = false
        return false
      }
      if (!dateIsValid(p.date_issue)) {
        isValid = false
        return false
      }
      if (!dateIsValid(p.account_datebirth)) {
        isValid = false
        return false
      }
      return true
    })

    if (!isValid) {
      return
    }

    const dto = {
      ...data,
      addresses: data.addresses.map(({ type_adress, address }) => ({ 
        type_adress, 
        legal_address: type_adress === "Юридический" ? address : "", 
        mail_address: type_adress === "Почтовый" ? address : "",
        address
      })),
      list_persone: [...data.list_persone],
      planned_operations: customPlannedOper.active ? [...data.planned_operations, customPlannedOper.value] : data.planned_operations,
      document_certifying_identity_executive: data.document_certifying_identity_executive.map(d => d?.path),
      document_confirming_real_activity: data.document_confirming_real_activity.map(d => d?.path),
      document_licenses: data.document_licenses.map(d => d?.path),
      information_counterparties_two: data.information_counterparties ? data.information_counterparties_two : [],
      sources_cash_receipts: customSource.active ? customSource.value : data.sources_cash_receipts
    }
    dto.list_persone.map(p => ({
      ...p,
      accownt_own_living: p.accownt_own_living === "Совпадает" ? p.account_own_registration : p.accownt_own_living,
    }))

    setDisableUI(true)
    try {
      await userApi.postInfo(dto, data.contact_number)
      localStorage.setItem("rko_active_step", 3)
      localStorage.removeItem("rko_data")
      setDisableUI(false)
      navigate(ROUTES.STEP3)  
    } catch (error) {
      setDisableUI(false)
    }
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
            <Wrapper headElement={<p className={styles.title_block}>Контакты</p>}>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>E-mail</p>
                    <MaskedInput
                      placeholder="pochta@server.com"
                      error={showErrors && !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(data.email)}
                      value={data.email ?? ""}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    {showErrors && <>
                      {!data.email?.length 
                        ? <p className="text-error">Поле не заполнено</p>
                        : !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(data.email) 
                          ? <p className="text-error">Поле заполнено некорректно</p>
                          : null
                      }</>
                    }
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Телефон</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      value={data?.contact_phone_number ?? ""}
                      error={showErrors && erroredFields.includes("contact_phone_number")}
                      onChange={(e) => {
                        !/[0-9]+/.test(e.target.value?.[17])
                          ? setErroredFields(prev => ([...prev, "contact_phone_number"]))
                          : setErroredFields(prev => prev.filter(f => f !== "contact_phone_number"))
                        setData({ ...data, contact_phone_number: e.target.value })
                      }}
                    />
                      {showErrors && <>
                        {isNaN(data?.contact_phone_number?.[4]) 
                          ? <p className="text-error">Поле не заполнено</p>
                          : isNaN(data?.contact_phone_number?.[17])
                            ? <p className="text-error">Поле заполнено некорректно</p>
                            : null
                        }</>
                      }
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Сайт компании</p>
                    <MaskedInput
                      placeholder="www."
                      value={data?.donainname ?? "www."}
                      error={erroredFields.includes("donainname")}
                      onChange={(e) => {
                        !(e.target.value.includes("https://") || e.target.value.includes("www."))
                          ? setErroredFields(prev =>  prev.includes("donainname") ? prev : [...prev, "donainname"])
                          : setErroredFields(prev => prev.filter(f => f !== "donainname"))
                        setData({ ...data, donainname: e.target.value}) 
                      }}
                    />
                      {showErrors && <>
                        {!data?.donainname?.length 
                          ? <p className="text-error">Поле не заполнено</p>
                          : !(data?.donainname?.includes("https://") || data?.donainname?.includes("www."))
                            ? <p className="text-error">Поле заполнено некорректно</p>
                            : null
                        }</> 
                      }
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Факс</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      error={showErrors && erroredFields.includes("fax")}
                      value={data.fax ?? ""}
                      onChange={(e) => {
                        !/[0-9]+/.test(e.target.value?.[17])
                        ? setErroredFields(prev => ([...prev, "fax"]))
                        : setErroredFields(prev => prev.filter(f => f !== "fax"))
                        setData({ ...data, fax: e.target.value })
                      }}
                    />
                      {showErrors && <>
                        {isNaN(data?.fax?.[4]) 
                          ? <p className="text-error">Поле не заполнено</p>
                          : isNaN(data?.fax?.[17])
                            ? <p className="text-error">Поле заполнено некорректно</p>
                            : null
                        }</>
                      }
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb64}>
            <Wrapper headElement={<p className={styles.title_block}>Адреса</p>}>
              <div className={styles.content}>
                {data?.addresses?.map?.(({ type_adress, address }, idx) => 
                  <AddressItem
                    key={idx}
                    id={idx}
                    type={type_adress}
                    address={address}
                    error={showErrors && !address.length}
                    onSelectType={onSelectAddressType}
                    onSelectAddress={onSelectAddress}
                  /> 
                )}
                {data?.addresses?.length < 2 && <div>
                  <AddButton
                    type="button" 
                    onClick={addToAddressList} 
                  />
                </div>} 
              </div>
            </Wrapper>
          </div>
          {info.current?.type && info.current?.type !== "INDIVIDUAL" && info.current?.code !== "50102" && 
            <div className={styles.mb40}>
              <Wrapper
                headElement={<p className={styles.title_block}>Структура органов управления</p>}
              >
                <div className={styles.content}>
                  <div className={styles.row}>
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.supreme_management_body, label: data.supreme_management_body }}
                      name="Высший орган управления"
                      error={erroredFields.includes("supreme_management_body")}
                      placeholder="Высший орган управления"
                      options={supremeManOpts}
                      onChange={(v) => {
                        setData({ ...data, supreme_management_body: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "supreme_management_body")) 
                          : setErroredFields(prev => ([ ...prev, "supreme_management_body" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("supreme_management_body") && <p style={{ marginTop: "-23px" }} className="text-error">Поле не заполнено</p>}

                </div>
              </Wrapper>
            </div>
          }
          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о персонале</p>}
            >
              <div className={styles.content}>
                <div className={styles.row}>
                  <div>
                    <Input
                      value={data.employers_volume}
                      type="text"
                      name="Численность персонала"
                      placeholder="Напишите значение"
                      error={showErrors && !data.employers_volume}
                      onChange={(e) => {
                        setData({ ...data, employers_volume: e.target.value.replace(/[^0-9]/g,'') })
                        e.target.value 
                          ? setErroredFields(p => p.filter(f => f !== "employers_volume"))
                          : setErroredFields(p => ([...p, "employers_volume"]))
                      }}
                    />
                    {showErrors && !data.employers_volume && <p className="text-error">Поле не заполнено</p>}
                  </div>
                  <div>
                  <Input
                    value={data.salary_debt}
                    name="Задолженность по з/п"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Укажите сумму"
                    rightElement={<p>₽</p>}
                    onChange={(e) => {
                      if (!e.target.value.split(".")[1] || e.target.value.split(".")[1]?.length < 3) {
                        setData({ ...data, salary_debt: e.target.value })
                      }
                    } }
                  />
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>

          {info.current?.type && info.current?.type !== "INDIVIDUAL" && info.current?.code !== "50102" && <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Учредители – юридические лица</p>}
            >
              <div className={styles.content}>
                {data.founders?.map(({ capital, label }, idx) => 
                  <div className={styles.row} key={label + idx}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Учредитель"
                        value={label}
                        error={showErrors &&!label.length}
                        message="Введите Название или ИНН"
                        formatedOptions={(list) => list.map((item) => ({ value: item.data.inn, label: item.data.name.full_with_opf }))}
                        onSelect={onSelectFounderInn(idx)}
                      />
                    {showErrors &&!label.length && <p 
                      style={{ marginTop: "-23px" }} 
                      className="text-error"
                      >Поле не заполнено
                    </p>}

                    </div>
                    <div className={styles.column}>
                      <Input
                        value={capital}
                        maxLength={6}
                        error={showErrors &&!capital.length}
                        name="Доля в уставном капитале"
                        onChange={onChangeFounderCapital(idx)}
                      />
                    {showErrors &&!capital.length && <p style={{ marginTop: "-23px" }} className="text-error">Поле не заполнено</p>}
                    </div>
                    <div style={{ width: "auto", marginTop: "25px" }} className={styles.column}>
                      <DeleteButton onClick={removeFromFounderList(idx)} />
                    </div>
                  </div>
                )}
                <div>
                  <AddButton
                    type="button" 
                    onClick={addToFoundersList} 
                  />
                </div>
              </div>
            </Wrapper>
          </div>}
          
          <div className={styles.mb24}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о физических лицах организации</p>}
            >
              {data.list_persone?.map((p, i) => 
                <div key={i} className={styles.mb24}>
                  <p className={styles.mb24}>Роль лица</p>
                  <div className={styles.row}>
                    <div className={styles.checks}>
                      {roles.map(r => 
                        <div
                        key={r}
                        className={styles.checks__item}
                        >
                        <CheckBoxRS
                          isChecked={p.account_onw_role?.includes?.(r)}
                          onChange={() => {
                            const roles = data.list_persone[i].account_onw_role ?? []
                            data.list_persone[i].account_onw_role = roles?.includes?.(r) ? roles.filter(role => role !== r) : [...roles, r]
                            setData({ ...data })
                          }}
                        >
                          <p>{r}</p>
                        </CheckBoxRS>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.mb24}>
                  {showErrors && !p.account_onw_role?.length && <p className="text-error">Поле не заполнено</p>}
                  </div>

                  <div className={styles.row}>
                    <div>
                    <Input 
                      value={p.account_own_lastname}
                      name="Фамилия"
                      error={showErrors && !p.account_own_lastname?.length}
                      placeholder="Введите Фамилию"
                      onChange={(e) => {
                        data.list_persone[i].account_own_lastname = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.account_own_lastname?.length && <p className="text-error">Поле не заполнено</p>}

                    </div>
                    <div>
                    <Input 
                      value={p.account_own_name}
                      name="Имя"
                      error={showErrors && !p.account_own_name?.length}
                      placeholder="Введите Имя"
                      onChange={(e) => {
                        data.list_persone[i].account_own_name = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.account_own_name?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                    <div>
                    <Input
                      value={p.account_own_surname}
                      name="Отчество (при наличии)"
                      placeholder={"Введите Отчество"}
                      error={showErrors && !p.account_own_surname?.length}
                      onChange={(e) => {
                        data.list_persone[i].account_own_surname = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.account_own_surname?.length && <p className="text-error">Поле не заполнено</p>}

                    </div>
                  </div>
                    {p.account_onw_role?.includes?.("ЕИО") && 
                    <div>
                      <div>
                        <Input 
                          value={p.account_own_job_title}
                          name="Должность"
                          placeholder="Введите должность"
                          error={showErrors && !p.account_own_job_title?.length}
                          onChange={(e) => {
                            data.list_persone[i].account_own_job_title = e.target.value
                            setData({ ...data })
                          }}
                        />
                      </div>
                      {showErrors && !p.account_own_job_title?.length && 
                        <div className={styles.mb24} style={{ marginTop: "-24px" }}>
                          <p className="text-error">Поле не заполнено</p>
                        </div>
                      }
                    </div>}

                  {p.account_onw_role?.includes?.("Акционер/учредитель") && 
                      <div className="mt25">
                      <Input 
                        value={p.account_own_piece ?? ""}
                        name="Доля владения (%)"
                        placeholder="Доля владения"
                        type="text" pattern="\d*"
                        error={showErrors && !p.account_own_piece?.length}
                        onChange={(e) => {
                          if (e.target.value >= 0 && e.target.value <= 100) {
                            data.list_persone[i].account_own_piece = e.target.value.replace(".", "")
                            setData({ ...data })
                          }
                        }}
                      />
                      <div className={styles.mb24}>
                      {!p.account_own_piece?.length && showErrors && <p className="text-error">Поле не заполнено</p>}
                      </div>
                      </div>
                    }
                  <div className={styles.checks}>
                    <p className={styles.checks__item}>Пол</p>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        data.list_persone[i].account_own_gender = "Мужской"
                        setData({ ...data })
                      }}
                    >
                      <RadioButtonRS isActive={p.account_own_gender === "Мужской"} />
                      <p>Мужской</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        data.list_persone[i].account_own_gender = "Женский"
                        setData({ ...data })
                      }}
                    >
                      <RadioButtonRS isActive={p.account_own_gender === "Женский"} />
                      <p>Женский</p>
                    </div>
                  </div>
                  {showErrors && p.account_own_gender !== "Мужской" && p.account_own_gender !== "Женский" && <p className="text-error label">Поле не заполнено</p>}

                  <div className={styles.row}>
                    <div style={{ maxWidth: "calc(50% - 12px)" }} className={styles.input__wrapper}>
                      <p className={styles.name}>ИНН</p>
                      <MaskedInput
                        value={p.account_onw_inn ?? ""}
                        name="ИНН" 
                        maskChar="_"
                        error={showErrors && (isNaN(p.account_onw_inn?.[0]) || isNaN(p.account_onw_inn?.[11]))}
                        mask="999999999999"
                        placeholder="____________"
                        onChange={(e) => {
                          data.list_persone[i].account_onw_inn = e.target.value
                          setData({ ...data })
                        }}
                      />
                      {showErrors && <>
                      {isNaN(p.account_onw_inn?.[0]) 
                        ? <p className="text-error">Поле не заполнено</p>
                        : isNaN(p.account_onw_inn?.[11]) 
                          ? <p className="text-error">Поле заполнено некорректно</p>
                          : null
                        }</>
                      }
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="transparent"
                        name="Гражданство"
                        isCountries
                        value={p.account_own_citizenship}
                        error={showErrors && !p.account_own_citizenship?.length}
                        message="Введите страну"
                        formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                        onSelect={(value) => {
                          data.list_persone[i].account_own_citizenship = value?.value ?? ""
                          setData({ ...data })
                        }}
                      />
                      {showErrors && !p.account_own_citizenship?.length && <p style={{ marginTop: "-24px" }} className="text-error">Поле не заполнено</p>}
                    </div>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="transparent"
                        name="Страна проживания"
                        isCountries
                        value={p.account_country_residence}
                        error={showErrors && !p.account_country_residence?.length}
                        message="Введите страну"
                        formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                        onSelect={(value) => {
                          data.list_persone[i].account_country_residence = value?.value ?? ""
                          setData({ ...data })
                        }}
                      />
                      {showErrors && !p.account_country_residence?.length && <p style={{ marginTop: "-24px" }} className="text-error">Поле не заполнено</p>}

                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.input__wrapper} style={{ maxWidth: "calc(50% - 12px)" }}>
                      <p className={styles.name}>Телефон</p>
                      <MaskedInput
                        mask="+7 (999) 999 99 99"
                        maskChar="_"
                        placeholder="+7 (__) ___ __ __"
                        error={showErrors && !/[0-9]+/.test(p.account_own_phone?.[17])}
                        value={p.account_own_phone ?? ""}
                        style={{margin: 0, padding: "20px 16px" }}
                        onChange={(e) => {
                          data.list_persone[i].account_own_phone = e.target.value
                          setData({ ...data })
                        }}
                      />
                      {showErrors && !/[0-9]+/.test(p.account_own_phone?.[17]) && <p className="text-error">Поле заполнено некорректно</p>}
                    </div>

                    <div className={styles.input__wrapper}>
                      <p className={styles.name}>E-mail</p>
                      <MaskedInput
                        placeholder="pochta@server.com"
                        error={showErrors && (!p.email?.length || !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(p.email))}
                        value={p?.email ?? ""}
                        onChange={(e) => {
                          data.list_persone[i].email = e.target.value
                          setData({ ...data })
                        }}
                      />
                        {showErrors && <>
                          {!p.email?.length 
                            ? <p className="text-error">Поле не заполнено</p>
                            : !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(p.email) 
                              ? <p className="text-error">Поле заполнено некорректно</p>
                              : null
                          }</>
                        }
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="transparent"
                        name="Адрес регистрации"
                        value={p.account_own_registration}
                        isAddr={true}
                        error={showErrors && !p.account_own_registration?.length}
                        message="Введите адрес"
                        filterOption={() => true}
                        formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                        onSelect={(v) => {
                          data.list_persone[i].account_own_registration = v?.label ?? ""
                          setData({ ...data })
                        }}
                      />
                    </div>
                  </div>
                  {showErrors && !p.account_own_registration?.length && <p className="text-error label">Поле не заполнено</p>}
                  <div>
                    <p className={styles.mb24}>Адрес местонахождения</p>
                    <div className={styles.row}>
                      <div className={styles.checks}>
                        <div
                          className={styles.checks__item}
                          onClick={() => {
                            data.list_persone[i].accownt_own_living = "Совпадает"
                            setData({ ...data })
                          }}
                        >
                          <RadioButtonRS
                            isActive={p.accownt_own_living === "Совпадает"}
                          />
                          <p>Совпадает с адресом регистрации</p>
                        </div>
                        <div
                          className={styles.checks__item}
                          onClick={() => {
                            data.list_persone[i].accownt_own_living = ""
                            setData({ ...data })
                          }}
                        >
                          <RadioButtonRS 
                            isActive={p.accownt_own_living !== "Совпадает"}
                          />
                          <p>Не совпадает с адресом регистрации</p>
                        </div>
                      </div>
                    </div>
                    {showErrors && p.accownt_own_living === null && <p className="text-error label">Поле не заполнено</p>}
                  </div>
                  {p.accownt_own_living !== "Совпадает" && 
                    <div>
                    <div className={styles.row}>
                      <div className={styles.column}>
                        <DaDataSelect 
                          backgroundColor="transparent"
                          name="Адрес местонахождения"
                          value={p.accownt_own_living}
                          message="Введите адрес"
                          isAddr={true}
                          error={showErrors && !p.accownt_own_living?.length}
                          filterOption={() => true}
                          formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                          onSelect={(v) => {
                            data.list_persone[i].accownt_own_living = v?.label ?? ""
                            setData({ ...data })
                          }}
                        />
                      </div>
                    </div>
                    {showErrors && !p.accownt_own_living?.length && <p className="text-error label">Поле не заполнено</p>}
                    </div>
                    }
                  <div className={classNames(styles.row, "form")}>
                    <div>
                    <Input
                      name="Место рождения"
                      value={p.account_birth_place}
                      placeholder="Введите адрес"
                      error={showErrors && !p.account_birth_place?.length}
                      onChange={(e) => {
                        data.list_persone[i].account_birth_place = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.account_birth_place?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                    <div className={styles.input__wrapper}>
                      <p className={styles.name}>Дата рождения</p>
                      <MaskedInput 
                        value={p.account_datebirth ?? ""}
                        mask="99.99.9999"
                        placeholder="DD.MM.YYYY"
                        error={showErrors && !dateIsValid(p.account_datebirth)}
                        onChange={(e) => {
                          data.list_persone[i].account_datebirth = e.target.value
                          setData({ ...data })
                        }}
                        />

                      {showErrors && <>
                        {!p?.account_datebirth?.length 
                        ? <p className="text-error">Поле не заполнено</p>
                        : !dateIsValid(p.account_datebirth) && <p className="text-error">Поле заполнено некорректно</p>}
                      </>}
                    </div>
                    <div>
                    <SelectRS
                      value={{ label: p.doc_type, value: p.doc_type }}
                      name="Тип документа, удостоверяющего личность"
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      placeholder="Выберите тип"
                      backgroundColor="transparent"
                      options={identityDocOpts}
                      error={showErrors && !p.doc_type?.length}
                      onChange={(v) => {
                        data.list_persone[i].doc_type = v?.label ?? ""
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.doc_type?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                  </div>
                  <div className={classNames(styles.row, "form")}>
                    <div className={styles.input__wrapper}>
                    <p className={styles.name}>Серия документа, удостоверяющего личность (при наличии)</p>
                    <MaskedInput
                      value={p.doc_serial ?? ""}
                      mask="9999"
                      maskChar="_"
                      placeholder="____"
                      error={showErrors && (isNaN(p.doc_serial?.[0]) || isNaN(p.doc_serial?.[3]))}
                      onChange={(e) => {
                        data.list_persone[i].doc_serial = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && <>
                      {isNaN(p.doc_serial?.[0]) 
                        ? <p className="text-error">Поле не заполнено</p>
                        : isNaN(p.doc_serial?.[3])  
                          ? <p className="text-error">Поле заполнено некорректно</p>
                          : null
                      }
                    </>}
                    </div>
                    <div className={styles.input__wrapper}>
                    <p className={styles.name}>Номер документа, удостоверяющего личность</p>
                    <MaskedInput
                      value={p.doc_number ?? ""}
                      error={showErrors && (isNaN(p.doc_number?.[0]) || isNaN(p.doc_number?.[5]))}
                      placeholder="______"
                      mask="999999"
                      maskChar="_"
                      onChange={(e) => {
                        data.list_persone[i].doc_number = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && <>
                      {isNaN(p.doc_number?.[0]) 
                        ? <p className="text-error">Поле не заполнено</p>
                        : isNaN(p.doc_number?.[5])  
                          ? <p className="text-error">Поле заполнено некорректно</p>
                          : null
                      }
                    </>}
                    </div>
                    <div>
                      <Input 
                        value={p.issued_by}
                        name="Кем выдан"
                        placeholder="Наименование"
                        error={showErrors && !p.issued_by?.length}
                        onChange={(e) => {
                          data.list_persone[i].issued_by = e.target.value
                          setData({ ...data })
                        }}
                      />
                      {showErrors && !p.issued_by?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                  </div>
                  <div className={classNames(styles.row, "form")}>
                      <div>
                      <DaDataSelect 
                        backgroundColor="transparent"
                        name="Код подразделения"
                        value={p.division_code}
                        message="Введите код"
                        error={showErrors && !p.division_code?.length}
                        isCode
                        placeholder
                        formatedOptions={(list) => list.map((item) => ({ value: item.data.code, label: item.data.code }))}
                        onSelect={(v) => {
                          data.list_persone[i].division_code = v.value
                          setData({ ...data })
                        }}
                      />  
                    {showErrors && !p.division_code?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                    <div className={styles.input__wrapper}>
                      <p className={styles.name}>Дата выдачи</p>
                      <MaskedInput 
                        value={p.date_issue ?? ""}
                        error={showErrors && !dateIsValid(p.date_issue)}
                        placeholder="DD.MM.YYYY"
                        mask="99.99.9999"
                        onChange={(e) => {
                          data.list_persone[i].date_issue = e.target.value
                          setData({ ...data })
                        }}
                      />
                      {showErrors && <>
                        {!p?.date_issue?.length 
                        ? <p className="text-error">Поле не заполнено</p>
                        : !dateIsValid(p.date_issue) && <p className="text-error">Поле заполнено некорректно</p>}
                      </>}
                    </div>
                  </div>
                  <DeleteButton 
                      text="Удалить физлицо"
                      onClick={() => {
                        data.list_persone = data.list_persone.filter((_, idx) => idx !== i)
                        setData({ ...data })
                      }} 
                    />
                </div>
              )}
            </Wrapper>
          </div>

          <div className={styles.mb40}>
            <AddButton
              text="Добавить физлицо"
              type="button" 
              onClick={() => {
                data.list_persone.push({
                  accownt_own_living: "Совпадает",
                  account_own_mail: "Совпадает с адресом регистрации",
                  roles: []
                })

                setData({ ...data })
              }} 
            />
          </div>

          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Загрузите документы</p>}
            >
              <div>
                <div className={styles.mb24}>
                  <p className={styles.mb24}>
                    Документ, удостоверяющий личность единоличного исполнительного органа
                  </p>

                  <div className={styles.mb24}>
                    {!!data?.document_certifying_identity_executive?.length && <div className={styles.mb24}>
                      {data?.document_certifying_identity_executive?.map?.(l => 
                        <div key={l.path} className={styles.row}>
                          <div className={styles.download__item} style={{ flexGrow: 0 }}>
                            <div className={styles.icon}>
                              <p className={styles.format}>
                                {getFormatFile(l?.file?.name ?? l.path)}
                              </p>
                              <p className={styles.size}>
                                {l.size}
                              </p>
                            </div>
                            <p className={styles.name}>{l?.file?.name ?? l.path?.replace("/media/documents/", "")}</p>
                          </div>

                          <DeleteButton onClick={deleteFromIdentityDocs(l)} />
                        </div>
                        )}
                    </div>}
                    {erroredFields.includes("document_certifying_identity_executive") && <p className="text-error">Поле не заполнено</p>}

                  </div>
                  <DownloadButton 
                    addFile={getIdentityDocUrl} 
                  />
                </div>
                <div className={styles.mb24}>
                  <p className={styles.mb24}>
                  Документы, подтверждающие реальную деятельность
                  </p>

                  <div className={styles.mb24}>
                    {!!data?.document_confirming_real_activity?.length && <div className={styles.mb24}>
                      {data.document_confirming_real_activity.map(l => 
                        <div key={l.path} className={styles.row}>
                          <div className={styles.download__item} style={{ flexGrow: 0 }}>
                            <div className={styles.icon}>
                              <p className={styles.format}>
                                {getFormatFile(l?.file?.name ?? l.path)}
                              </p>
                              <p className={styles.size}>
                                {l.size}
                              </p>
                            </div>
                            <p className={styles.name}>{l?.file?.name ?? l.path?.replace("/media/documents/", "")}</p>
                          </div>

                          <DeleteButton onClick={deleteFromActivityDocs(l)} />
                        </div>
                        )}
                    </div>}
                  </div>
                  <DownloadButton 
                    addFile={getActivityDocUrl} 
                  />
                </div>
                <div className={styles.mb24}>
                  <p className={styles.mb24}>
                    Лицензии
                  </p>
                  <div className={styles.mb24}>
                    {!!data?.document_licenses?.length && <div className={styles.mb24}>
                      {data.document_licenses?.map?.(l => 
                        <div key={l.path} className={styles.row}>
                          <div className={styles.download__item} style={{ flexGrow: 0 }}>
                            <div className={styles.icon}>
                              <p className={styles.format}>
                                {getFormatFile(l?.file?.name ?? l.path)}
                              </p>
                              <p className={styles.size}>
                                {l.size}
                              </p>
                            </div>
                            <p className={styles.name}>{l?.file?.name ?? l.path?.replace("/media/documents/", "")}</p>
                          </div>

                          <DeleteButton onClick={deleteFromLicense(l)} />
                        </div>
                        )}
                    </div>}
                  </div>
                  <DownloadButton 
                    addFile={getLicenseUrl} 
                  />
                </div>
              </div>
            </Wrapper>
          </div>

          <div className={styles.mb24}>
            <Wrapper
              headElement={
                <p className={styles.title_block}>
                  Виды договоров (контрактов), расчеты по которым юридическое лицо собирается осуществлять через банк
                </p>
              }
            >   
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[0])}
                      onChange={onSelectOper(planned_operations[0])}
                      >
                      <p>{planned_operations[0]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[1])}
                      onChange={onSelectOper(planned_operations[1])}
                      >
                      <p>{planned_operations[1]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[2])}
                      onChange={onSelectOper(planned_operations[2])}
                      >
                      <p>{planned_operations[2]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[3])}
                      onChange={onSelectOper(planned_operations[3])}
                      >
                      <p>{planned_operations[3]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[4])}
                      onChange={onSelectOper(planned_operations[4])}
                      >
                      <p>{planned_operations[4]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[5])}
                      onChange={onSelectOper(planned_operations[5])}
                      >
                      <p>{planned_operations[5]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[6])}
                      onChange={onSelectOper(planned_operations[6])}
                      >
                      <p>{planned_operations[6]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[7])}
                      onChange={onSelectOper(planned_operations[7])}
                      >
                      <p>{planned_operations[7]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data?.planned_operations?.includes?.(planned_operations[8])}
                      onChange={onSelectOper(planned_operations[8])}
                      >
                      <p>{planned_operations[8]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={customPlannedOper.active}
                      onChange={onCheckCustomPlannedOper}
                      >
                      <p>{planned_operations[9]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                {customPlannedOper.active && <div>
                  <Input
                    error={erroredFields.includes("custom_planned_oper")}
                    value={customPlannedOper.value}
                    placeholder=""
                    onChange={onChangeCustomPlannedOper}
                  />
                </div>}
                {erroredFields.includes("custom_planned_oper") && <p className="text-error">Поле не заполнено</p>}
            </Wrapper>
          </div>
          <div className={styles.mb40}>
            <p className={styles.title_block}>Выгодоприобретатели</p>
            <div className={styles.mb24}>
              <p className={styles.checks__item}>Имеются ли выгодоприобретатели</p>
            </div>
            <div className={styles.checks}>
              <YesOrNo
                value={isBeneficiaries}
                toggle={onSelectBenfs}
              />
            </div>

            {isBeneficiaries && 
              <div className={styles.row}>
                <div className={styles.column}>
                  <Input
                    value={data.beneficiaries}
                    name="Выгодоприобретатели"
                    placeholder=""
                    error={erroredFields.includes("beneficiaries")}
                    onChange={(e) => {
                      setData({ ...data, beneficiaries: e.target.value })
                      e.target.value 
                      ? setErroredFields(p => p.filter(f => f !== "beneficiaries"))
                      : setErroredFields(p => ([...p, "beneficiaries"]))                    
                    } 
                  }
                  />

                  {erroredFields.includes("beneficiaries") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>}
          </div>

          <div className={styles.mb24}>
            <Wrapper
              headElement={
                <p className={styles.title_block}>
                  Сведения о целях установления деловых отношений с банком
                </p>
              }
            >
              <div className={styles.mb40}>
                <p>Компания осуществляет деятельность, подлежащую лицензированию</p>
                <SelectRS
                  nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                  value={{ value: data.subject_licensing, label: data.subject_licensing }}
                  error={erroredFields.includes("subject_licensing")}
                  options={[ { value: "Осуществляет", label: "Осуществляет" }, { value: "Не осуществляет", label: "Не осуществляет" } ]}
                  onChange={(v) => {
                    setData({ ...data, subject_licensing: v.label  })
                    v.label 
                      ? setErroredFields(prev => prev.filter(f => f !== "subject_licensing")) 
                      : setErroredFields(prev => ([ ...prev, "subject_licensing" ]))
                  }}
                />
                {erroredFields.includes("subject_licensing") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb24}>
                <p>История, репутация, сектор рынка и конкуренция</p>
                <SelectRS
                  nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                  value={{ value: data.history_reputation, label: data.history_reputation }}
                  error={erroredFields.includes("history_reputation")}
                  options={[ { value: "Положительная", label: "Положительная" }, { value: "Отрицательная", label: "Отрицательная" } ]}
                  onChange={(v) => {
                    setData({ ...data, history_reputation: v.label  })
                    v.label 
                      ? setErroredFields(prev => prev.filter(f => f !== "history_reputation")) 
                      : setErroredFields(prev => ([ ...prev, "history_reputation" ]))
                  }}
                />
                {erroredFields.includes("history_reputation") && <p className="text-error">Поле не заполнено</p>}
              </div>

              <div className="grid frfr gg30">
                <div className="flex fcol">
                  <p>Общее количество операций в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.num_transactions_week, label: data.num_transactions_week }}
                      error={erroredFields.includes("num_transactions_week")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, num_transactions_week: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "num_transactions_week")) 
                          : setErroredFields(prev => ([ ...prev, "num_transactions_week" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("num_transactions_week") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Общее количество операций в месяц</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.num_transactions_month, label: data.num_transactions_month }}
                      error={erroredFields.includes("num_transactions_month")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, num_transactions_month: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "num_transactions_month")) 
                          : setErroredFields(prev => ([ ...prev, "num_transactions_month" ]))
                      }}
                    />

                  </div>
                    {erroredFields.includes("num_transactions_month") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className="grid frfr gg30 mt25">
                <div className="flex fcol">
                  <p >Общее количество операций в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.num_transactions_quarter, label: data.num_transactions_quarter }}
                      error={erroredFields.includes("num_transactions_quarter")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, num_transactions_quarter: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "num_transactions_quarter")) 
                          : setErroredFields(prev => ([ ...prev, "num_transactions_quarter" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("num_transactions_quarter") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Общее количество операций в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.num_transactions_age, label: data.num_transactions_age }}
                      error={erroredFields.includes("num_transactions_age")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, num_transactions_age: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "num_transactions_age")) 
                          : setErroredFields(prev => ([ ...prev, "num_transactions_age" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("num_transactions_age") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>

              <div className="grid gg30 frfr mt40">
                <div className="flex fcol">
                  <p>Общая сумма операций в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_transactions_week, label: data.sum_transactions_week }}
                      error={erroredFields.includes("sum_transactions_week")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_transactions_week: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_transactions_week")) 
                          : setErroredFields(prev => ([ ...prev, "sum_transactions_week" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("sum_transactions_week") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Общая сумма операций в месяц</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_transactions_month, label: data.sum_transactions_month }}
                      error={erroredFields.includes("sum_transactions_month")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_transactions_month: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_transactions_month")) 
                          : setErroredFields(prev => ([ ...prev, "sum_transactions_month" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("sum_transactions_month") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
                <div className="grid gg30 frfr mt25">
                <div className="flex fcol">
                  <p>Общая сумма операций в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_transactions_quarter, label: data.sum_transactions_quarter }}
                      error={erroredFields.includes("sum_transactions_quarter")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_transactions_quarter: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_transactions_quarter")) 
                          : setErroredFields(prev => ([ ...prev, "sum_transactions_quarter" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("sum_transactions_quarter") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Общая сумма операций в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_transactions_age, label: data.sum_transactions_age }}
                      error={erroredFields.includes("sum_transactions_age")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_transactions_age: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_transactions_age")) 
                          : setErroredFields(prev => ([ ...prev, "sum_transactions_age" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("sum_transactions_age") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>

              <div className="grid gg30 frfr mt40">
                <div className="flex fcol">
                  <p>Количество операций по снятию наличности в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.week_cash_withdrawal, label: data.week_cash_withdrawal }}
                      error={erroredFields.includes("week_cash_withdrawal")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, week_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "week_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "week_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("week_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Количество операций по снятию наличности в месяц</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.monthly_cash_withdrawal, label: data.monthly_cash_withdrawal }}
                      error={erroredFields.includes("monthly_cash_withdrawal")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, monthly_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "monthly_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "monthly_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("monthly_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className="grid gg30 frfr mt25">
                <div className="flex fcol">
                  <p >Количество операций по снятию наличности в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.quarter_cash_withdrawal, label: data.quarter_cash_withdrawal }}
                      error={erroredFields.includes("quarter_cash_withdrawal")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, quarter_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "quarter_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "quarter_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("quarter_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Количество операций по снятию наличности в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.age_cash_withdrawal, label: data.age_cash_withdrawal }}
                      error={erroredFields.includes("age_cash_withdrawal")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, age_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "age_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "age_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("age_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>

              <div className="grid gg30 frfr mt40">
                <div className="flex fcol">
                  <p>Сумма операций по снятию денежных средств в наличной форме в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_week_cash_withdrawal, label: data.sum_week_cash_withdrawal }}
                      error={erroredFields.includes("sum_week_cash_withdrawal")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_week_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_week_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "sum_week_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("sum_week_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Сумма операций по снятию наличности в месяц</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_transactions_month, label: data.sum_transactions_month }}
                      error={erroredFields.includes("sum_transactions_month")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_transactions_month: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_transactions_month")) 
                          : setErroredFields(prev => ([ ...prev, "sum_transactions_month" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("sum_transactions_month") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className="grid gg30 frfr mt25">
                <div className="flex fcol">
                  <p>Сумма операций по снятию денежных средств в наличной форме в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_quarter_cash_withdrawal, label: data.sum_quarter_cash_withdrawal }}
                      error={erroredFields.includes("sum_quarter_cash_withdrawal")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_quarter_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_quarter_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "sum_quarter_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("sum_quarter_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p className="">Сумма операций по снятию денежных средств в наличной форме в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.sum_age_cash_withdrawal, label: data.sum_age_cash_withdrawal }}
                      error={erroredFields.includes("sum_age_cash_withdrawal")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, sum_age_cash_withdrawal: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "sum_age_cash_withdrawal")) 
                          : setErroredFields(prev => ([ ...prev, "sum_age_cash_withdrawal" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("sum_age_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>

              <div className="grid gg30 frfr mt40">
                <div className="flex fcol">
                  <p>Количество операций по внешнеторговым контрактам в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_trade_contracts_week, label: data.foreign_trade_contracts_week }}
                      error={erroredFields.includes("foreign_trade_contracts_week")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_trade_contracts_week: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_trade_contracts_week")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_trade_contracts_week" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_trade_contracts_week") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Количество операций по внешнеторговым контрактам в месяц</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_trade_contracts_month, label: data.foreign_trade_contracts_month }}
                      error={erroredFields.includes("foreign_trade_contracts_month")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_trade_contracts_month: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_trade_contracts_month")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_trade_contracts_month" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_trade_contracts_month") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className="grid gg30 frfr mt25">
                <div className="flex fcol">
                  <p >Количество операций по снятию наличности в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_trade_contracts_quarter, label: data.foreign_trade_contracts_quarter }}
                      error={erroredFields.includes("foreign_trade_contracts_quarter")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_trade_contracts_quarter: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_trade_contracts_quarter")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_trade_contracts_quarter" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_trade_contracts_quarter") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Количество операций по снятию наличности в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_trade_contracts_age, label: data.foreign_trade_contracts_age }}
                      error={erroredFields.includes("foreign_trade_contracts_age")}
                      options={num_transactions_week_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_trade_contracts_age: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_trade_contracts_age")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_trade_contracts_age" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_trade_contracts_age") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>

              <div className="grid gg30 frfr mt40">
                <div className="flex fcol">
                  <p>Сумма операций по внешнеторговым контрактам в неделю</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_sum_contracts_week, label: data.foreign_sum_contracts_week }}
                      error={erroredFields.includes("foreign_sum_contracts_week")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_sum_contracts_week: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_sum_contracts_week")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_sum_contracts_week" ]))
                      }}
                    />
                  </div>
                  {erroredFields.includes("foreign_sum_contracts_week") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Сумма операций по внешнеторговым контрактам в месяц</p>
                  <div className="mta">
                    <SelectRS
                        nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                        value={{ value: data.foreign_sum_contracts_month, label: data.foreign_sum_contracts_month }}
                        error={erroredFields.includes("foreign_sum_contracts_month")}
                        options={sun_select_opts}
                        onChange={(v) => {
                          setData({ ...data, foreign_sum_contracts_month: v.label  })
                          v.label 
                            ? setErroredFields(prev => prev.filter(f => f !== "foreign_sum_contracts_month")) 
                            : setErroredFields(prev => ([ ...prev, "foreign_sum_contracts_month" ]))
                        }}
                      />
                  </div>
                  {erroredFields.includes("foreign_sum_contracts_month") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className="grid gg30 frfr mt25">
                <div className="flex fcol">
                  <p>Сумма операций по внешнеторговым контрактам в квартал</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_sum_contracts_quarter, label: data.foreign_sum_contracts_quarter }}
                      error={erroredFields.includes("foreign_sum_contracts_quarter")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_sum_contracts_quarter: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_sum_contracts_quarter")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_sum_contracts_quarter" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_sum_contracts_quarter") && <p className="text-error">Поле не заполнено</p>}
                </div>
                <div className="flex fcol">
                  <p>Сумма операций по внешнеторговым контрактам в год</p>
                  <div className="mta">
                    <SelectRS
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      value={{ value: data.foreign_sum_contracts_age, label: data.foreign_sum_contracts_age }}
                      error={erroredFields.includes("foreign_sum_contracts_age")}
                      options={sun_select_opts}
                      onChange={(v) => {
                        setData({ ...data, foreign_sum_contracts_age: v.label  })
                        v.label 
                          ? setErroredFields(prev => prev.filter(f => f !== "foreign_sum_contracts_age")) 
                          : setErroredFields(prev => ([ ...prev, "foreign_sum_contracts_age" ]))
                      }}
                    />
                  </div>
                    {erroredFields.includes("foreign_sum_contracts_age") && <p className="text-error">Поле не заполнено</p>}
                </div>
              </div>
              <div className={styles.mb40} />
              <div className={styles.mb40}>
                <p className={styles.mb24}>Источники происхождения денежных средств</p>
                <SelectRS
                  nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                  value={{ value: data.sources_cash_receipts, label: data.sources_cash_receipts }}
                  error={erroredFields.includes("sources_cash_receipts")}
                  options={cashSources}
                  onChange={(v) => {
                    setData({ ...data, sources_cash_receipts: v.label  })
                    if (v.value === "Иное" ) {
                      setCustomSource(p => ({ ...p, active: true }))
                    } else if (customSource.active) {
                      setCustomSource(p => ({ ...p, active: false }))
                    }
                    v.label 
                      ? setErroredFields(prev => prev.filter(f => f !== "sources_cash_receipts")) 
                      : setErroredFields(prev => ([ ...prev, "sources_cash_receipts" ]))
                  }}
                />
                {erroredFields.includes("sources_cash_receipts") && <p className="text-error">Поле не заполнено</p>}
                {customSource.active && <div className="mt25">
                  <Input
                    value={customSource.value}
                    placeholder="Введите источник средств"
                    error={showErrors && !customSource.value?.length}
                    onChange={(e) => {
                      info.current.custom_source = e.target.value
                      setCustomSource(p => ({ ...p, value: e.target.value }))
                    }}
                  />
                </div>}
                {showErrors && customSource.active && !customSource.value?.length && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>Штатная численность сотрудников</p>
                  <Input
                    value={data.headcount}
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Введите число"
                    onChange={(e) => setData({ ...data, headcount: e.target.value })}
                  />
                {erroredFields.includes("headcount") && <p className="text-error">Поле не заполнено</p>}
              </div>
            </Wrapper>
          </div>

          <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о контрагентах</p>}
            >
              <div className={styles.content}>
                <div className={styles.mb40}>
                  <p className={styles.mb24}>
                    Имеются постоянные или предполагаемые плательщики по операциям с денежными средствами на счете
                  </p>
                  <div className={styles.mb24}>
                    <YesOrNo
                      value={data.information_counterparties}
                      toggle={() => {
                        data.information_counterparties = !data.information_counterparties
                        if (data.information_counterparties && !data.information_counterparties_two.length) {
                          data.information_counterparties_two = [""]
                        }
                        setData({ ...data })
                      }}
                    />
                  </div>
                  {data.information_counterparties && 
                    <div>
                      {data.information_counterparties_two?.map?.((p, i) =>
                        <div key={i}>
                          <div className={styles.row}>
                            <Input
                              value={p}
                              error={showErrors && !p?.length}
                              placeholder="Введите название"
                              onChange={onChangeCounterparties(i)}
                            />
                            <DeleteButton onClick={removeFromCounterparties(i)} />
                          </div>
                          <div className={styles.mb24}>
                          {!p?.length && showErrors && <p className="text-error">Поле не заполнено</p>}
                          </div>
                        </div>
                      )}

                      <AddButton
                        type="button" 
                        onClick={() => {
                          data.information_counterparties_two?.push("")
                          setData({ ...data })
                        }} 
                      />
                    </div>}
                </div>
              </div>
            </Wrapper>
          </div>

          <div className={styles.mb24}>
            <Wrapper
              headElement={<p className={styles.title_block}>Сведения о соответствии FATCA и и стратегическом значении компании (выберите все верные утверждения)</p>}
            >
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS
                        isChecked={data.information_goals.includes?.(statementsTexts[0])}
                        onChange={onSelect(statementsTexts[0])}
                        >
                        <p>{statementsTexts[0]}</p>
                      </CheckBoxRS>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS
                        isChecked={data.information_goals.includes?.(statementsTexts[1])}
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
                        isChecked={data.information_goals.includes?.(statementsTexts[2])}
                        onChange={onSelect(statementsTexts[2])}
                      >
                        <p>{statementsTexts[2]}</p>
                      </CheckBoxRS>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS 
                        isChecked={data.information_goals.includes?.(statementsTexts[3])}
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
                        isChecked={data.information_goals.includes?.(statementsTexts[4])}
                        onChange={onSelect(statementsTexts[4])}
                        >
                        <p>{statementsTexts[4]}</p>
                      </CheckBoxRS>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS 
                        isChecked={data.information_goals.includes?.(statementsTexts[5])}
                        onChange={onSelect(statementsTexts[5])}
                        >
                        <p>{statementsTexts[5]}</p>
                      </CheckBoxRS>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS 
                        isChecked={data.information_goals.includes?.(statementsTexts[6])}
                        onChange={onSelect(statementsTexts[6])}
                        >
                        <p>{statementsTexts[6]}</p>
                      </CheckBoxRS>
                    </div>
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>

          <p className={styles.title_block}>Кодовое слово</p>
          <div>
            <Input
              value={data.codeword}
              maxLength={35}
              error={erroredFields.includes("codeword")}
              placeholder="Введите кодовое слово"
              onChange={(e) => {
                /^[а-яА-ЯёЁ\s]+$/.test(e.target.value) 
                  ? setErroredFields(p => p.filter(f => f !== "codeword"))
                  : setErroredFields(p => ([ ...p, "codeword" ]))
                setData({ ...data,  codeword: e.target.value })
              }
            }
            />
            {erroredFields.includes("codeword") && <p className="text-error">Поле заполнено некорректно</p>}
          </div>
          <div style={{ textAlign: "right", margin: "40px 0" }}>
            <ButtonRS
              title="Продолжить"
              style={{ width: "auto" }}
              disable={disableUI}
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Step2;
