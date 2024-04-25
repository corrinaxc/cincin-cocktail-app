import Link from "next/link"
import { useRouter } from 'next/router';
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import {useSession, signIn } from 'next-auth/react'
import { useState } from "react";
import useSWR from 'swr';
import { useEffect } from "react";
import DeleteButton from "../DeleteButton/DeleteButton";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function CocktailCard( {
    name,
    method,
    image,
    ingredients,
    cocktailsInfo,
    idDrink,
    myCocktail
}) {
    const { data: session, status } = useSession();
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);
    const router = useRouter();
  


    const handleBackButtonClick = () => {
        router.back();
      };

      const handleDelete = async (id) => {
        try {
          const response = await fetch(`/api/mycocktails/${id}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            router.push("/mycocktails")
          } else {
            console.error("Failed to delete the cocktail");
          }
        } catch (error) {
          console.error("Failed to delete the cocktail:", error);
        }
      };

    
    return (
        <>
        <div className="cocktailCard">
        <div className="cocktailCardImageDiv">
          <div className="buttonDiv">
          <button onClick={handleBackButtonClick} className="backButton">←</button>
          <h1 className="cocktailCardName">{name}</h1>
          <DeleteButton id={myCocktail._id} onDelete={() => handleDelete(myCocktail._id)} />
          </div>
        <img className="cocktailImage" src={image}/>
        <ul className='cocktailCardIngredients'>
      {ingredients && ingredients.split(',').map((ingredient, index) => (
        <li key={index}>
          <span className="underline">{ingredient.trim()}</span>
        </li>
        ))}
      </ul>
        <p className="italic cocktailCardMethod">{method}</p>
        </div>
        </div>
       </>
)
}