import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/EasterEgg.module.css";

export default function EasterEgg() {
    return (
        <>
            <Head>
                <title>🍒 Secret cherry | Cin-Cin</title>
            </Head>
            <article className={styles.card}>
                <p className={styles.label}>🍒 You found the secret cherry!</p>
                <img className={styles.photo} src="/resources/bells.png" alt="A fluffy cat sitting next to a laptop showing the Cin-Cin code" />
                <h1 className={styles.title}>Thanks to the Copilot</h1>
                <p className={styles.caption}>Every line of this app was supervised by a very fluffy pair programmer.</p>
                <Link href="/" className={styles.button}>Back to the bar 🍸</Link>
            </article>
        </>
    );
}
