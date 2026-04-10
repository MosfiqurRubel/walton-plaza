"use client";

import React from "react";

type InputProps = {
  name: string;
  type?: "text" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  name = "",
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  className = "",
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={(e) => onBlur?.(e.target.value)}
      className={`border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;
