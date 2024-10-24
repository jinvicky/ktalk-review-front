import { NextResponse } from "next/server";
import prisma from "@/prisma/util/prisma";
import { Review } from "@/types/review.type";

export async function GET() {
    try {
        const reviews: Review[] = await prisma.review.findMany();
        return NextResponse.json(reviews);
    } catch (err) {
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: Request) {
    const form = await req.json();
    try {
        const newReview: Review = await prisma.review.create({
            data: {
                ...form
            }
        });
        return NextResponse.json(newReview);
    } catch (err) {
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
