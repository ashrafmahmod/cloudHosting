"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Article } from "@/generated/prisma/client";

interface EditArticleFormProps {
  article: Article;
}
const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const [title, setTitle] = useState(article.title);
  const router = useRouter();
  const [description, setDescription] = useState(article.description);
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("title required");
    if (description === "") return toast.error("description required");
    try {
      await axios.put(`http://localhost:3000/api/articles/${article.id}`, {
        title,
        description,
      });
      toast.success("Article updated successfully");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  };
  //   const notify = () => toast("Article added successfully");
  return (
    <form className="flex flex-col " onSubmit={formSubmitHandler}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white border-gray-300 mb-4 border rounded p-2 text-xl outline-0"
        type="text"
      />
      <textarea
        className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="text-2xl text-white bg-green-700 p-2 rounded-lg font-bold cursor-pointer hover:bg-green-900"
        type="submit"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;
