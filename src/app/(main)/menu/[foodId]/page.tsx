import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FoodInfo from "./_components/food-info";
import MaxWidthWrapper from "@/components/max-width-wrapper";

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

  return (
    <MaxWidthWrapper>
      <FoodInfo food={food} currentUser={currentUser} />
    </MaxWidthWrapper>
  );
};

export default Page;
