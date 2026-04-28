import jwt from "jsonwebtoken";
import { JwtPayloadType } from "./types";
import { serialize } from "cookie";
export function generateToken(jwtPayload: JwtPayloadType) {
  return jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
}

// set cookie
export function setCookie(jwtPayload: JwtPayloadType): string {
  const token = generateToken(jwtPayload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true, // ppl cant edit on cookie on browser or see it
    secure: process.env.NODE_ENV === "production", // this if http or https
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // expires in 60 * 60 means
    // 1 hour coz 1 hour has 60 mins and that value in seconds so to convert to seconds 60 mins has 60 seconds so 60 * 60 means hour in seconds
  }); // u dont need to iinstall out library in next coz it provide a {cookies} from 'next/header'  but here we used out librari
  return cookie;
}
