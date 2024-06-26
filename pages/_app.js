import "@/styles/globals.css";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import useLocalStorageState from "use-local-storage-state";
import {SessionProvider} from "next-auth/react";
import {useSession} from 'next-auth/react'
import { Head } from "next/head";
import Banner from "@/components/Banner/Banner";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps, session }) {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("")
  const [cocktails, setCocktails] = useState([]);

  const [isIngredientSearch, setIsIngredientSearch] = useLocalStorageState(
    "ingredientSearch",
    { defaultValue: false});
  const [searchQueryIngredient, setSearchQueryIngredient] = useState("");
  const [cocktailsInfo, setCocktailsInfo] = useLocalStorageState(
    "cocktailInfo",
    { defaultValue: [] }
  );

// function fetchData() {

  const searchURL = isIngredientSearch
    ? `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${searchQueryIngredient}`
    : `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?${searchQuery}`;

  const { data, error } = useSWR(searchURL, fetcher);
  const isLoading = !data && !error;


  const handleInputChange = (query) => {
    setInput(query);
    setIsIngredientSearch(false)
  };

  const handleIngredientChange = (query) => {
    setSearchQueryIngredient(query); 
    setIsIngredientSearch(true);
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
    <SessionProvider session={session}>
    {/* <div className="pageWrapper"> */}
    <Banner />
    <Component
      {...pageProps}
      handleInputChange={handleInputChange}
      handleIngredientChange={handleIngredientChange}
      cocktails={cocktails}
      cocktailsInfo = {cocktailsInfo}
      isIngredientSearch={isIngredientSearch}
      searchQuery={searchQuery}
      searchQueryIngredient={searchQueryIngredient}
    />
    <Nav />
    </SessionProvider>
    </>
  );
}
