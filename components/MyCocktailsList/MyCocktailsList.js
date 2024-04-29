import useSWR from 'swr';
import DeleteButton from '../DeleteButton/DeleteButton';
import Link from 'next/link';

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function MyCocktails() {
  const { data: myCocktails, error, mutate } = useSWR('/api/mycocktails', fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/mycocktails/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        mutate(); // Trigger re-fetch
      } else {
        console.error("Failed to delete the cocktail");
      }
    } catch (error) {
      console.error("Failed to delete the cocktail:", error);
    }
  };

  if (error) return <div>Error loading data</div>;
  if (!myCocktails) return <div>Loading...</div>;

  return (
    <div>
      <div>
      {myCocktails.map((myCocktail) => (
  <div className="cocktailListDetail" key={myCocktail._id}>
        <Link href={`/mycocktails/${myCocktail._id}`}>
        <img className="cocktailListImage" src={myCocktail.strDrinkThumb} alt={myCocktail.strDrink} />
      </Link>
      <div>
        <div className='deleteDiv'>
      <h2 className='cocktailDetailName'>{myCocktail.strDrink}</h2>
      <DeleteButton id={myCocktail._id} onDelete={() => handleDelete(myCocktail._id)} />
      </div>
      <ul className='cocktailDetailIngredients'>
      {myCocktail.ingredients && myCocktail.ingredients.split(',').map((ingredient, index) => (
        <li key={index}>
          <span className="underline">{ingredient.trim()}</span>
        </li>
        ))}
      </ul>
      </div>
  </div>
))}
    </div>
    </div>      
  );
}
