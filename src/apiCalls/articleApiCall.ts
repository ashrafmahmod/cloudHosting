import { Article } from "@/generated/prisma/client";
import { SingleArticle } from "@/utils/types";

export async function getArticles(
  pageNumber: string | undefined,
): Promise<Article[]> {
  const response = await fetch(
    `http://localhost:3000/api/articles?pageNumber=${pageNumber}`,
  );
  // by default in modern next no cahce to cahce u need code
  // caching cases
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts" , {

  //   // cache:"no-store" // here we stop caching
  //   next:{revalidate:50} // here next will update caching after 50s
  //   // cache:"force-cache" // the default and if u wanna cache dont write it
  // })
  if (!response.ok) {
    throw new Error("failed to fetch articles:" + response.status);
  }
  //  const articles:Article[] =  await response.json()
  //  return articles
  return response.json();
}
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/articles/count`);
  if (!response.ok) {
    throw new Error("failed to fetch articles count: " + response.status);
  }
  const { count } = (await response.json()) as { count: number };
  return count;
}

export async function getArticlesBasedOnSearch(
  searchText: string,
): Promise<Article[]> {
  const response = await fetch(
    `http://localhost:3000/api/articles/search?searchText=${searchText}`,
  );

  // if (response.status === 404) {
  //   notFound(); this nav to notfound page
  // }
  if (!response.ok) {
    throw new Error("failed to fetch articles:" + response.status); // this will go to error page specially in backend we throw 404
  }

  return response.json();
}
export async function getSingleArticle(
  articleId: string,
): Promise<SingleArticle> {
  const response = await fetch(
    `http://localhost:3000/api/articles/${articleId}`,
  );
  if (!response.ok) {
    throw new Error("failed to fetch articles:" + response.status);
  }
  return response.json();
}
