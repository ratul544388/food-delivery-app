import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const cursor = searchParams.get("cursor");

    const BATCH = 12;
    const orders = await db.order.findMany({
      take: BATCH,
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: {
          include: {
            food: true,
          },
        },
      },
    });

    let nextCursor = null;

    if (orders.length === BATCH) {
      nextCursor = orders[BATCH - 1].id;
    }

    return NextResponse.json({ items: orders, nextCursor });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
