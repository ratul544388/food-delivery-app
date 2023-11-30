import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FoodInfo from "./_components/food-info";
import { getCurrentUser } from "@/lib/current-user";

const Page = async ({ params }: { params: { foodId: string } }) => {
  const food = await db.food.findUnique({
    where: {
      id: params.foodId,
    },
    include: {
      reviews: {
        include: {
          user: true,
        },
        take: 10,
      },
    },
  });
  const currentUser = await getCurrentUser();

  if (!food) {
    redirect("/");
  }

  return <FoodInfo food={food} currentUser={currentUser} />;
};

export default Page;
