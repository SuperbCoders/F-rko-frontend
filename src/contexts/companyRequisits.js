import React from 'react';
import { statementsTexts } from '../pages/Step2';

export const initData = {
  list_persone: [
    {
      accownt_own_living: "Совпадает",
      account_own_mail: "Совпадает с адресом регистрации",
      roles: []
    },
  ],
  addresses: [],
  salary_debt: 0,
  contact_number: "",
  information_goals: [...statementsTexts],
  beneficiaries: "Отсутствуют",
  email: "",
  fax: "",
  contact_phone_number: "",
  codeword: "",
  founders: [],
  planned_operations: [],
  is_finished: false,
  document_certifying_identity_executive: [],
  document_confirming_real_activity: [],
  document_licenses: [],
  information_counterparties: false,
  information_counterparties_two: [],
  subject_licensing: "Не осуществляет",
}

export const RequisitesContext = React.createContext({
  data: {},
  info: {},
  setData: () => {}
});
