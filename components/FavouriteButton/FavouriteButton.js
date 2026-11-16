import {useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from './FavouriteButton.module.css';

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

  const isFavourite = Boolean(favouriteItem);

  return (
    <div className='favButtonDiv'>
      <button
        type="button"
        className={`${styles.button} ${isFavourite ? styles.active : ''}`}
        onClick={isFavourite ? handleDelete : handleToggleFavorite}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
        title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 20s-7.5-4.6-9-9.2C2 7.6 4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9C20 4.5 22 7.6 21 10.8 19.5 15.4 12 20 12 20Z" />
        </svg>
      </button>
    </div>
  );
}