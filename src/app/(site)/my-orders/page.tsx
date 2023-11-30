import { DataTable } from "@/components/data-tables/data-table";
import PageHeader from "@/components/page-header";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { ArrowLeft, ListOrdered } from "lucide-react";
import OrderItem from "./_components/order-item";
import { Separator } from "@/components/ui/separator";

const Page = async () => {
  const currentUser = await getCurrentUser();

  const orders = await db.order.findMany({
    where: {
      userId: currentUser?.id,
    },
    include: {
      orderItems: {
        include: {
          food: true,
        },
      },
      user: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <PageHeader
        label="Orders"
        icon={ListOrdered}
        actionLabel="Home"
        actionUrl="/"
        actionVariant="ghost"
        actionIcon={ArrowLeft}
      />
      <Separator />
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Page;
