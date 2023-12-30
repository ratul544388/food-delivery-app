import FoodsGrid from "@/app/_components/foods-grid";
import MaxWidthWrapper from "@/components/max-width-wrapper";
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
    <MaxWidthWrapper>
      <FoodsGrid
        currentUser={currentUser}
        category={category}
        queryKey={category}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
