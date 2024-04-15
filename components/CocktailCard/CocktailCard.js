import Link from "next/link"
export default function CocktailCard( {
    name,
    method,
    image
}) {

    return (
        <>
        <Link href="/[searchQuery]">
        <button>Back</button>
        </Link>
        {/* </Link> */}
        <button>Add to Favourites</button>
        <img src={image}/>
        <h2>{name}</h2>
        <ul>
        <li>Ingredient</li>
        </ul>
        <p>{method}</p>
        </>
)
}

{/* <Link className="backButton" href="/art-pieces">
<button className="backButton" >⭠</button>
</Link> */}