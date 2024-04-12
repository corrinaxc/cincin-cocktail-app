import "@/styles/globals.css";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {

  const {
    data: cocktails,
    error,
    isLoading,
  } = useSWR(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`, fetcher);
  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>loading...</div>
  console.log(cocktails);

  // cocktails.forEach((cocktail) => {
  //   const newCocktail = [
  //     cocktail.strDrink,
  //     cocktail.strInstructions,
  //     cocktail.DrunkThumb,
  //     cocktail.strIngredient1,
  //     cocktail.strIngredient2,
  //     cocktail.strIngredient3,
  //     cocktail.strIngredient4,
  //     cocktail.strMeasure1,
  //     cocktail.strMeasure2,
  //     cocktail.strMeasure3,
  //   ]

  //   console.log(newCocktail);
  // })

  return <Component {...pageProps}
  cocktail={cocktails} />;
}
