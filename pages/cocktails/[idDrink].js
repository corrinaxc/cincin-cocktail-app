import Link from "next/link";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";
import { useRouter } from 'next/router';
import { useState } from "react";
import CocktailCard from '@/components/CocktailCard/CocktailCard';
import { useEffect } from "react";
import useSWR from 'swr';

const fetcher = async (url) => await fetch(url).then((res) => res.json());


export default function IndividualCocktailPage({ 
    cocktails,
    onToggleFavourite,
    cocktailsInfo,
}) {
    const router = useRouter();
    const { idDrink } = router.query;
    const [ingredients, setIngredients] = useState([]);

    const searchURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;

    const { data, error } = useSWR(searchURL, fetcher);
    const isLoading = !data && !error;

    const drinks = data?.drinks || [];
    const selectedCocktail = drinks[0];
    
    useEffect(() => {
        if (selectedCocktail) {
            const tempIngredients = [];
    
            for (let i = 1; i <= 15; i++) {
                const ingredientKey = `strIngredient${i}`;
                const measureKey = `strMeasure${i}`;
    
                if (selectedCocktail[ingredientKey] && selectedCocktail[measureKey]) { 
                    tempIngredients.push({
                        ingredient: selectedCocktail[ingredientKey],
                        measure: selectedCocktail[measureKey]
                    });
                } else {
                    break;
                }
            }
            setIngredients(tempIngredients);
        }
    }, [selectedCocktail]);
    

    if (!idDrink || isLoading) {
        return <div>Loading...</div>;
    }

    if (!selectedCocktail) {
        return (
            <EmptyState
                title="Last orders – this one's gone"
                message="We can't find that cocktail. It may have been removed, or the link is wrong."
            >
                <Link href="/" className={emptyStateStyles.button}>Back to the bar 🍸</Link>
            </EmptyState>
        );
    }

    return (
        <CocktailCard 
        name = {selectedCocktail.strDrink}
        ingredients = {ingredients}
        method = {selectedCocktail.strInstructions}
        image = {selectedCocktail.strDrinkThumb}
        idDrink = {selectedCocktail.idDrink}
        onToggleFavourite={onToggleFavourite}
        cocktailsInfo={cocktailsInfo}
        />
    )
}
