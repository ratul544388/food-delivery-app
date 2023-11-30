import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const { message, star } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const food = await db.food.findUnique({
      where: {
        id: params.foodId,
      },
      include: {
        reviews: true,
      },
    });

    if (!food) {
      return new NextResponse("Food not found", { status: 400 });
    }

    const newAvgRating =
      (food.avgRating * food.reviews.length + star) / (food.reviews.length + 1);

    const updatedFood = await db.food.update({
      where: {
        id: food.id,
      },
      data: {
        avgRating: newAvgRating,
      },
    });

    const review = await db.review.create({
      data: {
        userId: currentUser.id,
        foodId: params.foodId,
        star,
        message,
      },
    });

    return NextResponse.json({ review, updatedFood });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
