import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }
    const { photo, name, category, price, description } = await req.json();

    if (!photo || !name || !category || !price || !description) {
      return new NextResponse("All fields are required", { status: 400 });
    }

    const response = await db.food.update({
      where: {
        id: params.foodId,
      },
      data: {
        photo,
        name,
        category,
        price,
        description,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const response = await db.food.delete({
      where: {
        id: params.foodId,
      },
    });

    await db.cartItem.deleteMany({
      where: {
        foodId: params.foodId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
