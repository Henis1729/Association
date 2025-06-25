import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`transition-colors duration-200 px-4 py-2 rounded-xl font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
