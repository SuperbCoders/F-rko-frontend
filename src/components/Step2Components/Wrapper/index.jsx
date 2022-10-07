import React, { useEffect, useRef, useState } from "react";

const Wrapper = ({ headElement, children, ...props }) => {
  const refDiv = useRef(null);
  const [showContent, setShowContent] = useState(true);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (refDiv.current) setHeight(refDiv.current.offsetHeight);
  }, []);

  return (
    <div>
      <span onClick={() => setShowContent((prevState) => !prevState)}>
        {headElement}
      </span>
      <div
        style={{
          transition: ".25s",
          height: showContent ? height : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
