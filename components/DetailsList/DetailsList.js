import Searchbar from '../Searchbar/Searchbar';
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
        <div className="cocktailListDetail" key={cocktail.idDrink}>
          <h2>{cocktail.strDrink}</h2>
         <Link href={`/cocktails/${cocktail.strDrink}`}><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
         </Link>
         <button className="mr-2">🤍</button>
        </div>
      ))}
    </>
    </>
  );
}