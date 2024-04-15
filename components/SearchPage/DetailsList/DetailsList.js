import Searchbar from "../Searchbar/SearchBar.js";
import Link from  'next/link';

export default function DetailsList({ cocktails }) {
  if (!cocktails) {
    return <div>No cocktails available</div>;
  }



  return (
    <>
    <Searchbar />
    <>
      {cocktails?.map((cocktail) => (
        <div key={cocktail.idDrink}>
          <h2>{cocktail.strDrink}</h2>
         <Link href={`/cocktails/${cocktail.strDrink}`}><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
         </Link>
        </div>
      ))}
    </>
    </>
  );
}