import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.isAdmin) {
      return new NextResponse("Permisssion denied", { status: 403 });
    }
    const { status } = await req.json();

    const response = await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
