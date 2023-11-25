"use client";

import Icon from "@/components/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserWithCart } from "@/types";
import { Food, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BsCart, BsCartFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";

interface FoodCardProps {
  food: Food;
  currentUser: UserWithCart | null;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, currentUser }) => {
  const router = useRouter();

  const isAddedToCart = currentUser?.cartItems.some(
    (item) => item.foodId === food.id
  );

  const handleAddedToCart = async () => {
    if (currentUser) {
      try {
        if (isAddedToCart) {
          const userCart = currentUser.cartItems.find(
            (item) => item.foodId === food.id
          );
          await axios.delete(`/api/food/${food.id}/cart/${userCart?.id}`);
          toast.success("Item has been removed from cart");
        } else {
          await axios.post(`/api/food/${food.id}/cart`, {
            count: 1,
          });
          toast.success("Item was added to cart");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
    }
  };

  return (
    <div className="bg-background shadow-md rounded-xl overflow-hidden flex flex-col gap-2 pb-2">
      <div className="w-full aspect-[6/5] relative">
        <Image src={food.photo} alt="image" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2 px-3">
        <div className="flex justify-between w-full items-center gap-1">
          <h1 className="font-semibold capitalize line-clamp-1">{food.name}</h1>
          <div className="flex items-center gap-1 text-primary">
            <FaStar className="h-4 w-4" />
            5.0
          </div>
        </div>
        <h1 className="font-bold text-primary">${food.price}</h1>
        <div className="flex items-center justify-between">
          <Link href={`/menu/${food.id}`} className={buttonVariants()}>
            View item
          </Link>
          <Button
            onClick={handleAddedToCart}
            variant="secondary"
            size="icon"
            className="boder-[1.5px]"
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

export default FoodCard;
