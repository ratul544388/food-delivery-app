"use client";

import CopyButton from "@/components/copy-button";
import Photo from "@/components/photo";
import { formatText, getTotalPrice } from "@/helper";
import { cn } from "@/lib/utils";
import { Food, OrderItem, OrderStatus, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { View } from "lucide-react";
import OrdersCellActions from "../cell-actions/orders-cell-actions";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type OrderColumn = {
  id: string;
  orderNo: number;
  orderItems: (OrderItem & {
    food: Food;
  })[];
  user: User;
  createdAt: Date;
  status: OrderStatus;
};

export const orderColumns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "orderNo",
    header: "Order No:",
    cell: ({ row }) => {
      const orderNo = Number(row.getValue("orderNo"));
      return (
        <div className="whitespace-nowrap">
          {orderNo >= 10 ? orderNo : `0${orderNo}`}
        </div>
      );
    },
  },
  {
    accessorKey: "orderItems",
    header: "Ordered foods",
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return (
        <div className="flex items-center text-sm">
          {orderItems.length > 1 ? (
            <div className="flex items-center gap-1">
              {orderItems.map(
                (item, index) =>
                  index < 2 && (
                    <Photo
                      key={index}
                      photo={item.food.photo}
                      className="max-w-[50px] min-w-[50px] rounded-md"
                    />
                  )
              )}
              {orderItems.length > 2 && (
                <p className="text-muted-foreground whitespace-nowrap">
                  {orderItems.length - 2} more
                </p>
              )}
              <HoverCard>
                <HoverCardTrigger asChild className="min-w-[16px]">
                  <View className="ml-2 w-4 h-4 hover:text-primary text-muted-foreground cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent className="p-0">
                  <div className="h-full max-h-[50vh] overflow-y-auto px-4 py-3.5">
                    <h1 className="text-sm font-semibold">
                      Total items: {orderItems.length}
                    </h1>
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-2.5"
                      >
                        <Photo
                          photo={item.food.photo}
                          className="max-w-[90px] rounded-md"
                        />
                        <div className="flex flex-col">
                          <h1 className="font-semibold">
                            {orderItems[0].food.name}
                          </h1>
                          <p className="text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-muted-foreground">
                            ${item.food.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ) : (
            <div className="flex gap-2">
              <Photo photo={orderItems[0].food.photo} size="SM" />
              <div className="flex flex-col">
                <h1 className="font-semibold">{orderItems[0].food.name}</h1>
                <p className="text-muted-foreground">
                  Qty: {orderItems[0].quantity}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Ordered by",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Photo photo={row.original.user.imageUrl} size="AVATAR" />
          <h1 className="whitespace-nowrap">{row.original.user.name}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "Delivery address",
    cell: ({ row }) => {
      return row.original.user.address;
    },
  },
  {
    accessorKey: "user",
    header: "Phone number",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          {row.original.user.phone}
          <CopyButton text={row.original.user.phone as string} />
        </div>
      );
    },
  },
  {
    accessorKey: "orderItems",
    header: "Price",
    cell: ({ row }) => {
      return `$${getTotalPrice(row.original.orderItems)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status:",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <p
          className={cn(
            "font-bold",
            status === "DELIVERY_PENDING"
              ? "text-"
              : status === "DELIVERED"
              ? "text-green-600"
              : "text-red-600"
          )}
        >
          {formatText(status)}
        </p>
      );
    },
  },
  {
    accessorKey: "orderNo",
    header: "Actions",
    cell: ({ row }) => {
      return <OrdersCellActions order={row.original} />;
    },
  },
];
