import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Searchbar({ isIngredientSearch }) {
    const router = useRouter();

    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(e.target)
        const searchQuery = formData.get('newCocktailSearch');
        console.log("Search query:", searchQuery);
        const searchURL = isIngredientSearch
            ? `/search?ingredient=${searchQuery}`
            : `/search?cocktail=${searchQuery}`;
        router.push(searchQuery);
    }

    return (
        <>
            <form className="newSearch" onSubmit={handleSearch}>
                <input className='newSearchInput' name="newCocktailSearch" type="text" placeholder="New Search"></input>
            </form>
        </>
    )
}
