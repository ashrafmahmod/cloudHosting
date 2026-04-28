import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";

export async function GET (request:NextRequest){
    try {
        const count = await prisma.article.count()
        return NextResponse.json({count} , {status:200})
    } catch (error) {
        console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
    }
} 