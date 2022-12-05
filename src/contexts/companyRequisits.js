import React from 'react';

export const initData = {
  list_supervisoty_board_persone: {},
  list_collegial_executive_body: {},
  addresses: [],
  information_goals: []
}

export const RequisitesContext = React.createContext({
  data: {},
  setData: () => {}
});
