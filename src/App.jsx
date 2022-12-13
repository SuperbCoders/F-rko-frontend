import React from 'react';
import { AppRouter } from './router';
import { initData, RequisitesContext } from './contexts/companyRequisits';
import "./App.scss";
import { userApi } from './api';

function App() {
  const [requisits, setRequisits] = React.useState(initData)

  React.useLayoutEffect(() => {
    const phone = localStorage.getItem("rko_phone") ?? ""
    if (phone) {
      userApi.getInfo(phone).then(data => {
        data.addresses = data?.addresses?.map((a, idx) => ({ ...a, id: idx })) || []
        if (!data.list_supervisoty_board_persone) {
          data.list_supervisoty_board_persone = {}
        }
        if (!data.list_collegial_executive_body) {
          data.list_collegial_executive_body = {}
        }
        if (!data.group_members) {
          data.group_members = []
        }
        if (!data.information_goals) {
          data.information_goals = []
        }

        //корректные форматы данных для datepicker'a
        if (data.start_date, data.end_date) {
          data.start_date = new Date(data.start_date?.split("-")[0], data.start_date.split("-")[1], data.start_date?.split("-")[2])
          data.end_date = new Date(data.end_date?.split("-")[0], data.end_date?.split("-")[1], data.end_date?.split("-")[2])
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
    <RequisitesContext.Provider
      value={{ data: requisits, setData: setRequisits }}
    >
      <AppRouter />
    </RequisitesContext.Provider>
  )
}

export default App;
