import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account";
import Login from "./pages/Login/Login";
import Step1 from "./pages/Step1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/step1",
    element: <Step1 />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
