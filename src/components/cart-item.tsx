import { cn } from "@/lib/utils";
import { FullCartTypes } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Equal, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Counter from "./counter";
import Photo from "./photo";

interface CartItemProps {
  cartItem: FullCartTypes;
  onTotalChange: (value: number) => void;
  total: number;
}

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  total,
  onTotalChange,
}) => {
  const [count, setCount] = useState(cartItem.count);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/admin/orders/cancel`);
    },
    onSuccess: () => {
      toast.success("Order marked as delivered");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div className="flex py-2 px-4 hover:bg-primary/5 select-none gap-3 text-sm">
      <Photo photo={cartItem.food.photo} size="SM" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-3">
          <h1
            onClick={() => router.push(`/menu/${cartItem.foodId}`)}
            className="font-semibold hover:underline cursor-pointer"
          >
            {cartItem.food.name}
          </h1>
          <Trash
            onClick={() => mutate()}
            className={cn(
              "min-h-[20px] min-w-[20px] h-5 w-5 text-muted-foreground hover:text-primary",
              isPending && "pointer-events-none opacity-60"
            )}
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          ${cartItem.food.price}
          <X className="h-3 w-3" />
          {count}
          <Equal className="h-3 w-3" />
          <p className="text-primary">${count * cartItem.food.price}</p>
        </div>
        <Counter
          addInstant
          isSmall
          value={count}
          onTotalChange={onTotalChange}
          onChange={(value) => {
            setCount(value);
          }}
          food={cartItem.food}
          total={total}
        />
      </div>
    </div>
  );
};

export default CartItem;
