import React from "react";
import {ButtonProps} from "../types.ts";

const Button: React.FC<ButtonProps> = (
  {
    type = "button",
    onClick,
    children,
    className = "",
    disabled = false,
  }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`reusable-button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
