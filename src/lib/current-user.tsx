import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export async function getCurrentUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const existingUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        cartItems: {
          include: {
            food: true,
          },
        },
        orders: {
          include: {
            orderItems: {
              include: {
                food: true,
              },
            },
          },
        },
      },
    });

    if (existingUser) return existingUser;

    const createUser = await db.user.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
      include: {
        cartItems: {
          include: {
            food: true,
          },
        },
        orders: {
          include: {
            orderItems: {
              include: {
                food: true,
              },
            },
          },
        },
      },
    });

    return createUser;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
