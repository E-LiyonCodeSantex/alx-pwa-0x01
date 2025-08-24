import React from "react";

interface ButtonProps {
  title: string;
  action?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  action,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={action}
      disabled={disabled}
      className={`bg-[#E2D609] text-black font-semibold py-2 px-6 rounded-full transition duration-200 hover:bg-[#cfc107] focus:outline-none focus:ring-2 focus:ring-[#E2D609] ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;