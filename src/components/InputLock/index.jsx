import React from 'react';
import styles from "./styles.module.scss";
import classNames from "classnames";

const IconLock = () => 
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z"
      stroke="#ADB2B6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.6665 7.33337V4.66671C4.6665 3.78265 5.01769 2.93481 5.64281 2.30968C6.26794 1.68456 7.11578 1.33337 7.99984 1.33337C8.88389 1.33337 9.73174 1.68456 10.3569 2.30968C10.982 2.93481 11.3332 3.78265 11.3332 4.66671V7.33337"
      stroke="#ADB2B6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

const InputLock = ({ name, value="" }) => {
  return (
    <div className={styles.input__wrapper}>
      <p className={styles.name}>{name}</p>
      <input
        type="text"
        value={value}
        className={classNames(styles.input, styles.locked)}
        onChange={() => {}}
      />
      <span className={styles.lock}>
        <IconLock />
      </span>
    </div>
  );
};

export default InputLock
