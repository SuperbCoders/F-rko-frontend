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
import DateInput from "../../components/Step2Components/DateInput";
import DocumentItem from "../DocumentItem";
import ScanOrPhoto from "../../components/Step2Components/ScanOrPhoto";
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

  const cash_source = [
    "Финансирование учредителей/участников",
    "Доходы от основного вида деятельности",
    "Доходы от дополнительных видов деятельности",
    "Заемные (кредитные)/привлеченные денежные средства",
    "Государственное финансирование",
    "Иное",
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

  const formatedOptions = (list) => list.map((item) => ({ value: item.data.address.unrestricted_value, label: item.data.address.unrestricted_value }))

  const { data, info, setData, erroredFields, setErroredFields } = React.useContext(RequisitesContext)

  const regDate = data?.registration_date ? new Date(parseInt(data.registration_date)) : ""
  const formatedRegDate = regDate ? `${regDate.getFullYear?.()}-${regDate?.getMonth?.() + 1}-${regDate?.getDate?.()}` : ""

  const orgnDate = data?.ogrn_date ? new Date(parseInt(data.ogrn_date)) : ""
  const formatedOgrnDate = orgnDate ? `${orgnDate.getFullYear?.()}-${orgnDate.getMonth?.() + 1}-${orgnDate.getDate?.()}` : ""

  const [isBeneficiaries, setIsBeneficiaries] = React.useState(false)
  const [disableUI, setDisableUI] = React.useState(false)
  const [customPlannedOper, setCustomPlannedOper] = React.useState({ active: false, value: "" })
  const [showErrors, setShowErrors] = React.useState(false)

  React.useEffect(() => setIsBeneficiaries(data.beneficiaries !== "Отсутствуют"), [data.beneficiaries])
  React.useEffect(() => setCustomPlannedOper({
    active: info.current.custom_planned_operation?.active ?? false,
    value: info.current.custom_planned_operation?.value ?? ""
  }), [info.current.custom_planned_operation])

  const addToAddressList = () => setData({
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
    curr.type_adress = curr.type_adress.includes(type) ? curr.type_adress.filter(t => t !== type) : [...curr.type_adress, type]
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

  // const getPassportPageUrl = (i) => (file) => {
  //   const fd = new FormData();
  //   fd.append("documents", file)
  //   documentApi.upload(fd).then(res => {
  //     data.list_persone[i].first_passport_page_url = { path: res.images[0]?.path, file }
  //     setData({ ...data })
  //   })
  // }

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
      "planned_operations",
      "donaninname",
      "fax",
      "supreme_management_body",
      "employers_volume",
      "salary_debt",
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
      "supreme_management_body"
    ]
    const arr = fields.reduce((accum, next) => !data[next] || !data[next]?.length ? ([...accum, next]) : accum, [])
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
    if (!data.donaninname.includes("https://") || !data.donaninname.includes("www.")) {
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
      if (p.account_onw_role?.includes("ЕИО") && !p.account_own_job_title?.length) {
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
      if (!p.doc_serial?.length) {
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

    const formattedPhone = data.contact_number.replace(/\(|\)+|-|\s|/g, "") // убираем пробелы, дефисы, скоблки

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
      information_counterparties_two: data.information_counterparties ? data.information_counterparties_two : []
    }

    dto.list_persone.map(p => ({
      ...p,
      accownt_own_living: p.accownt_own_living === "Совпадает" ? p.account_own_registration : p.accownt_own_living,
      // first_passport_page_url: p.first_passport_page_url?.path
    }))

    setDisableUI(true)
    try {
      await userApi.postInfo(dto, formattedPhone)
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
                      // mask="*@*.com"
                      placeholder="pochta@server.com"
                      error={erroredFields.includes("email")}
                      value={data.email ?? ""}
                      onChange={(e) => {
                        /[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(e.target.value) 
                          ? setErroredFields(prev => prev.filter(f => f !== "email"))
                          : setErroredFields(prev => ([ ...prev, "email" ]))
                        setData({ ...data, email: e.target.value })
                      }}
                    />
                      {erroredFields.includes("email") && <p className="text-error">Поле заполнено некорректно</p>}
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Телефон</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      value={data.contact_phone_number}
                      error={erroredFields.includes("contact_phone_number")}
                      onChange={(e) => {
                        !/[0-9]+/.test(e.target.value?.[17])
                          ? setErroredFields(prev => ([...prev, "contact_phone_number"]))
                          : setErroredFields(prev => prev.filter(f => f !== "contact_phone_number"))
                        setData({ ...data, contact_phone_number: e.target.value })
                      }}
                    />
                      {erroredFields.includes("contact_phone_number") && <p className="text-error">Поле заполнено некорректно</p>}

                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Сайт компании</p>
                    <MaskedInput
                      // mask="https://d{2}"
                      placeholder="www."
                      value={data?.donaninname ?? "www."}
                      error={erroredFields.includes("donaninname")}
                      onChange={(e) => {
                        !e.target.value.includes("https://") || !e.target.value.includes("www.")
                        ? setErroredFields(prev => ([...prev, "donaninname"]))
                        : setErroredFields(prev => prev.filter(f => f !== "donaninname"))
                        setData({ ...data, donaninname: e.target.value}) 
                      }}
                    />
                      {erroredFields.includes("donaninname") && <p className="text-error">Поле заполнено некорректно</p>}
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Факс</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      error={erroredFields.includes("fax")}
                      value={data.fax ?? ""}
                      onChange={(e) => {
                        !/[0-9]+/.test(e.target.value?.[17])
                        ? setErroredFields(prev => ([...prev, "fax"]))
                        : setErroredFields(prev => prev.filter(f => f !== "fax"))
                        setData({ ...data, fax: e.target.value })
                      }}
                    />
                      {erroredFields.includes("fax") && <p className="text-error">Поле заполнено некорректно</p>}
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
          <div className={styles.mb64}>
            <Wrapper headElement={<p className={styles.title_block}>Адреса</p>}>
              <div className={styles.content}>
                {data.addresses.map(({ type_adress, address }, idx) => 
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
                <div>
                  <AddButton
                    type="button" 
                    onClick={addToAddressList} 
                  />
                </div>
              </div>
            </Wrapper>
          </div>
          {info?.opf?.full?.includes("ИП") && info?.opf?.code !== "50102" && 
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
                      type="number"
                      pattern="[0-9]*"
                      name="Численность персонала"
                      placeholder="Напишите значение"
                      error={erroredFields.includes("employers_volume")}
                      onChange={(e) => {
                        setData({ ...data, employers_volume: e.target.value })
                        e.target.value 
                          ? setErroredFields(p => p.filter(f => f !== "employers_volume"))
                          : setErroredFields(p => ([...p, "employers_volume"]))
                      }}
                    />
                    {erroredFields.includes("employers_volume") && <p className="text-error">Поле не заполнено</p>}

                  </div>
                  <div>
                  <Input
                    value={data.salary_debt}
                    name="Задолженность по з/п"
                    type="number"
                    pattern="[0-9]*"
                    error={erroredFields.includes("salary_debt")}
                    placeholder="Укажите сумму"
                    rightElement={<p>₽</p>}
                    onChange={(e) => {
                      setData({ ...data, salary_debt: e.target.value })
                      e.target.value 
                        ? setErroredFields(p => p.filter(f => f !== "salary_debt"))
                        : setErroredFields(p => ([...p, "salary_debt"]))
                    }}
                  />
                    {erroredFields.includes("salary_debt") && <p className="text-error">Поле не заполнено</p>}

                  </div>
                </div>
              </div>
            </Wrapper>
          </div>

          {info?.opf?.full.includes("ИП") && info?.opf?.code !== "50102" && <div className={styles.mb40}>
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
                    {showErrors &&!label.length && <p style={{ marginTop: "-23px" }} className="text-error">Поле не заполнено</p>}

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
                          isChecked={p.account_onw_role?.includes(r)}
                          onChange={() => {
                            const roles = data.list_persone[i].account_onw_role ?? []
                            data.list_persone[i].account_onw_role = roles?.includes(r) ? roles.filter(role => role !== r) : [...roles, r]
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

                  <div className={classNames(styles.row, "bg-grey")}>
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
                    {p.account_onw_role?.includes("ЕИО") && 
                    <div className={classNames(styles.row, "bg-grey")}>
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
                      {showErrors && !p.account_own_job_title?.length && 
                      <div className={styles.mb24} style={{ marginTop: "-24px" }}>
                      <p className="text-error">Поле не заполнено</p>
                      </div>
                      }
                  </div>}
                  {p.account_onw_role?.includes("Акционер/учредитель") && 
                      <div>
                      <Input 
                        value={p.account_own_piece}
                        name="Доля владения"
                        placeholder="Доля владения"
                        error={showErrors && !p.account_own_piece?.length}
                        onChange={(e) => {
                          data.list_persone[i].account_own_piece = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <div className={styles.mb24}>
                      {!p.account_own_piece?.length && <p className="text-error">Поле не заполнено</p>}
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

                  <div className={classNames(styles.row, "bg-grey")}>
                    <div style={{ maxWidth: "calc(50% - 12px)" }} className={styles.input__wrapper}>
                      <p className={styles.name}>ИНН</p>
                      <MaskedInput
                        value={p.account_onw_inn ?? ""}
                        name="ИНН" 
                        maskChar="_"
                        error={showErrors && !/[0-9]+/.test(p.account_onw_inn?.[11])}
                        mask="999999999999"
                        placeholder="____________"
                        onChange={(e) => {
                          data.list_persone[i].account_onw_inn = e.target.value
                          setData({ ...data })
                        }}
                      />
                      {showErrors && !/[0-9]+/.test(p.account_onw_inn?.[11]) && <p className="text-error">Поле заполнено некорректно</p>}
                    </div>
                  </div>

                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
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
                        backgroundColor="#F0F2F5"
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
                  <div className={classNames(styles.row, "bg-grey")}>
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
                        // mask="*@*.com"
                        placeholder="pochta@server.com"
                        error={showErrors && !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(p.email)}
                        value={p?.email ?? ""}
                        onChange={(e) => {
                          data.list_persone[i].email = e.target.value
                          setData({ ...data })
                        }}
                      />
                        {showErrors && !/[a-z0-9]+@[a-z]+\.[a-z]{2,6}/.test(p.email) && <p className="text-error">Поле заполнено некорректно</p>}
                    </div>
                  </div>
                  <div className={classNames(styles.row, "bg-grey")}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Адрес регистрации"
                        value={p.account_own_registration}
                        isAddr={true}
                        error={showErrors && !p.account_own_registration?.length}
                        message="Введите адрес"
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
                    <div className={classNames(styles.row, "bg-grey")}>
                      <div className={styles.column}>
                        <DaDataSelect 
                          backgroundColor="#F0F2F5"
                          name="Адрес местонахождения"
                          value={p.accownt_own_living}
                          message="Введите адрес"
                          error={showErrors && !p.accownt_own_living?.length}
                          formatedOptions={formatedOptions}
                          onSelect={(v) => {
                            data.list_persone[i].accownt_own_living = v?.label ?? ""
                            setData({ ...data })
                          }}
                        />
                      </div>
                    </div>
                    {showErrors && !p.account_own_registration?.length && <p className="text-error label">Поле не заполнено</p>}
                    </div>
                    }
                  <div className={classNames(styles.row, "bg-grey", "form")}>
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
                        value={p.account_datebirth}
                        placeholder="Введите дату"
                        mask="99.99.9999"
                        error={showErrors && !dateIsValid(p.account_datebirth)}
                        onChange={(e) => {
                          data.list_persone[i].account_datebirth = e.target.value
                          setData({ ...data })
                        }}
                        />
                    {showErrors && !dateIsValid(p.account_datebirth) && <p className="text-error">Поле заполнено некорректно</p>}
                    </div>
                    <div>
                    <SelectRS
                      value={{ label: p.doc_type, value: p.doc_type }}
                      name="Тип документа, удостоверяющего личность"
                      nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                      placeholder="Выберите тип"
                      backgroundColor="#F0F2F5"
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
                  <div className={classNames(styles.row, "bg-grey", "form")}>
                    <div>
                    <Input
                      value={p.doc_serial}
                      type="number"
                      pattern="[0-9]*"
                      error={showErrors && !p.doc_serial?.length}
                      name="Серия документа, удостоверяющего личность (при наличии)"
                      placeholder="Введите серию документа"
                      onChange={(e) => {
                        data.list_persone[i].doc_serial = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.doc_serial?.length && <p className="text-error">Поле не заполнено</p>}
                    </div>
                    <div>
                    <Input
                      value={p.doc_number}
                      type="number"
                      pattern="[0-9]*"
                      error={showErrors && !p.doc_number?.length}
                      name="Номер документа, удостоверяющего личность"
                      placeholder="Введите номер документа"
                      onChange={(e) => {
                        data.list_persone[i].doc_number = e.target.value
                        setData({ ...data })
                      }}
                    />
                    {showErrors && !p.doc_number?.length && <p className="text-error">Поле не заполнено</p>}
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
                  <div className={classNames(styles.row, "bg-grey", "form")}>
                      <div>
                      <DaDataSelect 
                      backgroundColor="#F0F2F5"
                      name="Код подразделения"
                      value={p.division_code}
                      message="Введите код"
                      error={showErrors && !p.division_code?.length}
                      isCode
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
                        value={p.date_issue}
                        error={showErrors && !dateIsValid(p.date_issue)}
                        placeholder="Введите дату"
                        mask="99.99.9999"
                        onChange={(e) => {
                          data.list_persone[i].date_issue = e.target.value
                          setData({ ...data })
                        }}
                      />
                    {showErrors && !dateIsValid(p.date_issue) && <p className="text-error">Поле заполнено некорректно</p>}
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
                    {!!data.document_certifying_identity_executive.length && <div className={styles.mb24}>
                      {data.document_certifying_identity_executive.map(l => 
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
                    {!!data.document_confirming_real_activity.length && <div className={styles.mb24}>
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
                    {!!data.document_licenses.length && <div className={styles.mb24}>
                      {data.document_licenses.map(l => 
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
                      isChecked={data.planned_operations.includes(planned_operations[0])}
                      onChange={onSelectOper(planned_operations[0])}
                      >
                      <p>{planned_operations[0]}</p>
                    </CheckBoxRS>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[1])}
                      onChange={onSelectOper(planned_operations[1])}
                      >
                      <p>{planned_operations[1]}</p>
                    </CheckBoxRS>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[2])}
                      onChange={onSelectOper(planned_operations[2])}
                      >
                      <p>{planned_operations[2]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[3])}
                      onChange={onSelectOper(planned_operations[3])}
                      >
                      <p>{planned_operations[3]}</p>
                    </CheckBoxRS>
                  </div>

                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[4])}
                      onChange={onSelectOper(planned_operations[4])}
                      >
                      <p>{planned_operations[4]}</p>
                    </CheckBoxRS>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[5])}
                      onChange={onSelectOper(planned_operations[5])}
                      >
                      <p>{planned_operations[5]}</p>
                    </CheckBoxRS>
                  </div>
                </div>
                <div className={styles.checks}>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[6])}
                      onChange={onSelectOper(planned_operations[6])}
                      >
                      <p>{planned_operations[6]}</p>
                    </CheckBoxRS>
                  </div>

                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[7])}
                      onChange={onSelectOper(planned_operations[7])}
                      >
                      <p>{planned_operations[7]}</p>
                    </CheckBoxRS>
                  </div>
                  <div className={styles.checks__item}>
                    <CheckBoxRS
                      isChecked={data.planned_operations.includes(planned_operations[8])}
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
                {((customPlannedOper.active && erroredFields.includes("custom_planned_oper")) || erroredFields.includes("planned_operations")) && <p className="text-error">Поле не заполнено</p>}
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
                <p className={styles.mb24}>
                Компания осуществляет деятельность, подлежащую лицензированию
                </p>

                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, subject_licensing: "Осуществляет" })
                        setErroredFields(p => p.filter(f => f !== "subject_licensing"))
                      }}
                    >
                      <RadioButtonRS 
                        isActive={data.subject_licensing === "Осуществляет"} 
                      />
                      <p>Осуществляет</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, subject_licensing: "Не осуществляет" })
                        setErroredFields(p => p.filter(f => f !== "subject_licensing"))
                      }}
                      >
                      <RadioButtonRS 
                        isActive={data.subject_licensing === "Не осуществляет"} 
                      />
                      <p>Не осуществляет</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb24}>
                <p className={styles.mb24}>
                  История, репутация, сектор рынка и конкуренция
                </p>

                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, history_reputation: "Положительная" })
                        setErroredFields(p => p.filter(f => f !== "history_reputation"))
                      }}
                    >
                      <RadioButtonRS 
                        isActive={data.history_reputation === "Положительная"} 
                      />
                      <p>Положительная</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, history_reputation: "Отрицательная" })
                        setErroredFields(p => p.filter(f => f !== "history_reputation"))
                      }}
                      >
                      <RadioButtonRS 
                        isActive={data.history_reputation === "Отрицательная"} 
                      />
                      <p>Отрицательная</p>
                    </div>
                  </div>
                </div>
              {erroredFields.includes("history_reputation") && <p className="text-error">Поле не заполнено</p>}
              </div>

              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общее количество операций в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_month: ">10" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_month === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_month: ">100" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_month === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_month: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_month === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("num_transactions_month") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общее количество операций в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_week: ">10" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_week === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_week: ">100" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_week === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_week: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_week === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("num_transactions_week") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общее количество операций в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_quarter: ">10" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_quarter === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_quarter: ">100" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_quarter === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_quarter: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_quarter === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("num_transactions_quarter") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общее количество операций в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_age: ">10" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_age === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_age: ">100" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_age === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, num_transactions_age: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "num_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.num_transactions_age === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("num_transactions_age") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общая сумма операций в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_month: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_month === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_month: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_month === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_month: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_month === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_month: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_month === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_transactions_month") && <p className="text-error">Поле не заполнено</p>}

              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общая сумма операций в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_week: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_week === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_week: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_week === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_week: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_week === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_week: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_week === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_transactions_week") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общая сумма операций в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_quarter: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_quarter === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_quarter: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_quarter === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_quarter: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_quarter === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_quarter: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_quarter === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_transactions_quarter") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Общая сумма операций в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_age: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_age === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_age: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_age === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_age: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_age === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_transactions_age: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_transactions_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_transactions_age === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_transactions_age") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по снятию наличности в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, monthly_cash_withdrawal: ">10" })
                        setErroredFields(p => p.filter(f => f !== "monthly_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.monthly_cash_withdrawal === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, monthly_cash_withdrawal: ">100" })
                        setErroredFields(p => p.filter(f => f !== "monthly_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.monthly_cash_withdrawal === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, monthly_cash_withdrawal: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "monthly_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.monthly_cash_withdrawal === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("monthly_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по снятию наличности в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, week_cash_withdrawal: ">10" })
                        setErroredFields(p => p.filter(f => f !== "week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, week_cash_withdrawal: ">100" })
                        setErroredFields(p => p.filter(f => f !== "week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, week_cash_withdrawal: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("week_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по снятию наличности в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, quarter_cash_withdrawal: ">10" })
                        setErroredFields(p => p.filter(f => f !== "quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, quarter_cash_withdrawal: ">100" })
                        setErroredFields(p => p.filter(f => f !== "quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, quarter_cash_withdrawal: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("quarter_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по снятию наличности в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, age_cash_withdrawal: ">10" })
                        setErroredFields(p => p.filter(f => f !== "age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, age_cash_withdrawal: ">100" })
                        setErroredFields(p => p.filter(f => f !== "age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, age_cash_withdrawal: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("age_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию наличности в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_mouth_cash_withdrawal: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_mouth_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_mouth_cash_withdrawal: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_mouth_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_mouth_cash_withdrawal: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_mouth_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_mouth_cash_withdrawal: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_mouth_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_mouth_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_week_cash_withdrawal: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_week_cash_withdrawal: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_week_cash_withdrawal: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_week_cash_withdrawal: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_week_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_week_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_quarter_cash_withdrawal: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_quarter_cash_withdrawal: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_quarter_cash_withdrawal: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_quarter_cash_withdrawal: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_quarter_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_quarter_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_age_cash_withdrawal: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_age_cash_withdrawal: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_age_cash_withdrawal: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sum_age_cash_withdrawal: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "sum_age_cash_withdrawal"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sum_age_cash_withdrawal") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по внешнеторговым контрактам в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_month: ">10" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_month: ">100" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_month: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_trade_contracts_month") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по внешнеторговым контрактам в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_week: ">10" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_week: ">100" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_week: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_trade_contracts_week") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по внешнеторговым контрактам в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_quarter: ">10" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_quarter: ">100" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_quarter: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_trade_contracts_quarter") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Количество операций по внешнеторговым контрактам в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_age: ">10" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === ">10"}
                      />
                      <p>От 10</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_age: ">100" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === ">100"}
                      />
                      <p>От 100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_trade_contracts_age: ">1000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_trade_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === ">1000"}
                      />
                      <p>От 1000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_trade_contracts_age") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_month: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_month: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_month: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_month: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_month"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_sum_contracts_month") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_week: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_week: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_week: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_week: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_week"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_sum_contracts_week") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_quarter: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_quarter: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_quarter: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_quarter: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_quarter"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_sum_contracts_quarter") && <p className="text-error">Поле не заполнено</p>}
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_age: "<1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === "<1 000 000"}
                      />
                      <p>До 1 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_age: "<10 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === "<10 000 000"}
                      />
                      <p>До 10 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_age: ">1 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === ">1 000 000"}
                      />
                      <p>До 100 000 000</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, foreign_sum_contracts_age: ">100 000 000" })
                        setErroredFields(p => p.filter(f => f !== "foreign_sum_contracts_age"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === ">100 000 000"}
                      />
                      <p>Свыше 100 000 000</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("foreign_sum_contracts_age") && <p className="text-error">Поле не заполнено</p>}
              </div>

              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Источники происхождения денежных средств
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[0] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[0]}
                      />
                      <p>{cash_source[0]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[1] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[1]}
                      />
                      <p>{cash_source[1]}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[2] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[2]}
                      />
                      <p>{cash_source[2]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[3] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[3]}
                      />
                      <p>{cash_source[3]}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[4] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[4]}
                      />
                      <p>{cash_source[4]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, sources_cash_receipts: cash_source[5] })
                        setErroredFields(p => p.filter(f => f !== "sources_cash_receipts"))
                      }}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[5]}
                      />
                      <p>{cash_source[5]}</p>
                    </div>
                  </div>
                </div>
                {erroredFields.includes("sources_cash_receipts") && <p className="text-error">Поле не заполнено</p>}

              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>Штатная численность сотрудников</p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, headcount: headcounts[0] })
                        setErroredFields(p => p.filter(f => f !== "headcount"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === headcounts[0]}
                      />
                      <p>{headcounts[0]}</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, headcount: headcounts[1] })
                        setErroredFields(p => p.filter(f => f !== "headcount"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === headcounts[1]}
                      />
                      <p>{headcounts[1]}</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, headcount: headcounts[2] })
                        setErroredFields(p => p.filter(f => f !== "headcount"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === headcounts[2]}
                      />
                      <p>{headcounts[2]}</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => {
                        setData({ ...data, headcount: ">20" })
                        setErroredFields(p => p.filter(f => f !== "headcount"))
                      }}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === ">20"}
                      />
                      <p>{headcounts[3]}</p>
                    </div>
                  </div>
                </div>
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
                      {data.information_counterparties_two.map((p, i) =>
                      <div key={i}>
                        <div className={styles.row}>
                          <Input
                            value={p}
                            error={!p?.length}
                            placeholder="Введите название"
                            onChange={onChangeCounterparties(i)}
                          />
                          <DeleteButton onClick={removeFromCounterparties(i)} />
                        </div>
                        <div className={styles.mb24}>
                        {!p?.length && <p className="text-error">Поле не заполнено</p>}
                        </div>
                      </div>
                        )}

                      <AddButton
                        type="button" 
                        onClick={() => {
                          data.information_counterparties_two.push("")
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
                  <div className={styles.column}>
                    <div className={styles.checks__item}>
                      <CheckBoxRS 
                        isChecked={data.information_goals.includes(statementsTexts[5])}
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
                        isChecked={data.information_goals.includes(statementsTexts[6])}
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
                setErroredFields(p => p.filter(f => f !== "codeword"))
                setData({ ...data,  codeword: e.target.value })
              }
            }
            />
            {erroredFields.includes("codeword") && <p className="text-error">Поле не заполнено</p>}
          </div>

          {/* {erroredFields.length && showErrors ? <p style={{ color: "red" }}>Часть полей не заполнена или заполнена некорректно</p> : null} */}
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
