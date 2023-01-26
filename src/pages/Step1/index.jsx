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
import MaskedInput from "../../components/MaskedInput";
import { userApi } from "../../api";
import { RequisitesContext } from "../../contexts/companyRequisits";
import { ROUTES } from "../../helpers"

const Step1 = () => {
  const navigate = useNavigate();
  const { data, info, setData } = React.useContext(RequisitesContext)

  const initFields = {
    name: {
      value: localStorage.getItem("rko_name") ?? "",
      valid: (localStorage.getItem("rko_name") ?? "").length,
      validateFn: str => str.length > 0,
      required: true
    },
    code: {
      value: "",
      valid: false,
      validateFn: str => str.length === 6,
      required: true,
      correct: false
    },
    agree: {
      value: true,
      valid: true,
      required: true
    }
  }

  const [fields, setFields] = React.useState(initFields)
  const [showErrors, setShowErrors] = React.useState(false)
  const [seconds, setSeconds] = React.useState(0)
  const [disableUI, setDisableUI] = React.useState(false)
  const [disableButton, setDisableButton] = React.useState(false)
  const [disableInput, setDisableInput] = React.useState(true)
  const sentTypedCode = React.useRef(false)

  React.useEffect(() => window.scrollTo(0, 0), []);

  React.useEffect(() => {
    if (
        (data.contact_number.length === 11 && /[0-9]+/.test(data.contact_number?.[10]))
        || (data.contact_number.length === 18 && /[0-9]+/.test(data.contact_number?.[17]))
    ) {
      setDisableButton(false)
      setDisableInput(false)
    }
  }, [data.contact_number])

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      if (seconds === 0) {
        clearInterval(interval);
        setDisableButton(false)
      }
    }, 1000);
  
    return () => clearInterval(interval)
  }, [seconds])

  const onAgree = () => setFields({
    ...fields,
    agree: {
      value: !fields.agree.value,
      valid: !fields.agree.valid
    }
  })

  const onGetCode = () => {
    setDisableButton(true)
    setSeconds(60)
    setDisableInput(false)
    userApi.sendSmsCode(data.contact_number)
      .then()
      .catch()
  }

  const onChangeCode = (e) => {
    setFields({
      ...fields,
      code: {
        ...fields.code,
        value: e.target.value,
        valid: fields.code.validateFn(e.target.value),
      }
    })
    if (e.target.value?.[3] && !isNaN(e.target.value[3])) {
      userApi.checkForValidity(data.contact_number, fields.code.value)
        .then(res => {
          console.log("res", res, res?.status)
          if (res.status === 200) {
            fields.code.correct = true
          }
        })
        .catch(e => {})
      sentTypedCode.current = true
    }
  }

  const onSelect = (a) => {
    info.current.type = a?.value?.data?.type ?? ""
    info.current.code = a?.value?.data?.opf?.code ?? ""
    const { value } = a || {}
    const { data } = value || {}

    setData(prev => ({ 
      ...prev,
      short_name: data?.name.short_with_opf ?? "",
      company_name: data?.name?.full_with_opf ?? "",
      registration_date: data?.state?.registration_date ?? "",
      inn: data?.inn ?? "",
      kpp: data?.kpp ?? "",
      ogrn: data?.ogrn ?? "",
      ogrn_date: data?.ogrn_date ?? "",
      registrator_name: "Нет информации",
      okved: data?.okved ?? "",
      oktmo: data?.oktmo ?? ""
    }))
  }

  const onChange = (name) => (e) => {
    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value: e.target.value,
        valid: fields[name].validateFn(e.target.value),
      }
    })
  
    name === "name" && localStorage.setItem("rko_name", e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    // const step = localStorage.getItem("rko_active_step") ?? 1
    // if (step === 1 && !fields.code.correct) {
    //   return
    // }

    localStorage.setItem("contact_number", data.contact_number)
    setDisableUI(true)

    try {
      await userApi.postInfo(data, data.contact_number)
      setDisableUI(false)
      setShowErrors(false)
      localStorage.setItem("rko_active_step", 2)
      navigate(ROUTES.STEP2)
    } catch (error) {
      setDisableUI(false)
      setShowErrors(false)
    }
  };

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
              <form onSubmit={onSubmit}>
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
                    value={data.company_name}
                    error={!data.company_name?.length && showErrors}
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
                      <MaskedInput
                        mask="+7 (999) 999 99 99"
                        placeholder="+7 (__) ___ __ __"
                        maskChar="_"
                        value={data.contact_number ?? ""}
                        required={true}
                        className={!/[0-9]+/.test(data.contact_number?.[17]) && showErrors ? styles.input__error : ""}
                        onChange={(e) => setData(prev => ({ ...prev, contact_number: e.target.value }))}
                      />
                    </div>
                    <ButtonRS
                      title="Получить код"
                      type="button"
                      disable={!/[0-9]+/.test(data.contact_number?.[17]) || disableButton}
                      style={{ marginLeft: "24px", maxWidth: "267px" }}
                      onClick={onGetCode}
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
                      <MaskedInput 
                        name="Код проверки из СМС"
                        type="tel"
                        mask="9999"
                        maskChar="_"
                        error={sentTypedCode.current && !fields.code.correct}
                        disabled={disableInput}
                        placeholder="____"
                        value={fields.code.value}
                        required={fields.code.required}
                        onChange={onChangeCode}
                      />
                    </div>

                    {!!seconds && <p className={styles.form__notify}>
                      Повторно можно <br /> отправить код через {seconds} сек
                    </p>}
                  </div>
                  {sentTypedCode.current && !fields.code.correct && <p className="text-error mt10">Некорректный код</p>}
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
                    type="button"
                    title="Отказаться"
                    style={{ maxWidth: "152px" }}
                  />
                  <ButtonRS
                    title="Продолжить"
                    style={{ maxWidth: "267px" }}
                    disable={disableUI}
                    type="submit"
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
