import React from "react";
import clsx from "clsx";

type BadgeProps = {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  className,
}) => {
  const variantStyles: Record<string, string> = {
    primary: "bg-blue-100 text-blue-700",
    secondary: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 text-sm font-medium rounded-full",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
