"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FullCartTypes } from "@/types";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import CartItem from "../cart-item";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import LoadingButton from "../loading-button";
import axios from "axios";
import { Separator } from "../ui/separator";
import Photo from "../photo";
import { cn } from "@/lib/utils";
import Icon from "../icon";

interface CartProps {
  cartItems?: FullCartTypes[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [open, setOpen] = useState(false);
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
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        variant="ghost"
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        <div className="h-[18px] w-[18px] absolute top-0 right-0 rounded-full bg-primary text-white">
          {cartItems?.length || 0}
        </div>
      </Button>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 backdrop-blur-sm pointer-events-none opacity-0 transition-opacity duration-500 z-[80]",
          open && "pointer-events-auto opacity-100"
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-background flex flex-col absolute w-screen max-w-[500px] xs:w-[60vw] inset-y-0 right-0 border-l-[1.5px] transition-all duration-500 translate-x-full",
            open && "translate-x-0 "
          )}
        >
          <div className="flex relative py-3 px-2 border-b-[1.5px] items-center justify-center">
            <Icon
              onClick={() => setOpen(false)}
              icon={X}
              className="absolute left-5 xs:left-2 text-primary border-none"
              iconSize={22}
            />
            <div className="flex items-center gap-2 text-muted-foreground justify-center">
              <ShoppingCart className="h-4 w-4" />
              <h1 className="font-semibold">Cart</h1>
            </div>
          </div>
          <div className="flex flex-col grow w-full">
            {cartItems?.length === 0 && (
              <div className="flex flex-col gap-3 mt-auto w-full items-center mb-20">
                <Photo
                  photo="/images/empty-cart.png"
                  className="max-w-[60%] mt-auto aspect-square"
                />
                <p className="text-muted-foreground">
                  Your food cart is hungry. Fill it up!
                </p>
              </div>
            )}
            <div className="flex flex-col overflow-y-auto max-h-[75vh]">
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
            </div>
          </div>
          {!!cartItems?.length && (
            <div className="sticky flex items-center justify-between gap-1 bottom-0 inset-x-0 p-4">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
