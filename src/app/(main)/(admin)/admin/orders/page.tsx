import { orderColumns } from "@/components/data-tables/columns/orders-columns";
import { DataTable } from "@/components/data-tables/data-table";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import PageHeader from "@/components/page-header";
import Pagination from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ArrowLeft, ListOrdered } from "lucide-react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = Number(searchParams.page) || 1;

  const BATCH = 10;
  const skip = BATCH * (page - 1);

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: BATCH,
    include: {
      orderItems: {
        include: {
          food: true,
        },
      },
      user: true,
    },
  });

  const total = await db.order.count();

  const pageCount = Math.ceil(total / BATCH);

  return (
    <MaxWidthWrapper className="flex flex-col gap-3">
      <PageHeader
        label="Orders"
        icon={ListOrdered}
        actionLabel="Dashboard"
        actionUrl="/admin/dashboard"
        actionIcon={ArrowLeft}
        actionVariant="ghost"
      />
      <Separator />
      <DataTable columns={orderColumns} data={orders} />
      <Pagination pageCount={pageCount} />
    </MaxWidthWrapper>
  );
};

export default page;
