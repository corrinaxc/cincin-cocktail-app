import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from './AddCocktailButton.module.css';

// Floating "Add cocktail" button that sits just above the bottom nav
export default function AddCocktailButton() {
    const { status } = useSession();
    const href = status === "unauthenticated" ? "/login" : "/addcocktail";

    return (
        <Link href={href} className={styles.addCocktailButton}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Add cocktail</span>
        </Link>
    );
}
