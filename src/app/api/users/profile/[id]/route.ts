import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/lib.prisma";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/utils/validationSchemas";
// import jwt, { JwtPayload } from "jsonwebtoken";
interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { comments: true },
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });

    // const authToken: string = request.headers.get("authorization") ?? "";
    // const authToken = request.headers.get("authorization") as string; // we gonna take from cookie
    // will use in utails folder
    // const jwtToken = request.cookies.get("jwtToken");
    // const token = jwtToken?.value as string;
    // const verifyToken = jwt.verify(
    //   // authToken, we use cookie
    //   token,
    //   process.env.JWT_SECRET as string,
    // ) as JwtPayload;
    const verifyTokens = verifyToken(request);
    if (verifyTokens !== null && verifyTokens.id !== user.id) {
      return NextResponse.json(
        { message: "Access denied. Not allowed. only user himself" },
        { status: 403 },
      );
    }
    await prisma.user.delete({ where: { id: user.id } });
    const commentIds = user?.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
    return NextResponse.json(
      { message: "user has been deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id)
      return NextResponse.json({ message: "not allowed " }, { status: 403 });
    return NextResponse.json(user, { status: 200 });
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
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user)
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id)
      return NextResponse.json({ message: "not allowed " }, { status: 403 });
    const body = (await request.json()) as UpdateUserDto;
    const validation = updateUserSchema.safeParse(body);
    if (validation.error)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
      // will use pure js
      // select: {
      //   id: true,
      //   email: true,
      //   username: true,
      //   createdAt: true,
      //   isAdmin: true,
      // },
    });

    const { password, ...other } = updatedUser;
    console.log(password);
    console.log("=>", other);
    // return NextResponse.json(other, { status: 200 });
    return NextResponse.json({ ...other }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
