export default function HomeSearchbar({handleInputChange}) {
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const searchQuery = data.query;
        console.log(searchQuery);
    }
    
    return (
        <>
        <label htmlFor="cocktailInput" className="text-black">What is your tipple of choice?</label>
        <input type="text" name="cocktailInput" className="border-2 border-black rounded-md"></input>
        <label htmlFor="ingredientInput" className="text-black">What is in your fridge?</label>
        <input type="text" name="ingredientInput" className="border-2 border-black rounded-md"></input>
        </>
    )
}