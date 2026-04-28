import { getSingleArticle } from "@/apiCalls/articleApiCall";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { SingleArticle } from "@/utils/types";
import { verifyTokenforpage } from "@/utils/verifyToken";
// import { Article } from "@/generated/prisma/client"; not right coz api returns with each article comments[] and each comment contains user
import { cookies } from "next/headers";
interface SingleArticlePageProps {
  params: Promise<{ id: string }>; //{ params:{id:10} , searchParams:{searchText:afnan}}=>
  //  destructuring {params}=>{params:{id:10} }=> {params:{id:string}}
}
// const article: Article = {
//   userId: 1,
//   id: 1,
//   title:
//     "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
// };

const SingleArticlePage = async ({ params }: SingleArticlePageProps) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000)); //we made this to delay loading
  // 2. Await the cookies() function
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenforpage(token); // we check on it to know if user logged in or not coz of security user can create jwtToken in broser
  // if u just check if!token means user not logged in with manually creating token server will act as he s logged in
  const { id } = await params;
  const article: SingleArticle = await getSingleArticle(id);
  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4 ">
      <div className="bg-white p-7 rounded-lg mb-7">
        <h1 className="text-3xl font-bold text-gray-700 mb-2 ">
          {article.title}
        </h1>
        <div className="text-gray-400 ">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      <div className="mt-7">
        {payload ? (
          <AddCommentForm articleId={article.id} />
        ) : (
          <p className="text-blue-600 md:text-xl">
            to write a comment you should log in first{" "}
          </p>
        )}
      </div>
      <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">
        Comments
      </h4>
      {article.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} userId={payload?.id} />
      ))}
    </section>
  );
};

export default SingleArticlePage;
