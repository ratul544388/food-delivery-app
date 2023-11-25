import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { size, price, foodId } = await req.json();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const response = await db.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        size,
        price,
        foodId,
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
  { params }: { params: { sizeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const response = await db.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
