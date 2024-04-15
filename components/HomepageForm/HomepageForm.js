import { useRouter } from 'next/router'



export default function HomePageForm({ handleInputChange }) {

const router = useRouter(); 
const { query } = router;

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const searchQuery = e.target.cocktailInput.value;
    console.log(searchQuery);
    handleInputChange(searchQuery);
    router.push({
        pathname: `${searchQuery}`, 
        query: { searchQuery } 
      });


    // const url = APIurl + `?${urlSpecifierStorage}&page=${pageNumber}`;
}
    return (
        <form className="flex flex-col bg-white gap-2.5" onSubmit={handleSubmit}>
        {/* <HomeSearchbar /> */}
        <label htmlFor="cocktailInput" className="text-black">What is your tipple of choice?</label>
        <input type="text" name="cocktailInput" className="border-2 border-black rounded-md"></input>
        {/* <label htmlFor="ingredientInput" className="text-black border-black">What do you have in your fridge?</label>
        <input type="text" name="ingredientInput" className="border-2 border-black rounded-md"></input> */}
        <button type="submit" className="text-black border-2 border-black">I'm thirsty! Let's go</button>
        </form>
    )
}