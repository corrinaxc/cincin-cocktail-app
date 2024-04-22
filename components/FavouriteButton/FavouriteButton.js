import {useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function FavouriteButton( {
  name,
  image,
  idDrink,
  id,
  mutate
} ) {
  const {data: session, status} = useSession();
  const router = useRouter();

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
      const response = await fetch(`/api/favourites/${id}`, {
        method: "DELETE",
    })
    if (response.ok){
      mutate();
    }
    };
  return (
    <div>
      {id ? (
        <button onClick={handleDelete}>❤️</button>
      ) : (
        <button className="favButton" onClick={handleToggleFavorite}>🤍</button>
      )}
    </div>
  )
}