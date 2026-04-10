"use client";
import React, { useState } from "react";
import clsx from "clsx";

type VariantSelectorProps = {
  variants: string[];
  onSelect?: (variant: string) => void;
};

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  onSelect,
}) => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (variant: string) => {
    setSelected(variant);
    if (onSelect) onSelect(variant);
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Select Variant:</h3>
      <div className="flex gap-3 flex-wrap">
        {variants.map((variant) => (
          <button
            key={variant}
            onClick={() => handleSelect(variant)}
            className={clsx(
              "px-4 py-2 border rounded-md transition-colors duration-200",
              selected === variant
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-blue-100",
            )}
          >
            {variant}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-3 text-green-600 font-medium">Selected: {selected}</p>
      )}
    </div>
  );
};

export default VariantSelector;
