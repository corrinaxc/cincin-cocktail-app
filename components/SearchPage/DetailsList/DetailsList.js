import Searchbar from "../Searchbar/SearchBar";
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
         <img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </div>
      ))}
    </>
    </>
  );
}

// href={`/art-pieces/${piece.slug}