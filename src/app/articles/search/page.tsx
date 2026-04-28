import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/articles/ArticleItem";
import { Article } from "@/generated/prisma/client";

interface SerachArticlePageProps {
  // searchParams: { searchText: string }; it gives error coz dynamic api in next above 15 now async before were sync so u need to await it before access dynamic apis like params ,searchParams , headers,cookies()
  searchParams: Promise<{ searchText: string }>;
}
// const ArticleSerachPage = (props: SerachArticlePageProps) => {
const ArticleSerachPage = async ({ searchParams }: SerachArticlePageProps) => {
  const {searchText} = await searchParams
  const articles:Article[] = await getArticlesBasedOnSearch(searchText)

  return (
    <section className="fix-height container m-auto px-5 ">
      {articles.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold p-5">Articles based on 
          <span className="text-red-500 mx-1">{searchText}</span>
          Not found
        </h2>
      ) : (<>
      
      <h1 className="text-2xl font-bold mt-7 mb-2 text-gray-800">
        Articles based on 
        <span className="ms-1 text-green-700 text-3xl font-bold">{searchText}</span>
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map(item=>(<ArticleItem key={item.id} article={item}/>))}
      </div>
      </>)}
    </section>
  );
};

export default ArticleSerachPage;
