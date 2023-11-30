"use client";
import DropdownMenu from "@/components/dropdown-menu";
import { Edit, Eye, Trash, Utensils } from "lucide-react";
import { FoodColumn } from "./food-columns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface FoodCellActionProps {
  food: FoodColumn;
}

const FoodCellAction: React.FC<FoodCellActionProps> = ({ food }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/food/${food.id}`);
      toast.success("Cuisine deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DropdownMenu
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
          onClick: () => onDelete(),
          disabled: isLoading,
        },
      ]}
    />
  );
};

export default FoodCellAction;
