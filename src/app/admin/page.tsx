import AddArticleForm from "./AddArticleForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyTokenforpage } from "@/utils/verifyToken";

const AdminPage = async () => {
  // 2. Await the cookies() function
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;
  if (!token) redirect("/");
  const payload = verifyTokenforpage(token);
  if (payload?.isAdmin === false) redirect("/");
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full ">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Add new article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
};

export default AdminPage;
