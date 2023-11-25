import { db } from "@/lib/db";

export async function getFoods({ category }: { category?: string }) {
  const foods = await db.food.findMany({
    where: {
      category,
    },
  });

  return foods;
}
