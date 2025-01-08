'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../pages/sidebar/page';
import MessageContainer from '../pages/messageContainer/page';
import { useAuthContext } from '../context/AuthContext/page';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { authUser } = useAuthContext(); // Get the logged-in user from context
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to continue");
    }
  }, [authUser]);

  // If the user is not logged in, show a placeholder message
  if (!authUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-xl font-bold text-gray-700">You must log in to access this page.</h1>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
