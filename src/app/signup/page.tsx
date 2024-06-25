import Link from 'next/link';
import { FaGithub } from "react-icons/fa6";
import React from 'react';
import { googleLogin, handleSignUp } from '@/lib/serverAction';

const page = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center text-white">
      <div className="bg-gray-800 pt-8 pl-8 pr-8 pb-3 rounded-lg shadow-lg mx-7 w-full sm:w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
        <form action={handleSignUp} method="POST" className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-400">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-400 bg-gray-700 text-white" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-400">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className=" w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-400 bg-gray-700 text-white" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-400">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-400 bg-gray-700 text-white" 
              required 
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 p-4">Already have an account? <Link className="hover:underline font-semibold text-blue-400" href="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default page;
