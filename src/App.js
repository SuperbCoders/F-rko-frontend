import "./App.scss";
import Header from "./components/Header";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className={"container"}>
      <Header />
      <Login />
    </div>
  );
}

export default App;
