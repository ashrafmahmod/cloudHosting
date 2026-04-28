import { RegisterDto } from "@/utils/dtos";
import { prisma } from "@/utils/lib.prisma";
import { registerSchema } from "@/utils/validationSchemas";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken, setCookie } from "@/utils/generateToken";
import { JwtPayloadType } from "@/utils/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterDto;
    const validation = registerSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user)
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 },
      );
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });
    const jwtPayload: JwtPayloadType = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    // const token = generateToken(jwtPayload);
    const cookie = setCookie(jwtPayload);
    return NextResponse.json(
      { ...newUser, message: "registered and authanticated" },
      { status: 201, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
