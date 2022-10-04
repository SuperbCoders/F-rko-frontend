import "./App.scss";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Step1 from "./pages/Step1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Step1 />,
  },
]);

function App() {
  return (
    <div className={"container"}>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
