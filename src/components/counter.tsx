"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Icon from "./icon";
import { useOptimistic } from "react";
import { Food } from "@prisma/client";

export type CountAndTotalTypes = {
  count: number;
  total?: number;
};

interface CounterProps {
  value: number;
  onTotalChange?: (value: number) => void;
  onChange: (value: number) => void;
  isSmall?: boolean;
  addInstant?: boolean;
  food: Food;
  total?: number;
}

const Counter: React.FC<CounterProps> = ({
  value,
  onChange,
  isSmall,
  addInstant,
  food,
  onTotalChange,
  total,
}) => {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    value,
    (state, amount: number) => state + amount
  );

  const handleChangeCount = async (amount: number) => {
    if (addInstant) {
      try {
        addOptimisticCount(amount);
        onChange(optimisticCount + amount);
        if (total && onTotalChange) {
          onTotalChange(total + food.price);
        }
        await axios.post(`/api/food/${food?.id}/cart`, {
          count: amount,
        });
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      onChange(value + amount);
    }
  };

  return (
    <div className="flex items-center gap-2 my-2">
      <Icon
        onClick={() => handleChangeCount(-1)}
        icon={Minus}
        iconSize={isSmall ? 10 : 20}
        disabled={addInstant ? optimisticCount <= 1 : value <= 1}
        className="border-[1.5px] border-primary"
      />
      <h1
        className={cn(
          "font-bold select-none text-lg w-[30px] text-center",
          isSmall && "text-sm font-semibold w-[20px]"
        )}
      >
        {addInstant ? optimisticCount : value}
      </h1>
      <Icon
        onClick={() => handleChangeCount(1)}
        icon={Plus}
        iconSize={isSmall ? 10 : 20}
        className="border-[1.5px] border-primary"
      />
    </div>
  );
};

export default Counter;
