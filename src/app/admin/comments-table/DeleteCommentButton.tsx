"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface DeleteCommentButtonprops {
  commentId: number;
}
const DeleteCommentButton = ({ commentId }: DeleteCommentButtonprops) => {
  const router = useRouter();
  const deleteCommentHandler = async () => {
    try {
      if (confirm("you gonna delete comment , are you sure?")) {
        await axios.delete(`http://localhost:3000/api/comments/${commentId}`);
        router.refresh();
        toast.success("comment deleted");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <div
      onClick={deleteCommentHandler}
      className="bg-red-600 text-white rounded-lg py-1 inline-block px-2 cursor-pointer hover:bg-red-800 transition"
    >
      Delete
    </div>
  );
};

export default DeleteCommentButton;
