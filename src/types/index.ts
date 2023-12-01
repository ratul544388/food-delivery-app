import { CartItem, Food, Order, OrderItem, Review, User } from "@prisma/client";

export type FoodType = "POPULAR" | "TOP_RATED" | "SIMILAR";

export type FoodWithReview = Food & {
  reviews: (Review & {
    user: User;
  })[];
};

export type FullCartTypes = CartItem & {
  food: Food;
};

export type OrderItemsTypes = OrderItem & {
  food: Food;
};

export type FullOrderType = Order & {
  orderItems: OrderItemsTypes[];
  user: User;
};

export type CurrentUser = User & {
  orders: (Order & {
    orderItems: (OrderItem & {
      food: Food;
    })[];
  })[];
  cartItems: (CartItem & {
    food: Food;
  })[];
};
