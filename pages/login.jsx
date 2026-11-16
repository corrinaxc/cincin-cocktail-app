import React, { useEffect, useState } from "react";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from "@/styles/Login.module.css";

// Half-empty glass that fills up while the sign-in button is hovered or focused
function HalfEmptyGlass({ full }) {
    return (
        <svg className={`${styles.glass} ${full ? styles.full : ''}`} viewBox="0 0 100 110" aria-hidden="true">
            <defs>
                <clipPath id="glassInside">
                    <path d="M22 14 H78 L71.5 96 a4 4 0 0 1 -4 3.6 H32.5 a4 4 0 0 1 -4 -3.6 Z" />
                </clipPath>
            </defs>
            <g clipPath="url(#glassInside)">
                <g className={styles.liquid}>
                    <path
                        className={styles.wave}
                        d="M-100 58 q12.5 -6 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 V130 H-100 Z"
                    />
                </g>
            </g>
            <path
                className={styles.outline}
                d="M16 8 H84 L75 103 H25 Z"
            />
            <path className={styles.shine} d="M30 22 L35 80" />
        </svg>
    );
}

export default function Login() {
    const { status } = useSession();
    const router = useRouter();
    const [filling, setFilling] = useState(false);

    // Already signed in? Go straight to the account page
    useEffect(() => {
        if (status === 'authenticated') router.replace('/account');
    }, [status, router]);

    if (status !== 'unauthenticated') return null;

    const fillOn = () => setFilling(true);
    const fillOff = () => setFilling(false);

    return (
        <section className={styles.card}>
            <HalfEmptyGlass full={filling} />
            <h1 className={styles.title}>Glass half empty!</h1>
            <p className={styles.subtitle}>
                Sign in to fill it up – save your favourite cocktails and add your own creations.
            </p>
            <button
                type="button"
                className={styles.signIn}
                onClick={() => signIn('google', { callbackUrl: '/account' })}
                onMouseEnter={fillOn}
                onMouseLeave={fillOff}
                onFocus={fillOn}
                onBlur={fillOff}
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.googleIcon}>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
                    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
                    <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
                    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
                </svg>
                Sign in with Google
            </button>
        </section>
    );
}
