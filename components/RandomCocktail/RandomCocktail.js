import useSWR from 'swr';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { useSession } from 'next-auth/react';
import styles from './RandomCocktail.module.css';
import card from '../CocktailListCard/CocktailListCard.module.css';
import CocktailListCard, { drinkIngredients, drinkMeta } from '../CocktailListCard/CocktailListCard';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

function ThumbsDownIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 14V3" />
            <path d="M9 18.5 10 14H5.2a2 2 0 0 1-2-2.3l1.2-7A2 2 0 0 1 6.4 3H17v11l-4.3 6.4a1.6 1.6 0 0 1-2.9-1Z" />
            <path d="M17 3h2.5a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H17" />
        </svg>
    );
}

// Placeholder with the same shape as the real card, so the page doesn't jump while loading
export function RandomCocktailSkeleton() {
    return (
        <section className={card.card} aria-busy="true" aria-label="Loading featured cocktail">
            <div className={card.header}>
                <h2 className={card.label}>Featured cocktail</h2>
            </div>
            <div className={card.body}>
                <div className={`${card.image} ${styles.skeleton}`} />
                <div className={card.details}>
                    <div className={`${styles.skeletonLine} ${styles.skeleton}`} />
                    <div className={`${styles.skeletonLine} ${styles.skeletonShort} ${styles.skeleton}`} />
                    <p className={styles.loadingText}>Shaking one up…</p>
                </div>
            </div>
        </section>
    );
}

export default function RandomCocktail({ randomCocktail, setAnimation, animation, nextCocktail }) {
    const { data: session, status } = useSession();
    const { data: favourites, mutate } = useSWR(
        status === 'authenticated' ? "/api/favourites" : null,
        fetcher
    );

    const cocktail = randomCocktail[0];

    function handleRejection() {
        setAnimation(true);
        setTimeout(() => {
            nextCocktail();
            setAnimation(false);
        }, 700);
    }

    return (
        <CocktailListCard
            key={cocktail.idDrink}
            className={animation ? 'shake' : ''}
            label="Featured cocktail"
            href={`/cocktails/${cocktail.idDrink}`}
            name={cocktail.strDrink}
            image={cocktail.strDrinkThumb}
            meta={drinkMeta(cocktail)}
            ingredients={drinkIngredients(cocktail)}
            actions={
                <>
                    <button
                        type="button"
                        className={styles.rejectionButton}
                        onClick={handleRejection}
                        aria-label="Show me a different cocktail"
                        title="Not for me – show another"
                    >
                        <ThumbsDownIcon />
                    </button>
                    <FavouriteButton
                        idDrink={cocktail.idDrink}
                        name={cocktail.strDrink}
                        image={cocktail.strDrinkThumb}
                        mutate={mutate}
                        favourites={favourites ?? []}
                    />
                </>
            }
        />
    );
}
