import {useSession, signIn } from 'next-auth/react'

export default function FavouriteButton( {
  name,
  image,
  idDrink
} ) {
  const {data: session, status} = useSession();

  async function handleToggleFavorite() {

    if (session) {
      const favourite = {
        idDrink: idDrink,
        strDrink: name,
        strDrinkThumb: image,
        userId: session.user.id
      }
        console.log(favourite)
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
        <button className="favButton" onClick={handleToggleFavorite}>🤍
        {/* <span>{foundCocktailInfo?.isFavorite ? "❤️" : "🤍"}</span> */}
        </button>
      )
}