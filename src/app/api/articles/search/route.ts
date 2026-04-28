import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/lib.prisma";

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let articles;
    if (searchText) {
      articles = await prisma.article.findMany({
        where: {
          //   title: searchText we gonna improve it coz might we have many items with same title this will get one
          title: {
            // equals:searchText, // this will get full title name like java but what if java is good wont cound so we use
            startsWith: searchText,
            mode: "insensitive",
          },
        },
      });
      console.log("====>", articles);
      // if (articles.length <= 0)
      // return NextResponse.json({ message: "notfound" }, { status: 404 }); handle in frontend
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
