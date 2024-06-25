import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import React from 'react'
import { handleSignUp } from '@/lib/serverAction';

const page = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
    <div className="bg-white pt-8 pl-8 pr-8 pb-3 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form action={handleSignUp} method="POST" className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" required/>
            </div>
            <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" required/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" required/>
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
            </div>
        </form>
        <form className="flex flex-col justify-center" action="">
            <div className=" text-center m-2">Or</div>
            <button type='submit' className='flex gap-2 justify-center w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"'><FcGoogle className="text-[24px]" /><p>Sign Up with Google</p></button>
        </form>
        <p className="text-center text-stone-800 p-4">Already have an account? <Link className="hover:underline font-semibold text-blue-600" href="/login">Login</Link></p>
    </div>
</div>

  )
}

export default page
