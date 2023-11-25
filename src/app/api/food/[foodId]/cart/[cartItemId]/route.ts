import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { cartItemId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const response = await db.cartItem.delete({
      where: {
        id: params.cartItemId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
