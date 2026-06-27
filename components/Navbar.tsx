"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
  { label: "Pricing", href: "/subscriptions" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <header className="w-full fixed z-50 bg-white border-b border-[var(--border-subtle)] backdrop-blur-sm bg-white/80">
      <div className="wrapper navbar-height py-0 flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
          <Image src="/assets/logo.png" alt="Bookfied" width={32} height={24} />
          <span className="logo-text">Bookified</span>
        </Link>

        <nav className="w-fit flex gap-8 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "",
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex gap-4 items-center pl-4 border-l border-[var(--border-subtle)]">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href="/subscriptions" className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
