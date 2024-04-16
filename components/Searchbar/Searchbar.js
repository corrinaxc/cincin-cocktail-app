import { useRouter } from "next/router";

export default function Searchbar( { handleInputChange } ) {

const router = useRouter();

    function handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target.form); 
        const searchQuery = formData.get('newCocktailSearch');
        console.log(searchQuery);
        handleInputChange(searchQuery);
        router.push({
            pathname: `${searchQuery}`,
            query: { searchQuery }
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