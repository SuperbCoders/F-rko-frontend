import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes, } from "./routes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => 
          <Route key={path} path={path} element={element} />
        )}
      </Routes>
    </BrowserRouter>
  );
};