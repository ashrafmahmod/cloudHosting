import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// it should be post not get
export async function GET(request: NextRequest) {
  try {
    (await cookies()).delete("jwtToken");
    return NextResponse.json(
      { message: "you are logged out successfully!" },
      { status: 200 },
    );
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
