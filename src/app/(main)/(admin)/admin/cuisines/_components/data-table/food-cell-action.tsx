"use client";
import { Edit, Eye, Trash, Utensils } from "lucide-react";
import { FoodColumn } from "./food-columns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ActionDropdownMenu } from "@/components/action-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface FoodCellActionProps {
  food: FoodColumn;
}

const FoodCellAction: React.FC<FoodCellActionProps> = ({ food }) => {
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <ActionDropdownMenu
      items={[
        {
          label: "View item",
          icon: Utensils,
          onClick: () => router.push(`/menu/${food.id}`),
        },
        {
          label: "Edit",
          icon: Edit,
          onClick: () => router.push(`/admin/cuisines/${food.id}/edit`),
        },
        {
          label: "Delete",
          icon: Trash,
          onClick: () => onOpen("DELETE_FOOD_MODAL", { foodId: food.id }),
        },
      ]}
    />
  );
};

export default FoodCellAction;
