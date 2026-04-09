"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import NavLink from "@/app/components/ui/NavLink";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

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
        {/* Logo */}
        <h1
          className={clsx(
            "font-bold text-blue-600 transition-all",
            scrolled ? "text-lg" : "text-2xl",
          )}
        >
          <NavLink href="/products">MyShop</NavLink>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>

          {/* Cart */}
          <div className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </nav>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-60" : "max-h-0",
        )}
      >
        <div className="px-6 pb-4 flex flex-col gap-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>
      </div>
    </header>
  );
}
