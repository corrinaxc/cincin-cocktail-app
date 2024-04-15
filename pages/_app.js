import "@/styles/globals.css";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav/Nav";


const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [cocktails, setCocktails] = useState("")
  const [isIngredientSearch, setIsIngredientSearch] = useState(false);
  const [searchQueryIngredient, setSearchQueryIngredient] = useState("");
  // const [searchURL, setSearchURL] = useState("");

  const searchURL = isIngredientSearch
    ? `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${searchQueryIngredient}`
    : `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?${searchQuery}`;

  const { data, error } = useSWR(searchURL, fetcher);
  const isLoading = !data && !error; // Define isLoading based on data and error

  const handleInputChange = (query) => {
    setInput(query);
    setIsIngredientSearch(false)
  };

  const handleIngredientChange = (query) => {
    setInput(query);
    setIsIngredientSearch(true)
    console.log("isIngredientSearch,", true)
  };

  useEffect(() => {
    if (data) {
      setCocktails(data.drinks);
    }
  }, [data]); 

  useEffect(() => {
    setSearchQuery(input ? `s=${input}` : "");
  }, [input]);

  // if (error) return <div>Failed to Load</div>;
  // if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <Component
      {...pageProps}
      handleInputChange={handleInputChange}
      handleIngredientChange={handleIngredientChange}
      cocktails={cocktails}
    />
    <Nav />
    </>
  );
}
