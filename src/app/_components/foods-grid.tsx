"use client";

import Loader from "@/components/loaders/loader";
import { useInfinityFoods } from "@/hooks/use-infinity-foods";
import { Food } from "@prisma/client";
import { Fragment, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { FoodCard } from "./food-card";
import { cn } from "@/lib/utils";
import { CurrentUser } from "@/types";

interface FoodsGridProps {
  currentUser: CurrentUser | null;
  queryKey: string;
  category?: string;
  q?: string;
}

const FoodsGrid: React.FC<FoodsGridProps> = ({
  currentUser,
  queryKey,
  category,
  q,
}) => {
  const { data, hasNextPage, ref, status } = useInfinityFoods({
    queryKey,
    category,
    q,
  });

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return "Error while fetching foods";
  }

  if (data?.pages[0].foods.length === 0) {
    return (
      <p className="text-muted-foreground mt-3 mx-auto">
        No food item found
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid gap-4 sm:gap-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.foods.map((food: Food) => (
              <FoodCard
                key={food.id}
                currentUser={currentUser}
                food={food}
                queryKey={queryKey}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage ? (
        <PulseLoader
          color="#E11D48"
          size={8}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mx-auto"
        />
      ) : (
        <p className="text-muted-foreground mx-auto">No more food found</p>
      )}
      <div ref={ref} />
    </div>
  );
};

export default FoodsGrid;
