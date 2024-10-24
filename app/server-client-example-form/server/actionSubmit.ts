"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/prisma/util/prisma";
import { Review } from "@/types/review.type";

export async function actionSubmit(formData: FormData) {
    const review: Review = {
        name: formData.get("name") as string,
        content: formData.get("content") as string,
    };

    await prisma.review.create({
        data: {
            ...review,
        },
    });
    await prisma.$disconnect();

    revalidatePath("/review");
}