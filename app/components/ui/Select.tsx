"use client";

import React from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  name: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  name = "",
  options,
  value,
  // placeholder = "Select",
  disabled = false,
  onChange,
  className = "",
}) => {
  return (
    <select
      name={name}
      value={value ?? ""}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={clsx(
        "px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        className,
      )}
    >
      {/* <option value="" disabled>
        {placeholder}
      </option> */}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

// "use client";
// import React from "react";
// import clsx from "clsx";

// type Option = {
//   value: string;
//   label: string;
// };

// type SelectProps = {
//   options: Option[];
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   className?: string;
// };

// const Select: React.FC<SelectProps> = ({
//   options,
//   value,
//   onChange,
//   // placeholder = "Select an option",
//   className,
// }) => {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className={clsx(
//         "px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
//         className,
//       )}
//     >
//       {/* <option value="" disabled>
//         {placeholder}
//       </option> */}
//       {options.map((opt) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;
