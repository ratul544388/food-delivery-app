import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgePlus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { FoodDataTable } from "../_components/data-table/food-data-table";
import { foodColumns } from "../_components/data-table/food-columns";
import { db } from "@/lib/db";
import Pagination from "@/components/pagination";
import { MAX_DATA_TABLE_PAGE_SIZE } from "@/constants";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/data-tables/data-table";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams.page) || 1;

  const BATCH = MAX_DATA_TABLE_PAGE_SIZE;
  const total = await db.food.count();
  const skip = BATCH * (page - 1);
  const hasMore = total - skip >= BATCH;
  const take = hasMore ? BATCH : total - skip;
  const pageCount = Math.ceil(total / BATCH);

  const foods = await db.food.findMany({
    include: {
      orderItems: {
        include: {
          food: true,
        },
      },
    },
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <PageHeader
        label="Cuisines"
        icon={UtensilsCrossed}
        actionLabel="Add new"
        actionIcon={BadgePlus}
        actionUrl="/admin/cuisines/new"
      />
      <Separator />
      <DataTable columns={foodColumns} data={foods} />
      <Pagination pageCount={pageCount} />
    </div>
  );
};

export default Page;
