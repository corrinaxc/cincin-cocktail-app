import HomePageForm from "@/components/HomepageForm/HomepageForm";
import useSWR from 'swr';
import RandomCocktail from "@/components/RandomCocktail/RandomCocktail";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const fetcher = async (url) => await fetch(url).then((res) => res.json());
const searchURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export default function Home({ handleInputChange, handleIngredientChange, cocktails }) {
  const [randomCocktail, setRandomCocktail] = useState([]);
  const [loading, setLoading] = useState(true);
  const router= useRouter();
  const [animation, setAnimation] = useState(false);


  const { data, error } = useSWR(searchURL, fetcher);

  useEffect(() => {
    if (data) {
      setRandomCocktail(data.drinks);
      setLoading(false); 
    }
  }, [data]);

  function handleEasterEgg() {
    router.push('/easter-egg');
  }

  return (
    <>
      <HomePageForm
        handleInputChange={handleInputChange}
        handleIngredientChange={handleIngredientChange}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <RandomCocktail randomCocktail={randomCocktail}
        setAnimation={setAnimation}
        animation={animation} />
      )}
      <button className="easterEggButton" onClick={handleEasterEgg}>O</button>
    </>
  );
}