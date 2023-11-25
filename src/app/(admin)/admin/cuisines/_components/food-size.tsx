"use client";
import DropdownMenu from "@/components/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Size } from "@prisma/client";
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FoodSizeForm from "./food-size-form";

interface FoodProps {
  foodId: string;
  sizes?: Size[];
}

const Food: React.FC<FoodProps> = ({ sizes = [], foodId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDelete = async (sizeId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/food/${foodId}/size/${sizeId}`);
      toast.success("Size deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="bg-accent rounded-xl">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline px-4 hover:bg-primary/5">
          <div className="flex items-center gap-1">
            Cuisine&apos;s price with different sizes
            <Badge>{sizes.length}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {sizes.map((size, index) =>
            editingId === size.id ? (
              <div key={size.id} className={cn("px-4")}>
                <FoodSizeForm
                  size={size}
                  foodId={editingId}
                  isAdding
                  onCancel={() => setEditingId("")}
                />
              </div>
            ) : (
              <div
                key={size.id}
                onDoubleClick={() => setEditingId(size.id)}
                className="flex select-none capitalize items-center gap-3 hover:bg-primary/5 py-2 px-4"
              >
                {index + 1}.
                <h1 className="font-semibold">{size.size.toLowerCase()}</h1>
                <p>{size.price}$</p>
                <DropdownMenu
                  items={[
                    {
                      icon: Edit,
                      label: "Edit",
                      onClick: () => setEditingId(size.id),
                    },
                    {
                      icon: Trash,
                      label: "Delete",
                      onClick: () => onDelete(size.id),
                      isLoading: isLoading,
                    },
                  ]}
                  className="ml-auto"
                />
              </div>
            )
          )}
          <div className="px-4 flex">
            {isAdding ? (
              <FoodSizeForm
                foodId={foodId}
                isAdding={isAdding}
                onCancel={() => setIsAdding(false)}
              />
            ) : (
              <Button
                onClick={() => setIsAdding(true)}
                className={cn("ml-auto mt-3", editingId && "hidden")}
              >
                Add
              </Button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Food;
