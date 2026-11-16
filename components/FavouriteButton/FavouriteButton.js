import {useSession, signIn } from 'next-auth/react';
import styles from './FavouriteButton.module.css';
import { rememberPendingFavourite } from '@/lib/pendingFavourite';

export default function FavouriteButton( {
  name,
  image,
  idDrink,
  id,
  mutate,
  favourites
} ) {
  const {data: session, status} = useSession();
  const list = Array.isArray(favourites) ? favourites : [];
  const favouriteItem = list.find((fav) => fav.idDrink === idDrink);

  // The heart changes straight away (optimistic update); the request runs in
  // the background and the change is rolled back if it fails. The response is
  // written into the SWR cache, so there's no extra request to reload the list.
  async function handleToggleFavorite() {
    if (!session) {
      // Remember this drink so it's saved automatically after signing in,
      // then come straight back to this page
      rememberPendingFavourite({ idDrink, strDrink: name, strDrinkThumb: image });
      signIn('google', { callbackUrl: window.location.href });
      return;
    }

    const placeholder = { _id: `pending-${idDrink}`, idDrink, strDrink: name, strDrinkThumb: image };

    try {
      await mutate(
        async (current = []) => {
          const response = await fetch("/api/favourites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idDrink, strDrink: name, strDrinkThumb: image }),
          });
          if (!response.ok) throw new Error("Could not save this favourite.");
          const saved = await response.json();
          return [saved, ...current.filter((fav) => fav.idDrink !== idDrink)];
        },
        {
          optimisticData: (current = []) => [placeholder, ...current],
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        }
      );
    } catch {
      alert('Sorry, that favourite could not be saved. Please try again.');
    }
  }

  async function handleDelete() {
    // Ignore clicks while a just-added favourite is still saving
    if (!favouriteItem || String(favouriteItem._id).startsWith('pending-')) return;

    try {
      await mutate(
        async (current = []) => {
          const response = await fetch(`/api/favourites/${favouriteItem._id}`, { method: "DELETE" });
          if (!response.ok && response.status !== 404) throw new Error("Could not remove this favourite.");
          return current.filter((fav) => fav._id !== favouriteItem._id);
        },
        {
          optimisticData: (current = []) => current.filter((fav) => fav._id !== favouriteItem._id),
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
        }
      );
    } catch {
      alert('Sorry, that favourite could not be removed. Please try again.');
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