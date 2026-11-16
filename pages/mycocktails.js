import MyCocktailsList from "@/components/MyCocktailsList/MyCocktailsList"
import AddCocktailButton from "@/components/AddCocktailButton/AddCocktailButton"

export default function MyCocktails() {
    return (
        <>
        {/* Extra space at the bottom so the floating button never covers the last cocktail */}
        <div style={{ paddingBottom: 80 }}>
            <MyCocktailsList />
        </div>
        <AddCocktailButton />
        </>
    )
}
