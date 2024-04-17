import DetailsList from "../components/DetailsList/DetailsList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function DetailsPage( { 
    // cocktails, 
    cocktailSearch, 
    onToggleFavourite,
    cocktailsInfo,
    isIngredientSearch,
    // searchQuery,
    // searchQueryIngredient 
    }) {

    const router = useRouter();
    const { searchQuery = "" } = router.query;
    const [cocktails, setCocktails] = useState([]);

    console.log(router.query)
    console.log(searchQuery)
    // console.log(searchQueryIngredient)
    console.log(isIngredientSearch)

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

    return(
        <DetailsList
        cocktails={cocktails}
        cocktailSearch={cocktailSearch} 
        onToggleFavourite={onToggleFavourite}
        cocktailsInfo={cocktailsInfo}/>
    )
}