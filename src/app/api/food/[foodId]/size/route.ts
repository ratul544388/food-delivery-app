import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { size, price } = await req.json();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const response = await db.size.create({
      data: {
        size,
        price,
        foodId: params.foodId,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
