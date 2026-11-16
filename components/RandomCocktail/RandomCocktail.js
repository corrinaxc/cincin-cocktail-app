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
        <div className='button-cocktail'>
        <button className={styles.rejectionButton} onClick={handleRejection}>👎</button>
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