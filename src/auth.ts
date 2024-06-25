import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import { User } from "./models/user.model";
import { compare } from "bcryptjs"
import { connectDB } from "./lib/connectDB";
import { redirect } from "next/navigation";


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialProvider({
            name: "Email",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                }, password: {
                    type: "password",
                    label: "Password"
                }
            },
            authorize: async (credentials) => {
                const email = credentials.email as string
                const password = credentials.password as string 

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password")
                }
                // if (typeof email !== "string") throw new CredentialsSignin("Email is not valid")

                await connectDB();

                const user = await User.findOne({ email }).select("+password");
                if (!user) throw new CredentialsSignin("Password doesn't match")
                if (!user.password) throw new CredentialsSignin("Invalid email or password")
                const isMatch = await compare(user.password, password)
// <<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>
                if(user){
                    console.log(user)
                }

                return { name: user.name, email: user.email, id: user._id };
                
            }
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider === "github") {
                try {
                    const { email, name, image, id } = user;
                    await connectDB();
                    const already = await User.findOne({ id: id })
                    if (already) {
                        return true
                    }
                    await User.create({ name, email, image, googleId: id })
                } catch (error) {
                    console.log(error)
                }
            }
            if (account?.provider === "credentials") return true;
            return true;
        }
    }
})