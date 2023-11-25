import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { FoodDataTable } from "../_components/data-table/food-data-table";
import { foodColumns } from "../_components/data-table/food-columns";
import { db } from "@/lib/db";

const Page = async () => {
  const foods = await db.food.findMany({
    include: {
      sizes: true,
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center gap-3">
        <div className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
          <UtensilsCrossed className="sm:h-6 sm:w-6 h-5 w-5" />
          Cuisines
        </div>
        <Link href="/cuisines/new" className={buttonVariants()}>
          Add a new cuisine
        </Link>
      </div>
      <Separator />
      <FoodDataTable columns={foodColumns} data={foods} />
    </div>
  );
};

export default Page;
