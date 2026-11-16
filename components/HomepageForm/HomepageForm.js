import { useRouter } from 'next/router';
import styles from './HomepageForm.module.css';

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
        </svg>
    );
}

function FridgeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
            <path d="M5 9.5h14" />
            <path d="M8.5 5.5v1.5M8.5 12.5v3" />
        </svg>
    );
}

export default function HomePageForm({ handleInputChange, handleIngredientChange }) {
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const cocktail = formData.get('cocktailInput')?.trim();
        const ingredients = formData.get('ingredientInput')?.trim();

        if (cocktail) {
            handleInputChange(cocktail);
            router.push({ pathname: `${cocktail}` });
        } else if (ingredients) {
            handleIngredientChange(ingredients);
            router.push({ pathname: `${ingredients}` });
        }
    }

    return (
        <form className={styles.homepageForm} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="cocktailInput" className={styles.label}>
                    What is your tipple of choice?
                </label>
                <div className={styles.inputWrap}>
                    <SearchIcon />
                    <input
                        id="cocktailInput"
                        type="search"
                        name="cocktailInput"
                        className={styles.input}
                        placeholder="e.g. Margarita"
                        autoComplete="off"
                        enterKeyHint="search"
                    />
                </div>
            </div>

            <div className={styles.divider} aria-hidden="true">
                <span>or</span>
            </div>

            <div className={styles.field}>
                <label htmlFor="ingredientInput" className={styles.label}>
                    What do you have in your fridge?
                </label>
                <div className={styles.inputWrap}>
                    <FridgeIcon />
                    <input
                        id="ingredientInput"
                        type="search"
                        name="ingredientInput"
                        className={styles.input}
                        placeholder="e.g. gin, lime and mint"
                        autoComplete="off"
                        enterKeyHint="search"
                    />
                </div>
            </div>

            <button type="submit" className={styles.homepageFormButton}>
                I'm thirsty! Let's go <span aria-hidden="true">🍸</span>
            </button>
        </form>
    );
}
