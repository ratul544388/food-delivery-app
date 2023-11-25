import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { photo, name, category, price } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const response = await db.food.create({
      data: {
        photo,
        name,
        category,
        price,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
