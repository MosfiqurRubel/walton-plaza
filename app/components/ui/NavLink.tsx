"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "relative transition-colors",
        pathname === href
          ? "text-blue-600 font-semibold"
          : "hover:text-blue-600",
      )}
    >
      {children}
    </Link>
  );
}
