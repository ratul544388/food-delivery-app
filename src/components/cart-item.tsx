import { FullCartTypes } from "@/types";
import { Equal, Trash, X } from "lucide-react";
import { useState } from "react";
import Counter, { CountAndTotalTypes } from "./counter";
import Photo from "./photo";
import Icon from "./icon";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const [count, setCount] = useState(cartItem.count);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveCart = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/food/${cartItem.foodId}/cart/${cartItem.id}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex py-2 px-4 hover:bg-primary/5 select-none items-center gap-3 text-sm">
      <Photo photo={cartItem.food.photo} className="max-w-[90px]" />
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold">{cartItem.food.name}</h1>
          <Icon
            icon={Trash}
            iconSize={12}
            onClick={handleRemoveCart}
            disabled={isLoading}
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
