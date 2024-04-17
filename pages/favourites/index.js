import DetailsList from "@/components/DetailsList/DetailsList"

export default function Favourites( {
    cocktails,
    cocktailSearch,
    onToggleFavourite,
    cocktailsInfo
}) {
    const favourites = cocktails.filter((cocktail) => {
        const favCocktail = cocktailsInfo.find((info) => info.idDrink === cocktail.idDrink);
        return cocktail && cocktail.isFavourite === true;
    });
    return(
        <DetailsList
        cocktails={cocktails}
        cocktailSearch={cocktailSearch} 
        onToggleFavourite={onToggleFavourite}
        cocktailsInfo={cocktailsInfo}/>
    )
}