"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FullCartTypes } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartItem from "../cart-item";
import { Button } from "../ui/button";
import { checkOut } from "@/actions/checkout";
import toast from "react-hot-toast";
import LoadingButton from "../loading-button";
import axios from "axios";
import { Separator } from "../ui/separator";
import Photo from "../photo";

interface CartProps {
  cartItems?: FullCartTypes[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cartItems?.reduce((total, item) => {
    return total + item.food.price * item.count;
  }, 0);

  const [total, setTotal] = useState(totalPrice || 0);

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
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild className="">
        <Button size="icon" variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <div className="h-[18px] w-[18px] absolute top-0 right-0 rounded-full bg-primary text-white">
            {cartItems?.length || 0}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex p-0 pt-10 flex-col gap-3">
        <div className="flex flex-col grow w-full">
          <div className="flex items-center gap-2 text-muted-foreground justify-center">
            <ShoppingCart className="h-4 w-4" />
            <h1 className="font-semibold">Cart</h1>
          </div>
          <Separator className="mt-1 mb-4" />
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
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
