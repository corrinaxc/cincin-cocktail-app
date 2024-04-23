import Searchbar from '../Searchbar/Searchbar';
import Link from  'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsList({ 
  cocktails,
  cocktailsInfo,
  handleInputChange }) {

    const { data: session, status } = useSession();
    const [favourites, setFavourites] = useState([]);
    const { data, error, mutate } = useSWR(status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null, fetcher);

    console.log(cocktails)
  
    useEffect(() => {
      if (data) {
        setFavourites(data);
      }
    }, [data]);
  
    if (status === 'loading') return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    if (!favourites) return <div>No favourites found</div>;
  
    
  if (!cocktails) {
    return <div>No cocktails available</div>;
  }
  return (
    <>
    <Searchbar handleInputChange={handleInputChange}/>
    <div className='detailsList'>
      {cocktails?.map((cocktail) => (
        <div className="cocktailListDetail" key={cocktail.idDrink}>
          <h2 className='cocktailDetailName'>{cocktail.strDrink}</h2>
         <Link href={`/cocktails/${cocktail.idDrink}`}><img className="cocktailListImage" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
         </Link>
         <FavouriteButton 
         idDrink={cocktail.idDrink}
         name={cocktail.strDrink}
         image={cocktail.strDrinkThumb}
         mutate={mutate}
         favourites={favourites}/>
        </div>
      ))}
    </div>
    </>
  );
}