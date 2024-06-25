import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const DeleteButton = () => {

    const handleSignOut = async () => {
        "use server"
        console.log("logout")
        cookies().delete("authjs.session-token")
        redirect("/login")
    }

    return (
        <form action={handleSignOut}>
            <button type='submit' className="bg-purple-600  hover:bg-purple-500 text-white p-1 px-4 rounded-md focus:outline-none">Logout</button>
        </form>
    )
}

export default DeleteButton
