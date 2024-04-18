import React from "react";
import {useSession, signIn, signOut} from 'next-auth/react'

const login = () => {
    const {data: session} = useSession();
    console.log(session);

    if (session) {
        return (
            <div>
            <p>Welcome, {session.user.name}</p>
            <img src={session.user.image} alt="user-google-profile"/>
            <button onClick = {() => signOut()}>Sign Out</button>
            </div>
        )
    }
else {
    return (
        <div>
        <h1>Log In</h1>
        <button onClick={() => signIn()} >Sign In</button>
        </div>
    )
}
}

export default login