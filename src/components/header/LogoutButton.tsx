"use client";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { domain } from "@/utils/constants";
const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${domain}/api/users/logout`);

      toast.success(data.message);
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("Something went wrong");
      console.log(error);
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-gray-700 text-gray-200 px-1 rounded cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
