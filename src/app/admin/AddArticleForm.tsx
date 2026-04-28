"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";

const AddArticleForm = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [description, setDescription] = useState("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("title required");
    if (description === "") return toast.error("description required");
    try {
      await axios.post(
        `${domain}/api/articles`,
        {
          title,
          description,
        },
        // ,{ but i dont need it coz i set cookie in backend already and stored in header
        //       headers:{
        //             "Set-Cookie"
        //       }
        // }
      );
      setTitle("");
      setDescription("");
      // notify();
      toast.success("Article added successfully");
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
        placeholder="Enter article title"
      />
      <textarea
        className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
        rows={5}
        placeholder="Enter article description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="text-2xl text-white bg-blue-700 p-2 rounded-lg font-bold cursor-pointer hover:bg-blue-900"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
