"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function handleTest(amount: number) {
  const exist = await db.test.findFirst();
  if (exist) {
    await db.test.update({
      where: {
        id: exist.id,
      },
      data: {
        count: exist.count + amount,
      },
    });
  } else {
    await db.test.create({
      data: {
        count: 1,
      },
    });
  }
}
