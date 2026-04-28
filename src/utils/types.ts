import { Article, User, Comment } from "@/generated/prisma/client";

export type JwtPayloadType = {
  id: number;
  isAdmin: boolean;
  username: string;
};
export type CommentWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentWithUser[] };
