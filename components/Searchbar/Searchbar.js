import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Searchbar({ isIngredientSearch }) {
    const router = useRouter();

    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target.form); 
        const searchQuery = formData.get('newCocktailSearch');
        console.log(searchQuery);
        const searchURL = isIngredientSearch
            ? `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${searchQuery}`
            : `https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${searchQuery}`;
        router.push({
            pathname: `${searchQuery}`,
        });
    }

    return (
        <>
            <form className="m-0 p-2.5">
                <input name="newCocktailSearch" type="text"></input>
                <button onClick={handleSearch} type="submit">Search</button>
            </form>
        </>
    )
}