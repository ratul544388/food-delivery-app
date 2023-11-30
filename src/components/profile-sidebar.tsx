"use client";

import { User } from "@prisma/client";

import { useNavLinks } from "@/hooks/use-nav-links";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Logo from "./header/logo";
import Icon from "./icon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Photo from "./photo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface ProfileSidebarProps {
  currentUser: User;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ currentUser }) => {
  const { isActive, navLinks } = useNavLinks({ currentUser });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="block xs:hidden p-1.5 rounded-full hover:bg-primary/5 transition-colors">
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetTrigger className="w-fit h-fit">
          <Photo
            photo={currentUser?.imageUrl}
            className="min-w-[25px] aspect-square rounded-full"
          />
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col p-0 gap-3 py-2">
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <Photo
                photo={currentUser.imageUrl}
                className="max-w-[40px] aspect-square rounded-full"
              />
              <div className="flex flex-col line-clamp-1">
                <h1 className="line-clamp-1">{currentUser.email}</h1>
                <p className="text-muted-foreground font-normal line-clamp-1">
                  {currentUser.name}
                </p>
              </div>
            </div>
            <Separator />
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

export default ProfileSidebar;
