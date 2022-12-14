import React from 'react';
import { ROUTES } from '../helpers';
import Step1 from "../pages/Step1";
import Step3, { Protector } from "../pages/Step3";
import Step2, { Protector2 } from "../pages/Step2";
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  {
    path: ROUTES.STEP1,
    element: <Step1 />,
  },
  {
    path: ROUTES.STEP2,
    element: <Protector2><Step2 /></Protector2> ,
  },
  {
    path: ROUTES.STEP3,
    element: <Protector><Step3 /></Protector>,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.STEP1} />,
  }
];