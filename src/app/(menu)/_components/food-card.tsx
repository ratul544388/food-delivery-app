"use client";

import Photo from "@/components/photo";
import Star from "@/components/star";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@/hooks/use-mutation";
import { cn } from "@/lib/utils";
import { UserWithCart } from "@/types";
import { Food } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";

interface FoodCardProps {
  food: Food;
  currentUser: UserWithCart | null;
  queryKey: string;
  className?: string;
}

export const FoodCard = ({
  food,
  currentUser,
  queryKey,
  className,
}: FoodCardProps) => {
  const router = useRouter();
  const isAddedToCart = currentUser?.cartItems.some(
    (item) => item.foodId === food.id
  );

  const cartItem = currentUser?.cartItems.find(
    (item) => item.foodId === food.id
  );

  const { mutate, isPending } = useMutation({
    method: isAddedToCart ? "delete" : "post",
    api: isAddedToCart ? `/api/cart-items/${cartItem?.id}` : `/api/cart-items/`,
    data: { foodId: food.id, count: 1 },
    queryKey,
    refresh: true,
    success: isAddedToCart
      ? "Item removed from cart"
      : "Item was added to cart",
  });

  return (
    <div
      onClick={() => router.push(`/menu/${food.id}`)}
      className={cn(
        "bg-background text-sm min-w-[200px] shadow-md rounded-xl overflow-hidden flex flex-col gap-2 pb-2",
        className
      )}
    >
      <Photo photo={food.photo} size="MD" className="min-w-full" />
      <div className="flex flex-col px-3">
        <h1 className="font-semibold capitalize h-10 mt-1 line-clamp-2">
          {food.name}
        </h1>

        <Star value={food.avgRating} className="" viewOnly />
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base text-primary">${food.price}</h1>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              mutate();
            }}
            disabled={isPending}
            variant="ghost"
            size="icon"
            className="boder-[1.5px] hover:text-primary"
          >
            {isAddedToCart ? (
              <BsFillCartCheckFill className="h-4 w-4 text-primary" />
            ) : (
              <BsCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

FoodCard.Skeleton = function FoodCardSkeleton() {
  return (
    <div className="min-w-[180px] w-full border rounded-xl overflow-hidden">
      <Skeleton className="w-full aspect-[6/5]" />
      <div className="w-full h-full p-3 space-y-3">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-1/2 h-6 mt-2" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
