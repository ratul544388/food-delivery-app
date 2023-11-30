import { OrderItemsTypes } from "@/types";
import { Food, OrderItem } from "@prisma/client";

export const formatText = (text: string) => {
  const noHiphen = text.split("_").join(" ");
  return noHiphen.split("")[0].toUpperCase() + noHiphen.slice(1).toLowerCase();
};

export const getTotalPrice = (orderItems: OrderItemsTypes[]) => {
  return orderItems.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);
};
