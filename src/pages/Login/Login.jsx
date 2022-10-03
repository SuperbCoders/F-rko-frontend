import React from "react";
import LoginForm from "../../components/LoginForm";
import cube from "../../assets/img/cube.png";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
      <div>
        <img src={cube} alt="cube" className={styles.picture} />
      </div>
    </div>
  );
};

export default Login;
