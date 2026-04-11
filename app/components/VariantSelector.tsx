"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Heading from "@/app/components/ui/Heading";

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
    <div className="space-y-2">
      <Heading as="h4" className="capitalize" children="Select Variant:" />
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
        <Heading
          as="p"
          className="mt-3"
          variant="success"
          weight="font-medium"
          children={`Selected: ${selected}`}
        />
      )}
    </div>
  );
};

export default VariantSelector;
