import React from 'react';
import { AppRouter } from './router';
import { initData, RequisitesContext } from './contexts/companyRequisits';
import "./App.scss";
import { userApi } from './api';
import { AuthContext } from './contexts/auth';
import { statementsTexts } from './pages/Step2';

function App() {
  const [auth, setAuth] = React.useState({ isAuthed: !!localStorage.getItem("login_number"), phone: localStorage.getItem("login_number") ?? "" })
  const [requisits, setRequisits] = React.useState(initData)

  React.useLayoutEffect(() => {
    const phone = localStorage.getItem("contact_number") ?? ""
    const loginPhone = localStorage.getItem("login_number") ?? ""
    if (loginPhone) {
      setAuth({ isAuthed: true, loginPhone })
    }
    if (phone) {
      userApi.getInfo(phone.replace(/\(|\)+|-|\s|/g, "")).then(data => {
        data.addresses = data?.addresses?.map((a, idx) => ({ ...a, id: idx })) || []
        if (!data.list_supervisoty_board_persone) {
          data.list_supervisoty_board_persone = {
            accownt_own_living: "Совпадает",
            account_own_mail: "Совпадает с адресом регистрации",
            is_person_a_foreign_public: false
          }
        }
        if (!data.list_collegial_executive_body) {
          data.list_collegial_executive_body = {
            accownt_own_living: "Совпадает",
            account_own_mail: "Совпадает с адресом регистрации",
            is_person_a_foreign_public: false
          }
        }
        if (!data.group_members) {
          data.group_members = []
        }
        if (!data.information_goals) {
          data.information_goals = [...statementsTexts]
        }

        if (!data.salary_debt) {
          data.salary_debt = 0
        }

        if (!data.employers_volume) {
          data.employers_volume = ""
        }
        if (!data.supreme_management_body) {
          data.supreme_management_body = ""
        }
        if (!data.supreme_management_person) {
          data.supreme_management_person = ""
        }
        if (!data.company_group_name) {
          data.company_group_name = ""
        }
        if (!data.supreme_management_inn) {
          data.supreme_management_inn = ""
        }

        //корректные форматы данных для datepicker'a
        if (data.start_date) {
          data.start_date = new Date(data.start_date?.split("-")[0], data.start_date.split("-")[1], data.start_date?.split("-")[2])
        } else {
          data.start_date = ""
        }

        if (data.end_date) {
          data.end_date = new Date(data.end_date?.split("-")[0], data.end_date?.split("-")[1], data.end_date?.split("-")[2])
        } else {
          data.end_date = ""
        }

        const { list_collegial_executive_body, list_supervisoty_board_persone: { account_datebirth, date_issue, validity } } = data
        if (account_datebirth) {
          data.list_supervisoty_board_persone.account_datebirth = new Date(account_datebirth)
        }
        if (date_issue) {
          data.list_supervisoty_board_persone.date_issue = new Date(date_issue)
        }
        if (validity) {
          data.list_supervisoty_board_persone.validity = new Date(validity)
        }

        if (list_collegial_executive_body.account_datebirth) {
          data.list_collegial_executive_body.account_datebirth = new Date(list_collegial_executive_body.account_datebirth)
        }
        if (list_collegial_executive_body.date_issue) {
          data.list_collegial_executive_body.date_issue = new Date(list_collegial_executive_body.date_issue)
        }
        if (list_collegial_executive_body.validity) {
          data.list_collegial_executive_body.validity = new Date(list_collegial_executive_body.validity)
        }
        setRequisits(prev => ({ ...prev, ...data }))
      })    
    }
  }, [])

  return (
    <AuthContext.Provider 
      value={{ auth, setAuth }}
    >
      <RequisitesContext.Provider
        value={{ data: requisits, setData: setRequisits }}
      >
        <AppRouter />
      </RequisitesContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
