import Categories from "@/components/categories";

export default async function FoodWithCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-2">
      <Categories />
      <div className="">{children}</div>
    </main>
  );
}
