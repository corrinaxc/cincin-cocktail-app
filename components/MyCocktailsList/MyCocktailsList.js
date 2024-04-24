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
    <>
      {myCocktails.map((myCocktail) => (
        <div className="cocktailListDetail" key={myCocktail._id}>
          <h2>{myCocktail.strDrink}</h2>
          <ul>
            {myCocktail.ingredients?.map((ingredient) => (
            <li className="underline">{ingredient}</li>
             ))}
        </ul>
          <Link href={`/mycocktails/${myCocktail._id}`}>
            <img className="w-28" src={myCocktail.strDrinkThumb} alt={myCocktail.strDrink} />
          </Link>
          <DeleteButton id={myCocktail._id} onDelete={() => handleDelete(myCocktail._id)} />
        </div>
      ))}
    </>      
  );
}
