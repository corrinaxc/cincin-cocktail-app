import { useRouter } from 'next/router';
import { sizedThumb } from '@/lib/cocktailImage';
import styles from './CocktailDetailCard.module.css';

// Shared layout for a single cocktail, used by /cocktails/[id] and
// /mycocktails/[id] so both pages look the same. `action` is the button shown
// top-right (favourite on API cocktails, delete on the user's own cocktails).
export default function CocktailDetailCard({ name, image, ingredients = [], method, action }) {
  const router = useRouter();

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="M11 6l-6 6 6 6" />
          </svg>
        </button>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.action}>{action}</div>
      </header>

      {image && (
        <img className={styles.image} src={sizedThumb(image)} alt={name} />
      )}

      {ingredients.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <ul className={styles.ingredients}>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </section>
      )}

      {method && (
        <section>
          <h2 className={styles.sectionTitle}>Method</h2>
          <p className={styles.method}>{method}</p>
        </section>
      )}
    </article>
  );
}
