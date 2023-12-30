"use client";

import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bike, User2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { OrderColumn } from "../columns/orders-columns";

interface OrdersCellActionsProps {
  order: OrderColumn;
}

const OrdersCellActions: React.FC<OrdersCellActionsProps> = ({ order }) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/admin/orders/${order.id}`, {
        status: "DELIVERED",
      });
    },
    onSuccess: () => {
      toast.success("Order marked as delivered");
      router.refresh();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <ActionDropdownMenu
      items={[
        {
          label: "Make it delivered",
          onClick: () => mutate(),
          icon: Bike,
          disabled:
            isPending ||
            order.status === "CANCELED" ||
            order.status === "DELIVERED",
        },
        {
          label: "Cancel order",
          onClick: () => onOpen("CANCEL_ORDER_MODAL", { orderId: order.id }),
          icon: XCircle,
          disabled: order.status === "CANCELED" || order.status === "DELIVERED",
        },
        {
          label: "View user Profile",
          onClick: () => {},
          icon: User2,
        },
      ]}
    />
  );
};

export default OrdersCellActions;
