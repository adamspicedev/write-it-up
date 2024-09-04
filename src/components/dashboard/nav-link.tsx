"use client";

import { NavLink as NavLinkType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  link: NavLinkType;
}

const NavLink = ({ link }: NavLinkProps) => {
  const pathName = usePathname();
  return (
    <Link
      href={link.href}
      className={cn(
        "hover:text-primary/70 flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        pathName === link.href
          ? "bg-muted text-primary"
          : "text-muted-foreground bg-none",
      )}
    >
      {link.icon}
      {link.name}
    </Link>
  );
};

export default NavLink;
