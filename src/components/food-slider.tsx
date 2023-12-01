"use client";

import { CurrentUser, FoodType } from "@/types";
import { FoodCard } from "@/app/(menu)/_components/food-card";
import { useInfinityFoods } from "@/hooks/use-infinity-foods";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Food } from "@prisma/client";
import { cn } from "@/lib/utils";

interface FoodSliderProps {
  type?: FoodType;
  category?: string;
  queryKey: string;
  label: string;
  currentUser: CurrentUser | null;
  className?: string;
  foodId?: string;
}

export const FoodSlider = ({
  type,
  label,
  currentUser,
  category,
  queryKey,
  foodId,
}: FoodSliderProps) => {
  const { data, status, ref } = useInfinityFoods({
    queryKey,
    category,
    type,
    batch: 6,
    foodId,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };

  if (status === "error") {
    return "Error while fetching foods";
  }

  if (status === "pending") {
    return (
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-thin">
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
        <FoodCard.Skeleton />
      </div>
    );
  }

  if (data?.pages[0].foods.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col px-3 rounded-xl py-2 gap-4 w-full bg-gradient-to-r from-rose-100 to-teal-100">
      <h1 className="font-bold text-2xl">{label}</h1>
      <div className="relative w-full">
        <Button
          onClick={handleScrollLeft}
          className="absolute h-12 w-12 p-0 rounded-full opacity-70 hover:opacity-90 z-10 left-0 top-1/2 -translate-y-1/2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div
          className="flex overflow-x-auto scrollbar-thin relative"
          ref={containerRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {data?.pages.map((page, index) => (
            <div className="flex items-center gap-4" key={index}>
              {page.foods.map((food: Food) => (
                <FoodCard
                  key={food.id}
                  currentUser={currentUser}
                  food={food}
                  queryKey={queryKey}
                  className="min-w-[180px] max-w-[180px] h-full"
                />
              ))}
              <div ref={ref} />
            </div>
          ))}
        </div>
        <Button
          onClick={handleScrollRight}
          className="absolute h-12 w-12 p-0 rounded-full opacity-70 hover:opacity-90 z-10 right-0 top-1/2 -translate-y-1/2"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
