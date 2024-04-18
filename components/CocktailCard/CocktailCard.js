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
    const {data: session, status} = useSession();

    const handleBackButtonClick = () => {
        router.back();
      };

    async function handleToggleFavorite() {
        const favourite = {
          idDrink: idDrink,
          strDrink: name,
          strDrinkThumb: image,
          userId: session.user.id
        }
        console.log(favourite)

        if (session) {
            const response = await fetch("/api/favourites", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(favourite),
              });
        }
        else {
                signIn();
            }
        };
    
    return (
        <>
        <div className="cocktailCard">
        <div className="mb-8 rounded-md display: flex flex-col">
        <button onClick={handleBackButtonClick} className="ml-2">Back</button>
        {/* </Link> */}
        <FavouriteButton onToggleFavourite={handleToggleFavorite} cocktailsInfo={cocktailsInfo} idDrink={idDrink}/>
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