import { useRouter } from 'next/router';
import { useState } from "react";
import CocktailCard from '@/components/CocktailCard/CocktailCard';
import { useEffect } from "react";

export default function IndividualCocktailPage({ 
    cocktails,
    onToggleFavourite,
    cocktailsInfo
     }) {
    const router = useRouter();
    const { strDrink } = router.query;
    const [selectedCocktail, setSelectedCocktail] = useState(null);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (cocktails) {
            const cocktail = cocktails.find(c => c.strDrink === strDrink);
            setSelectedCocktail(cocktail);

            const tempIngredients = [];
            if (cocktail) {
                for (let i = 1; i <= 15; i++) {
                    const ingredientKey = `strIngredient${i}`;
                    const measureKey = `strMeasure${i}`;

                    if (cocktail[ingredientKey]) { 
                        tempIngredients.push({
                            ingredient: cocktail[ingredientKey],
                            measure: cocktail[measureKey] || 'to taste'
                        });
                    }
                }
            }
            setIngredients(tempIngredients);
        }
    }, [cocktails, strDrink]); 

    if (!strDrink) {
        return <div>Loading...</div>;
    }

    if (!selectedCocktail) {
        return <div>Cocktail not found</div>;
    }

    console.log(ingredients);

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
