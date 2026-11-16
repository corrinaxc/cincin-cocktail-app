import { useState, useEffect } from 'react';
import CocktailListCard, { drinkIngredients, drinkMeta } from '../CocktailListCard/CocktailListCard';
import EmptyState, { emptyStateStyles } from '../EmptyState/EmptyState';
import Link from 'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { lookupCocktail } from '@/lib/lookupCocktail';
import { useSession } from 'next-auth/react';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error fetching data');
  return res.json();
};

export default function FavouriteList({ handleInputChange }) {
  const { data: session, status } = useSession();
  const [favourites, setFavourites] = useState([]);
  const { data, error, mutate } = useSWR(status === 'authenticated' ? "/api/favourites" : null, fetcher);
  const [cocktailExtraInfo, setCocktailExtraInfo] = useState([]);

  useEffect(() => {
    if (data) {
      setFavourites(data);
    }
  }, [data]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(favourites.map((favourite) => lookupCocktail(favourite.idDrink))).then((details) => {
      if (!cancelled) setCocktailExtraInfo(details);
    });
    return () => {
      cancelled = true;
    };
  }, [favourites]);    


  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!data) return <div>Loading...</div>;
  if (data.length === 0) {
    return (
      <EmptyState
        title="Your glass is empty"
        message="You haven't saved any favourites yet."
        hint="Tap the ♡ on any cocktail and it'll be waiting for you here."
      >
        <Link href="/" className={emptyStateStyles.button}>Find a cocktail 🍸</Link>
      </EmptyState>
    );
  }

  return (
      <div className='detailsList'>
        {favourites?.map((favourite, index) => {
          const drink = cocktailExtraInfo[index]?.drinks?.[0];
          return (
            <CocktailListCard
              key={favourite.idDrink}
              href={`/cocktails/${favourite.idDrink}`}
              name={favourite.strDrink}
              image={favourite.strDrinkThumb}
              meta={drinkMeta(drink)}
              ingredients={drinkIngredients(drink)}
              imageLoading={index < 4 ? 'eager' : 'lazy'}
              actions={
                <FavouriteButton
                  name={favourite.strDrink}
                  idDrink={favourite.idDrink}
                  image={favourite.strDrinkThumb}
                  mutate={mutate}
                  favourites={favourites}
                />
              }
            />
          );
        })}
      </div>
  );
}

