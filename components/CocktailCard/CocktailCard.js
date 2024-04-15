import Link from "next/link"
import { useRouter } from 'next/router';

export default function CocktailCard( {
    name,
    method,
    image,
    ingredients,
}) {

    const router = useRouter();

    const handleBackButtonClick = () => {
        router.back();
      };
    
    return (
        <>
        <button onClick={handleBackButtonClick}>Back</button>
        {/* </Link> */}
        <button>Add to Favourites</button>
        <img src={image}/>
        <h1>{name}</h1>
        <ul>
            {ingredients?.map((ingredient) => (
            <li>{ingredient.measure} {ingredient.ingredient}</li>
             ))}
        </ul>
        <p className="italic">{method}</p>
        </>
)
}