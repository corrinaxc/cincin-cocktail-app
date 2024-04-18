import Searchbar from '../Searchbar/Searchbar';
import Link from  'next/link';
import FavouriteButton from '../FavouriteButton/FavouriteButton';

export default function DetailsList({ 
  cocktails,
  cocktailsInfo,
  handleInputChange }) {
    
  if (!cocktails) {
    return <div>No cocktails available</div>;
  }
  return (
    <>
    <Searchbar handleInputChange={handleInputChange}/>
    <>
      {cocktails?.map((cocktail) => (
        <div className="cocktailListDetail" key={cocktail.idDrink}>
          <h2>{cocktail.strDrink}</h2>
         <Link href={`/cocktails/${cocktail.idDrink}`}><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
         </Link>
         <FavouriteButton 
         idDrink={cocktail.idDrink}
         name={cocktail.strDrink}
         image={cocktail.strDrinkThumb}/>
        </div>
      ))}
    </>
    </>
  );
}