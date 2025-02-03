import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const MenuPortal = ({ triggerRef, children }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (triggerRef && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setIsLoaded(true);
    }
  }, [triggerRef]);

  if (!isLoaded) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 999,
        backgroundColor: "#011627",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        maxHeight: "12em",
        overflowY: "auto",
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default MenuPortal;
