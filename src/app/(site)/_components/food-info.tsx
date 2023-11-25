"use client";

import Counter from "@/components/counter";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { FullFoodTypes } from "@/types";
import axios from "axios";
import { LocateIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FoodInfoProps {
  food: FullFoodTypes;
}

const FoodInfo: React.FC<FoodInfoProps> = ({ food }) => {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/food/${food.id}/cart`, {
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
    <div className="flex items-center gap-5">
      <div className="w-full aspect-[6/5] max-w-[340px] relative rounded-xl overflow-hidden">
        <Image src={food.photo} alt="photo" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">{food.name}</h1>
        {!!food.sizes.length && (
          <p className="text-sm font-semibold text-muted-foreground">
            Size: Small
          </p>
        )}
        <h1 className="font-bold text-lg text-primary select-none">
          ${food.price}
        </h1>
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
  );
};

export default FoodInfo;
