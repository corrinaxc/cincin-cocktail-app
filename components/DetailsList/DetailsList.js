import Searchbar from '../Searchbar/Searchbar';
import Link from  'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { sizedThumb } from '@/lib/cocktailImage';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

// Remember drink details we've already fetched so repeat searches are instant
const lookupCache = new Map();
function lookupCocktail(idDrink) {
  if (!lookupCache.has(idDrink)) {
    const request = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((res) => res.json())
      .catch((error) => {
        lookupCache.delete(idDrink); // let it retry next time
        throw error;
      });
    lookupCache.set(idDrink, request);
  }
  return lookupCache.get(idDrink);
}

export default function DetailsList({ 
  cocktails,
  cocktailsInfo,
  handleInputChange }) {

    const { data: session, status } = useSession();
    const [favourites, setFavourites] = useState([]);
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);
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
      {cocktails?.map((cocktail, index) => (
        <div className="cocktailListDetail" key={cocktail.idDrink}>
          <Link href={`/cocktails/${cocktail.idDrink}`}><img className="cocktailListImage" src={sizedThumb(cocktail.strDrinkThumb)} alt={cocktail.strDrink} loading={index < 4 ? "eager" : "lazy"} />
         </Link>
         <div>
            <h2 className='cocktailDetailName'>{cocktail.strDrink}</h2>
            <ul className='cocktailDetailIngredients'>
              {cocktailExtraInfo[index]?.drinks[0] && (
                Object.keys(cocktailExtraInfo[index].drinks[0]).map(key => {
                  if (key.startsWith('strIngredient') && cocktailExtraInfo[index].drinks[0][key]) {
                    return <li key={key}>{cocktailExtraInfo[index].drinks[0][key]}</li>;
                  }
                  return null;
                })
              )}
          </ul>
         </div>
         <FavouriteButton 
         idDrink={cocktail.idDrink}
         name={cocktail.strDrink}
         image={cocktail.strDrinkThumb}
         mutate={mutate}
         favourites={favourites}/>
        </div>
      ))}
    </div>
    </div>
  );
}