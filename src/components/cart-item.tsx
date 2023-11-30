import { useMutation } from "@/hooks/use-mutation";
import { FullCartTypes } from "@/types";
import { Equal, Trash, X } from "lucide-react";
import { useState } from "react";
import Counter from "./counter";
import Icon from "./icon";
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

  const { mutate, isPending } = useMutation({
    api: `/api/cart-items/${cartItem.id}`,
    method: "delete",
    refresh: true,
    success: "Item removed",
  });

  return (
    <div className="flex py-2 px-4 hover:bg-primary/5 select-none gap-3 text-sm">
      <Photo photo={cartItem.food.photo} size="SM" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-3">
          <h1 className="font-semibold">{cartItem.food.name}</h1>
          <Trash className="h-4 w-4 hover:text-primary"/>
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
