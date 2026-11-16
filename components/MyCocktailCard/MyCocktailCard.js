import { useRouter } from 'next/router';
import DeleteButton from "../DeleteButton/DeleteButton";
import CocktailDetailCard from "../CocktailDetailCard/CocktailDetailCard";

export default function MyCocktailCard({
    name,
    method,
    image,
    ingredients,
    myCocktail
}) {
    const router = useRouter();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/mycocktails/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                router.push("/mycocktails");
            } else {
                console.error("Failed to delete the cocktail");
            }
        } catch (error) {
            console.error("Failed to delete the cocktail:", error);
        }
    };

    return (
        <CocktailDetailCard
            name={name}
            image={image}
            method={method}
            ingredients={(ingredients ?? '')
                .split(',')
                .map((ingredient) => ingredient.trim())
                .filter(Boolean)}
            action={<DeleteButton label={name} onDelete={() => handleDelete(myCocktail._id)} />}
        />
    );
}
