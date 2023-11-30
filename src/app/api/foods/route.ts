import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export type FoodType = "POPULAR" | "TOP_RATED";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const cursor = searchParams.get("cursor");
    const type = searchParams.get("type");
    const batch = searchParams.get("batch");
    const q = searchParams.get("q");
    const foodId = searchParams.get("foodId");

    const BATCH = Number(batch) || 8;

    const foods = await db.food.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(q
          ? {
              OR: [
                {
                  name: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
        ...(foodId
          ? {
              id: {
                not: foodId,
              },
            }
          : {}),
      },
      take: BATCH,
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      include: {
        reviews: true,
      },
      orderBy: {
        ...(type === "POPULAR"
          ? {
              orderItems: {
                _count: "desc",
              },
            }
          : type === "TOP_RATED"
          ? {
              avgRating: "desc",
            }
          : {
              createdAt: "desc",
            }),
      },
    });

    let nextCursor = null;

    if (foods.length === BATCH) {
      nextCursor = foods[BATCH - 1].id;
    }

    return NextResponse.json({ foods, nextCursor });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
