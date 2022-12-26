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

  const formatedOptions = (list) => list.map((item) => ({ value: item.data.address.unrestricted_value, label: item.data.address.unrestricted_value }))

  const { data, info, setData } = React.useContext(RequisitesContext)

  const regDate = data?.registration_date ? new Date(parseInt(data.registration_date)) : ""
  const formatedRegDate = regDate ? `${regDate.getFullYear?.()}-${regDate?.getMonth?.() + 1}-${regDate?.getDate?.()}` : ""

  const orgnDate = data?.ogrn_date ? new Date(parseInt(data.ogrn_date)) : ""
  const formatedOgrnDate = orgnDate ? `${orgnDate.getFullYear?.()}-${orgnDate.getMonth?.() + 1}-${orgnDate.getDate?.()}` : ""

  // const [erroredFields, setErroredFields] = React.useState([ 
  const [isBeneficiaries, setIsBeneficiaries] = React.useState(false)
  const [disableUI, setDisableUI] = React.useState(false)
  const [customPlannedOper, setCustomPlannedOper] = React.useState({ active: false, value: "" })

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
  }

  const onSelect = (str) => () => setData({ ...data, information_goals: data.information_goals.includes(str) ? data.information_goals.filter(s => s !== str) : [...data.information_goals, str] })
  const onSelectOper = (str) => () => setData({ ...data, planned_operations: data.planned_operations.includes(str) ? data.planned_operations.filter(s => s !== str) : [...data.planned_operations, str] })

  const getPassportPageUrl = (i) => (file) => {
    const fd = new FormData();
    fd.append("documents", file)
    documentApi.upload(fd).then(res => {
      data.list_person[i].first_passport_page_url = { path: res.images[0]?.path, file }
      setData({ ...data })
    })
  }

  const getIdentityDocUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(fd).then(res => {
      data.document_certifying_identity_executive.push({ path: res.images[0]?.path, file })
      setData({ ...data })
    })
  }
  const getActivityDocUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(file).then(res => {
      data.document_confirming_real_activity.push({ path: res.images[0]?.path, file: file })
      setData({ ...data })
    })
  }

  const getLicenseUrl = (file) => {
    const fd = new FormData();
    fd.append("documents", file)

    documentApi.upload(file).then(res => {
      data.document_licenses.push({ path: res.images[0]?.path, file: file })
      setData({ ...data })
    })  
  }

  const onSelectBenfs = () => {
    if (isBeneficiaries) {
      setData({ ...data, beneficiaries: "Отсутствуют" })
    } else {
      setData({ ...data, beneficiaries: data.beneficiaries !== "Отсутствуют" ? data.beneficiaries : "" })
    }
    setIsBeneficiaries(!isBeneficiaries)
  }

  const onSelectFounderInn = (idx) => (value) => {
    data.founders[idx].founder_inn = value?.value ?? ""
    data.founders[idx].label = value?.label ?? ""
    setData({ ...data })
  }

  const onChangeFounderCapital = (idx) => (e) => {
    data.founders[idx].capital = e.target.value
    setData({ ...data })
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
  }

  const onChangeCustomPlannedOper = (e) => {
    info.current.custom_planned_operation = { active: true, value: e.target.value }
    setCustomPlannedOper({ active: true, value: e.target.value })
  }

  const onChangeCounterparties = (i) => (e) => {
    data.information_counterparties2[i] = e.target.value
    setData({ ...data })
  }

  const removeFromCounterparties = (idx) => () =>  {
    data.information_counterparties2.filter((_, i) => i !== idx)
    setData({ ...data })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formattedPhone = data.contact_number.replace(/\(|\)+|-|\s|/g, "") // убираем пробелы, дефисы, скоблки

    const dto = {
      ...data,
      addresses: data.addresses.map(({ type_adress, address }) => ({ 
        type_adress, 
        legal_address: type_adress === "Юридический" ? address : "", 
        mail_address: type_adress === "Почтовый" ? address : "",
        address
      })),
      list_person: [...data.list_person],
      planned_operations: customPlannedOper.active ? [...data.planned_operations, customPlannedOper.value] : data.planned_operations,
      document_certifying_identity_executive: data.document_certifying_identity_executive.map(d => d.path),
      document_confirming_real_activity: data.document_confirming_real_activity.map(d => d.path),
      document_licenses: data.document_licenses.map(d => d.path),
    }

    dto.list_person.map(p => ({
      ...p,
      accownt_own_living: p.accownt_own_living === "Совпадает" ? p.account_own_registration : p.accownt_own_living,
      first_passport_page_url: p.first_passport_page_url.path
    }))

    setDisableUI(true)
    await userApi.postInfo(dto, formattedPhone)
    
    localStorage.setItem("rko_active_step", 3)
    localStorage.removeItem("rko_data")
    setDisableUI(false)
    navigate(ROUTES.STEP3)
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
                      value={data.email ?? ""}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Телефон</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      value={data.contact_phone_number}
                      onChange={(e) => setData({ ...data, contact_phone_number: e.target.value })}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Сайт компании</p>
                    <MaskedInput
                      // mask="https://d{2}"
                      placeholder="https://"
                      value={data.domainname ?? "https://"}
                      onChange={(e) => setData({ ...data, domainname: e.target.value}) }
                    />
                  </div>
                  <div className={styles.input__wrapper}>
                    <p className={styles.name}>Факс</p>
                    <MaskedInput
                      mask="+7 (999) 999 99 99"
                      placeholder="+7 (__) ___ __ __"
                      maskChar="_"
                      value={data.fax ?? ""}
                      onChange={(e) => setData({ ...data, fax: e.target.value })}
                    />
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
          {info?.opf?.full !== "Индивидуальный предприниматель" && info?.opf?.code !== "50102" && 
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
                      placeholder="Высший орган управления"
                      options={supremeManOpts}
                      onChange={(v) => setData({ ...data, supreme_management_body: v.label  })}
                    />
                  </div>
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

          {info?.opf?.full !== "Индивидуальный предприниматель" && info?.opf?.code !== "50102" && <div className={styles.mb40}>
            <Wrapper
              headElement={<p className={styles.title_block}>Учредители – юридические лица</p>}
            >
              <div className={styles.content}>
                {data.founders?.map(({ capital, label }, idx) => 
                  <div className={`${styles.row} ${styles.align_end}`} key={name + idx}>
                    <div className={styles.column}>
                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Учредитель"
                        value={label}
                        message="Введите Название или ИНН"
                        formatedOptions={(list) => list.map((item) => ({ value: item.data.inn, label: item.data.name.full_with_opf }))}
                        onSelect={onSelectFounderInn(idx)}
                      />
                    </div>
                    <div className={styles.column}>
                      <Input
                        value={capital}
                        maxLength={6}
                        name="Доля в уставном капитале"
                        onChange={onChangeFounderCapital(idx)}
                      />
                    </div>
                    <div style={{ width: "auto" }} className={styles.column}>
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
                {data.list_person?.map((p, i) => 
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ margin: 0 }} className={styles.title_block}>{i + 1}</p>
  
                      <DeleteButton onClick={() => {
                          data.list_person = data.list_person.filter((_, idx) => idx !== i)
                          setData({ ...data })
                        }} 
                      />
                    </div>
  
                    <p className={styles.name_option}>Роль лица</p>
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
                              const roles = data.list_person[i].account_onw_role ?? []
                              data.list_person[i].account_onw_role = roles?.includes(r) ? roles.filter(role => role !== r) : [...roles, r]
                              setData({ ...data })
                            }}
                            >
                              <p>{r}</p>
                          </CheckBoxRS>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={classNames(styles.row, "bg-grey")}>
                      <Input 
                        value={p.account_own_lastname}
                        name="Фамилия"
                        placeholder="Введите Фамилию"
                        onChange={(e) => {
                          data.list_person[i].account_own_lastname = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <Input 
                        value={p.account_own_name}
                        name="Имя"
                        placeholder="Введите Имя"
                        onChange={(e) => {
                          data.list_person[i].account_own_name = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <Input
                        value={p.account_own_surname}
                        name="Отчество (при наличии)"
                        placeholder={"Введите Отчество"}
                        onChange={(e) => {
                          data.list_person[i].account_own_surname = e.target.value
                          setData({ ...data })
                        }}
                      />
                    </div>
                    <div className={classNames(styles.row, "bg-grey")}>
                      <Input 
                        value={p.account_own_job_title}
                        name="Должность"
                        placeholder="Введите должность"
                        onChange={(e) => {
                          data.list_person[i].account_own_job_title = e.target.value
                          setData({ ...data })
                        }}
                      />
                    </div>
                    <div className={styles.checks}>
                      <p className={styles.checks__item}>Пол</p>
                      <div
                        className={styles.checks__item}
                        onClick={() => {
                          data.list_person[i].account_own_gender = "Мужской"
                          setData({ ...data })
                        }}
                      >
                        <RadioButtonRS isActive={p.account_own_gender === "Мужской"} />
                        <p>Мужской</p>
                      </div>
                      <div
                        className={styles.checks__item}
                        onClick={() => {
                          data.list_person[i].account_own_gender = "Женский"
                          setData({ ...data })
                        }}
                      >
                        <RadioButtonRS isActive={p.account_own_gender === "Женский"} />
                        <p>Женский</p>
                      </div>
                    </div>
                    <div className={classNames(styles.row, "bg-grey")}>
                      <div className={styles.input__wrapper}>
                        <p className={styles.name}>ИНН</p>
                        <MaskedInput
                        value={p.account_onw_inn}
                        name="ИНН" 
                        maskChar="_"
                        mask="999999999999"
                        placeholder="____________"
                        onChange={(e) => {
                          data.list_person[i].account_onw_inn = e.target.value
                          setData({ ...data })
                        }}
                      />
                      </div>
                      <Input
                        value={p.account_own_snils}
                        name="СНИЛС (при наличии)"
                        type="number"
                        pattern="[0-9]*"
                        placeholder="Введите СНИЛС"
                        onChange={(e) => {
                          data.list_person[i].account_own_snils = e.target.value
                          setData({ ...data })
                        }}
                      />
                    </div>

                    <div className={classNames(styles.row, "bg-grey")}>
                      <div className={styles.column}>
                        <DaDataSelect 
                          backgroundColor="#F0F2F5"
                          name="Гражданство"
                          isCountries
                          value={p.account_own_citizenship}
                          message="Введите страну"
                          formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                          onSelect={(value) => {
                            data.list_person[i].account_own_citizenship = value?.value ?? ""
                            setData({ ...data })
                          }}
                        />
                      </div>
                      <div className={styles.column}>
                        <DaDataSelect 
                          backgroundColor="#F0F2F5"
                          name="Страна проживания"
                          isCountries
                          value={p.account_country_residence}
                          message="Введите страну"
                          formatedOptions={(list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))}
                          onSelect={(value) => {
                            data.list_person[i].account_country_residence = value?.value ?? ""
                            setData({ ...data })
                          }}
                        />
                      </div>
                    </div>
                    <div className={classNames(styles.row, "bg-grey")}>
                      <div className={styles.input__wrapper}>
                        <p className={styles.name}>Телефон</p>
                        <MaskedInput
                          mask="+7 (999) 999 99 99"
                          maskChar="_"
                          placeholder="+7 (__) ___ __ __"
                          value={p.account_own_phone ?? ""}
                          style={{margin: 0, padding: "20px 16px" }}
                          onChange={(e) => {
                            data.list_person[i].account_own_phone = e.target.value
                            setData({ ...data })
                          }}
                        />
                      </div>
                      {p.account_onw_role?.includes("Акционер/учредитель") && <Input 
                        value={p.account_own_piece}
                        name="Доля владения"
                        placeholder="Доля владения"
                        onChange={(e) => {
                          data.list_person[i].account_own_piece = e.target.value
                          setData({ ...data })
                        }}
                      />}
                    </div>
                    <div className={styles.mb24}>
                      <p className={classNames(styles.mb24)}>
                        Является ли лицо иностранным публичным должностным лицом либо
                        лицом, связанным с таковым родственными, партнерскими или
                        иными отношениями?
                      </p>
                      <YesOrNo 
                        value={p.is_person_a_foreign_public} 
                        toggle={() => {
                          data.list_person[i].is_person_a_foreign_public = !data.list_person[i].is_person_a_foreign_public
                          setData({ ...data })
                        }}
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
                            value={{ value: p.assigned_publ_pers_relation, label: p.assigned_publ_pers_relation }}
                            name="Выбрать статус"
                            placeholder="Выбрать статус"
                            options={[{ label: 'Супруг', value: 'Супруг' }, { label: 'Супруга', value: 'Супруга' } ]}
                            onChange={(v) => {
                              data.list_person[i].assigned_publ_pers_relation = v.label
                              setData({ ...data })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classNames(styles.row, "bg-grey")}>
                      <div className={styles.column}>
                        <DaDataSelect 
                          backgroundColor="#F0F2F5"
                          name="Адрес регистрации"
                          value={p.account_own_registration}
                          message="Введите адрес"
                          formatedOptions={formatedOptions}
                          onSelect={(v) => {
                            data.list_person[i].account_own_registration = v.label
                            setData({ ...data })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className={styles.mb24}>Адрес местонахождения</p>
                      <div className={styles.row}>
                        <div className={styles.checks}>
                          <div
                            className={styles.checks__item}
                            onClick={() => {
                              data.list_person[i].accownt_own_living = "Совпадает"
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
                              data.list_person[i].accownt_own_living = ""
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
                    </div>
                    {p.accownt_own_living !== "Совпадает" && 
                      <div className={classNames(styles.row, "bg-grey")}>
                        <div className={styles.column}>
                          <DaDataSelect 
                            backgroundColor="#F0F2F5"
                            name="Адрес местонахождения"
                            value={p.accownt_own_living}
                            message="Введите адрес"
                            formatedOptions={formatedOptions}
                            onSelect={(v) => {
                              data.list_person[i].accownt_own_living = v.label
                              setData({ ...data })
                            }}
                          />
                        </div>
                      </div>}
                    <div className={styles.mb24}>
                      <p className={styles.mb24}>
                        Загрузить первую страницу паспорта
                      </p>
                      {p.first_passport_page_url?.file &&
                        <div className={styles.mb24}>
                          <div className={styles.download__item}>
                            <div className={styles.icon}>
                              <p className={styles.format}>
                                {getFormatFile(p.first_passport_page_url?.file[0]?.name)}
                              </p>
                              <p className={styles.size}>
                                {getSizeMb(p.first_passport_page_url?.file[0]?.size)}
                              </p>
                            </div>
                            <p className={styles.name}>{p.first_passport_page_url?.file[0]?.name}</p>
                          </div>
                        </div>}
                      <DownloadButton 
                        addFile={getPassportPageUrl(i)}
                      />
                    </div>
                    <div className={classNames(styles.row, "bg-grey", "form")}>
                      <Input
                        name="Место рождения"
                        value={p.account_birth_place}
                        placeholder="Введите адрес"
                        onChange={(e) => {
                          data.list_person[i].account_birth_place = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <div className={styles.input__wrapper}>
                        <p className={styles.name}>Дата рождения</p>
                        <MaskedInput 
                          value={p.account_datebirth}
                          placeholder="Введите дату"
                          mask="99.99.9999"
                          onChange={(e) => {
                            data.list_person[i].account_datebirth = e.target.value
                            setData({ ...data })
                          }}
                          />
                      </div>
                      <SelectRS
                        value={{ label: p.doc_type, value: p.doc_type }}
                        name="Тип документа, удостоверяющего личность"
                        nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
                        placeholder="Выберите тип"
                        backgroundColor="#F0F2F5"
                        options={identityDocOpts}
                        onChange={(v) => {
                          data.list_person[i].doc_type = v.label
                          setData({ ...data })
                        }}
                      />
                    </div>
                    <div className={classNames(styles.row, "bg-grey", "form")}>
                      <Input
                        value={p.doc_serial}
                        type="number"
                        pattern="[0-9]*"
                        name="Серия документа, удостоверяющего личность (при наличии)"
                        placeholder="Введите серию документа"
                        onChange={() => {
                          data.list_person[i].doc_serial = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <Input
                        value={p.doc_number}
                        type="number"
                        pattern="[0-9]*"
                        name="Номер документа, удостоверяющего личность"
                        placeholder="Введите номер документа"
                        onChange={() => {
                          data.list_person[i].doc_number = e.target.value
                          setData({ ...data })
                        }}
                      />
                      <Input 
                        value={p.issued_by}
                        name="Кем выдан"
                        placeholder="Наименование"
                        onChange={() => {
                          data.list_person[i].issued_by = e.target.value
                          setData({ ...data })
                        }}
                      />
                    </div>
                    <div className={classNames(styles.row, "bg-grey", "form")}>

                      <DaDataSelect 
                        backgroundColor="#F0F2F5"
                        name="Код подразделения (при наличии)"
                        value={p.division_code}
                        message="Введите код"
                        isCode
                        formatedOptions={(list) => list.map((item) => ({ value: item.data.code, label: item.data.code }))}
                        onSelect={(v) => {
                          data.list_person[i].division_code = v.value
                          setData({ ...data })
                        }}
                      />  
                      <div className={styles.input__wrapper}>
                        <p className={styles.name}>Дата выдачи</p>
                        <MaskedInput 
                          value={p.date_issue}
                          placeholder="Введите дату"
                          mask="99.99.9999"
                          onChange={(e) => {
                            data.list_person[i].date_issue = e.target.value
                            setData({ ...data })
                          }}
                        />
                      </div>
  
                      {/* <DateInput 
                        value={p.validity}
                        name="Срок действия"
                        locale="ru"
                        dateFormat="dd.MM.yyyy"
                        onChange={() => {
                          data.list_person[i].validity = e.target.value
                          setData({ ...data })
                        }}
                      /> */}
                    </div>
                  </div>
                )}
              </Wrapper>
            </div>

          <div className={styles.mb40}>
            <AddButton
              type="button" 
              onClick={() => {
                data.list_person.push({
                  accownt_own_living: "Совпадает",
                  account_own_mail: "Совпадает с адресом регистрации",
                  is_person_a_foreign_public: false,
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
                    {!!data.document_certifying_identity_executive.length && <div className={styles.row}>
                      {data.document_certifying_identity_executive.map(l => 
                        <div className={styles.download__item} key={l.path} style={{ flexGrow: 0 }}>
                          <div className={styles.icon}>
                            <p className={styles.format}>
                              {getFormatFile(l?.file?.name ?? l.path)}
                            </p>
                            <p className={styles.size}>
                              {getSizeMb(l.file.size)}
                            </p>
                          </div>
                          <p className={styles.name}>{l?.file?.name ?? l.path}</p>
                        </div>)}
                    </div>}
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
                    {!!data.document_confirming_real_activity.length && <div className={styles.row}>
                      {data.document_confirming_real_activity.map(l => 
                        <div className={styles.download__item} key={l.path} style={{ flexGrow: 0 }}>
                          <div className={styles.icon}>
                            <p className={styles.format}>
                              {getFormatFile(l?.file?.name ?? l.path)}
                            </p>
                            <p className={styles.size}>
                              {getSizeMb(l.file.size)}
                            </p>
                          </div>
                          <p className={styles.name}>{l?.file?.name ?? l.path}</p>
                        </div>)}
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
                    {!!data.document_licenses.length && <div className={styles.row}>
                      {data.document_licenses.map(l => 
                        <div className={styles.download__item} key={l.path} style={{ flexGrow: 0 }}>
                          <div className={styles.icon}>
                            <p className={styles.format}>
                              {getFormatFile(l?.file?.name ?? l.path)}
                            </p>
                            <p className={styles.size}>
                              {getSizeMb(l.file.size)}
                            </p>
                          </div>
                          <p className={styles.name}>{l?.file?.name ?? l.path}</p>
                        </div>)}
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
                    value={customPlannedOper.value}
                    placeholder=""
                    onChange={onChangeCustomPlannedOper}
                  />
                </div>}
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
                    onChange={(e) => setData({ ...data, beneficiaries: e.target.value })}
                  />
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
                  Количество операций по снятию наличности в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, week_cash_withdrawal: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, week_cash_withdrawal: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, week_cash_withdrawal: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.week_cash_withdrawal === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по снятию наличности в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, quarter_cash_withdrawal: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, quarter_cash_withdrawal: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, quarter_cash_withdrawal: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.quarter_cash_withdrawal === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по снятию наличности в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, age_cash_withdrawal: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, age_cash_withdrawal: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, age_cash_withdrawal: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.age_cash_withdrawal === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Сумма операций по снятию денежных средств в наличной форме в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_week_cash_withdrawal: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_week_cash_withdrawal: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_week_cash_withdrawal: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_week_cash_withdrawal === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_mouth_cash_withdrawal: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_mouth_cash_withdrawal: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_mouth_cash_withdrawal: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_mouth_cash_withdrawal === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_quarter_cash_withdrawal: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_quarter_cash_withdrawal: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_quarter_cash_withdrawal: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_quarter_cash_withdrawal === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по снятию денежных средств в наличной форме в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_age_cash_withdrawal: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_age_cash_withdrawal: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, sum_age_cash_withdrawal: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.sum_age_cash_withdrawal === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по внешнеторговым контрактам в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_week: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_week: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_week: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_week === ">100"}
                      />
                      <p>более 100</p>
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
                      onClick={() => setData({ ...data, foreign_trade_contracts_month: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_month: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_month: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_month === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по внешнеторговым контрактам в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_quarter: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_quarter: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_quarter: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_quarter === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Количество операций по внешнеторговым контрактам в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_age: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_age: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_trade_contracts_age: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_trade_contracts_age === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                  Сумма операций по внешнеторговым контрактам в неделю
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_week: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_week: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_week: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_week === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в месяц
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_month: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_month: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_month: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_month === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в квартал
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_quarter: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_quarter: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_quarter: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_quarter === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mb40}>
                <p className={styles.mb24}>
                Сумма операций по внешнеторговым контрактам в год
                </p>
                <div className={styles.row}>
                  <div className={styles.checks}>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_age: "0 - 99 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === "0 - 99 000"}
                      />
                      <p>0 - 99 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_age: "100 000 - 1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === "100 000 - 1 000 000"}
                      />
                      <p>100 000 - 1 000 000 руб.</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, foreign_sum_contracts_age: ">1 000 000" })}
                    >
                      <RadioButtonRS
                        isActive={data.foreign_sum_contracts_age === ">1 000 000"}
                      />
                      <p>более 1 000 000 руб.</p>
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
                      onClick={() => setData({ ...data, sources_cash_receipts: cash_source[0] })}
                    >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[0]}
                      />
                      <p>{cash_source[0]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, sources_cash_receipts: cash_source[1] })}
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
                      onClick={() => setData({ ...data, sources_cash_receipts: cash_source[2] })}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[2]}
                      />
                      <p>{cash_source[2]}</p>
                    </div>
                    <div className={styles.checks__item}
                      onClick={() => setData({ ...data, sources_cash_receipts: cash_source[3] })}
                      >
                      <RadioButtonRS
                        isActive={data.sources_cash_receipts === cash_source[3]}
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
                      onClick={() => setData({ ...data, headcount: "0-29" })}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === "0-29"}
                      />
                      <p>0-29</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, headcount: "30-100" })}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === "30-100"}
                      />
                      <p>30-100</p>
                    </div>
                    <div
                      className={styles.checks__item}
                      onClick={() => setData({ ...data, headcount: ">100" })}
                    >
                      <RadioButtonRS
                        isActive={data.headcount === ">100"}
                      />
                      <p>более 100</p>
                    </div>
                  </div>
                </div>
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
                        if (data.information_counterparties && !data.information_counterparties2.length) {
                          data.information_counterparties2 = [""]
                        }
                        setData({ ...data })
                      }}
                    />
                  </div>
                  {data.information_counterparties && 
                    <div>
                      {data.information_counterparties2.map((p, i) =>
                        <div className={styles.row}>
                          <Input
                            value={p}
                            placeholder="Введите название"
                            onChange={onChangeCounterparties(i)}
                          />
                          <DeleteButton onClick={removeFromCounterparties(i)} />
                        </div>)}

                      <AddButton
                        type="button" 
                        onClick={() => {
                          data.information_counterparties2.push("")
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
