import React from 'react';
import styles from "./styles.module.scss";

const DownloadButton = ({ addFile }) => {
  const refInput = React.useRef();
  const onChange = (e) => {
    if (e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  }

  return (
    <label className={styles.button_add}>
      <input
        ref={refInput}
        type="file"
        style={{ height: 0, width: 0 }}
        onChange={onChange}
      />
      <p>Загрузить документ</p>
      <span className={styles.icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12V16C10 17.6569 11.3431 19 13 19C14.6569 19 16 17.6569 16 16V9.5C16 7.01472 13.9853 5 11.5 5C9.01472 5 7 7.01472 7 9.5V15M13 15V9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5V14.4545"
            stroke="#323E48"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
};
export default DownloadButton
