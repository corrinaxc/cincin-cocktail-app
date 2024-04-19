import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Link from 'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';


export default function FavouriteList({ 
    handleInputChange }) {
    
      const [favourites, setFavourites] = useState([])

      useEffect(() => {
        fetch('api/favourites')
          .then(response => response.json())
          .then(data => 
            setFavourites(data),
            )
          .catch(error => console.error ('There was an error!', error));
      }, []);
    
    return (
      <>
      <Searchbar handleInputChange={handleInputChange}/>
      <>
        {favourites?.map((favourite) => (
          <div className="cocktailListDetail" key={favourite.idDrink}>
            <h2>{favourite.strDrink}</h2>
           <Link href={`/cocktails/${favourite.idDrink}`}><img className="w-28" src={favourite.strDrinkThumb} alt={favourite.strDrink} />
           </Link>
           <FavouriteButton name={favourite.name} idDrink={favourite.idDrink} image={favourite.strDrinkThumb}/>
          </div>
        ))}
      </>
      </>
    );
  }