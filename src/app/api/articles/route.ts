import { CreateNewArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";
import { Article } from "@/generated/prisma/client";
import { articlesPerPage } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";
export async function GET(request: NextRequest) {
  // request is object from client has body - param - header
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"; // pagination

    const articles = await prisma.article.findMany({
      skip: articlesPerPage * (parseInt(pageNumber) - 1),
      take: articlesPerPage,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin)
      return NextResponse.json(
        { message: "not allowed only admin" },
        { status: 403 },
      );
    const body = (await request.json()) as CreateNewArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (validation.error)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
