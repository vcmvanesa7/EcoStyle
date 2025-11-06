import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import dbConnection from './dbconnection';
import User from '@/database/models/users';
import { loginProps } from "@/types/login";

export const authOptions: NextAuthOptions = {
    session:{
        strategy:"jwt",
    },

    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{},

            async authorize(credentials){
                const { email,password } = credentials as loginProps;

                await dbConnection();
                
                //find user by email
                const user = await User.findOne({ email });
                if  (!user) throw new Error("Invalid credentials");

                //compare Password
                const match = await bcrypt.compare(password, user.password);
                if (!match) throw new Error("Invalid credentials");

                //return user data to encode in JWT
                return{
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({  token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },

        async session ({  session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.username = token.username;
            session.user.role = token.role;
            
            return session
        },
    },

    pages: {
        signIn: "/login",
    },
};