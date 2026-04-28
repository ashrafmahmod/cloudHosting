"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // we use this hook for example to navigate when user click login to home page
import axios from "axios";
import ButtonSpiner from "@/components/ButtonSpiner";
import { domain } from "@/utils/constants";
const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") return toast.error("email required");
    if (password === "") return toast.error("password required");
    try {
      setLoading(true);
      await axios.post(`${domain}/api/users/login`, {
        email,
        password,
      });
      notify();
      router.replace("/"); // here it replace login page to home so when click back on browser u cant back to login page
      // router.push("/") // when using push when click back it saves in browser history login page so can back to login
      setLoading(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  const notify = () => toast("logged in successfully");
  return (
    <form className="flex flex-col " onSubmit={formSubmitHandler}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-gray-300 mb-4 border rounded p-2 text-xl outline-0"
        type="email"
        placeholder="Enter your email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-gray-300 mb-4 border rounded p-2 text-xl outline-0"
        type="password"
        placeholder="Enter your password"
      />
      <button
        disabled={loading}
        className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold cursor-pointer "
        type="submit"
      >
        {/* {loading ? "loading..." : "Login"} */}
        {loading ? <ButtonSpiner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
