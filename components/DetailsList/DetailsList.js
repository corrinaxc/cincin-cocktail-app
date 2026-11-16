import Searchbar from '../Searchbar/Searchbar';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import CocktailListCard, { drinkIngredients, drinkMeta } from '../CocktailListCard/CocktailListCard';
import { lookupCocktail } from '@/lib/lookupCocktail';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsList({ 
  cocktails,
  cocktailsInfo,
  handleInputChange }) {

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
        if (!Array.isArray(cocktails) || cocktails.length === 0) return;

        // Name searches already return each drink's ingredients, so there's
        // nothing extra to fetch. Only ingredient searches need a lookup per drink.
        if (cocktails[0].strIngredient1 !== undefined) {
          setCocktailExtraInfo(cocktails.map((cocktail) => ({ drinks: [cocktail] })));
          return;
        }

        const detailsPromises = cocktails.map((cocktail) => lookupCocktail(cocktail.idDrink));

        const detailsData = await Promise.all(detailsPromises);
        setCocktailExtraInfo(detailsData);
      };
  
      fetchCocktailExtraInfo();
    }, [cocktails]);
  
    if (!cocktails || !Array.isArray(cocktails) || cocktails.length === 0) {
      return <div>No Cocktails Found</div>;
    }
  
    if (!cocktailExtraInfo) {
      return <div>No cocktails found</div>;
    }

  return (
    <div className='detailsPage'>
    <Searchbar handleInputChange={handleInputChange}/>
    <div className='detailsList'>
      {cocktails?.map((cocktail, index) => {
        const drink = cocktailExtraInfo[index]?.drinks?.[0];
        return (
          <CocktailListCard
            key={cocktail.idDrink}
            href={`/cocktails/${cocktail.idDrink}`}
            name={cocktail.strDrink}
            image={cocktail.strDrinkThumb}
            meta={drinkMeta(drink)}
            ingredients={drinkIngredients(drink)}
            imageLoading={index < 4 ? 'eager' : 'lazy'}
            actions={
              <FavouriteButton
                idDrink={cocktail.idDrink}
                name={cocktail.strDrink}
                image={cocktail.strDrinkThumb}
                mutate={mutate}
                favourites={favourites}
              />
            }
          />
        );
      })}
    </div>
    </div>
  );
}