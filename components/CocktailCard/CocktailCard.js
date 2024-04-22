import Link from "next/link"
import { useRouter } from 'next/router';
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import {useSession, signIn } from 'next-auth/react'
import { useEffect, useState } from "react";
import useSWR from 'swr';

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

    
    return (
        <>
        <div className="cocktailCard">
        <div className="mb-8 rounded-md display: flex flex-col">
        <button onClick={handleBackButtonClick} className="ml-2">Back</button>
        {/* </Link> */}
        <FavouriteButton name={name}
        image={image}
        cocktailsInfo={cocktailsInfo}
        idDrink={idDrink}
        mutate={mutate}
        favourites={favourites}/>
        <br></br>
        <img src={image}/>
        </div>
        <div className="bg-white rounded-md display: flex flex-col gap-6">
        <h1>{name}</h1>
        <ul>
            {ingredients?.map((ingredient) => (
            <li className="underline">{ingredient.measure} {ingredient.ingredient}</li>
             ))}
        </ul>
        <p className="italic">{method}</p>
        </div>
        </div>
        </>
)
}