import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayloadType } from "./types";
// verify token for backend

export function verifyToken(request: NextRequest): null | JwtPayloadType {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JwtPayloadType;
    return userPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// here we decode token for frontend we check if user logged in and getting username id and role
export function verifyTokenforpage(token: string): null | JwtPayloadType {
  try {
    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JwtPayloadType;
    if (!userPayload) return null;
    return userPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
