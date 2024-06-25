import React from 'react';
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { googleLogin, handleLogin } from "@/lib/serverAction";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center text-white">
            <div className="bg-gray-800 pt-8 pl-8 pr-8 pb-3 rounded-lg shadow-lg mx-7 w-full sm:w-96">
                <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
                <form action={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-gray-400">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-400 bg-gray-700 text-white"
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
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <form className="flex flex-col justify-center mt-4" action={googleLogin}>
                    <div className="m-2 text-center text-gray-400">Or</div>
                    <button
                        type='submit'
                        className='flex gap-2 justify-center w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                    >
                        <FaGithub className="text-[24px] mr-1" />
                        <p>Login with Github</p>
                    </button>
                </form>
                <p className="text-center text-gray-400 p-4">Don't have an account? <Link className="hover:underline font-semibold text-blue-400" href="/signup">SignUp</Link></p>
            </div>
        </div>
    )
}

export default page;
