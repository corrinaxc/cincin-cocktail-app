import React from "react";
import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Link from 'next/link';
import styles from "@/styles/Account.module.css";

function GlassIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4h16l-8 9z" />
            <path d="M12 13v7" />
            <path d="M8 20h8" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7.5-4.6-9-9.2C2 7.6 4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9C20 4.5 22 7.6 21 10.8 19.5 15.4 12 20 12 20Z" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

const Account = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;

    if (status !== 'authenticated') {
        return (
            <section className={styles.card}>
                <h1 className={styles.name}>Account</h1>
                <p className={styles.email}>You are not signed in.</p>
            </section>
        );
    }

    const { name, email, image } = session.user;
    const initial = name?.trim()?.[0]?.toUpperCase() ?? '?';

    return (
        <section className={styles.card}>
            <div className={styles.profile}>
                {image ? (
                    <img className={styles.avatar} src={image} alt="" referrerPolicy="no-referrer" />
                ) : (
                    <div className={styles.avatar} aria-hidden="true">{initial}</div>
                )}
                <p className={styles.welcome}>✨ Welcome back ✨</p>
                <h1 className={styles.name}>{name}</h1>
                {email && <p className={styles.email}>{email}</p>}
            </div>

            <nav className={styles.links} aria-label="Your cocktails">
                <Link href="/mycocktails" className={`${styles.link} ${styles.primary}`}>
                    <GlassIcon />
                    <span>My Cocktails</span>
                </Link>
                <Link href="/favourites" className={styles.link}>
                    <HeartIcon />
                    <span>Favourites</span>
                </Link>
                <Link href="/addcocktail" className={styles.link}>
                    <PlusIcon />
                    <span>Add a cocktail</span>
                </Link>
            </nav>

            <button type="button" className={styles.signOut} onClick={() => signOut()}>
                Sign out
            </button>
        </section>
    );
}

export default Account;

export const getServerSideProps = async (context) => {
    // Read the session cookie directly on the server (no extra HTTP request)
    const session = await getServerSession(context.req, context.res, authOptions);
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
