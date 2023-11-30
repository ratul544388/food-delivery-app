"use client";

import Counter from "@/components/counter";
import { FoodSlider } from "@/components/food-slider";
import Photo from "@/components/photo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FoodDescription from "./food-description";
import { Food, Order, OrderItem, User } from "@prisma/client";
import FoodReviews from "./food-reviews";
import { FoodWithReview, FullOrderType, UserWithOrders } from "@/types";
import Star from "@/components/star";
import { useModal } from "@/hooks/use-modal-store";
import { redirectToSignIn } from "@clerk/nextjs";

interface FoodInfoProps {
  food: FoodWithReview;
  currentUser: UserWithOrders | null;
}

const FoodInfo: React.FC<FoodInfoProps> = ({ food, currentUser }) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const { onOpen } = useModal();

  const handleAddToCart = async () => {
    if (!currentUser) {
      return router.push("/sign-in");
    }
    setLoading(true);
    try {
      await axios.post(`/api/cart-items`, {
        foodId: food.id,
        count,
      });
      setCount(1);
      toast.success("Added to cart");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    if (!currentUser) {
      return router.push("/sign-in");
    }

    if (currentUser && (!currentUser?.address || !currentUser?.phone)) {
      return onOpen("ADDRESS_MODAL", { user: currentUser });
    }

    setOrdering(true);
    const orderItems = [
      {
        foodId: food.id,
        quantity: count,
      },
    ];
    try {
      const { data } = await axios.post("/api/checkout", {
        orderItems,
      });
      window.location.assign(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex lg:flex-row flex-col gap-12">
        <div className="flex sm:flex-row flex-col h-fit gap-6">
          <Photo photo={food.photo} size="LG" className="lg:min-w-[330px]" />
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{food.name}</h1>
            <h1 className="font-bold text-lg text-primary select-none">
              ${food.price}
            </h1>
            <Star value={food.avgRating} viewOnly />
            <p className="text-muted-foreground font-semibold">
              Total: ${(food.price * count).toFixed(2)}
            </p>
            <Counter
              value={count}
              onChange={(value) => {
                setCount(value);
              }}
              food={food}
            />
            <div className="flex gap-4">
              <Button onClick={handleOrder} disabled={ordering}>
                Order now
              </Button>
              <Button onClick={handleAddToCart} disabled={loading}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <Separator className="sm:hidden" />
        <FoodDescription foodName={food.name} description={food.description} />
      </div>
      <FoodSlider
        currentUser={null}
        queryKey="similar"
        label="Similar cuisines"
        category={food.category}
        foodId={food.id}
      />
      <FoodReviews food={food} currentUser={currentUser} />
    </div>
  );
};

export default FoodInfo;
