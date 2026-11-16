import Link from 'next/link';
import { sizedThumb } from '@/lib/cocktailImage';
import styles from './CocktailListCard.module.css';

// Collects strIngredient1..15 from a TheCocktailDB drink object
export function drinkIngredients(drink) {
    if (!drink) return [];
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`]?.trim();
        if (ingredient) ingredients.push(ingredient);
    }
    return ingredients;
}

export function drinkMeta(drink) {
    return [drink?.strCategory, drink?.strGlass].filter(Boolean).join(' · ');
}

// Shared recipe card used for the featured cocktail, search results,
// favourites and My Cocktails, so they all look the same.
// - `label`: optional small heading (e.g. "Featured cocktail"); with a label the
//   actions sit in a header row, otherwise they sit beside the name.
// - `actions`: buttons shown top-right (favourite, delete, 👎 …)
export default function CocktailListCard({
    href,
    name,
    image,
    ingredients = [],
    meta,
    label,
    actions,
    className = '',
    imageLoading = 'eager',
}) {
    const photo = image ? sizedThumb(image) : null;

    return (
        <article className={`${styles.card} ${className}`}>
            {label && (
                <div className={styles.header}>
                    <h2 className={styles.label}>{label}</h2>
                    {actions && <div className={styles.actions}>{actions}</div>}
                </div>
            )}

            <div className={styles.body}>
                <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
                    {photo ? (
                        <img className={styles.image} src={photo} alt="" loading={imageLoading} />
                    ) : (
                        <div className={`${styles.image} ${styles.placeholder}`}>🍸</div>
                    )}
                </Link>

                <div className={styles.details}>
                    <div className={styles.nameRow}>
                        <h3 className={styles.name}>
                            <Link href={href}>{name}</Link>
                        </h3>
                        {!label && actions && <div className={styles.actions}>{actions}</div>}
                    </div>
                    {meta && <p className={styles.meta}>{meta}</p>}
                    {ingredients.length > 0 && (
                        <ul className={styles.ingredients}>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    )}
                    <Link href={href} className={styles.recipeLink}>
                        View recipe <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
