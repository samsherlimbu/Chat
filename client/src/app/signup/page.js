'use client'
import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox/page";
import Link from "next/link";
import UseSignUp from "../hooks/signup/page";
import useSignup from "../hooks/signup/page";

const SignUp = () => {

  const[input,setInput]= useState({
    fullName:'',
    username:'',
    password:'',
    confirmpassword:'',
    gender:'',
  })
  const {loading,signup}= useSignup()

  const handleCheckboxChange=(gender)=>{
    setInput({...input,gender})
  }

  const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(input);
	};

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md bg-opacity-90">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SignUp to <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={input.fullName}
              onChange={(e)=>setInput({...input,fullName:e.target.value})}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your fullName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={input.username}
              onChange={(e)=>setInput({...input,username:e.target.value})}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Enter your Username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e)=>setInput({...input,password:e.target.value})}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              value={input.confirmpassword}
              onChange={(e)=>setInput({...input,confirmpassword:e.target.value})}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-4">
            <GenderCheckBox  onCheckboxChange={handleCheckboxChange} selectedGender={input.gender}/>
          </div>
          <div className="mb-6">
            <Link href="/login" className="text-sm text-blue-500 hover:underline">
              Already have an Account?
            </Link>
          </div>

          <div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
