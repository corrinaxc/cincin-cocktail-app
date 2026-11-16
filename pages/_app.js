import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import useLocalStorageState from "use-local-storage-state";
import {SessionProvider} from "next-auth/react";
import {useSession} from 'next-auth/react'
import { Head } from "next/head";
import Banner from "@/components/Banner/Banner";

export default function App({ Component, pageProps }) {
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("")

  const [isIngredientSearch, setIsIngredientSearch] = useLocalStorageState(
    "ingredientSearch",
    { defaultValue: false});
  const [searchQueryIngredient, setSearchQueryIngredient] = useState("");
  const [cocktailsInfo, setCocktailsInfo] = useLocalStorageState(
    "cocktailInfo",
    { defaultValue: [] }
  );


  const handleInputChange = (query) => {
    setInput(query);
    setIsIngredientSearch(false)
  };

  const handleIngredientChange = (query) => {
    setSearchQueryIngredient(query); 
    setIsIngredientSearch(true);
  };

  useEffect(() => {
    setSearchQuery(input ? `s=${input}` : "");
  }, [input]);

  // if (error) return <div>Failed to Load</div>;
  // if (isLoading) return <div>Loading...</div>;
 
  return (
    <>
    <SessionProvider session={pageProps.session}>
    {/* <div className="pageWrapper"> */}
    <Banner />
    <Component
      {...pageProps}
      handleInputChange={handleInputChange}
      handleIngredientChange={handleIngredientChange}
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
