"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // we use this hook for example to navigate when user click login to home page
import axios from "axios";
import ButtonSpiner from "@/components/ButtonSpiner";
const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "") return toast.error("username required");
    if (email === "") return toast.error("email required");
    if (password === "") return toast.error("password required");
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        password,
      });
      router.replace("/"); // here it replace login page to home so when click back on browser u cant back to login page
      // router.push("/") // when using push when click back it saves in browser history login page so can back to login
      setLoading(false);
      router.refresh();
      notify();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };
  const notify = () => toast("Registered in successfully");
  return (
    <form className="flex flex-col " onSubmit={formSubmitHandler}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-gray-300 mb-4 border rounded p-2 text-xl outline-0"
        type="text"
        placeholder="Enter your username"
      />
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
        {loading ? <ButtonSpiner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
