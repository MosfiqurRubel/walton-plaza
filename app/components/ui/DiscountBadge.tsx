import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Icon from "@/public/icons-favorites.webp";

type DiscountBadgeProps = {
  value: number;
  className?: string;
};

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ value, className }) => {
  return (
    <div className={clsx("w-14 h-13.5 relative overflow-hidden", className)}>
      <Image
        src={Icon}
        alt={`${value}% off badge`}
        fill
        sizes="56px"
        className="w-full h-full object-contain"
      />

      <span className="absolute inset-0 text-white font-bold text-sm uppercase leading-none pt-2 px-1.5">
        {value}% <b className="inline-block text-[9px] font-normal">off</b>
      </span>
    </div>
  );
};

export default DiscountBadge;
