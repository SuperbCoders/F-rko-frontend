import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account";
import Login from "./pages/Login/Login";
import Step1 from "./pages/Step1";
import Step3 from "./pages/Step3";
import Step2 from "./pages/Step2";

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
  {
    path: "/step2",
    element: <Step2 />,
  },
  {
    path: "/step3",
    element: <Step3 />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
