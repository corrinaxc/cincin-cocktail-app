import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Link from 'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function FavouriteList({ handleInputChange }) {
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

  console.log(cocktailExtraInfo)

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!favourites) return <div>No favourites found</div>;

  return (
      <div>
        {favourites?.map((favourite, index) => (
          <div className="cocktailListDetail" key={favourite.idDrink}>
              <Link href={`/cocktails/${favourite.idDrink}`}>
              <img className="cocktailListImage" src={favourite.strDrinkThumb} alt={favourite.strDrink} />
            </Link>
            <div>
            <h2 className='cocktailDetailName'>{favourite.strDrink}</h2>
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
            <FavouriteButton name={favourite.name}
            id={favourite._id}
            idDrink={favourite.idDrink}
            image={favourite.strDrinkThumb}
            mutate={mutate}
            favourites={favourites}/>
          </div>
        ))}
      </div>
  );
}

