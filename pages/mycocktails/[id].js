import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import MyCocktailCard from '@/components/MyCocktailCard/MyCocktailCard'

export default function MyCocktail() {

    const [myCocktail, setMyCocktail] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      const fetchCocktail = async () => {
          try {
              if (id) {
                  const response = await fetch(`/api/mycocktails/${id}`);
                  console.log('Response status:', response.status);
                  if (response.ok) {
                      const data = await response.json();
                      console.log('Fetched data:', data);
                      setMyCocktail(data);
                  } else {
                      throw new Error('Failed to fetch data');
                  }
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchCocktail();
  }, [id]);

    console.log(myCocktail);

    if (!myCocktail) {
        return <div>Loading...</div>;
     } // Render a loading indicator while fetching data

    return (
        <MyCocktailCard 
        name = {myCocktail.strDrink}
        ingredients = {myCocktail.ingredients}
        method = {myCocktail.method}
        image = {myCocktail.strDrinkThumb}
        idDrink = {myCocktail.id}
        // onToggleFavourite={onToggleFavourite}
        // cocktailsInfo={cocktailsInfo}
        />
    )
}