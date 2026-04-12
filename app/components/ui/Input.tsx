"use client";

import React from "react";

type InputProps = {
  name: string;
  type?: "text" | "number";
  placeholder?: string;
  defaultValue?: string | number;
  onBlur?: (value: string) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  defaultValue,
  onBlur,
  className = "",
}) => {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      onBlur={(e) => onBlur?.(e.target.value)}
      className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${className}`}
    />
  );
};

export default Input;
