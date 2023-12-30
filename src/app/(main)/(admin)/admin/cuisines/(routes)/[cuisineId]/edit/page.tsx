import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FoodForm from "../../../_components/food-form";

const Page = async ({
  params,
  searchParams,
}: {
  params: { cuisineId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const food = await db.food.findUnique({
    where: {
      id: params.cuisineId,
    },
  });

  const addSizeAndExtra = !!searchParams.add_size_and_extra;

  if (!food) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <PageHeader
        label={addSizeAndExtra ? "Size and extra" : "Update cuisine"}
      />
      <Separator />
      <FoodForm food={food} />
    </div>
  );
};

export default Page;
