import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { ROUTES } from "../helpers";
import { publicRoutes, privateRoutes } from "./routes";

const ProtectedRoute = ({ children, isAuthed=false }) => {
  if (!isAuthed) {
    return <Navigate to={ROUTES.STEP1} replace />;
  }

  return children;
};

export const AppRouter = () => {
  const { auth: { isAuthed } } = React.useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, element }) => 
          <Route key={path} path={path} element={element} />
        )}
        {privateRoutes.map(({ path, element }) =>
          <Route key={path} path={path} element={<ProtectedRoute isAuthed={isAuthed}>{element}</ProtectedRoute>} />          
        )}
      </Routes>
    </BrowserRouter>
  );
};