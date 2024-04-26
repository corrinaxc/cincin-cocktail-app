import Searchbar from '../Searchbar/Searchbar';
import Link from  'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import CocktailDetails from '@/pages/cocktails';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsList({ 
  cocktails,
  cocktailsInfo,
  handleInputChange }) {

    const { data: session, status } = useSession();
    const [favourites, setFavourites] = useState([]);
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);
    const [cocktailExtraInfo, setCocktailExtraInfo] = useState([]);

    if (!cocktails) {
      return <div>No Cocktails Found</div>
    }
  
    useEffect(() => {
      if (data) {
        setFavourites(data);
      }
    }, [data]);

    useEffect(() => {
      const fetchCocktailExtraInfo = async () => {
        if (Array.isArray(cocktails) && cocktails.length > 0) {
          const detailsPromises = cocktails.map(async cocktail => {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`);
            const data = await response.json();
            return data;
          });
  
          const detailsData = await Promise.all(detailsPromises);
          setCocktailExtraInfo(detailsData);
        }
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
          <Link href={`/cocktails/${cocktail.idDrink}`}><img className="cocktailListImage" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
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