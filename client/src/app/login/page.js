'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Uselogin from '../hooks/login/page';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loading, login } = Uselogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md bg-opacity-90">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md font-medium transition duration-200"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link href="/signup" className="text-sm text-blue-500 hover:underline">
              Doesn't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
