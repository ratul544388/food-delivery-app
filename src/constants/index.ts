import {
  Home,
  LayoutDashboard,
  ListOrdered,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";

export const MAX_DATA_TABLE_PAGE_SIZE = 10;
export const MAX_FOODS_PAGE_SIZE = 12;

export const categories = [
  "ALL",
  "BURGER",
  "PIZZA",
  "COMBO",
  "COFFEE",
  "SANDWICH",
  "GRILLED",
  "PASTA",
  "ICE_CREAM",
  "VEGETARIAN",
  "BEVERAGE",
  "DESSERT",
  "SALAD",
];

export const userNavLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Menu",
    href: "/menu",
    icon: Utensils,
  },
];

export const adminNavLinks = [
  {
    label: "Dashbaord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Cuisines",
    href: "/admin/cuisines",
    icon: UtensilsCrossed,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ListOrdered,
  },
];
