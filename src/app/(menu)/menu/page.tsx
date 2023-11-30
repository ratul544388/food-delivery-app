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
  const currentUser = await getCurrentUser();

  return (
    <FoodsGrid
      currentUser={currentUser}
      category={category}
      queryKey={category}
    />
  );
};

export default Page;
