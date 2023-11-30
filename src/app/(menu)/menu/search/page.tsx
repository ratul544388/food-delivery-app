import FoodsGrid from "@/app/(menu)/_components/foods-grid";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }: { searchParams: { q: string } }) => {
  const q = searchParams.q as string;
  const currentUser = await getCurrentUser();

  if (!q) {
    redirect("/");
  }

  return (
    <div>
      <FoodsGrid currentUser={currentUser} queryKey="search" q={q} />
    </div>
  );
};

export default Page;
