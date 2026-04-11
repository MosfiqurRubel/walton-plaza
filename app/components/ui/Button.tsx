import React, { ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  override?: boolean;
  weight?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  icon,
  className,
  override = false,
  weight,
}) => {
  const baseStyles: Record<ButtonSize, string> = {
    small: "px-3 py-1 text-sm sm:px-4 sm:py-2",
    medium: "px-4 py-1.5 text-base sm:px-6 sm:py-2",
    large: "px-6 py-3 text-lg sm:px-8 sm:py-4",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-600 text-white hover:bg-yellow-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        override
          ? className
          : [
              "inline-flex items-center justify-center align-middle rounded-md transition",
              baseStyles[size],
              variantStyles[variant],
              weight,
              disabled && "opacity-50 cursor-not-allowed",
              className,
            ],
      )}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
