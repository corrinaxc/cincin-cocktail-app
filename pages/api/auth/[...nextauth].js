import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/db"


export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async session({session, user}) {
            console.log(user);
            session.user.id = user.id;

            return session
        }
    },
    secret: process.env.JWT_SECRET
})