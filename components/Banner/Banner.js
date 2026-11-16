import Link from 'next/link';
import styles from './Banner.module.css';

// Two glasses tilted towards each other – "cin cin!" is a toast – and they
// clink when you hover over the logo.
export default function Banner() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.banner} aria-label="Cin-Cin home">
                <img className={`${styles.glass} ${styles.left}`} src="/resources/cocktail.png" alt="" />
                <span className={styles.title}>Cin-Cin</span>
                <img className={`${styles.glass} ${styles.right}`} src="/resources/cocktail.png" alt="" />
            </Link>
        </header>
    );
}
