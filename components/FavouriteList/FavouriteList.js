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

  useEffect(() => {
    if (data) {
      setFavourites(data);
    }
  }, [data]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (!favourites) return <div>No favourites found</div>;

  return (
    <>
      <Searchbar handleInputChange={handleInputChange}/>
      <>
        {favourites?.map((favourite) => (
          <div className="cocktailListDetail" key={favourite.idDrink}>
            <h2>{favourite.strDrink}</h2>
            <Link href={`/cocktails/${favourite.idDrink}`}>
              <img className="w-28" src={favourite.strDrinkThumb} alt={favourite.strDrink} />
            </Link>
            <FavouriteButton name={favourite.name}
            id={favourite._id}
            idDrink={favourite.idDrink}
            image={favourite.strDrinkThumb}
            mutate={mutate}
            favourites={favourites}/>
          </div>
        ))}
      </>
    </>
  );
}

