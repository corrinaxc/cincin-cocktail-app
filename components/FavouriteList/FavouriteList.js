export default function FavouriteList({ 
    cocktails,
    cocktailsInfo,
    handleInputChange }) {
    
    if (!cocktails) {
      return <div>No cocktails available</div>;
    }

    
    return (
      <>
      <Searchbar handleInputChange={handleInputChange}/>
      <>
        {cocktails?.map((cocktail) => (
          <div className="cocktailListDetail" key={cocktail.idDrink}>
            <h2>{cocktail.strDrink}</h2>
           <Link href={`/cocktails/${cocktail.idDrink}`}><img className="w-28" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
           </Link>
           <FavouriteButton onToggleFavourite={onToggleFavourite} cocktailsInfo={cocktailsInfo} idDrink={cocktail.idDrink}/>
          </div>
        ))}
      </>
      </>
    );
  }