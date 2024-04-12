import "@/styles/globals.css";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {

  const [input, setInput] = useState("");
  const searchQuery = input ? `s=${input}` : "";
  const searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchQuery}`;

  const { 
    data: cocktails,
    error,
    isValidating } = useSWR(searchURL, fetcher);

  const handleInputChange = (query) => {
    setInput(query);}

    console.log(cocktails);
  
  // console.log(cocktails);

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
  // cocktail={cocktails}
  handleInputChange={handleInputChange} />;
}
