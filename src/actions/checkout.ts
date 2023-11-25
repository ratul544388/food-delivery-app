"use server";

import { getCurrentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type OrderItemsType = {
  foodId: string;
  quantity: number;
};

export async function checkOut(orderItems: OrderItemsType[]) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthenticated");
    }

    const foodItems = orderItems.map((item) => ({
      foodId: item.foodId,
      quantity: item.quantity,
    }));

    await db.order.deleteMany({
      where: {
        status: "WAITING_FOR_PAYMENT",
      },
    });

    const order = await db.order.create({
      data: {
        userId: currentUser.id,
        status: "WAITING_FOR_PAYMENT",
        orderItems: {
          createMany: {
            data: foodItems,
          },
        },
      },
      include: {
        orderItems: {
          include: {
            food: true,
          },
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      order.orderItems.map((orderItem) => ({
        quantity: orderItem.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: orderItem.food.name,
            images: [orderItem.food.photo],
          },
          unit_amount: Math.round(orderItem.food.price * 100),
        },
      }));

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: currentUser.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: currentUser.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: currentUser.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe-check?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe-check?canceled=1`,
      metadata: {
        orderId: order.id,
        userId: currentUser.id,
      },
    });

    return { url: session.url };
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
