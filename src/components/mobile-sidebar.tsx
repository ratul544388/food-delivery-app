"use client";

import { User } from "@prisma/client";

import { useNavLinks } from "@/app/hooks/use-nav-links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Logo from "./header/logo";
import Icon from "./icon";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {
  currentUser: User | null;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ currentUser }) => {
  const { isActive, navLinks } = useNavLinks({ currentUser });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="block sm:hidden">
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetTrigger asChild className="w-fit h-fit">
          <Icon icon={Menu} />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 gap-3 py-2">
          <Logo currentUser={currentUser} className="ml-10" />
          <div className="flex flex-col mt-5">
            {navLinks.map((link) => (
              <div
              key={link.label}
                onClick={() => handleClick(link.href)}
                className={cn(
                  "pl-10 relative py-2.5 hover:bg-primary/5 cursor-pointer",
                  isActive(link.href) && "bg-primary/5"
                )}
              >
                <h1
                  className={cn(
                    "font-semibold opacity-80",
                    isActive(link.href) && "opacity-100"
                  )}
                >
                  {link.label}
                </h1>
                <div
                  className={cn(
                    "h-full w-[5px] bg-primary absolute rounded-full right-0 top-0 hidden",
                    isActive(link.href) && "block"
                  )}
                />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
