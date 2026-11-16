import DetailsList from "../components/DetailsList/DetailsList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { formatIngredientsQuery } from "@/lib/formatIngredients";
import Searchbar from "@/components/Searchbar/Searchbar";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";

const NAME_SUGGESTIONS = ["Margarita", "Mojito", "Negroni", "Daiquiri"];
const INGREDIENT_SUGGESTIONS = ["Gin", "Vodka", "Rum", "Tequila"];

function readableQuery(query) {
  try {
    return decodeURIComponent(query);
  } catch {
    return query;
  }
}

function NoResults({ query, isIngredientSearch, onSuggestion }) {
  const shown = readableQuery(query).trim();
  return (
    <>
      <Searchbar />
      <EmptyState
        title="Well, this bar's run dry"
        message={
          isIngredientSearch
            ? `We couldn't shake up anything with ${shown ? `“${shown}”` : "those ingredients"}.`
            : `We couldn't find a cocktail called ${shown ? `“${shown}”` : "that"} – not even behind the bar.`
        }
        hint={
          isIngredientSearch
            ? "Every cocktail has to use all of your ingredients, so try fewer of them – or start with one of these:"
            : "Check the spelling, or order one of the classics:"
        }
      >
        {(isIngredientSearch ? INGREDIENT_SUGGESTIONS : NAME_SUGGESTIONS).map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className={emptyStateStyles.pill}
            onClick={() => onSuggestion(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </EmptyState>
    </>
  );
}

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsPage({
  cocktailSearch,
  onToggleFavourite,
  cocktailsInfo,
  isIngredientSearch,
  handleInputChange,
  handleIngredientChange,
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

  // TheCocktailDB returns null (name search) or "None Found" (ingredient search) when nothing matches
  if (!Array.isArray(data.drinks) || data.drinks.length === 0) {
    return (
      <NoResults
        query={searchQuery}
        isIngredientSearch={isIngredientSearch}
        onSuggestion={(suggestion) => {
          if (isIngredientSearch) handleIngredientChange?.(suggestion);
          else handleInputChange?.(suggestion);
          router.push(`/${encodeURIComponent(suggestion.toLowerCase())}`);
        }}
      />
    );
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

