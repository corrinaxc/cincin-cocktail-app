import {useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function FavouriteButton( {
  name,
  image,
  idDrink,
  id,
  mutate,
  favourites
} ) {
  const {data: session, status} = useSession();
  const router = useRouter();
  const favouriteItem = favourites && Array.isArray(favourites) ? favourites.find(fav => fav.idDrink === idDrink) : null;

  async function handleToggleFavorite() {
    if (!session) {
      signIn();
      return;
    }

    const favourite = {
      idDrink: idDrink,
      strDrink: name,
      strDrinkThumb: image,
      userId: session.user.id
    };

    console.log(favourite);
    const response = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favourite),
    });

    if (response.status === 409) {
      alert('This drink is already in your favorites!');
    } else if (response.ok) {
      mutate();
    } else {
      alert('There was an error processing your request.');
    }
  }

  async function handleDelete() {
    if (!favouriteItem) return;

    const response = await fetch(`/api/favourites/${favouriteItem._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutate();
    } else {
      console.error("Failed to delete the favourite");
    }
  }

  return (
    <div className='favButtonDiv'>
      {favouriteItem ? (
        <button className="favButton" onClick={handleDelete}>❤️</button>
      ) : (
        <button className="favButton" onClick={handleToggleFavorite}>🤍</button>
      )}
    </div>
  );
}