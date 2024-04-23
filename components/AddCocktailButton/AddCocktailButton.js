import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AddCocktailButton() {
    const { data: session, status } = useSession();
    const router = useRouter();

    function handleAddCocktailButton() {
        if (status === "unauthenticated") {
            router.push("/login");
        } else {
            router.push("/addcocktail");
        }
    }

    return (
        <button className="addCocktailButton" onClick={handleAddCocktailButton}>Add New Cocktail</button>
    );
}
