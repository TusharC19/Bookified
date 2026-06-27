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
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-600"
          >
            <path d="M 50 40 L 100 40 L 100 160 L 50 160 Q 40 150 40 100 Q 40 50 50 40" fill="currentColor" opacity="0.2"/>
            <path d="M 150 40 L 100 40 L 100 160 L 150 160 Q 160 150 160 100 Q 160 50 150 40" fill="currentColor"/>
            <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="100" cy="75" r="7" fill="currentColor"/>
            <rect x="96" y="82" width="8" height="12" rx="2" fill="currentColor"/>
            <path d="M 100 55 Q 117 55 117 75 Q 117 95 100 95" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 100 45 Q 132 45 132 75 Q 132 105 100 105" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
            <circle cx="85" cy="130" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="100" cy="135" r="3" fill="currentColor" opacity="0.5"/>
            <circle cx="115" cy="130" r="3" fill="currentColor" opacity="0.5"/>
          </svg>
          <span className="logo-text">VoiceRead</span>
        </Link>

        <nav className="w-fit flex gap-7.5 items-center">
          {navItems.map(({ label, href }) => {
            const isActive =
              pathName === href || (href !== "/" && pathName.startsWith(href));

            return (
              <Link
                href={href}
                key={label}
                className={cn(
                  "nav-link-base",
                  isActive ? "nav-link-active" : "text-black hover:opacity-70",
                )}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex gap-7.5 items-center">
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
