import React, { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const CheckBoxRS = ({ size = "small", ...props }) => {
  const [isActive, setActive] = useState(false);
  const isSmall = size === "small";
  const isMedium = size === "medium";
  const addClass = isSmall ? styles.small : isMedium ? styles.medium : null;
  const svgSizes = {
    width: "8",
    height: "6",
  };

  return (
    <div
      className={styles.checkbox__wrapper}
      onClick={() => setActive((prevState) => !prevState)}
      {...props}
    >
      <div
        className={classNames(
          styles.checkbox,
          addClass,
          isActive && styles.active
        )}
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
    </div>
  );
};

export default CheckBoxRS;
