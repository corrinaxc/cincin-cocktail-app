import Link from "next/link"
import { useRouter } from 'next/router';
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import {useSession, signIn } from 'next-auth/react'
import { useState } from "react";
import useSWR from 'swr';
import { useEffect } from "react";
import styles from './CocktailCard.module.css';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function CocktailCard( {
    name,
    method,
    image,
    ingredients,
    cocktailsInfo,
    idDrink
}) {
    const { data: session, status } = useSession();
    const [favourites, setFavourites] = useState([]);
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);
    const router = useRouter();
  
    useEffect(() => {
      if (data) {
        setFavourites(data);
      }
    }, [data]);
  
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    if (!favourites) return <div>No favourites found</div>;



    const handleBackButtonClick = () => {
        router.back();
      };
    
      useEffect(() => {
        if (data) {
          setFavourites(data);
        }
      }, [data]);
    
      if (status === 'loading') return <div>Loading...</div>;
      if (error) return <div>Error fetching data</div>;
      if (!favourites) return <div>No favourites found</div>;

    
    return (
        <>
        <div className="cocktailCard">
        <div className="cocktailCardImageDiv">
        <div className="buttonDiv">
        <button onClick={handleBackButtonClick} className={styles.backButton}>←</button>
        <FavouriteButton className="favButton" name={name}
        image={image}
        cocktailsInfo={cocktailsInfo}
        idDrink={idDrink}
        mutate={mutate}
        favourites={favourites}/>
        </div>
        <h1 className="cocktailCardName">{name}</h1>
        <img className="cocktailImage" src={image}/>
        <ul className="cocktailCardIngredients">
            {ingredients?.map((ingredient) => (
            <li className="underline">{ingredient.measure} {ingredient.ingredient}</li>
             ))}
        </ul>
        <p className="cocktailCardMethod">{method}</p>
        </div>
        </div>
        </>
)
}