"use server"
import { User } from "@/models/user.model"
import { redirect } from "next/navigation"
import { connectDB } from "./connectDB"
import { auth, signIn } from "@/auth"
import bcrypt from "bcryptjs"
import toast from "react-hot-toast"

export const handleLogin = async (formData: FormData) => {
    "use server"
    
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    try {
       await signIn("credentials", { email, password } )
    } catch (error:any) {
        const err = error.message;
        console.log(err)
        return err
    }
    finally{
        const session = await auth();
    if (session?.user) {
        redirect("/")
    }
}
}

export const handleSignUp = async (formData: FormData) => {
    "use server"
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const hashPassword = await bcrypt.hash(password,10)
    const user = await User.findOne({ email })
    if (user) throw new Error("User already exists")
    


    await connectDB();
    await User.create({
        name, email, password:hashPassword
    })
    redirect("/login")
}


export const googleLogin = async () => {
    "use server"
    await signIn("github")
    toast("",{position:"top-center"})
}






