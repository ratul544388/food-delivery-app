import Categories from "@/components/categories";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default async function FoodWithCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MaxWidthWrapper className="flex flex-col gap-3 mb-10">
      <Categories />
      {children}
    </MaxWidthWrapper>
  );
}
