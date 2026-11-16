import { useState, useEffect } from 'react';
import CocktailListCard, { drinkIngredients, drinkMeta } from '../CocktailListCard/CocktailListCard';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
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
    const fetchCocktailExtraInfo = async () => {
      const detailsPromises = favourites.map(async favourite => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${favourite.idDrink}`);
        const data = await response.json();
        return data;
      });
  
      const detailsData = await Promise.all(detailsPromises);
      setCocktailExtraInfo(detailsData);
    };
  
    fetchCocktailExtraInfo();
  }, [favourites]);    


  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!favourites) return <div>No favourites found</div>;

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

