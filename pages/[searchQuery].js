import DetailsList from "../components/DetailsList/DetailsList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsPage({
  cocktailSearch,
  onToggleFavourite,
  cocktailsInfo,
  isIngredientSearch,
}) {
  const router = useRouter();
  const { searchQuery = "" } = router.query;
  const [cocktails, setCocktails] = useState([]);
  const searchURL = isIngredientSearch
    ? `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${searchQuery}`
    : `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${searchQuery}`;

  const { data, error } = useSWR(searchURL, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) {
      setCocktails(data.drinks);
    }
  }, [data]);

  if (!data || !data.drinks) {
    return <div>No cocktails available</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DetailsList
      cocktails={data.drinks}
      cocktailSearch={cocktailSearch}
      onToggleFavourite={onToggleFavourite}
      cocktailsInfo={cocktailsInfo}
    />
  );
}

