import DetailsList from "../components/DetailsList/DetailsList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { formatIngredientsQuery } from "@/lib/formatIngredients";

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
  // The ingredient list lets us turn "gin lime juice" into "Gin,Lime_Juice"
  const { data: ingredientList, error: ingredientListError } = useSWR(
    isIngredientSearch
      ? "https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list"
      : null,
    fetcher
  );
  const knownIngredients =
    ingredientList?.drinks?.map((drink) => drink.strIngredient1) ?? [];
  const ingredientListReady = Boolean(ingredientList || ingredientListError);

  // router.query is empty until the router is ready; don't fire an empty search
  const searchURL = !router.isReady
    ? null
    : isIngredientSearch
    ? ingredientListReady
      ? `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${formatIngredientsQuery(searchQuery, knownIngredients)}`
      : null
    : `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${searchQuery}`;

  const { data, error } = useSWR(searchURL, fetcher);
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) {
      setCocktails(data.drinks);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data.drinks) {
    return <div>No cocktails available</div>;
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

