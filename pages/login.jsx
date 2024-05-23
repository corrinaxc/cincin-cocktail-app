import React from "react";
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router';

const login = () => {
    const { data: session } = useSession();
    const router = useRouter();

    console.log(session);

    if (session) {
        router.push('/account');
        return null; 
    } else {
        return (
            <div className="logInDiv">
            <div className="glassHalfFullDiv">
            <img className="w-10 text-center " src="/resources/halfempty.jpeg" alt="glasshalfempty-icon"/>
            <h1>   Glass Half Empty!   </h1>
            <img className="w-10" src="/resources/halfempty.jpeg" alt="glasshalfempty-icon"/>
            </div>
            <div className="signInDiv">
                <p><button className="signInButton" onClick={() => signIn()} >Sign In</button> to fill it up!</p>
            </div>
            </div>
        );
    }
}

export default login;