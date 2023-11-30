import Photo from "@/components/photo";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
      userId: currentUser?.id,
    },
  });

  const isSuccess =
    searchParams.success === "1" && order?.status === "DELIVERY_PENDING";
  const isCanceled = searchParams.canceled === "1";

  if (!order || (!isSuccess && !isCanceled)) {
    redirect("/");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-background relative rounded-lg shadow-lg p-6 flex flex-col items-center max-w-[650px]">
        {isSuccess ? (
          <>
            <div className="absolute top-[40%] whitespace-nowrap text-6xl font-extrabold text-muted-foreground/20 left-1/2 -translate-x-1/2">
              Thank you!
            </div>
            <Photo
              photo="/images/payment-success.png"
              alt="Payment success"
              className="min-w-[350px]"
            />
            <h1 className="font-semibold">
              Payment successful! Thank you for your transaction.
            </h1>
            <p className="text-muted-foreground mt-2 text-center">
              Payment successful! Thanks for your prompt transaction. For any
              questions, reach out.
            </p>
            <div className="flex mt-5 items-center gap-4">
              <Link
                href="/"
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "underline"
                )}
              >
                Back to home
              </Link>
              <Link href={`/my-orders`} className={buttonVariants()}>
                View orders
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-[30%] text-5xl font-extrabold text-muted-foreground/20 left-1/2 -translate-x-1/2">
              Canceled!!!
            </div>
            <Photo
              photo="/images/order-cancel.png"
              alt="Order cancel logo"
              className="min-w-[350px]"
            />
            <h1 className="font-semibold mt-5 text-red-600">
              Your order has been canceled!
            </h1>
            <p className="text-muted-foreground mt-2 text-center">
              Order canceled successfully! Feel free to reach out if you have
              any questions. We appreciate your understanding. Thank you!
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "underline mt-3"
              )}
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
