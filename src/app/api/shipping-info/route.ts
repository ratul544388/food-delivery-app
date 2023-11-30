import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { address, phone } = await req.json();

    if (!address || !phone) {
      return new NextResponse("Phone or address are missing", { status: 400 });
    }

    const response = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        phone,
        address,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal sever error", { status: 500 });
  }
}
