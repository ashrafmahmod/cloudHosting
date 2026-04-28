import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";
import { UpdateArticleDto } from "@/utils/dtos";
import { verifyToken } from "@/utils/verifyToken";
// interface Props {
//   params: { id: string };
// }

interface Props {
  // In Next.js 15, params is a Promise
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    // const article = articles.find((a) => a.id === parseInt(id));
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        // comments:true
        // we add config
        comments: {
          include: {
            // user:true will get user object from schema username password email and all
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // 3. Check your console
    //   console.log("Article found:", article);

    // 4. Return something so the request doesn't hang
    //   return NextResponse.json(article || { message: "Not found" });
    if (!article)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin)
      return NextResponse.json(
        { message: "not allowed only admin" },
        { status: 403 },
      );
    // 1. Unwrap the params
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });
    // 2. Perform your logic
    // const article = articles.find((a) => a.id === parseInt(id));

    // 3. Check your console
    //   console.log("Article found:", article);

    // 4. Return something so the request doesn't hang
    //   return NextResponse.json(article || { message: "Not found" });
    if (!article)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );

    const body = (await request.json()) as UpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin)
      return NextResponse.json(
        { message: "not allowed only admin" },
        { status: 403 },
      );
    // 1. Unwrap the params
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });

    // 2. Perform your logic
    // const article = articles.find((a) => a.id === parseInt(id));
    if (!article)
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    await prisma.article.delete({ where: { id: article.id } });
    const commentIds: number[] = article?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
