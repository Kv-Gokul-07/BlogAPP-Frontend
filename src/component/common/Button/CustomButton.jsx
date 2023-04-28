import React from "react";
import "./CustomButton.scss";

const CustomButton = ({
  name,
  type,
  disabled,
  outline,
  onClick,
  btnSize,
  btnColor,
  btnClass,
}) => {
  let buttonClass = "";

  const tempArray = [];
  if (disabled) {
    tempArray.push("disabled-btn");
  }
  if (outline) {
    tempArray.push("outline-btn");
  }
  if (btnSize !== "") {
    tempArray.push(btnSize);
  }
  if (btnColor !== "") {
    tempArray.push(btnColor);
  }
  if (btnClass?.length > 0) {
    buttonClass = tempArray.push(btnClass);
  }
  if (tempArray.length > 0) {
    buttonClass = tempArray.join(" ");
  }

  return (
    <div className={`custom_button ${btnSize} ${btnClass} ${outline}`}>
      <button
        className={`Button normal-btn ${buttonClass}`}
        disabled={disabled}
        onClick={onClick}
      >
        <span className="btn-text">{name}</span>
      </button>
    </div>
  );
};

export default CustomButton;
