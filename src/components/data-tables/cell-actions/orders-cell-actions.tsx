"use client";

import DropdownMenu from "@/components/dropdown-menu";
import { OrderColumn } from "../columns/orders-columns";
import { useRouter } from "next/navigation";
import { Bike, User2, XCircle } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { useMutation } from "@/hooks/use-mutation";

interface OrdersCellActionsProps {
  order: OrderColumn;
}

const OrdersCellActions: React.FC<OrdersCellActionsProps> = ({ order }) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const { mutate } = useMutation({
    api: `/api/admin/orders/${order.id}`,
    data: {
      status: "DELIVERED",
    },
    method: "patch",
    refresh: true,
    success: "Order marked as delivered",
  });
  return (
    <DropdownMenu
      contentWidth={200}
      items={[
        {
          label: "Make it delivered",
          onClick: () => mutate(),
          icon: Bike,
          disabled: order.status === "CANCELED" || order.status === "DELIVERED",
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
