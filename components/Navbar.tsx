"use client";

import Link from "next/link";
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

const VoiceReadLogo = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    {/* Book left page */}
    <path 
      d="M 25 15 L 50 15 L 50 85 L 25 85 Q 18 78 18 50 Q 18 22 25 15" 
      fill="#0071e3" 
      opacity="0.25"
    />
    
    {/* Book right page */}
    <path 
      d="M 75 15 L 50 15 L 50 85 L 75 85 Q 82 78 82 50 Q 82 22 75 15" 
      fill="#0071e3"
    />
    
    {/* Microphone dot */}
    <circle cx="50" cy="38" r="3.5" fill="#0071e3"/>
    
    {/* Microphone base */}
    <rect x="47" y="42" width="6" height="6" rx="1" fill="#0071e3"/>
    
    {/* Sound wave 1 */}
    <path 
      d="M 50 28 Q 60 28 60 38 Q 60 48 50 48" 
      stroke="#0071e3" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinecap="round"
    />
    
    {/* Sound wave 2 */}
    <path 
      d="M 50 22 Q 66 22 66 38 Q 66 54 50 54" 
      stroke="#0071e3" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinecap="round" 
      opacity="0.5"
    />
  </svg>
);

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();

  return (
    <header className="w-full fixed z-50 bg-(--bg-primary)">
      <div className="wrapper navbar-height py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-2.5 items-center hover:opacity-80 transition-opacity">
          <VoiceReadLogo />
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
