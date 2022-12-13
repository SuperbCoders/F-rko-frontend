import React from 'react';
import { ROUTES } from '../helpers';
import Account from "../pages/Account";
import Login from "../pages/Login/Login";
import Step1 from "../pages/Step1";
import Step3 from "../pages/Step3";
import Step2 from "../pages/Step2";

export const publicRoutes = [
  {
    path: ROUTES.MAIN,
    element: <Login />,
  },
  {
    path: ROUTES.ACCOUNT,
    element: <Account />,
  },
  {
    path: ROUTES.STEP1,
    element: <Step1 />,
  },
  {
    path: ROUTES.STEP2,
    element: <Step2 />,
  },
  {
    path: ROUTES.STEP3,
    element: <Step3 />,
  }
];