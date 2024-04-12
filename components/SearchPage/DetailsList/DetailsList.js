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
          <Link><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} /></Link>
        </div>
      ))}
    </>
    </>
  );
}

{/* {books.map((book) => (
  <div key={book.id}>
    <img src={book.volumeInfo.imageLinks?.smallThumbnail}></img>
    <h4>{book.volumeInfo.title}</h4>
    <p>{book.volumeInfo.authors}</p>
  </div>
))}
</>
);
} */}

{/* <div className="colorDiv">
{colors?.map((color, index) => (
  <Div key={index} color={color}></Div>
))}</div> */}