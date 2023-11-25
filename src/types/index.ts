import { CartItem, Food, Order, OrderItem, Size, User } from "@prisma/client";

export type FullFoodTypes = Food & {
  sizes: Size[];
};

export type FullCartTypes = CartItem & {
  food: Food;
};

export type FullOrderType = Order & {
  orderItems: (OrderItem & {
    food: Food;
  })[];
};

export type UserWithCart = User & {
  cartItems: FullCartTypes[];
};
