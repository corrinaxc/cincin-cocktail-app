import Link from "next/link"
export default function CocktailCard( {
    name,
    method,
    image,
    ingredients
}) {

    return (
        <>
        <Link href="/[searchQuery]">
        <button>Back</button>
        </Link>
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