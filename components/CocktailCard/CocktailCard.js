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
        <div className="cocktailCard">
        <div className="mb-8 rounded-md display: flex flex-col">
        <button onClick={handleBackButtonClick} className="ml-2">Back</button>
        {/* </Link> */}
        <button className="mr-2">🤍</button>
        <br></br>
        <img src={image}/>
        </div>
        <div className="bg-white rounded-md display: flex flex-col gap-6">
        <h1>{name}</h1>
        <ul>
            {ingredients?.map((ingredient) => (
            <li className="underline">{ingredient.measure} {ingredient.ingredient}</li>
             ))}
        </ul>
        <p className="italic">{method}</p>
        </div>
        </div>
        </>
)
}