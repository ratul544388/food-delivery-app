"use client";

import { Size } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type FoodColumn = {
  id: string;
  photo: string;
  name: string;
  category: string;
  price: number;
  sizes: Size[];
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
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      return ""
    },
  },
];
