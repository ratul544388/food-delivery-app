"use client";
import { FullOrderType } from "@/types";

import { format } from "date-fns";
import LoadingButton from "@/components/loading-button";
import Photo from "@/components/photo";
import { Separator } from "@/components/ui/separator";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { formatText } from "@/helper";
import { cn } from "@/lib/utils";
import { ActionDropdownMenu } from "@/components/action-dropdown-menu";

interface OrderItemProps {
  order: FullOrderType;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckOut = async () => {
    setIsLoading(true);
    const orderItems = order.orderItems.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    }));
    console.log(orderItems);
    try {
      const { data } = await axios.post("/api/checkout", {
        orderItems,
      });
      window.location.assign(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const total = order.orderItems.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col shadow-md gap-3 bg-accent/40 p-4 rounded-xl text-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1>Status:</h1>
          <p
            className={cn(
              "font-bold",
              order.status === "DELIVERED"
                ? "text-green-600"
                : order.status === "DELIVERY_PENDING"
                ? "text-blue-500"
                : "text-red-600"
            )}
          >
            {formatText(order.status)}
          </p>
        </div>
        <div className="flex flex-col">
          <h1>Order no:</h1>
          <p className="text-muted-foreground">12342342</p>
        </div>
        <div className="xs:flex hidden flex-col">
          <h1>Order date:</h1>
          <p className="text-muted-foreground">
            {format(order.createdAt, "d, MMM, yyyy")}
          </p>
        </div>
      </div>
      <Separator />
      {order.orderItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <Photo
                photo={item.food.photo}
                className="max-w-[100px] min-w-[100px]"
              />
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold">{item.food.name}</h1>
                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-primary">Price: ${item.food.price}</p>
              </div>
            </div>
            <ActionDropdownMenu
              items={[
                {
                  label: "View food",
                  icon: Eye,
                  onClick: () => router.push(`/menu/${item.foodId}`),
                },
              ]}
              className="border-none"
            />
          </div>
          <Separator />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">
          Total: <span className="text-muted-foreground">${total}</span>
        </h1>
        {order.status === "WAITING_FOR_PAYMENT" && (
          <LoadingButton
            label="Make payment"
            loadingLabel="Making payment..."
            onClick={handleCheckOut}
            isLoading={isLoading}
            className="ml-auto"
          />
        )}
      </div>
    </div>
  );
};

export default OrderItem;
