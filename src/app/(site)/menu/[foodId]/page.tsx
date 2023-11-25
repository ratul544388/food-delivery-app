import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import FoodInfo from "../../_components/food-info";

const Page = async ({ params }: { params: { foodId: string } }) => {
  const food = await db.food.findUnique({
    where: {
      id: params.foodId,
    },
    include: {
      sizes: true,
    },
  });

  if (!food) {
    redirect("/");
  }

  return <FoodInfo food={food} />;
};

export default Page;
