import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { foodId: string; reviewId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const { message, star } = await req.json();


    if (!currentUser) {
      return new NextResponse("Unauthenticated");
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

    const previousStar = food.reviews.find(
      (item) => item.userId === currentUser.id
    )?.star;

    if (!previousStar) {
      return new NextResponse("Previous rating not found", { status: 400 });
    }

    const newAvgRating =
      (food.avgRating * food.reviews.length - previousStar + star) /
      food.reviews.length;

    const updatedFood = await db.food.update({
      where: {
        id: food.id,
      },
      data: {
        avgRating: newAvgRating,
      },
    });

    const updatedReview = await db.review.update({
      where: {
        id: params.reviewId,
      },
      data: {
        star,
        message,
      },
    });

    return NextResponse.json({ updatedFood, updatedReview });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
