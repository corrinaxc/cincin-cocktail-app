import useSWR from 'swr';

export default function DeleteButton( { id } ) {

  const { data, error, mutate } = useSWR(`/api/mycocktails/${id}`);
  console.log(id);
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mycocktails/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        mutate();
      } else {
        console.error("Failed to delete the cocktail");
      }
    } catch (error) {
      console.error("Failed to delete the cocktail:", error);
    }
  };

    return (
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}