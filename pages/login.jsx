// import React from "react";
// import { useSession, signIn, signOut } from 'next-auth/react'
// import { useRouter } from 'next/router';

// const login = () => {
//     const { data: session } = useSession();
//     const router = useRouter();

//     console.log(session);

//     if (session) {
//         router.push('/account');
//         return null; 
//     } else {
//         return (
//             <div className="logInDiv">
//             <div className="glassHalfFullDiv">
//             <img className="w-10 text-center " src="/resources/halfempty.jpeg" alt="glasshalfempty-icon"/>
//             <h1>   Glass Half Empty!   </h1>
//             <img className="w-10" src="/resources/halfempty.jpeg" alt="glasshalfempty-icon"/>
//             </div>
//             <div className="signInDiv">
//                 <p><button className="signInButton" onClick={() => signIn()} >Sign In</button> to fill it up!</p>
//             </div>
//             </div>
//         );
//     }
// }

// export default login;

import React, { useEffect } from "react";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleRouteChangeStart = (url) => {
            console.log('Route change started:', url);
        };

        const handleRouteChangeComplete = (url) => {
            console.log('Route change completed:', url);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]);

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/account');
        }
    }, [session, status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        return null;
    }

    return (
        <div className="logInDiv">
            <div className="glassHalfFullDiv">
                <img className="w-10 text-center" src="/resources/halfempty.jpeg" alt="glasshalfempty-icon" />
                <h1>Glass Half Empty!</h1>
                <img className="w-10" src="/resources/halfempty.jpeg" alt="glasshalfempty-icon" />
            </div>
            <div className="signInDiv">
                <p><button className="signInButton" onClick={() => signIn()}>Sign In</button> to fill it up!</p>
            </div>
        </div>
    );
}

export default Login;