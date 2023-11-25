import { getFoods } from "@/actions/get-foods";
import FoodsGrid from "../_components/foods-grid";
import { getCurrentUser } from "@/lib/current-user";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  let category = searchParams.category as string;
  if (category) {
    category = category.toUpperCase();
  }
  const foods = await getFoods({ category });
  const currentUser = await getCurrentUser();

  return (
    <div>
      <FoodsGrid foods={foods} currentUser={currentUser} />
    </div>
  );
};

export default Page;
