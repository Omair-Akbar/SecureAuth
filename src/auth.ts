import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import { User } from "./models/user.model";
import { connectDB } from "./lib/connectDB";
import bcrypt from "bcryptjs"

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
                    label: "password"
                }
            },
            authorize: async (credentials) => {
                const email = credentials.email as string
                const password = credentials.password as string
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Missing credentials');
                }
                
                await connectDB();
                const user = await User.findOne({ email })

                if (!user) {
                    console.log("??????????????Invalid email or password")
                    console.log(email, password)
                    throw new Error("Invalid email")
                }


                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                     console.log("logined");
                 return { name: user.name, email: user.email, id: user._id }; 
                }
                else throw new Error("Wrong Password")

                // }
                // else{
                //     console.log("Invalid email or password")
                //     console.log(email,password)
                //     return null                    
                //     // throw new Error("Invalid username and password <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>")
                // }


            }
        }),
    ],
    pages: {
        signIn: "/login",
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