"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Signage", href: "/category/outdoor-signage" },
  { name: "Corporate", href: "/category/corporate-stationery" },
  { name: "Premium", href: "/category/premium-acrylic" },
  { name: "Decor", href: "/category/interior-decor" },
  { name: "Awards", href: "/category/recognition-events" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         
          <span className="font-serif text-4xl font-normal tracking-tight">
            <span className="text-[#362F8F]">S</span><span className="text-red-500">B</span><span className="text-[#362F8F]">A</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <div
              className={cn(
                "flex items-center transition-all duration-300",
                searchOpen ? "w-64" : "w-10"
              )}
            >
              {searchOpen && (
                <Input
                  type="text"
                  placeholder="Search signage, vinyl..."
                  className="pr-10 bg-secondary border-0"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2 rounded-full hover:bg-secondary transition-colors",
                  searchOpen && "absolute right-0"
                )}
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Login */}
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-2 bg-background border-t border-border">
          {/* Mobile search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search signage, vinyl..."
              className="pl-10 bg-secondary border-0"
            />
          </div>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-base font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full justify-center gap-2">
              <User className="h-4 w-4" />
              <span>Login / Sign up</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
