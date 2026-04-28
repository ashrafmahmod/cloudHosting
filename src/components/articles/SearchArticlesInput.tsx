"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const SearchArticlesInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/articles/search?searchText=${searchText}`);
  };
  return (
    <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-3 rounded text-xl border-none text-gray-900 bg-white"
        type="search"
        placeholder="Search form article"
      />
    </form>
  );
};

export default SearchArticlesInput;
