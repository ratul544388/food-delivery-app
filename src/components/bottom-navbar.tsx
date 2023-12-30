"use client";

import { useNavLinks } from "@/hooks/use-nav-links";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { ListOrdered } from "lucide-react";
import Link from "next/link";

interface BottomNavbarProps {
  currentUser: User | null;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ currentUser }) => {
  const { isActive, navLinks, isAdminRoute } = useNavLinks({ currentUser });

  return (
    <div className="fixed z-[100] xs:hidden py-1.5 px-3 flex items-center justify-between inset-x-0 bottom-0 bg-background">
      {navLinks.map((link) => (
        <Link
          href={link.href}
          key={link.label}
          className={cn(
            "rounded-full p-2.5 px-4 hover:bg-primary/5 transition-colors",
            isActive(link.href) && "text-primary bg-primary/5"
          )}
        >
          <link.icon className="h-6 w-6" />
        </Link>
      ))}
      {!isAdminRoute && (
        <Link
          href="/my-orders"
          className={cn(
            "rounded-full p-2.5 px-4 hover:bg-primary/5 transition-colors",
            isActive("/my-orders") && "text-primary bg-primary/5"
          )}
        >
          <ListOrdered className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
};

export default BottomNavbar;
