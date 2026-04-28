import { LoginDto } from "@/utils/dtos";
import { prisma } from "@/utils/lib.prisma";
import { loginSchema } from "@/utils/validationSchemas";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
// import { serialize } from "cookie";
import { generateToken, setCookie } from "@/utils/generateToken";
import { JwtPayloadType } from "@/utils/types";
export async function POST(request: NextRequest) {
  try {
    const body: LoginDto = (await request.json()) as LoginDto;
    const validation = loginSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user)
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 401 },
      );
    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordMatched)
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 401 },
      );

    const jwtPayload: JwtPayloadType = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    // const token = generateToken(jwtPayload);
    // goona use function in utails file
    // const cookie = serialize("jwtToken", token, {
    //   httpOnly: true, // ppl cant edit on cookie on browser or see it
    //   secure: process.env.NODE_ENV === "production", // this if http or https
    //   sameSite: "strict",
    //   path: "/",
    //   maxAge: 60 * 60 * 24 * 30, // expires in 60 * 60 means
    //   // 1 hour coz 1 hour has 60 mins and that value in seconds so to convert to seconds 60 mins has 60 seconds so 60 * 60 means hour in seconds
    // }); // u dont need to iinstall out library in next coz it provide a {cookies} from 'next/header'  but here we used out librari
    const cookie = setCookie(jwtPayload);
    // return NextResponse.json({ message: "logged in", token }, { status: 200 });
    return NextResponse.json(
      { message: "logged in" },
      { status: 200, headers: { "Set-Cookie": cookie } },
    ); // we removed token coz we save in cookie in headers
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
