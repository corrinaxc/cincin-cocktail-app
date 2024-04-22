import Link from "next/link"
import { useRouter } from 'next/router';
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import {useSession, signIn } from 'next-auth/react'

export default function CocktailCard( {
    name,
    method,
    image,
    ingredients,
    cocktailsInfo,
    idDrink
}) {

    const router = useRouter();
    // const {data: session, status} = useSession();

    const handleBackButtonClick = () => {
        router.back();
      };

    
    return (
        <>
        <div className="cocktailCard">
        <div className="cocktailCardImageDiv">
        <button onClick={handleBackButtonClick} className="backButton">Back</button>
        <FavouriteButton className=""name={name} image={image} cocktailsInfo={cocktailsInfo} idDrink={idDrink}/>
        <br></br>
        <img src={image}/>
        </div>
        <div className="cocktailCardDetail">
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

// className="mb-8 rounded-md display: flex flex-col"
//  <div className="bg-white rounded-md display: flex flex-col gap-6">