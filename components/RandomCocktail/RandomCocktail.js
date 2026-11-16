import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import useSWR from 'swr';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import { useSession } from 'next-auth/react';
import styles from './RandomCocktail.module.css';
import { sizedThumb } from '@/lib/cocktailImage';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function RandomCocktail( { randomCocktail, setAnimation, animation, nextCocktail }) {
    const [favourites, setFavourites] = useState([]);
    const { data: session, status } = useSession();
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = randomCocktail[0][`strIngredient${i}`];

        if (ingredient) {
            ingredients.push({ ingredient });
        }
    }

    useEffect(() => {
        if (data) {
          setFavourites(data);
        }
      }, [data]);

      function handleRejection() {
        setAnimation(true);
        setTimeout(() => {
          nextCocktail();
          setAnimation(false);
        }, 700);
      }

    return (
        <div className={`${animation? "shake" : ""}`}>
        <div className={styles.randomCocktail} key={randomCocktail[0].idDrink}>
          <div className='header-cocktail'>
        <h2 className={styles.featuredCocktailTitle}>Featured Cocktail</h2>
        <div className={`button-cocktail ${styles.actions}`}>
        <button
          type="button"
          className={styles.rejectionButton}
          onClick={handleRejection}
          aria-label="Show me a different cocktail"
          title="Not for me – show another"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17 14V3" />
            <path d="M9 18.5 10 14H5.2a2 2 0 0 1-2-2.3l1.2-7A2 2 0 0 1 6.4 3H17v11l-4.3 6.4a1.6 1.6 0 0 1-2.9-1Z" />
            <path d="M17 3h2.5a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H17" />
          </svg>
        </button>
         <FavouriteButton 
         idDrink={randomCocktail[0].idDrink}
         name={randomCocktail[0].strDrink}
         image={randomCocktail[0].strDrinkThumb}
         mutate={mutate}
         favourites={favourites} />
         </div>
         </div>
          <div className={styles.blabla}>
          
          
          <Link href={`/cocktails/${randomCocktail[0].idDrink}`}><img className={styles.randomCocktailImage} src={sizedThumb(randomCocktail[0].strDrinkThumb)} alt={randomCocktail[0].strDrink} />
         </Link>
         <div>
          <h2 className={styles.randomCocktailDetailName}>{randomCocktail[0].strDrink}</h2>
          <ul className={styles.randomCocktailDetailIngredients}>
                {ingredients.map((item, index) => (
                    <li key={index}>{item.ingredient}</li>
                ))}
            </ul>
            </div>
        
         </div>
    </div>
    </div>
    )
}