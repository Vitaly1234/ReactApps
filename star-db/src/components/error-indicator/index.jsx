import React from "react";
import s from "./error-indicator.module.scss";

const ErrorIndicator = () => {
  return (
    <div className={s["error-indicator"]}>
      <span className={s.boom}>BOOM!</span>
      <span>something has gone wrong</span>
      <span>(but we already sent droids to fix it)</span>
    </div>
  );
};

export default ErrorIndicator;
