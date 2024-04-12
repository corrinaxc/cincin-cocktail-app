import "@/styles/globals.css";
import useSWR from "swr";
import { useState } from "react";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const [input, setInput] = useState("");

  const searchQuery = input ? `s=${input}` : "";
  const searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${searchQuery}`;

  const { data, error } = useSWR(searchURL, fetcher);
  const isLoading = !data && !error; // Define isLoading based on data and error

  const handleInputChange = (query) => {
    setInput(query);
  };

  const cocktails = data ? data.drinks : null; // Ensure cocktails is null if data is not loaded

  // if (error) return <div>Failed to Load</div>;
  // if (isLoading) return <div>Loading...</div>;

  return (
    <Component
      {...pageProps}
      handleInputChange={handleInputChange}
      cocktails={cocktails}
    />
  );
}
