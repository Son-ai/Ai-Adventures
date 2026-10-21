"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        Adventure World
      </Link>

      <nav className="nav" aria-label="Main">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
