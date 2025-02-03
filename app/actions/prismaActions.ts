"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLogEntry(formData: FormData) {
  const username = formData.get("username") as string;

  if (!username) return;

  try {
    await prisma.logEntry.create({
      data: {
        username,
        checkIn: new Date(),
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

export async function checkoutUser(formData: FormData) {
  const id = formData.get("id") as string;

  try {
    await prisma.logEntry.update({
      where: { id },
      data: { checkOut: new Date() },
    });

    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
