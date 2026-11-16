import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
import styles from "./Searchbar.module.css";

// Search box at the top of the results page. It searches the same way as the
// last homepage search (by cocktail name or by ingredients).
export default function Searchbar() {
    const router = useRouter();
    const [isIngredientSearch] = useLocalStorageState("ingredientSearch", { defaultValue: false });

    function handleSearch(e) {
        e.preventDefault();
        const searchQuery = new FormData(e.target).get("newCocktailSearch")?.trim();
        if (searchQuery) router.push(searchQuery);
    }

    const label = isIngredientSearch ? "Search by ingredients" : "Search cocktails";

    return (
        <form className={styles.form} onSubmit={handleSearch} role="search">
            <div className={styles.inputWrap}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16l4.5 4.5" />
                </svg>
                <input
                    className={styles.input}
                    name="newCocktailSearch"
                    type="search"
                    placeholder={isIngredientSearch ? "Try other ingredients…" : "Search another cocktail…"}
                    aria-label={label}
                    autoComplete="off"
                    enterKeyHint="search"
                />
            </div>
            <button type="submit" className={styles.button} aria-label={label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                </svg>
            </button>
        </form>
    );
}
