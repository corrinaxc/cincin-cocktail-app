import React from "react";
import {useSession, signOut, getSession} from "next-auth/react"

const account = () => {
    const {data: session, status} = useSession({required: true});
    if (status === 'authenticated') {
        return(
            <div>
                <p>Welcome {session.user.name}</p>
                <button onClick = {() => signOut()}>Sign Out</button>
            </div>
        )
    }

    else {
    return(
        <div>
        <p>You are not signed in.</p>
        </div>
    )}
}

export default account

// export const getServerSidePropers = async(context) => {
//     const session = await getSession(context)
//     return {
//         props: {session}
//     }
// }