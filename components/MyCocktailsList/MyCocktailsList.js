import useSWR from 'swr';
import DeleteButton from '../DeleteButton/DeleteButton';
import CocktailListCard from '../CocktailListCard/CocktailListCard';
import EmptyState from '../EmptyState/EmptyState';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Error loading data');
  return res.json();
};

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

  if (error) return <div>{error.message}</div>;
  if (!myCocktails) return <div>Loading...</div>;
  if (myCocktails.length === 0) {
    return (
      <EmptyState
        title="No house specials yet"
        message="Your cocktail menu is looking a little dry."
        hint="Hit “Add cocktail” to mix up your first signature drink."
      />
    );
  }

  return (
    <div className='detailsList'>
      {myCocktails.map((myCocktail) => (
        <CocktailListCard
          key={myCocktail._id}
          href={`/mycocktails/${myCocktail._id}`}
          name={myCocktail.strDrink}
          image={myCocktail.strDrinkThumb}
          ingredients={(myCocktail.ingredients ?? '')
            .split(',')
            .map((ingredient) => ingredient.trim())
            .filter(Boolean)}
          actions={
            <DeleteButton label={myCocktail.strDrink} onDelete={() => handleDelete(myCocktail._id)} />
          }
        />
      ))}
    </div>
  );
}
