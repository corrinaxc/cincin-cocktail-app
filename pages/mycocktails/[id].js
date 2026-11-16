import Link from "next/link";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import MyCocktailCard from '@/components/MyCocktailCard/MyCocktailCard'

export default function MyCocktail() {

    const [myCocktail, setMyCocktail] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      const fetchCocktail = async () => {
          try {
              if (id) {
                  const response = await fetch(`/api/mycocktails/${id}`);
                  if (response.ok) {
                      setMyCocktail(await response.json());
                  } else if (response.status === 404 || response.status === 401) {
                      setNotFound(true);
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

    if (notFound) {
        return (
            <EmptyState
                title="Last orders – this one's gone"
                message="We can't find that cocktail. It may have been removed, or the link is wrong."
            >
                <Link href="/" className={emptyStateStyles.button}>Back to the bar 🍸</Link>
            </EmptyState>
        );
    }

    if (!myCocktail) {
        return <div>Loading...</div>;
     } // Render a loading indicator while fetching data

    return (
        <MyCocktailCard 
        name = {myCocktail.strDrink}
        ingredients = {myCocktail.ingredients}
        method = {myCocktail.method}
        image = {myCocktail.strDrinkThumb}
        id = {myCocktail.id}
        // onToggleFavourite={onToggleFavourite}
        // cocktailsInfo={cocktailsInfo}
        myCocktail={myCocktail}
        />
    )
}