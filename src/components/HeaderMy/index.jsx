import React from "react";
import logo from "./../../assets/img/logo.svg";
import styles from "./styles.module.scss";
import classNames from "classnames";

const HeaderMy = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <img
          className={styles.header__logo}
          src={logo}
          alt="logo"
          width={166}
          height={38}
        />
      </div>
      <div className={styles.header__right}>
        <a
          className={classNames(styles.text, styles.phone)}
          href="tel:8-800-900-90-02"
        >
          +7 903 123-45-67
        </a>
        <button className={styles.button}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
              stroke="#949BA0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17L21 12L16 7"
              stroke="#949BA0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="#949BA0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HeaderMy;
