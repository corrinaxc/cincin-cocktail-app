import HomePageForm from "@/components/HomepageForm/HomepageForm";
import useSWR from 'swr';
import RandomCocktail, { RandomCocktailSkeleton } from "@/components/RandomCocktail/RandomCocktail";
import { useState } from "react";

const fetcher = async (url) => await fetch(url).then((res) => res.json());
const searchURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export default function Home({ handleInputChange, handleIngredientChange }) {
  const [animation, setAnimation] = useState(false);

  // Don't swap the featured drink just because the user switched tabs and came back
  const { data, mutate } = useSWR(searchURL, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const randomCocktail = data?.drinks;
  const loading = !randomCocktail;

  // Fetch a new random drink in place instead of reloading the whole page
  function nextCocktail() {
    mutate();
  }

  return (
    <>
      <HomePageForm
        handleInputChange={handleInputChange}
        handleIngredientChange={handleIngredientChange}
      />
      {loading ? (
        <RandomCocktailSkeleton />
      ) : (
        <RandomCocktail randomCocktail={randomCocktail}
        setAnimation={setAnimation}
        animation={animation}
        nextCocktail={nextCocktail} />
      )}
    </>
  );
}