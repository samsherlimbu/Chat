'use client'
import { useAuthContext } from '@/app/context/AuthContext/page';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

// import { useAuthContext } from '../context/AuthContext'; // Import useAuthContext


const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); // Use setAuthUser from context
    const router = useRouter();

  const signup = async ({ fullName, username, password, confirmpassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmpassword, gender });
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:9000/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, username, password, confirmpassword, gender }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Save user to localStorage and update AuthContext
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);

      toast.success('Signup successful!');
      router.push('/home');
    } catch (error) {
      toast.error(error.message || 'An error occurred while signing up');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmpassword, gender }) {
  if (!fullName || !username || !password || !confirmpassword || !gender) {
    toast.error('All fields are required');
    return false;
  }
  if (password !== confirmpassword) {
    toast.error('Please enter the same password in both fields');
    return false;
  }
  if (password.length < 8) {
    toast.error('Please enter a password of at least 8 characters');
    return false;
  }
  return true;
}
