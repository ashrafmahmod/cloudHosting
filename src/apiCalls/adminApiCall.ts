import { Comment } from "@/generated/prisma/client";
import { domain } from "@/utils/constants";

export async function getAllComments(token: string): Promise<Comment[]> {
  // const response = await fetch(`http://localhost:3000/api/comments`, {
  const response = await fetch(`${domain}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`, // here we must send token to the server coz this component is server component not client and has no access on browser
      // so cant automatic send cookie(token)
    },
  });
  if (!response.ok) throw new Error("failed to fetch comments");
  return response.json();
}
