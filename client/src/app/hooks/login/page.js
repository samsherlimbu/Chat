"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const { useAuthContext } = require("@/app/context/AuthContext/page");



const Uselogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const login = async ({ username, password }) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:9000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Signup successful!");
      router.push("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default Uselogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("All fields are required");
    return false;
  }
  return true;
}
