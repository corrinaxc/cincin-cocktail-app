import React from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import Link from 'next/link'; // Import Link from 'next/link'

const Account = () => {
    const { data: session, status } = useSession();
    if (status === 'authenticated') {
        return (
            <div>
                <h1>Account</h1>
                <p>Welcome {session.user.name}</p>
                <img src={session.user.image}></img>
                <button onClick={() => signOut()}>Sign Out</button>
                <Link href="/mycocktails">My Cocktails</Link>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Account</h1>
                <p>You are not signed in.</p>
            </div>
        );
    }
}

export default Account;

export const getServerSideProps = async (context) => { // Corrected function name
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        };
    }
    return {
        props: { session }
    };
};
