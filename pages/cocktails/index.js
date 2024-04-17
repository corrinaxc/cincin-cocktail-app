// import Link from
import CocktailCard from "@/components/CocktailCard/CocktailCard"

export default function CocktailDetails( {
    cocktails,
    onToggleFavourite,
    cocktailsInfo
    } 
    ) {
    return(
        <CocktailCard 
        cocktails = {cocktails}
        onToggleFavourite={onToggleFavourite}
        cocktailsInfo={cocktailsInfo} />
    )
}