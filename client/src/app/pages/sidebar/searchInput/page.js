'use client';
import Useconversation from '@/app/hooks/useconversation/page';
import useConversation from '@/app/zustand/page';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoSearchSharp } from 'react-icons/io5';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = Useconversation(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error('Search query must be at least 3 characters long');
      return;
    }

    // ✅ Correctly find the conversation
    const conversation = conversations?.find((c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(''); // Reset the input
    } else {
      toast.error('No user found');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow px-4 py-2 text-sm text-gray-700 bg-transparent outline-none rounded-full focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        className="p-2 bg-sky-500 rounded-full text-white hover:bg-sky-600 focus:ring-2 focus:ring-sky-400 transition-colors duration-200"
        aria-label="Search"
      >
        <IoSearchSharp className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchInput;
