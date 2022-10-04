import React from "react";
import LoginForm from "../../components/LoginForm";
import cube from "../../assets/img/cube.png";
import styles from "./styles.module.scss";
import Header from "../../components/Header";

const Login = () => {
  return (
    <div className={"container"}>
      <Header />
      <div className={styles.wrapper}>
        <LoginForm />
        <div>
          <img src={cube} alt="cube" className={styles.picture} />
        </div>
      </div>
    </div>
  );
};

export default Login;
