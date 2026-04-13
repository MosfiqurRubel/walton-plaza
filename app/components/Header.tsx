"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import NavLink from "@/app/components/ui/NavLink";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import CartCount from "./product/CartCount";
import Link from "next/link";
// import CartCount from "./CartCount";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-white py-4",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <h1
          className={clsx(
            "font-bold text-sky-900 transition-all",
            scrolled ? "text-lg" : "text-2xl",
          )}
        >
          <NavLink href="/home">MyShop</NavLink>
        </h1>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>

          <Link href="/cart">
            <CartCount />
          </Link>
        </nav>

        <Button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          icon={open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          override
        />
      </div>

      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-60" : "max-h-0",
        )}
      >
        <div className="px-6 pb-4 flex flex-col items-center gap-4">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>

          <Link href="/cart">
            <CartCount />
          </Link>
        </div>
      </div>
    </header>
  );
}
