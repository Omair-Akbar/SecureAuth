import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import google from "next-auth/providers/google"
import { User } from "./models/user.model";
import bcrypt ,{ compare} from "bcryptjs"


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password")
                }
                if (typeof email !== "string") throw new CredentialsSignin("Email is not valid")
                const user = await User.findOne({ email }).select("+password");
                if(!user.password)throw new CredentialsSignin("Invalid email or password")
               let hashedPassword = await bcrypt.hash(password,5)
                const isMatch = await compare(user.password,password)


                if(!user) throw new CredentialsSignin("Password doesn't match")
                if(password !== "passcode")
                    throw new CredentialsSignin("Password doesn't match")
                else return {email:user.email,password:user.password,id:user._id};
            }
        }),
    ],
})