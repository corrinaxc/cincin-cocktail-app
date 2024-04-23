import MyCocktailsList from "@/components/MyCocktailsList/MyCocktailsList"
import AddCocktailButton from "@/components/AddCocktailButton/AddCocktailButton"
import Banner from "@/components/Banner/Banner"

export default function MyCocktails() {
    return (
        <>
        <Banner />
        <h1>My Cocktails</h1>
        <MyCocktailsList />
        <AddCocktailButton />
        </>
    )
}