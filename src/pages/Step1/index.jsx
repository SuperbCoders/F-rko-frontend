import React from "react";
import Paginator from "../../components/Paginator";
import InputRS from "../../components/InputRS";
import styles from "./styles.module.scss";
import ButtonRS from "../../components/ButtonRS";
import CheckBoxRS from "../../components/CheckBoxRS";
import cube from "../../assets/img/cube.png";
import { useNavigate } from "react-router-dom";
import HeaderMy from "../../components/HeaderMy";
import DaDataSelect from "../../components/DaDataSelect";
import PhoneInput from "../../components/PhoneInput";
import { userApi } from "../../api";
import { RequisitesContext } from "../../contexts/companyRequisits";
import { ROUTES } from "../../helpers"

const Step1 = () => {
  const navigate = useNavigate();
  const { data, setData } = React.useContext(RequisitesContext)

  const initFields = {
    name: {
      value: localStorage.getItem("rko_name") ?? "",
      valid: (localStorage.getItem("rko_name") ?? "").length,
      validateFn: str => str.length > 0,
      required: true
    },
    contact_number: {
      value: "",
      valid: false,
      validateFn: str => /[0-9]+/.test(str[17]),
      required: true
    },
    code: {
      value: "",
      valid: false,
      validateFn: str => str.length > 0,
      required: false
    },
    company_name: {
      value: "",
      valid: false,
      validateFn: str => str.length > 0,
      required: true
    },
    agree: {
      value: false,
      valid: false,
      required: true
    }
  }

  const [fields, setFields] = React.useState(initFields)
  const [showErrors, setShowErrors] = React.useState(false)

  React.useEffect(() => window.scrollTo(0, 0), []);

  React.useEffect(() => {
    const company_name = data?.company_name ?? ""
    const activeStep = localStorage.getItem("rko_active_step"); // 1| 2 |3
    
    setFields(prev => ({
      ...prev,
      company_name: {
        ...prev.company_name,
        value: company_name,
        valid: fields.company_name.validateFn(company_name)
      },
      agree: {
        value: activeStep > 1,
        valid: activeStep > 1,
        required: true
      }
    }))
  }, [data.company_name])
  
  React.useEffect(() => {
    const contact_number = data?.contact_number ?? ""
    const activeStep = localStorage.getItem("rko_active_step"); // 1| 2 |3

    setFields(prev => ({
      ...prev,
      contact_number: {
        ...prev.contact_number,
        value: contact_number,
        valid: contact_number.length ? /[0-9]+/.test(contact_number.charAt(9)) : false
      },
      agree: {
        value: activeStep > 1,
        valid: activeStep > 1,
        required: true
      }
    }))
  }, [data.contact_number, data.company_name])

  const onSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    let areFieldsValid = true

    Object.keys(fields).forEach(name => {
      if (fields[name].required && !fields[name].valid) {
        areFieldsValid = false
      }
    })

    if (!areFieldsValid) {
      return
    }

    const formattedPhone = fields.contact_number.value.replace(/\(|\)+|-|\s|/g, "") // убираем пробелы, дефисы, скоблки

    const info = {
      company_name: fields.company_name.value,
      contact_number: formattedPhone,
      inn: data.inn,
      is_finished: false,
      // short_name: data.short_name,
      // full_name: data.full_name,
      // registration_date: data.registration_date,
      // kpp: data.kpp,
      // ogrn: data.ogrn,
      // ogrn_date: data.ogrn_date,
      // registrator_name: data.registrator_name,
      // okved: data.okved,
      // oktmo: data.oktmo
    }
    localStorage.setItem("rko_phone", formattedPhone)
    localStorage.setItem("rko_name", fields.name.value)
    await userApi.postInfo(info, formattedPhone)
    setShowErrors(false)
    localStorage.setItem("rko_active_step", 2)
    setData(prev => ({ ...prev, ...info }))
    navigate(ROUTES.STEP2)
  };
  
  const onChange = (name) => (e) => setFields({
    ...fields,
    [name]: {
      ...fields[name],
      value: e.target.value,
      valid: fields[name].validateFn(e.target.value),
    }
  })
  
  const onSelect = ({ value: { data, value, unrestricted_value } }) => {
    setData(prev => ({ 
      ...prev,
      short_name: data?.name.short_with_opf ?? "",
      full_name: data?.name?.full_with_opf ?? "",
      registration_date: data?.state?.registration_date ?? "",
      inn: data?.inn ?? "",
      kpp: data?.kpp ?? "",
      ogrn: data?.ogrn ?? "",
      ogrn_date: data?.ogrn_date ?? "",
      registrator_name: "Нет информации",
      okved: data?.okved ?? "",
      oktmo: data?.oktmo ?? ""
    }))

    setFields({
      ...fields,
      company_name: {
        ...fields.company_name,
        value: data?.name?.full_with_opf ?? "",
        valid: fields.company_name.validateFn(data?.name?.full_with_opf ?? ""),
      }
    })
  }
  
  const onAgree = () => setFields({
    ...fields,
    agree: {
      value: !fields.agree.value,
      valid: !fields.agree.valid
    }
  })

  return (
    <>
      <HeaderMy />
      <div className="container">
        <Paginator
          style={{ marginTop: "64px", marginBottom: "16px" }}
        />
        <div className={styles.form}>
          <div className={styles.form__left}>
            <p className={styles.title}>
              Заявка на открытие расчетного
              <br /> счета
            </p>
            <div>
              <form>
                <div className={styles.form__field}>
                  <p className={styles.input__name}>Контактное лицо</p>
                  <InputRS
                    placeholder="Введите ФИО"
                    className={!fields.name.valid && showErrors ? styles.input__error : ""}
                    inputStyle={{ width: "100%" }}
                    required={true}
                    value={fields.name.value}
                    onChange={onChange("name")}
                    />
                </div>
                <div style={{ marginBottom: "35px" }}>
                  <p className={styles.input__name}>Компания или ИП</p>
                  <DaDataSelect 
                    placeholder="Введите название или ИНН"
                    required={true}
                    value={fields.company_name.value}
                    error={!fields.company_name.valid && showErrors}
                    onSelect={onSelect}
                  />
                </div>
                <div
                  className={styles.input__wrapper}
                  style={{ marginBottom: "30px" }}
                >
                  <p className={styles.input__name}>Номер телефона</p>
                  <div className={styles.input__container}>
                    <div>
                      <PhoneInput
                        value={fields.contact_number.value}
                        required={true}
                        className={!fields.contact_number.valid && showErrors ? styles.input__error : ""}
                        onChange={onChange("contact_number")}
                      />
                    </div>
                    <ButtonRS
                      title="Получить код"
                      type="button"
                      disable={!fields.contact_number.valid}
                      style={{ marginLeft: "24px", maxWidth: "267px" }}
                    />
                  </div>
                </div>
                <div
                  className={styles.input__wrapper}
                  style={{ marginBottom: "50px" }}
                >
                  <p className={styles.input__name}>Код проверки из СМС</p>
                  <div className={styles.input__container}>
                    <div>
                      <InputRS
                        name="Код проверки из СМС"
                        value={fields.code.value}
                        inputStyle={{ maxWidth: "267px" }}
                        required={false}
                        onChange={onChange("code")}
                      />
                    </div>

                    <p className={styles.form__notify}>
                      Повторно можно <br /> отправить код через 59 сек
                    </p>
                  </div>
                </div>
                <div className={styles.checkbox__container}>
                  <CheckBoxRS
                    isChecked={fields.agree.value}
                    isError={!fields.agree.valid && showErrors}
                    onChange={onAgree}
                    required={true}
                  >
                    <p className={styles.checkbox__name}>
                      Я ознакомился и согласен с условиями{" "}
                      <a href="#">резервирования счёта</a>,<br /> а также с{" "}
                      <a href="#">
                        условиями обработки и хранения персональных данных
                      </a>
                    </p>
                  </CheckBoxRS>
                </div>
                <div className={styles.buttons}>
                  <ButtonRS
                    view="ghost"
                    title="Отказаться"
                    style={{ maxWidth: "152px" }}
                    onClick={() => navigate("/account")}
                  />
                  <ButtonRS
                    title="Продолжить"
                    style={{ maxWidth: "267px" }}
                    type="submit"
                    onClick={onSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className={styles.form__right}>
            <img src={cube} alt="cube" className={styles.picture} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
