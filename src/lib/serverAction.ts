"use server"
import bcrypt from "bcryptjs"
import { User } from "@/models/user.model"
import { redirect } from "next/navigation"
import { connectDB } from "./connectDB"
import { CredentialsSignin } from "next-auth"
import { signIn } from "@/auth"


export const handleLogin = async (formData: FormData) => {
    "use server"
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
        await signIn("credentials", { email, password })

    } catch (error) {
        const err = error as CredentialsSignin;
        return err.message
    }
}


export const handleSignUp = async (formData: FormData) => {
    "use server"
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = await User.findOne({ email })
    if (user) throw new Error("User already exists")

    const hashedPassword = await bcrypt.hash(password, 5)
    await connectDB();
    await User.create({
        name, email, password: hashedPassword
    })
    redirect("/login")
}


export const googleLogin = async () => {
    "use server"
    await signIn("github")
}






