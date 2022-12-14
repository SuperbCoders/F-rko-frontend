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
      validateFn: str => str.length > 0,
      required: false
    },
    agree: {
      value: true,
      valid: true,
      required: true
    }
  }

  const [fields, setFields] = React.useState(initFields)
  const [showErrors, setShowErrors] = React.useState(false)
  const [disableUI, setDisableUI] = React.useState(false)

  React.useEffect(() => window.scrollTo(0, 0), []);

  const onAgree = () => setFields({
    ...fields,
    agree: {
      value: !fields.agree.value,
      valid: !fields.agree.valid
    }
  })

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
      registrator_name: "?????? ????????????????????",
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

    const formattedPhone = data.contact_number.replace(/\(|\)+|-|\s|/g, "") // ?????????????? ??????????????, ????????????, ??????????????

    localStorage.setItem("contact_number", data.contact_number)
    setDisableUI(true)

    try {
      await userApi.postInfo(data, formattedPhone)
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
              ???????????? ???? ???????????????? ????????????????????
              <br /> ??????????
            </p>
            <div>
              <form onSubmit={onSubmit}>
                <div className={styles.form__field}>
                  <p className={styles.input__name}>???????????????????? ????????</p>
                  <InputRS
                    placeholder="?????????????? ??????"
                    className={!fields.name.valid && showErrors ? styles.input__error : ""}
                    inputStyle={{ width: "100%" }}
                    required={true}
                    value={fields.name.value}
                    onChange={onChange("name")}
                    />
                </div>
                <div style={{ marginBottom: "35px" }}>
                  <p className={styles.input__name}>???????????????? ?????? ????</p>
                  <DaDataSelect 
                    placeholder="?????????????? ???????????????? ?????? ??????"
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
                  <p className={styles.input__name}>?????????? ????????????????</p>
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
                      title="???????????????? ??????"
                      type="button"
                      disable={!/[0-9]+/.test(data.contact_number?.[17])}
                      style={{ marginLeft: "24px", maxWidth: "267px" }}
                    />
                  </div>
                </div>
                <div
                  className={styles.input__wrapper}
                  style={{ marginBottom: "50px" }}
                >
                  <p className={styles.input__name}>?????? ???????????????? ???? ??????</p>
                  <div className={styles.input__container}>
                    <div>
                      <InputRS
                        name="?????? ???????????????? ???? ??????"
                        value={fields.code.value}
                        inputStyle={{ maxWidth: "267px" }}
                        required={false}
                        onChange={onChange("code")}
                      />
                    </div>

                    <p className={styles.form__notify}>
                      ???????????????? ?????????? <br /> ?????????????????? ?????? ?????????? 59 ??????
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
                      ?? ?????????????????????? ?? ???????????????? ?? ??????????????????{" "}
                      <a href="#">???????????????????????????? ??????????</a>,<br /> ?? ?????????? ??{" "}
                      <a href="#">
                        ?????????????????? ?????????????????? ?? ???????????????? ???????????????????????? ????????????
                      </a>
                    </p>
                  </CheckBoxRS>
                </div>
                <div className={styles.buttons}>
                  <ButtonRS
                    view="ghost"
                    type="button"
                    title="????????????????????"
                    style={{ maxWidth: "152px" }}
                    onClick={() => navigate("/account")}
                  />
                  <ButtonRS
                    title="????????????????????"
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
