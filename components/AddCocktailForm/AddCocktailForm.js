export default function AddCocktailForm() {
    return (
    <form>
        <label htmlFor="cocktailName">Cocktail Name</label>
        <input type="text" name="cocktailName"></input>
        <label htmlFor="ingredients">Ingredients</label>
        <input type="text" name="ingredients"></input>
        <label htmlFor="method">Method</label>
        <input type="text" name="method"></input>
        <label htmlFor="cocktailImage">Image Upload</label>
        <input type="file" name="cocktailImage"></input>
    </form>)
}