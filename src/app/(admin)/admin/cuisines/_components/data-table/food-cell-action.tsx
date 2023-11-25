"use client";
import DropdownMenu from "@/components/dropdown-menu";
import { Edit, Trash } from "lucide-react";
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
          label: "Edit",
          icon: Edit,
          onClick: () => router.push(`/cuisines/${food.id}/update`),
        },
        {
          label: "Delete",
          icon: Trash,
          onClick: () => onDelete(),
          isLoading: isLoading,
        },
      ]}
    />
  );
};

export default FoodCellAction;
