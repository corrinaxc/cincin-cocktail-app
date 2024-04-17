export default function FavouriteButton( { 
    onToggleFavourite,
    cocktailsInfo,
    idDrink } ) {
    const foundCocktailInfo = cocktailsInfo.find((info) => {
        return info.idDrink === idDrink;
      });

      return (
        <button className="favButton" onClick={() => onToggleFavourite(idDrink)}>
        <span>{foundCocktailInfo?.isFavorite ? "❤️" : "🤍"}</span>
        </button>
      )
}