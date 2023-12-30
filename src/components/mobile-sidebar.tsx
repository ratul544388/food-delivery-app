"use client";

import { FullCartTypes } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavLinks } from "@/hooks/use-nav-links";
import { cn } from "@/lib/utils";
import { Logo } from "./header/logo";
import LoadingButton from "./loading-button";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface CartProps {
  cartItems?: FullCartTypes[];
  currentUser: User | null;
}

export const MobileSidebar = ({ cartItems, currentUser }: CartProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isActive, navLinks } = useNavLinks({
    currentUser,
  });

  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.food.price * item.count;
  }, 0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (totalPrice) {
      setTotal(totalPrice);
    }
  }, [totalPrice]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const orderItems =
        cartItems?.map((item) => ({
          foodId: item.foodId,
          quantity: item.count,
        })) || [];
      const { data } = await axios.post("api/checkout", {
        orderItems,
      });
      window.location.assign(data.url);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleTrigger = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={handleTrigger}>
      <SheetTrigger asChild className="sm:hidden" onClick={handleTrigger}>
        <Button size="icon" className="relative" variant="ghost">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 py-3 flex flex-col h-full">
        <SheetHeader>
          <Logo className="ml-10" />
        </SheetHeader>
        <div className="mt-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                "pl-10 relative flex items-center gap-4 py-3 hover:bg-primary/5 font-medium",
                isActive(link.href) && "bg-primary/5 font-semibold"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
              <div
                className={cn(
                  "absolute right-0 h-full w-[5px] bg-primary rounded-full hidden",
                  isActive(link.href) && "block"
                )}
              />
            </Link>
          ))}
        </div>
        {!!cartItems?.length && (
          <SheetFooter className="flex items-center gap-3 pr-4">
            <div className="font-semibold flex gap-2">
              Total:
              <p className="text-primary">${total?.toFixed(2)}</p>
            </div>
            <LoadingButton
              label="Checkout"
              loadingLabel="Checking out..."
              onClick={() => mutate()}
              isLoading={isPending}
              className="ml-auto"
            />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
