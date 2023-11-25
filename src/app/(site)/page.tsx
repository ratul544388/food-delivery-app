import { getFoods } from "@/actions/get-foods";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bike, Soup } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import FoodsGrid from "../(menu)/_components/foods-grid";
import { getCurrentUser } from "@/lib/current-user";
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let category = searchParams.category as string;
  if (category) {
    category = category.toUpperCase();
  }
  const currentUser = await getCurrentUser();

  const foods = await getFoods({ category });
  return (
    <main className="flex flex-col gap-10 mt-5">
      <div className="flex lg:flex-row justify-between flex-col items-center gap-8">
        <div className="flex flex-col gap-3">
          <Badge variant="secondary" className="bg-slate-200">
            Quick delivery
            <Bike className="h-4 w-4 ml-2 text-primary" />
          </Badge>
          <div className="font-extrabold text-4xl flex items-end">
            Hungry? You are in the right place.
          </div>
          <p>
            Order any meal at may time and we will deliver it directly to you
            home.
          </p>
          <Button className="mt-5 rounded-full">Make an order</Button>
          <Link
            href="/"
            className="w-fit text-lg mt-10 cursor-pointer hover:underline font-semibold flex items-center gap-2"
          >
            Sepcials for lunch
            <ArrowRight className="h-6 w-5 text-primary" />
          </Link>
        </div>
        <Image src="/images/hero.png" alt="hero" width={500} height={500} />
      </div>
      <FoodsGrid foods={foods} currentUser={currentUser} />
    </main>
  );
}
