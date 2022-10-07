import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Wrapper = ({ headElement, children, ...props }) => {
  const refDiv = useRef(null);
  const [showContent, setShowContent] = useState(true);

  return (
    <div {...props}>
      <span
        className={styles.name}
        onClick={() => {
          setShowContent((prevState) => !prevState);
        }}
      >
        {headElement}
        <span
          className={classNames(styles.icon, !showContent && styles.active)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15L12 9L6 15"
              stroke="#8E909B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <div
        ref={refDiv}
        style={{
          overflow: "hidden",
          transition: ".9s",
          maxHeight: showContent ? 1500 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
