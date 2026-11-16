import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/db";

// Exported so API routes can check who is signed in with getServerSession()
export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    // Sessions live in a signed, encrypted cookie (JWT) instead of the database.
    // The adapter still stores users and their Google accounts when they sign in,
    // but checking who's signed in no longer needs two database round trips.
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            // On sign-in, keep the database user id (the same id favourites and
            // cocktails are saved under)
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id ?? token.sub;
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
