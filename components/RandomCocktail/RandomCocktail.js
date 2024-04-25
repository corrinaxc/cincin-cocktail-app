import Link from 'next/link';

export default function RandomCocktail( { randomCocktail }) {

    console.log(randomCocktail);
    
    return (
        <div>
        <div className="randomCocktail" key={randomCocktail[0].idDrink}>
          <h2 className='cocktailDetailName'>{randomCocktail[0].strDrink}</h2>
          <ul className='cocktailDetailIngredients'>
            </ul>
         <Link href={`/cocktails/${randomCocktail[0].idDrink}`}><img className="cocktailListImage" src={randomCocktail[0].strDrinkThumb} alt={randomCocktail[0].strDrink} />
         </Link>
         {/* <FavouriteButton 
         idDrink={cocktail.idDrink}
         name={cocktail.strDrink}
         image={cocktail.strDrinkThumb}
         mutate={mutate}
         favourites={favourites}/>
        </div> */}
    </div>
        </div>
    )
}