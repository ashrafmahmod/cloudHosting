"use client";
import { domain } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface DeleteArticleButtonProps {
  articleId: number;
}
const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
  const router = useRouter();
  const deleteArticleHandler = async () => {
    try {
      if (confirm("you want to delete this article , are you sure?")) {
        await axios.delete(`${domain}/api/articles/${articleId}`);
      }
      router.refresh();
      toast.success("article has beed delteded");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };
  return (
    <div
      onClick={deleteArticleHandler}
      className="bg-red-600 text-white rounded-lg cursor-pointer inline-block text-center py-1 px-2 hover-bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteArticleButton;
