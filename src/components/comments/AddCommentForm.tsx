"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
interface AddCommentFormProps {
  articleId: number;
}
import axios from "axios";
import { useRouter } from "next/navigation";
const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const notify = () => toast("comment added successfully");
  const [text, setText] = useState("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("please add comment");
    try {
      await axios.post(`http://localhost:3000/api/comments`, {
        text,
        articleId,
      });
      router.refresh();
      notify();
      setText("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded text-xl border-none text-gray-900 bg-white"
        type="text"
        placeholder="add comment"
      />
      <button
        className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
        type="submit"
      >
        comment
      </button>
    </form>
  );
};

export default AddCommentForm;
