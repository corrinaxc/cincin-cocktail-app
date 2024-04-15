import { useRouter } from 'next/router';
import { useState } from "react";
import CocktailCard from '@/components/CocktailCard/CocktailCard';
import { useEffect } from "react";

export default function IndividualCocktailPage( {cocktails} ) {
    const router = useRouter();
    const { strDrink } = router.query
    const [selectedCocktail, setSelectedCocktail] = useState({});
    console.log(cocktails)

    useEffect(() => {
        setSelectedCocktail(cocktails?.find((cocktail)=> cocktail.strDrink === strDrink));
    }, [cocktails, strDrink]);


    if (!strDrink) {
        return <div>Loading...</div>;
    }

    if (!selectedCocktail) {
        return <div>Cocktail not found</div>;
    }


    console.log(selectedCocktail);

    return (
        <CocktailCard 
        name = {selectedCocktail.strDrink}
        method = {selectedCocktail.strInstructions}
        image = {selectedCocktail.strDrinkThumb}
        />
    )
}
