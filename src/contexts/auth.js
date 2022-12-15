import React from 'react';

export const AuthContext = React.createContext({
  isAuthed: false,
  phone: "",
  setAuth: () => {}
})