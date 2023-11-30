"use client";
import { useNavLinks } from "@/hooks/use-nav-links";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";

const NavLinks = ({ currentUser }: { currentUser: User | null }) => {
  const { navLinks, isActive } = useNavLinks({ currentUser });

  return (
    <div className="sm:flex hidden items-center gap-6">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn("relative group font-semibold")}
        >
          <p
            className={cn(
              "text-muted-foreground group-hover:text-foreground transition-colors duration-300",
              isActive(link.href.toLowerCase()) && "text-foreground"
            )}
          >
            {link.label}
          </p>
          <div
            className={cn(
              "w-0 h-1 transition-all duration-300 bg-primary absolute rounded-full",
              isActive(link.href.toLowerCase()) && "w-full"
            )}
          />
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
