import React from 'react';
import { statementsTexts } from '../pages/Step2';

export const initData = {
  list_supervisoty_board_persone: {
    accownt_own_living: "Совпадает",
    account_own_mail: "Совпадает с адресом регистрации",
    is_person_a_foreign_public: false
  },
  list_collegial_executive_body: {
    accownt_own_living: "Совпадает",
    account_own_mail: "Совпадает с адресом регистрации",
    is_person_a_foreign_public: false
  },
  addresses: [],
  salary_debt: 0,
  contact_number: "",
  is_supervisoty: false,
  is_collegiate_body: false,
  information_goals: [...statementsTexts],
  beneficiaries: "Отсутствуют",
  email: "",
  fax: "",
  contact_phone_number: "",
  codeword: "",
  founders: []
}

export const RequisitesContext = React.createContext({
  data: {},
  info: {},
  setData: () => {}
});
