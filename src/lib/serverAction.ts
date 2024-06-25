"use server"
import bcrypt from "bcryptjs"
import { User } from "@/models/user.model"
import { redirect } from "next/navigation"


export const handleLogin = async (formData: FormData) => {
    "use server"
    const email = formData.get("email") as string | undefined
    const password = formData.get("password") as string | undefined

    console.log(email, password)

}


export const handleSignUp = async (formData: FormData) => {
    "use server"
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = await User.findOne({ email })
    if (user) throw new Error("User already exists")

    const hashedPassword = await bcrypt.hash(password, 5)
    // connect to database
    await User.create({
        name, email, password: hashedPassword
    })

    redirect("/login")
}