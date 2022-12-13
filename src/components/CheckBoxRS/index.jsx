import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const CheckBoxRS = ({
  size = "small",
  children,
  isError=false,
  isChecked = false,
  isCheckStart = false,
  onChange,
  required=false,
  ...props
}) => {
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const addClass = isSmall ? styles.small : isMedium ? styles.medium : null;

  return (
    <label
      className={classNames(
        styles.checkbox__wrapper,
        isCheckStart && styles.start_check
      )}
      {...props}
    >
      <input 
        checked={isChecked}
        type="checkbox"
        className={styles.checkbox__real}
        required={required}
        onChange={onChange}
      />
      <div className={classNames(
          styles.checkbox,
          addClass,
          isChecked && styles.active,
          isError && styles.error
        )}
      >
        {isChecked && (
          <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="8px"
            height="6px"
          >
            <path
              d="M0.499023 3.27778L3.19133 5.5L7.49902 0.5"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {children}
    </label>
  );
};

export default CheckBoxRS;
