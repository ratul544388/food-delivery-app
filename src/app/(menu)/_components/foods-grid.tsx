"use client";

import { Food } from "@prisma/client";
import FoodCard from "./food-card";
import { useState } from "react";
import { UserWithCart } from "@/types";

interface FoodsGridProps {
  foods: Food[];
  currentUser: UserWithCart | null;
}

const FoodsGrid: React.FC<FoodsGridProps> = ({ foods, currentUser }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {foods.map((food) => (
        <FoodCard key={food.id} currentUser={currentUser} food={food} />
      ))}
    </div>
  );
};

export default FoodsGrid;
