import React from "react";
import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: React.ReactNode;
  className?: string;
  override?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  size?: string;
  weight?: string;
  align?: string;
};

const Heading: React.FC<HeadingProps> = ({
  as = "p",
  children,
  className,
  override = false,
  variant = "secondary",
  size,
  weight,
  align,
}) => {
  const Tag = as;

  const baseStyles: Record<string, string> = {
    h1: "text-2xl font-extrabold",
    h2: "text-xl font-bold",
    h3: "text-lg font-semibold",
    h4: "text-base font-semibold",
    h5: "text-sm font-medium",
    h6: "text-xs font-medium",
    p: "text-sm",
  };

  const variantStyles: Record<string, string> = {
    primary: "text-blue-600",
    secondary: "text-gray-800 dark:text-gray-200",
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600",
  };

  return (
    <Tag
      className={clsx(
        override
          ? className
          : [
              baseStyles[as],
              variantStyles[variant],
              size,
              weight,
              align,
              className,
            ],
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
