"use client";

import { FullCartTypes } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartItem from "../cart-item";
import LoadingButton from "../loading-button";
import Photo from "../photo";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

interface CartProps {
  cartItems?: FullCartTypes[];
  currentUser: User | null;
}

export const Cart = ({ cartItems, currentUser }: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.food.price * item.count;
  }, 0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (totalPrice) {
      setTotal(totalPrice);
    }
  }, [totalPrice]);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const orderItems =
        cartItems?.map((item) => ({
          foodId: item.foodId,
          quantity: item.count,
        })) || [];
      if (cartItems) {
        const { data } = await axios.post("/api/checkout", {
          orderItems,
        });
        window.location.assign(data);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="relative" variant="ghost">
          <ShoppingCart className="h-5 w-5" />
          <div className="h-[18px] w-[18px] absolute top-0 right-0 rounded-full bg-primary text-white">
            {cartItems?.length || 0}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 py-3 flex flex-col h-full">
        <SheetHeader className="flex flex-col gap-1 items-center">
          <div className="flex gap-1 text-primary font-bold">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </div>
          <Separator />
        </SheetHeader>
        <div className="flex flex-col flex-grow">
          {!!!cartItems?.length && (
            <div className="flex flex-col gap-3 my-auto w-full items-center">
              <Photo
                photo="/images/empty-cart.png"
                className="max-w-[60%] mt-auto aspect-square"
              />

              {currentUser ? (
                <p className="text-muted-foreground">
                  Your food cart is hungry. Fill it up!
                </p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-3">
                    <Link href="/sign-in" className={buttonVariants()}>
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className={buttonVariants({
                        variant: "outline",
                      })}
                    >
                      Sign up
                    </Link>
                  </div>
                  <p className="text-muted-foreground">
                    Sign in or create a new account
                  </p>
                </div>
              )}
            </div>
          )}
          <ScrollArea className="flex flex-col  max-h-[75vh]">
            {cartItems?.map((item) => (
              <CartItem
                onTotalChange={(value) => {
                  setTotal(value);
                }}
                key={item.id}
                cartItem={item}
                total={total}
              />
            ))}
          </ScrollArea>
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
              onClick={handleCheckout}
              isLoading={isLoading}
              className="ml-auto"
            />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
