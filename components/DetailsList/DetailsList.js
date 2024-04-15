import Searchbar from '../Searchbar/Searchbar';
import Link from  'next/link';
import { useRouter } from 'next/router';

export default function DetailsList({ cocktails, handleInputChange }) {
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
         <Link href={`/cocktails/${cocktail.strDrink}`}><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
         </Link>
        </div>
      ))}
    </>
    </>
  );
}