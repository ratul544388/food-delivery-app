"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import FoodCellAction from "./food-cell-action";
import { FullOrderType } from "@/types";
import { Food, OrderItem } from "@prisma/client";

export type FoodColumn = {
  id: string;
  photo: string;
  name: string;
  category: string;
  price: number;
  orderItems: (OrderItem & {
    food: Food;
  })[];
};

export const foodColumns: ColumnDef<FoodColumn>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      return (
        <div className="w-[80px] h-[70px] relative rounded-lg overflow-hidden">
          <Image
            src={row.original.photo}
            alt="photo"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <h1 className="capitalize">{row.getValue("name")}</h1>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.original.category.toLowerCase()}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div className="capitalize">${row.original.price}</div>;
    },
  },
  {
    accessorKey: "orderItems",
    header: "Sales",
    cell: ({ row }) => {
      const totalOrders = row.original.orderItems.length;
      const itemCount = row.original.orderItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      return <p className="capitalize">{totalOrders * itemCount}+</p>;
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return <FoodCellAction food={row.original} />;
    },
  },
];
