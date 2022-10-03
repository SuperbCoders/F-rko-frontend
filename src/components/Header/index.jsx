import React from "react";
import logo from "./../../assets/img/logo.svg";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" width={166} height={38} />
    </header>
  );
};

export default Header;
