import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { count, foodId } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const existingCart = await db.cartItem.findFirst({
      where: {
        foodId,
        userId: currentUser.id,
      },
    });

    const response = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        cartItems: {
          ...(existingCart
            ? {
                update: {
                  where: {
                    id: existingCart.id,
                  },
                  data: {
                    count: existingCart.count + count,
                  },
                },
              }
            : {
                create: {
                  foodId,
                  count,
                },
              }),
        },
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
