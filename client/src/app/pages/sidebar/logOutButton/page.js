'use client'
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import { useAuthContext } from "@/app/context/AuthContext/page";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:9000/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-auto flex justify-center items-center space-x-2">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center px-4 py-2 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all"
      >
        {loading ? (
          <span className="loading loading-spinner text-white"></span>
        ) : (
          <BiLogOut className="w-6 h-6 mr-2" />
        )}
        {loading ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
};

export default LogoutButton;
