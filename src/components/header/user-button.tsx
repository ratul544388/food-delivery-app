"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import Avatar from "../avatar";
import { ListOrdered, LogOut, Shield, User2, UserPlus2 } from "lucide-react";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function UserButton({ currentUser }: { currentUser: User | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const adminRoutes = ["dashboard", "cuisines", "orders"];
  const onAdminRoute = adminRoutes.some((route) => pathname.includes(route));

  const handleClick = (onClick: () => void) => {
    onClick();
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button className="h-fit w-fit p-2 rounded-full" variant="ghost">
          <Avatar image={currentUser?.imageUrl} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-72 p-0 text-sm font-semibold", !currentUser && "w-36")}
        align="end"
      >
        {currentUser ? (
          <>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <Avatar image={currentUser.imageUrl} className="h-8 w-8" />
              <div className="flex flex-col line-clamp-1">
                <h1 className="line-clamp-1">{currentUser.email}</h1>
                <p className="text-muted-foreground font-normal line-clamp-1">
                  {currentUser.name}
                </p>
              </div>
            </div>
            <div
              onClick={() => handleClick(() => router.push("/orders"))}
              className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
            >
              <ListOrdered className="h-4 w-4" />
              My orders
            </div>
            {currentUser.isAdmin && onAdminRoute ? (
              <div
                onClick={() => handleClick(() => router.push("/"))}
                className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
              >
                <Shield className="h-4 w-4" />
                Exit From Admin
              </div>
            ) : (
              <div
                onClick={() =>
                  handleClick(() => router.push("admin/dashboard"))
                }
                className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
              >
                <Shield className="h-4 w-4" />
                Admin
              </div>
            )}
            <SignOutButton>
              <div
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </div>
            </SignOutButton>
          </>
        ) : (
          <>
            <div
              onClick={() => handleClick(() => router.push("/sign-in"))}
              className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
            >
              <User2 className="h-4 w-4" />
              Log in
            </div>
            <div
              onClick={() => handleClick(() => router.push("/sign-up"))}
              className="px-3 py-2.5 cursor-pointer flex items-center gap-2 hover:bg-accent"
            >
              <UserPlus2 className="h-4 w-4" />
              Sign up
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
