"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Heading from "@/app/components/ui/Heading";

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  scrollable?: boolean;
};

export default function FilterAccordion({
  title,
  children,
  defaultOpen = true,
  scrollable = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-t-xl group">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left bg-slate-50 px-4 py-2 group-first:rounded-t-xl border-b border-gray-200"
      >
        <Heading as="h4" className="capitalize" children={title} />

        <ChevronDown
          size={18}
          className={clsx(
            "transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={clsx(
          "grid px-4 transition-all duration-300 ease-in-out",
          open
            ? "grid-rows-[1fr] opacity-100 my-4"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div
          className={clsx(
            "overflow-hidden",
            scrollable && "max-h-64 overflow-y-auto pr-2 custom-scrollbar",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
