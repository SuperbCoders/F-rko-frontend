import React from 'react';
import { AppRouter } from './router';
import { initData, RequisitesContext } from './contexts/companyRequisits';
import { userApi } from './api';
import { statementsTexts } from './pages/Step2';
import "./App.scss";
import { isObject } from './helpers';

function App() {
  const [requisits, setRequisits] = React.useState(initData)

  const helpingInfo = React.useRef({ opf: "", custom_planned_operation: {} })

  React.useEffect(() => {
    const saveData = () => setRequisits(prev => {
      if (isObject(prev)) {
        localStorage.setItem('rko_data', JSON.stringify(prev));
        localStorage.setItem('rko_info', JSON.stringify(helpingInfo.current));
      } 
      return prev
    })
    window.addEventListener('beforeunload', saveData);
    return () => window.removeEventListener('beforeunload', saveData)
  }, [])

  React.useEffect(() => {
    const phone = localStorage.getItem("contact_number") ?? ""
    const prevSavedData = JSON.parse(localStorage.getItem('rko_data'))
    const raw = localStorage.getItem('rko_info')
    if (raw) {
      helpingInfo.current = JSON.parse(raw);
    }

    if (phone && !prevSavedData) {
      userApi.getInfo(phone.replace(/\(|\)+|-|\s|/g, "")).then(data => {
        if (!data.list_persone) {
          data.list_persone = [
            {
              accownt_own_living: "Совпадает",
              account_own_mail: "Совпадает с адресом регистрации",
              is_person_a_foreign_public: false,
              roles: []
            }
          ]
        }
        if (!data.beneficiaries) {
          data.beneficiaries = "Отсутствуют"
        }
        if (!data.group_members) {
          data.group_members = []
        }
        if (!data.founders) {
          data.founders = []
        }
        if (!data.information_goals) {
          data.information_goals = [...statementsTexts]
        }
        if (!data.salary_debt) {
          data.salary_debt = 0
        }
        if (!data.information_counterparties_two) {
          data.information_counterparties_two = []
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
        if (!data.document_certifying_identity_executive) {
          data.document_certifying_identity_executive = []
        }
        if (!data.document_confirming_real_activity) {
          data.document_confirming_real_activity = []
        }
        if (!data.document_licenses) {
          data.document_licenses = []
        }

        data.list_persone.forEach(p => {
          if (p.account_datebirth) {
            p.account_datebirth = new Date(p.account_datebirth)
          }
          if (p.date_issue) {
            p.date_issue = new Date(p.date_issue)
          }
          if (p.validity) {
            p.validity = new Date(p.validity)
          }
        })
        setRequisits(prev => ({ ...prev, ...data }))
      })    
    }

    if (prevSavedData) {
      setRequisits(prev => {
        if (prevSavedData.list_collegial_executive_body) {
          delete prevSavedData.list_collegial_executive_body
        }
        if (prevSavedData.list_supervisoty_board_persone) {
          delete prevSavedData.list_supervisoty_board_persone
        }

        delete prevSavedData.is_supervisoty
        delete prevSavedData.is_collegiate_body
        delete prevSavedData.list_person
        delete prevSavedData.information_counterparties2

        if (!prevSavedData.planned_operations) {
          prevSavedData.planned_operations = []
        }
        if (!prevSavedData.beneficiaries) {
          prevSavedData.beneficiaries = "Отсутствуют"
        }
        if (!prevSavedData.document_certifying_identity_executive) {
          prevSavedData.document_certifying_identity_executive = []
        }
        if (!prevSavedData.document_confirming_real_activity) {
          prevSavedData.document_confirming_real_activity = []
        }
        if (!prevSavedData.document_licenses) {
          prevSavedData.document_licenses = []
        }
        if (!prevSavedData.information_counterparties) {
          prevSavedData.information_counterparties = false
        }
        if (!prevSavedData.information_counterparties_two) {
          prevSavedData.information_counterparties_two = []
        }
        if (!prevSavedData.list_persone) {
          prevSavedData.list_persone = [
            {
              accownt_own_living: "Совпадает",
              account_own_mail: "Совпадает с адресом регистрации",
              is_person_a_foreign_public: false,
              roles: []
            }
          ]
        }
        
        prevSavedData.list_persone?.forEach(p => {
          if (p.account_datebirth) {
            p.account_datebirth = new Date(p.account_datebirth)
          }
          if (p.date_issue) {
            p.date_issue = new Date(p.date_issue)
          }
          if (p.validity) {
            p.validity = new Date(p.validity)
          }
        })

        return { ...prev, ...prevSavedData }
      })
    }
  }, [])

  return (
    <RequisitesContext.Provider
      value={{ data: requisits, info: helpingInfo, setData: setRequisits }}
    >
      <AppRouter />
    </RequisitesContext.Provider>
  )
}

export default App;
