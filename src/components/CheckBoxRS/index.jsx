import React, { useState } from "react";
import styles from "./styles.module.scss";

const CheckBoxRS = ({ size = "small", title = null }) => {
  const [isActive, setActive] = useState(false);
  const isSmall = size === "small";
  const addClass = isSmall && styles.small;
  const svgSizes = {
    width: "8",
    height: "6",
  };

  return (
    <div
      className={styles.checkbox__wrapper}
      onClick={() => setActive((prevState) => !prevState)}
    >
      <div
        className={`${styles.checkbox} ${addClass} ${
          isActive ? styles.active : ""
        }`}
      >
        {isActive && (
          <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={`${svgSizes.width}px`}
            height={`${svgSizes.height}px`}
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
      {title && <p className={styles.checkbox__name}>{title}</p>}
    </div>
  );
};

export default CheckBoxRS;
