import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user)
      return NextResponse.json(
        { message: "only logged in user" },
        { status: 401 },
      );
    const body = (await request.json()) as CreateCommentDto;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      },
    );

  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin === false)
      return NextResponse.json({ message: "only admin" }, { status: 403 });
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      },
    );
  }
}
